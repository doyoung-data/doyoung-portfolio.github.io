(function () {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-nav]");
  const header = document.querySelector("[data-header]");

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
    }
  }

  function applyTheme(theme, persist) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    root.dataset.theme = nextTheme;

    if (persist) {
      try {
        localStorage.setItem("portfolio-theme", nextTheme);
      } catch (error) {
        // The theme still works when storage is blocked.
      }
    }

    if (themeColor) {
      themeColor.setAttribute("content", nextTheme === "dark" ? "#0d1410" : "#f4f7f3");
    }

    if (themeToggle) {
      const isDark = nextTheme === "dark";
      themeToggle.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
      themeToggle.setAttribute("title", isDark ? "라이트 모드" : "다크 모드");
      themeToggle.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}" aria-hidden="true"></i>`;
    }

    refreshIcons();
    window.dispatchEvent(new CustomEvent("portfolio-theme-change"));
  }

  applyTheme(root.dataset.theme, false);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  function setMenu(open) {
    if (!menuToggle || !navigation) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    menuToggle.innerHTML = `<i data-lucide="${open ? "x" : "menu"}" aria-hidden="true"></i>`;
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    refreshIcons();
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) {
        setMenu(false);
      }
    });
  }

  function updateHeader() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  function setupJourneyTabs() {
    const journey = document.querySelector("[data-journey]");
    if (!journey) {
      return;
    }

    const tabs = Array.from(journey.querySelectorAll("[data-journey-tab]"));
    const panels = Array.from(journey.querySelectorAll("[data-journey-panel]"));

    function activate(key, focusTab) {
      tabs.forEach(function (tab) {
        const selected = tab.dataset.journeyTab === key;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected && focusTab) {
          tab.focus();
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.journeyPanel !== key;
      });

      window.requestAnimationFrame(function () {
        window.dispatchEvent(new Event("resize"));
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab.dataset.journeyTab, false);
      });

      tab.addEventListener("keydown", function (event) {
        let nextIndex = index;
        if (event.key === "ArrowRight") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        activate(tabs[nextIndex].dataset.journeyTab, true);
      });
    });

    const initial = tabs.find(function (tab) {
      return tab.getAttribute("aria-selected") === "true";
    }) || tabs[0];
    activate(initial.dataset.journeyTab, false);
  }

  setupJourneyTabs();

  const datasetDefinitions = {
    market: {
      path: "samples/market_daily_sample.csv",
      format: "CSV",
      attentionLabel: "이상 상태만"
    },
    price: {
      path: "samples/price_tracking_sample.json",
      format: "JSON",
      attentionLabel: "재처리 대상만"
    },
    order: {
      path: "samples/order_recommendations_sample.csv",
      format: "CSV",
      attentionLabel: "검토 대상만"
    },
    review: {
      path: "samples/review_analysis_sample.json",
      format: "JSON",
      attentionLabel: "낮은 평점만"
    }
  };

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];

      if (quoted) {
        if (character === '"' && text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else if (character === '"') {
          quoted = false;
        } else {
          field += character;
        }
      } else if (character === '"') {
        quoted = true;
      } else if (character === ",") {
        row.push(field);
        field = "";
      } else if (character === "\n") {
        row.push(field.replace(/\r$/, ""));
        if (row.some(function (value) { return value !== ""; })) {
          rows.push(row);
        }
        row = [];
        field = "";
      } else {
        field += character;
      }
    }

    if (field !== "" || row.length > 0) {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
    }

    if (rows.length < 2) {
      return [];
    }

    const headers = rows[0];
    return rows.slice(1).map(function (values) {
      return headers.reduce(function (record, headerName, headerIndex) {
        record[headerName] = values[headerIndex] === undefined ? "" : values[headerIndex];
        return record;
      }, {});
    });
  }

  function normalizeJson(payload) {
    if (Array.isArray(payload)) {
      return payload;
    }
    if (payload && Array.isArray(payload.records)) {
      return payload.records;
    }
    return payload && typeof payload === "object" ? [payload] : [];
  }

  function formatCell(value) {
    if (value === null || value === undefined || value === "") {
      return "—";
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return String(value);
  }

  function asNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function formatInteger(value) {
    return Math.round(value).toLocaleString("ko-KR");
  }

  function formatKrw(value) {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(value >= 1000000000 ? 0 : 1)}억원`;
    }
    if (value >= 10000) {
      return `${formatInteger(value / 10000)}만원`;
    }
    return `${formatInteger(value)}원`;
  }

  function summarizeDataset(key, records) {
    if (key === "market") {
      const sales = records.reduce(function (sum, record) { return sum + asNumber(record.net_sales_krw); }, 0);
      const units = records.reduce(function (sum, record) { return sum + asNumber(record.units); }, 0);
      const channels = new Set(records.map(function (record) { return record.channel; }).filter(Boolean));
      const completed = records.filter(function (record) { return record.data_status === "complete"; }).length;
      return [
        { label: "총 순매출", value: formatKrw(sales), note: "합성 데이터 합계" },
        { label: "판매수량", value: `${formatInteger(units)}개`, note: "표시된 기간 기준" },
        { label: "연동 채널", value: `${channels.size}개`, note: "중복 제외" },
        { label: "정상 데이터", value: `${completed}/${records.length}`, note: "상태 검증 결과" }
      ];
    }

    if (key === "price") {
      const collected = records.filter(function (record) { return record.sale_price_krw !== null && record.sale_price_krw !== ""; }).length;
      const changed = records.filter(function (record) { return asNumber(record.change_pct) !== 0; }).length;
      const recovered = records.filter(function (record) { return record.status === "recovered"; }).length;
      const attention = records.filter(function (record) { return isAttentionRecord(key, record); }).length;
      return [
        { label: "가격 수집", value: `${collected}/${records.length}`, note: "현재 실행 표본" },
        { label: "가격 변동", value: `${changed}건`, note: "이전 가격 대비" },
        { label: "재시도 복구", value: `${recovered}건`, note: "자동 복구 결과" },
        { label: "재처리 대상", value: `${attention}건`, note: "값 보존·대기" }
      ];
    }

    if (key === "order") {
      const quantity = records.reduce(function (sum, record) { return sum + asNumber(record.recommended_qty); }, 0);
      const review = records.filter(function (record) { return record.risk_flag === "review"; }).length;
      const normal = records.filter(function (record) { return record.risk_flag === "normal"; }).length;
      const hold = records.filter(function (record) { return record.risk_flag === "hold"; }).length;
      return [
        { label: "추천 발주량", value: `${formatInteger(quantity)}개`, note: "MOQ 반영 합계" },
        { label: "담당자 검토", value: `${review}건`, note: "자동 확정 제외" },
        { label: "정상 제안", value: `${normal}건`, note: "기준 충족" },
        { label: "발주 보류", value: `${hold}건`, note: "저판매·과재고" }
      ];
    }

    const totalReviews = records.reduce(function (sum, record) { return sum + asNumber(record.review_count); }, 0);
    const ratingTotal = records.reduce(function (sum, record) {
      return sum + (asNumber(record.avg_rating) * asNumber(record.review_count));
    }, 0);
    const own = records.filter(function (record) { return String(record.product_type).startsWith("자사"); }).length;
    const competitors = records.filter(function (record) { return String(record.product_type).startsWith("경쟁사"); }).length;
    const averageRating = totalReviews > 0 ? ratingTotal / totalReviews : 0;
    return [
      { label: "분석 리뷰", value: `${formatInteger(totalReviews)}건`, note: "상품별 리뷰 합계" },
      { label: "가중 평균 평점", value: averageRating.toFixed(2), note: "리뷰 수 반영" },
      { label: "비교 상품", value: `${records.length}개`, note: "동일 기준 분석" },
      { label: "자사 / 경쟁사", value: `${own} / ${competitors}`, note: "분석 대상 구성" }
    ];
  }

  function isAttentionRecord(key, record) {
    if (key === "market") {
      return record.data_status !== "complete";
    }
    if (key === "price") {
      return record.status !== "success" && record.status !== "recovered";
    }
    if (key === "order") {
      return record.risk_flag !== "normal";
    }
    return asNumber(record.avg_rating) < 4.4;
  }

  function stateClass(column, value) {
    if (value === null || value === undefined || value === "") {
      return "cell-muted";
    }

    const normalized = String(value).toLowerCase();
    const stateColumn = column === "status" || column === "data_status" || column === "risk_flag";
    if (!stateColumn) {
      return "";
    }

    if (["complete", "success", "recovered", "normal"].includes(normalized)) {
      return "cell-positive";
    }
    if (["review", "hold", "pending_retry", "previous_value_preserved", "failed", "error"].includes(normalized)) {
      return "cell-attention";
    }
    return "";
  }

  function setupDataWorkbench() {
    const workbench = document.querySelector("[data-workbench]");
    if (!workbench) {
      return;
    }

    const tabs = Array.from(workbench.querySelectorAll("[data-dataset]"));
    const fileName = workbench.querySelector("[data-file-name]");
    const fileFormat = workbench.querySelector("[data-file-format]");
    const rowCount = workbench.querySelector("[data-row-count]");
    const fileStatus = workbench.querySelector("[data-file-status]");
    const rawLink = workbench.querySelector("[data-raw-link]");
    const downloadLink = workbench.querySelector("[data-download-link]");
    const tableHead = workbench.querySelector("[data-table-head]");
    const tableBody = workbench.querySelector("[data-table-body]");
    const emptyState = workbench.querySelector("[data-table-empty]");
    const emptyMessage = workbench.querySelector("[data-empty-message]");
    const searchInput = workbench.querySelector("[data-table-search]");
    const attentionFilter = workbench.querySelector("[data-attention-filter]");
    const attentionLabel = workbench.querySelector("[data-attention-label]");
    const resultCount = workbench.querySelector("[data-result-count]");
    let requestId = 0;
    let currentKey = "market";
    let currentRecords = [];

    function renderSummary(key, records) {
      const summaries = summarizeDataset(key, records);
      summaries.forEach(function (summary, index) {
        const label = workbench.querySelector(`[data-summary-label="${index}"]`);
        const value = workbench.querySelector(`[data-summary-value="${index}"]`);
        const note = workbench.querySelector(`[data-summary-note="${index}"]`);
        if (label) {
          label.textContent = summary.label;
        }
        if (value) {
          value.textContent = summary.value;
        }
        if (note) {
          note.textContent = summary.note;
        }
      });
    }

    function renderTable(records) {
      tableHead.replaceChildren();
      tableBody.replaceChildren();
      emptyState.hidden = records.length > 0;
      resultCount.textContent = `${records.length.toLocaleString("ko-KR")} / ${currentRecords.length.toLocaleString("ko-KR")} ROWS`;

      const columnSource = currentRecords.length > 0 ? currentRecords : records;
      const columns = [];
      columnSource.forEach(function (record) {
        Object.keys(record).forEach(function (key) {
          if (!columns.includes(key)) {
            columns.push(key);
          }
        });
      });

      if (columns.length > 0) {
        const headRow = document.createElement("tr");
        columns.forEach(function (column) {
          const cell = document.createElement("th");
          cell.scope = "col";
          cell.textContent = column;
          headRow.appendChild(cell);
        });
        tableHead.appendChild(headRow);
      }

      if (records.length === 0) {
        emptyMessage.textContent = currentRecords.length > 0
          ? "검색 또는 필터 조건에 맞는 데이터가 없습니다."
          : "표시할 샘플 데이터가 없습니다.";
        return;
      }

      records.slice(0, 12).forEach(function (record) {
        const tableRow = document.createElement("tr");
        columns.forEach(function (column) {
          const cell = document.createElement("td");
          cell.textContent = formatCell(record[column]);
          const cellState = stateClass(column, record[column]);
          if (cellState) {
            cell.classList.add(cellState);
          }
          tableRow.appendChild(cell);
        });
        tableBody.appendChild(tableRow);
      });
    }

    function applyFilters() {
      const query = searchInput.value.trim().toLocaleLowerCase("ko-KR");
      const attentionOnly = attentionFilter.checked;
      const filtered = currentRecords.filter(function (record) {
        const matchesQuery = !query || Object.values(record).some(function (value) {
          return formatCell(value).toLocaleLowerCase("ko-KR").includes(query);
        });
        const matchesAttention = !attentionOnly || isAttentionRecord(currentKey, record);
        return matchesQuery && matchesAttention;
      });
      renderTable(filtered);
    }

    async function loadDataset(key) {
      const definition = datasetDefinitions[key];
      if (!definition) {
        return;
      }

      const currentRequest = requestId + 1;
      requestId = currentRequest;
      currentKey = key;
      currentRecords = [];
      const displayedName = definition.path.split("/").pop();

      tabs.forEach(function (tab) {
        const selected = tab.dataset.dataset === key;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      fileName.textContent = displayedName;
      fileFormat.textContent = definition.format;
      rowCount.textContent = "—";
      fileStatus.textContent = "LOADING";
      fileStatus.className = "status-ready";
      searchInput.value = "";
      attentionFilter.checked = false;
      attentionLabel.textContent = definition.attentionLabel;
      resultCount.textContent = "—";
      rawLink.href = definition.path;
      downloadLink.href = definition.path;
      downloadLink.setAttribute("download", displayedName);
      tableHead.replaceChildren();
      tableBody.replaceChildren();
      emptyState.hidden = true;

      try {
        const response = await fetch(definition.path, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const records = definition.format === "CSV"
          ? parseCsv(await response.text())
          : normalizeJson(await response.json());

        if (currentRequest !== requestId) {
          return;
        }

        currentRecords = records;
        renderSummary(key, records);
        applyFilters();
        rowCount.textContent = records.length.toLocaleString("ko-KR");
        fileStatus.textContent = records.length > 0 ? "READY" : "EMPTY";
        fileStatus.className = records.length > 0 ? "status-ready" : "status-error";
      } catch (error) {
        if (currentRequest !== requestId) {
          return;
        }
        rowCount.textContent = "—";
        fileStatus.textContent = "ERROR";
        fileStatus.className = "status-error";
        resultCount.textContent = "0 ROWS";
        emptyMessage.textContent = "샘플 데이터를 불러오지 못했습니다.";
        emptyState.hidden = false;
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        loadDataset(tab.dataset.dataset);
      });

      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
          return;
        }
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + direction + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        loadDataset(tabs[nextIndex].dataset.dataset);
      });
    });

    searchInput.addEventListener("input", applyFilters);
    attentionFilter.addEventListener("change", applyFilters);

    loadDataset("market");
  }

  setupDataWorkbench();

  const copyButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("[data-copy-status]");

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }

  if (copyButton && copyStatus) {
    copyButton.addEventListener("click", async function () {
      try {
        await copyText(copyButton.dataset.email);
        copyStatus.textContent = "이메일 주소를 복사했습니다.";
      } catch (error) {
        copyStatus.textContent = "복사하지 못했습니다. 이메일 주소를 직접 선택해주세요.";
      }

      window.setTimeout(function () {
        copyStatus.textContent = "";
      }, 2600);
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  function setupDataCanvas() {
    const canvas = document.querySelector("[data-network-canvas]");
    const hero = canvas ? canvas.closest(".hero") : null;
    if (!canvas || !hero) {
      return;
    }

    const context = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [
      [0.05, 0.22, 0], [0.06, 0.55, 1], [0.12, 0.78, 2],
      [0.30, 0.16, 1], [0.31, 0.42, 2], [0.28, 0.69, 0], [0.34, 0.88, 1],
      [0.52, 0.25, 2], [0.54, 0.54, 0], [0.51, 0.79, 1],
      [0.71, 0.12, 1], [0.73, 0.39, 0], [0.69, 0.65, 2], [0.75, 0.86, 1],
      [0.91, 0.25, 0], [0.94, 0.55, 2], [0.89, 0.76, 1]
    ];
    const links = [
      [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6],
      [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9],
      [7, 10], [7, 11], [8, 11], [8, 12], [9, 12], [9, 13],
      [10, 14], [11, 14], [11, 15], [12, 15], [12, 16], [13, 16]
    ];
    const pointer = { x: 0.5, y: 0.5, active: false };
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let palette = null;

    function resizeCanvas() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (reducedMotion) {
        draw(performance.now());
      } else if (!document.hidden) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    function colors() {
      const styles = getComputedStyle(root);
      return {
        grid: styles.getPropertyValue("--line").trim(),
        line: styles.getPropertyValue("--line-strong").trim(),
        accent: styles.getPropertyValue("--accent").trim(),
        blue: styles.getPropertyValue("--blue").trim(),
        warm: styles.getPropertyValue("--warm").trim(),
        surface: styles.getPropertyValue("--surface").trim()
      };
    }

    function nodePosition(node) {
      const depth = node[2] + 1;
      const offsetX = pointer.active ? (pointer.x - 0.5) * depth * 7 : 0;
      const offsetY = pointer.active ? (pointer.y - 0.5) * depth * 4 : 0;
      return [node[0] * width + offsetX, node[1] * height + offsetY];
    }

    function draw(timestamp) {
      if (!palette) {
        palette = colors();
      }
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalAlpha = root.dataset.theme === "dark" ? 0.23 : 0.32;
      context.strokeStyle = palette.grid;
      context.lineWidth = 1;

      for (let x = 0; x <= width; x += 72) {
        context.beginPath();
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
        context.stroke();
      }
      for (let y = 0; y <= height; y += 72) {
        context.beginPath();
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
        context.stroke();
      }
      context.restore();

      const positions = nodes.map(nodePosition);
      context.save();
      context.globalAlpha = root.dataset.theme === "dark" ? 0.42 : 0.36;
      context.strokeStyle = palette.line;
      context.lineWidth = 1;
      links.forEach(function (link) {
        const start = positions[link[0]];
        const end = positions[link[1]];
        context.beginPath();
        context.moveTo(start[0], start[1]);
        context.lineTo(end[0], end[1]);
        context.stroke();
      });
      context.restore();

      links.forEach(function (link, index) {
        const start = positions[link[0]];
        const end = positions[link[1]];
        const progress = reducedMotion ? (index % 5) / 5 : ((timestamp * 0.00007) + index * 0.137) % 1;
        const x = start[0] + (end[0] - start[0]) * progress;
        const y = start[1] + (end[1] - start[1]) * progress;
        context.fillStyle = index % 7 === 0 ? palette.warm : (index % 3 === 0 ? palette.blue : palette.accent);
        context.globalAlpha = root.dataset.theme === "dark" ? 0.7 : 0.58;
        context.fillRect(x - 2, y - 2, 4, 4);
      });

      positions.forEach(function (position, index) {
        context.globalAlpha = root.dataset.theme === "dark" ? 0.86 : 0.74;
        context.fillStyle = palette.surface;
        context.strokeStyle = index % 4 === 0 ? palette.blue : palette.accent;
        context.lineWidth = 1.5;
        const size = index % 3 === 0 ? 10 : 7;
        context.fillRect(position[0] - size / 2, position[1] - size / 2, size, size);
        context.strokeRect(position[0] - size / 2, position[1] - size / 2, size, size);
      });

      context.globalAlpha = 1;
      if (!reducedMotion && !document.hidden) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    hero.addEventListener("pointermove", function (event) {
      const bounds = hero.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width;
      pointer.y = (event.clientY - bounds.top) / bounds.height;
      pointer.active = true;
    });

    hero.addEventListener("pointerleave", function () {
      pointer.active = false;
    });

    window.addEventListener("portfolio-theme-change", function () {
      palette = colors();
      if (reducedMotion) {
        draw(performance.now());
      }
    });

    document.addEventListener("visibilitychange", function () {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (!document.hidden && !reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    });

    if ("ResizeObserver" in window) {
      new ResizeObserver(resizeCanvas).observe(hero);
    } else {
      window.addEventListener("resize", resizeCanvas);
    }
    palette = colors();
    resizeCanvas();
  }

  setupDataCanvas();
  refreshIcons();
})();
