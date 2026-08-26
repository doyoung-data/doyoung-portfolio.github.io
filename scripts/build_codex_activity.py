#!/usr/bin/env python3
"""Build a privacy-safe Codex activity summary for the portfolio."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import sqlite3
import subprocess
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Iterable, Iterator
from zoneinfo import ZoneInfo


TOKEN_MARKER = '"type":"token_count"'
KST = ZoneInfo("Asia/Seoul")
ROLLOUT_ID_PATTERN = re.compile(
    r"([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.jsonl$",
    re.IGNORECASE,
)


def parse_args() -> argparse.Namespace:
    default_home = Path(os.environ.get("CODEX_HOME", Path.home() / ".codex"))
    default_output = Path(__file__).resolve().parents[1] / "data" / "codex-activity.json"

    parser = argparse.ArgumentParser(
        description="Aggregate Codex token metadata without exporting prompts, code, or paths."
    )
    parser.add_argument("--codex-home", type=Path, default=default_home)
    parser.add_argument("--output", type=Path, default=default_output)
    parser.add_argument(
        "--now",
        help="ISO timestamp used for deterministic tests. Defaults to the current KST time.",
    )
    parser.add_argument(
        "--no-rg",
        action="store_true",
        help="Use the Python fallback instead of ripgrep.",
    )
    return parser.parse_args()


def rollout_roots(codex_home: Path) -> list[Path]:
    return [
        root
        for root in (codex_home / "sessions", codex_home / "archived_sessions")
        if root.exists()
    ]


def rollout_files(roots: Iterable[Path]) -> list[Path]:
    files: list[Path] = []
    for root in roots:
        files.extend(path for path in root.rglob("*.jsonl") if path.is_file())
    return files


def iter_token_lines_with_rg(roots: list[Path], rg_path: str) -> Iterator[str]:
    command = [
        rg_path,
        "--no-filename",
        "--fixed-strings",
        "--glob",
        "*.jsonl",
        TOKEN_MARKER,
        *(str(root) for root in roots),
    ]
    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    assert process.stdout is not None
    yield from process.stdout
    stderr = process.stderr.read() if process.stderr else ""
    return_code = process.wait()
    if return_code not in (0, 1):
        raise RuntimeError(f"ripgrep failed with exit code {return_code}: {stderr.strip()}")


def iter_token_lines_with_python(files: Iterable[Path]) -> Iterator[str]:
    for path in files:
        try:
            with path.open("r", encoding="utf-8", errors="replace") as handle:
                for line in handle:
                    if TOKEN_MARKER in line:
                        yield line
        except (OSError, PermissionError):
            # A live Codex rollout may briefly be locked while it is being written.
            continue


def parse_timestamp(value: str) -> datetime:
    normalized = value[:-1] + "+00:00" if value.endswith("Z") else value
    parsed = datetime.fromisoformat(normalized)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(KST)


def token_event(line: str) -> tuple[datetime, int, bytes] | None:
    try:
        record = json.loads(line)
        payload = record.get("payload") or {}
        if record.get("type") != "event_msg" or payload.get("type") != "token_count":
            return None

        info = payload.get("info") or {}
        usage = info.get("last_token_usage") or {}
        total_tokens = int(usage.get("total_tokens") or 0)
        if total_tokens <= 0:
            return None

        timestamp = parse_timestamp(record["timestamp"])
        signature_payload = (
            record["timestamp"],
            int(usage.get("input_tokens") or 0),
            int(usage.get("cached_input_tokens") or 0),
            int(usage.get("output_tokens") or 0),
            int(usage.get("reasoning_output_tokens") or 0),
            total_tokens,
        )
        signature = hashlib.blake2b(
            repr(signature_payload).encode("utf-8"), digest_size=16
        ).digest()
        return timestamp, total_tokens, signature
    except (AttributeError, KeyError, TypeError, ValueError, json.JSONDecodeError):
        return None


def calculate_streaks(active_days: list[date], today: date) -> tuple[int, int]:
    if not active_days:
        return 0, 0

    longest = 1
    running = 1
    for previous, current in zip(active_days, active_days[1:]):
        running = running + 1 if current - previous == timedelta(days=1) else 1
        longest = max(longest, running)

    active_set = set(active_days)
    latest = active_days[-1]
    if latest not in {today, today - timedelta(days=1)}:
        return 0, longest

    current_streak = 0
    cursor = latest
    while cursor in active_set:
        current_streak += 1
        cursor -= timedelta(days=1)
    return current_streak, longest


def count_recorded_tasks(files: Iterable[Path], state_db: Path) -> int:
    if state_db.exists():
        try:
            uri = f"file:{state_db.as_posix()}?mode=ro"
            with sqlite3.connect(uri, uri=True) as connection:
                row = connection.execute(
                    "SELECT COUNT(*) FROM threads WHERE tokens_used > 0"
                ).fetchone()
                if row:
                    return int(row[0])
        except sqlite3.Error:
            pass

    rollout_ids = set()
    for path in files:
        match = ROLLOUT_ID_PATTERN.search(path.name)
        rollout_ids.add(match.group(1).lower() if match else path.name.lower())
    return len(rollout_ids)


def build_activity(codex_home: Path, now: datetime, use_rg: bool) -> dict:
    roots = rollout_roots(codex_home)
    if not roots:
        raise FileNotFoundError(f"No Codex rollout folders found under {codex_home}")

    files = rollout_files(roots)
    rg_path = shutil.which("rg") if use_rg else None
    lines = (
        iter_token_lines_with_rg(roots, rg_path)
        if rg_path
        else iter_token_lines_with_python(files)
    )

    daily_tokens: dict[date, int] = defaultdict(int)
    daily_turns: dict[date, int] = defaultdict(int)
    seen_events: set[bytes] = set()
    latest_event: datetime | None = None

    for line in lines:
        event = token_event(line)
        if event is None:
            continue
        timestamp, tokens, signature = event
        if signature in seen_events:
            continue
        seen_events.add(signature)

        event_day = timestamp.date()
        daily_tokens[event_day] += tokens
        daily_turns[event_day] += 1
        latest_event = timestamp if latest_event is None or timestamp > latest_event else latest_event

    active_days = sorted(day for day, tokens in daily_tokens.items() if tokens > 0)
    current_streak, longest_streak = calculate_streaks(active_days, now.date())
    task_count = count_recorded_tasks(files, codex_home / "state_5.sqlite")
    lifetime_tokens = sum(daily_tokens.values())
    peak_daily_tokens = max(daily_tokens.values(), default=0)

    daily = [
        {
            "date": day.isoformat(),
            "tokens": daily_tokens[day],
            "turns": daily_turns[day],
        }
        for day in active_days
    ]

    return {
        "schema_version": 1,
        "source": "local_codex_rollouts",
        "privacy": "aggregate_only",
        "data_through": latest_event.isoformat(timespec="seconds") if latest_event else None,
        "period": {
            "start": active_days[0].isoformat() if active_days else None,
            "end": active_days[-1].isoformat() if active_days else None,
        },
        "summary": {
            "lifetime_tokens": lifetime_tokens,
            "peak_daily_tokens": peak_daily_tokens,
            "active_days": len(active_days),
            "current_streak_days": current_streak,
            "longest_streak_days": longest_streak,
            "recorded_tasks": task_count,
        },
        "daily": daily,
    }


def write_json(output: Path, payload: dict) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = output.with_suffix(output.suffix + ".tmp")
    temporary.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    temporary.replace(output)


def main() -> int:
    args = parse_args()
    now = parse_timestamp(args.now) if args.now else datetime.now(KST)
    try:
        payload = build_activity(args.codex_home.resolve(), now, not args.no_rg)
        write_json(args.output.resolve(), payload)
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1

    summary = payload["summary"]
    print(
        "Built Codex activity: "
        f"{summary['lifetime_tokens']} tokens, "
        f"{summary['active_days']} active days, "
        f"{summary['recorded_tasks']} tasks"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
