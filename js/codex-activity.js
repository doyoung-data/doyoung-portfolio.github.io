(function () {
  "use strict";

  const panel = document.querySelector("[data-codex-activity]");
  if (!panel) {
    return;
  }

  const metricElements = Array.from(panel.querySelectorAll("[data-codex-metric]"));
  const heatmap = panel.querySelector("[data-codex-heatmap]");
  const monthLabels = panel.querySelector("[data-codex-months]");
  const updated = panel.querySelector("[data-codex-updated]");
  const status = panel.querySelector("[data-codex-activity-status]");
  const DAY_MS = 24 * 60 * 60 * 1000;
  const WEEK_COUNT = 52;
  const koreanMonths = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  function dateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function compactNumber(value) {
    const number = Number(value) || 0;
    if (number >= 100000000) {
      const amount = number / 100000000;
      return `${amount >= 100 ? amount.toFixed(1) : amount.toFixed(amount >= 10 ? 1 : 2)}억`;
    }
    if (number >= 10000) {
      return `${(number / 10000).toFixed(number >= 100000 ? 0 : 1)}만`;
    }
    return number.toLocaleString("ko-KR");
  }

  function metricValue(key, value) {
    if (key === "lifetime_tokens") {
      return compactNumber(value);
    }
    if (key === "active_days" || key === "current_streak_days" || key === "longest_streak_days") {
      return `${Number(value || 0).toLocaleString("ko-KR")}일`;
    }
    return `${Number(value || 0).toLocaleString("ko-KR")}개`;
  }

  function quantile(sorted, ratio) {
    if (!sorted.length) {
      return 0;
    }
    return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * ratio))];
  }

  function activityLevel(value, thresholds) {
    if (value <= 0) {
      return 0;
    }
    if (value <= thresholds[0]) {
      return 1;
    }
    if (value <= thresholds[1]) {
      return 2;
    }
    if (value <= thresholds[2]) {
      return 3;
    }
    return 4;
  }

  function renderMonths(start) {
    monthLabels.innerHTML = "";
    let previousMonth = -1;
    let lastLabelColumn = -4;

    for (let column = 0; column < WEEK_COUNT; column += 1) {
      const weekStart = new Date(start.getTime() + column * 7 * DAY_MS);
      const month = weekStart.getMonth();
      if (month === previousMonth) {
        continue;
      }
      previousMonth = month;
      if (column - lastLabelColumn < 4) {
        continue;
      }

      const label = document.createElement("span");
      label.textContent = koreanMonths[month];
      label.style.gridColumn = String(column + 1);
      monthLabels.appendChild(label);
      lastLabelColumn = column;
    }
  }

  function renderHeatmap(payload) {
    const daily = new Map((payload.daily || []).map(function (entry) {
      return [entry.date, Number(entry.tokens) || 0];
    }));
    const positiveValues = Array.from(daily.values()).filter(function (value) {
      return value > 0;
    }).sort(function (left, right) {
      return left - right;
    });
    const thresholds = [
      quantile(positiveValues, 0.25),
      quantile(positiveValues, 0.5),
      quantile(positiveValues, 0.75)
    ];

    const dataEnd = payload.period && payload.period.end
      ? new Date(`${payload.period.end}T12:00:00`)
      : new Date();
    const currentWeekStart = new Date(dataEnd);
    currentWeekStart.setDate(dataEnd.getDate() - dataEnd.getDay());
    const start = new Date(currentWeekStart.getTime() - (WEEK_COUNT - 1) * 7 * DAY_MS);
    const end = new Date(start.getTime() + WEEK_COUNT * 7 * DAY_MS);

    heatmap.innerHTML = "";
    renderMonths(start);

    for (let cursor = new Date(start); cursor < end; cursor = new Date(cursor.getTime() + DAY_MS)) {
      const key = dateKey(cursor);
      const tokens = daily.get(key) || 0;
      const cell = document.createElement("span");
      const level = activityLevel(tokens, thresholds);
      cell.className = `codex-activity-cell level-${level}`;
      if (cursor > dataEnd) {
        cell.classList.add("is-future");
      }
      const description = tokens > 0
        ? `${key}: ${compactNumber(tokens)} 토큰`
        : `${key}: 활동 없음`;
      cell.title = description;
      cell.setAttribute("aria-label", description);
      heatmap.appendChild(cell);
    }

    const summary = payload.summary || {};
    heatmap.setAttribute(
      "aria-label",
      `최근 52주 Codex 활동. 총 ${summary.active_days || 0}일, 현재 ${summary.current_streak_days || 0}일 연속 기록입니다.`
    );
  }

  function render(payload) {
    const summary = payload.summary || {};
    metricElements.forEach(function (element) {
      const key = element.dataset.codexMetric;
      element.textContent = metricValue(key, summary[key]);
    });

    if (updated) {
      const date = payload.period && payload.period.end ? payload.period.end.replaceAll("-", ".") : "기록 없음";
      updated.textContent = `${date} KST 기준`;
    }
    renderHeatmap(payload);
    panel.classList.add("is-ready");
    if (status) {
      status.textContent = "Codex 활동 집계를 불러왔습니다.";
    }
  }

  function renderError() {
    panel.classList.add("has-error");
    if (updated) {
      updated.textContent = "활동 집계 준비 중";
    }
    if (status) {
      status.textContent = "Codex 활동 집계를 불러오지 못했습니다.";
    }
  }

  fetch(`data/codex-activity.json?v=${Date.now()}`, { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(render)
    .catch(renderError);
})();
