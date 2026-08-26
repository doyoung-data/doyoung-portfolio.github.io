import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "build_codex_activity.py"


def token_line(timestamp: str, total: int) -> str:
    return json.dumps(
        {
            "timestamp": timestamp,
            "type": "event_msg",
            "payload": {
                "type": "token_count",
                "info": {
                    "last_token_usage": {
                        "input_tokens": total - 10,
                        "cached_input_tokens": 0,
                        "output_tokens": 10,
                        "reasoning_output_tokens": 0,
                        "total_tokens": total,
                    }
                },
            },
        },
        separators=(",", ":"),
    )


class BuildCodexActivityTests(unittest.TestCase):
    def test_builds_aggregate_only_and_deduplicates_copied_events(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            codex_home = root / ".codex"
            sessions = codex_home / "sessions" / "2026" / "08" / "25"
            archived = codex_home / "archived_sessions"
            sessions.mkdir(parents=True)
            archived.mkdir(parents=True)

            filename = "rollout-2026-08-25T09-00-00-019f0000-0000-7000-8000-000000000001.jsonl"
            first = token_line("2026-08-25T00:00:00Z", 100)
            second = token_line("2026-08-26T00:00:00Z", 200)
            secret = json.dumps(
                {
                    "type": "event_msg",
                    "payload": {
                        "type": "user_message",
                        "message": "PRIVATE-COMPANY-DATA",
                    },
                }
            )
            (sessions / filename).write_text(
                "\n".join((secret, first, second)) + "\n", encoding="utf-8"
            )
            (archived / filename).write_text(first + "\n", encoding="utf-8")

            output = root / "activity.json"
            result = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--codex-home",
                    str(codex_home),
                    "--output",
                    str(output),
                    "--now",
                    "2026-08-26T12:00:00+09:00",
                    "--no-rg",
                ],
                capture_output=True,
                text=True,
                check=False,
            )

            self.assertEqual(result.returncode, 0, result.stderr)
            payload = json.loads(output.read_text(encoding="utf-8"))
            self.assertEqual(payload["summary"]["lifetime_tokens"], 300)
            self.assertEqual(payload["summary"]["active_days"], 2)
            self.assertEqual(payload["summary"]["current_streak_days"], 2)
            self.assertEqual(payload["summary"]["longest_streak_days"], 2)
            self.assertEqual(payload["summary"]["recorded_tasks"], 1)
            self.assertNotIn("PRIVATE-COMPANY-DATA", output.read_text(encoding="utf-8"))
            self.assertNotIn(str(codex_home), output.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
