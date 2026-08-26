(function () {
  "use strict";

  const demo = document.querySelector("[data-intelligence-demo]");
  if (!demo) {
    return;
  }

  const products = [
    {
      id: "tumbler",
      name: "스테디 텀블러 600ml",
      sku: "DEMO-TB600",
      category: "생활용품",
      baseSales: 19,
      trend: 0.18,
      stockStart: 900,
      restocks: { 18: 260 },
      leadDays: 10,
      moq: 120,
      options: [
        { id: "ivory", label: "오프화이트", share: 0.56 },
        { id: "charcoal", label: "차콜", share: 0.44 }
      ],
      channels: { coupang: 0.57, naver: 0.27, own: 0.16 }
    },
    {
      id: "folding-cart",
      name: "컴팩트 폴딩 카트",
      sku: "DEMO-FC01",
      category: "리빙",
      baseSales: 12,
      trend: 0.07,
      stockStart: 950,
      restocks: {},
      leadDays: 14,
      moq: 80,
      options: [
        { id: "black", label: "블랙", share: 0.62 },
        { id: "sand", label: "라이트그레이", share: 0.38 }
      ],
      channels: { coupang: 0.46, naver: 0.35, own: 0.19 }
    },
    {
      id: "neck-band",
      name: "에어핏 쿨링 넥밴드",
      sku: "DEMO-NB24",
      category: "시즌상품",
      baseSales: 9,
      trend: 0.35,
      stockStart: 700,
      restocks: { 15: 120 },
      leadDays: 7,
      moq: 100,
      options: [
        { id: "white", label: "화이트", share: 0.48 },
        { id: "navy", label: "네이비", share: 0.34 },
        { id: "mint", label: "민트", share: 0.18 }
      ],
      channels: { coupang: 0.64, naver: 0.23, own: 0.13 }
    }
  ];

  const channelLabels = {
    coupang: "쿠팡",
    naver: "네이버",
    own: "자사몰"
  };

  const salesPattern = [-3, 1, 0, 3, 7, 5, -2];
  const searchInput = demo.querySelector("[data-product-search]");
  const productResults = demo.querySelector("[data-product-results]");
  const productMeta = demo.querySelector("[data-product-meta]");
  const productSwitches = Array.from(demo.querySelectorAll("[data-product-switch]"));
  const optionList = demo.querySelector("[data-option-list]");
  const startDateInput = demo.querySelector("[data-start-date]");
  const endDateInput = demo.querySelector("[data-end-date]");
  const groupSelect = demo.querySelector("[data-group-select]");
  const channelInputs = Array.from(demo.querySelectorAll("[data-channel]"));
  const queryForm = demo.querySelector("[data-demo-form]");
  const queryStatus = demo.querySelector("[data-query-status]");
  const queryScope = demo.querySelector("[data-query-scope]");
  const updatedAt = demo.querySelector("[data-demo-updated]");
  const chartTitle = demo.querySelector("[data-chart-title]");
  const chartCaption = demo.querySelector("[data-chart-caption]");
  const chartCanvas = demo.querySelector("[data-product-chart]");
  const chartFallback = demo.querySelector("[data-chart-fallback]");
  const tableBody = demo.querySelector("[data-demo-table-body]");
  const aiOverview = demo.querySelector("[data-ai-overview]");
  const aiHeadline = demo.querySelector("[data-ai-headline]");
  const aiPoints = demo.querySelector("[data-ai-points]");
  const aiProduct = demo.querySelector("[data-ai-product]");
  const aiChat = demo.querySelector("[data-ai-chat]");
  const aiForm = demo.querySelector("[data-ai-form]");
  const aiInput = demo.querySelector("[data-ai-input]");

  const state = {
    productId: products[0].id,
    chart: null,
    output: null
  };

  function formatInteger(value) {
    return Math.round(value).toLocaleString("ko-KR");
  }

  function formatDateInput(date) {
    const local = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return local.toISOString().slice(0, 10);
  }

  function formatShortDate(dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);
    return `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  }

  function buildProductRecords(product) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstDate = new Date(today);
    firstDate.setDate(firstDate.getDate() - 41);
    let stock = product.stockStart;
    const records = [];

    for (let index = 0; index < 42; index += 1) {
      const date = new Date(firstDate);
      date.setDate(firstDate.getDate() + index);
      const campaignLift = index % 13 === 9 ? 7 : 0;
      const sales = Math.max(1, Math.round(product.baseSales + (product.trend * index) + salesPattern[index % salesPattern.length] + campaignLift));
      if (product.restocks[index]) {
        stock += product.restocks[index];
      }
      stock = Math.max(0, stock - sales);

      const coupang = Math.round(sales * product.channels.coupang);
      const naver = Math.round(sales * product.channels.naver);
      const own = Math.max(0, sales - coupang - naver);
      records.push({
        date: formatDateInput(date),
        sales,
        stock,
        coupang,
        naver,
        own
      });
    }

    return records;
  }

  products.forEach(function (product) {
    product.records = buildProductRecords(product);
  });

  function currentProduct() {
    return products.find(function (product) { return product.id === state.productId; }) || products[0];
  }

  function renderProductResults(query) {
    const normalized = query.trim().toLocaleLowerCase("ko-KR");
    const matches = products.filter(function (product) {
      return !normalized || product.name.toLocaleLowerCase("ko-KR").includes(normalized) || product.sku.toLocaleLowerCase("ko-KR").includes(normalized);
    });
    productResults.replaceChildren();

    matches.forEach(function (product) {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("role", "option");
      button.dataset.productId = product.id;
      const name = document.createElement("strong");
      name.textContent = product.name;
      const meta = document.createElement("span");
      meta.textContent = `${product.sku} · ${product.category}`;
      button.append(name, meta);
      button.addEventListener("click", function () {
        selectProduct(product.id);
        closeProductResults();
      });
      productResults.appendChild(button);
    });

    if (matches.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "일치하는 합성 상품이 없습니다.";
      productResults.appendChild(empty);
    }

    productResults.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
  }

  function closeProductResults() {
    productResults.hidden = true;
    searchInput.setAttribute("aria-expanded", "false");
  }

  function renderOptions(product) {
    optionList.replaceChildren();
    product.options.forEach(function (option) {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = option.id;
      input.checked = true;
      input.dataset.option = "";
      const text = document.createElement("span");
      text.textContent = option.label;
      label.append(input, text);
      optionList.appendChild(label);
    });
  }

  function selectProduct(productId) {
    const product = products.find(function (candidate) { return candidate.id === productId; });
    if (!product) {
      return;
    }
    state.productId = product.id;
    searchInput.value = product.name;
    productMeta.textContent = `SKU ${product.sku} · ${product.category}`;
    productSwitches.forEach(function (button) {
      const isSelected = button.dataset.productSwitch === product.id;
      button.classList.toggle("is-active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
    renderOptions(product);
  }

  function initializeDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(start.getDate() - 13);
    const min = new Date(today);
    min.setDate(min.getDate() - 41);

    startDateInput.value = formatDateInput(start);
    endDateInput.value = formatDateInput(today);
    startDateInput.min = formatDateInput(min);
    startDateInput.max = formatDateInput(today);
    endDateInput.min = formatDateInput(min);
    endDateInput.max = formatDateInput(today);
  }

  function selectedOptions(product) {
    const selectedIds = Array.from(optionList.querySelectorAll("[data-option]:checked")).map(function (input) { return input.value; });
    return product.options.filter(function (option) { return selectedIds.includes(option.id); });
  }

  function selectedChannels() {
    return channelInputs.filter(function (input) { return input.checked; }).map(function (input) { return input.value; });
  }

  function aggregateWeekly(records) {
    const groups = [];
    for (let index = 0; index < records.length; index += 7) {
      const chunk = records.slice(index, index + 7);
      const first = chunk[0];
      const last = chunk[chunk.length - 1];
      groups.push({
        date: last.date,
        period: `${formatShortDate(first.date)}–${formatShortDate(last.date)}`,
        sales: chunk.reduce(function (sum, record) { return sum + record.sales; }, 0),
        coupang: chunk.reduce(function (sum, record) { return sum + record.coupang; }, 0),
        naver: chunk.reduce(function (sum, record) { return sum + record.naver; }, 0),
        own: chunk.reduce(function (sum, record) { return sum + record.own; }, 0),
        stock: last.stock
      });
    }
    return groups;
  }

  function calculateOutput() {
    const product = currentProduct();
    const options = selectedOptions(product);
    const channels = selectedChannels();
    if (options.length === 0 || channels.length === 0) {
      return { error: options.length === 0 ? "옵션을 하나 이상 선택해주세요." : "판매처를 하나 이상 선택해주세요." };
    }
    if (!startDateInput.value || !endDateInput.value || startDateInput.value > endDateInput.value) {
      return { error: "조회 기간을 확인해주세요." };
    }

    const optionFactor = options.reduce(function (sum, option) { return sum + option.share; }, 0);
    const dailyRecords = product.records.filter(function (record) {
      return record.date >= startDateInput.value && record.date <= endDateInput.value;
    }).map(function (record) {
      const channelValues = {
        coupang: channels.includes("coupang") ? Math.round(record.coupang * optionFactor) : 0,
        naver: channels.includes("naver") ? Math.round(record.naver * optionFactor) : 0,
        own: channels.includes("own") ? Math.round(record.own * optionFactor) : 0
      };
      return {
        date: record.date,
        period: formatShortDate(record.date),
        sales: channelValues.coupang + channelValues.naver + channelValues.own,
        stock: Math.round(record.stock * optionFactor),
        coupang: channelValues.coupang,
        naver: channelValues.naver,
        own: channelValues.own
      };
    });

    if (dailyRecords.length === 0) {
      return { error: "선택한 기간에 표시할 합성 데이터가 없습니다." };
    }

    const totalSales = dailyRecords.reduce(function (sum, record) { return sum + record.sales; }, 0);
    const average = totalSales / dailyRecords.length;
    const latestStock = dailyRecords[dailyRecords.length - 1].stock;
    const recent = dailyRecords.slice(-7);
    const previous = dailyRecords.slice(-14, -7);
    const recentAverage = recent.reduce(function (sum, record) { return sum + record.sales; }, 0) / Math.max(recent.length, 1);
    const previousAverage = previous.reduce(function (sum, record) { return sum + record.sales; }, 0) / Math.max(previous.length, 1);
    const trendPct = previous.length > 0 && previousAverage > 0 ? ((recentAverage - previousAverage) / previousAverage) * 100 : 0;
    const runoutDays = recentAverage > 0 ? latestStock / recentAverage : Infinity;
    const targetStock = recentAverage * (product.leadDays + 14);
    const shortage = Math.max(0, targetStock - latestStock);
    const recommendedQty = shortage > 0 ? Math.ceil(shortage / product.moq) * product.moq : 0;
    const reorderInDays = Math.max(0, Math.floor(runoutDays - product.leadDays));
    const channelTotals = channels.map(function (channel) {
      return {
        id: channel,
        label: channelLabels[channel],
        value: dailyRecords.reduce(function (sum, record) { return sum + record[channel]; }, 0)
      };
    }).sort(function (a, b) { return b.value - a.value; });
    const topChannel = channelTotals[0];
    const topChannelShare = totalSales > 0 ? (topChannel.value / totalSales) * 100 : 0;
    const groupedRecords = groupSelect.value === "week" ? aggregateWeekly(dailyRecords) : dailyRecords;

    return {
      product,
      options,
      channels,
      dailyRecords,
      groupedRecords,
      totalSales,
      average,
      recentAverage,
      latestStock,
      trendPct,
      runoutDays,
      recommendedQty,
      reorderInDays,
      topChannel,
      topChannelShare
    };
  }

  function setKpi(key, value, note) {
    const valueNode = demo.querySelector(`[data-kpi-value="${key}"]`);
    const noteNode = demo.querySelector(`[data-kpi-note="${key}"]`);
    valueNode.textContent = value;
    noteNode.textContent = note;
  }

  function chartColors() {
    const styles = getComputedStyle(document.documentElement);
    return {
      blue: styles.getPropertyValue("--blue").trim() || "#2d67d1",
      accent: styles.getPropertyValue("--accent-strong").trim() || "#16785f",
      text: styles.getPropertyValue("--text").trim() || "#17201b",
      muted: styles.getPropertyValue("--muted").trim() || "#69736d",
      line: styles.getPropertyValue("--line").trim() || "#dce2de",
      surface: styles.getPropertyValue("--surface").trim() || "#ffffff"
    };
  }

  function renderChart(output) {
    if (!window.Chart) {
      chartCanvas.hidden = true;
      chartFallback.hidden = false;
      return;
    }

    chartCanvas.hidden = false;
    chartFallback.hidden = true;
    if (state.chart) {
      state.chart.destroy();
    }
    const colors = chartColors();
    state.chart = new window.Chart(chartCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: output.groupedRecords.map(function (record) { return record.period; }),
        datasets: [
          {
            type: "bar",
            label: "판매량",
            data: output.groupedRecords.map(function (record) { return record.sales; }),
            backgroundColor: colors.blue,
            borderColor: colors.blue,
            borderWidth: 0,
            borderRadius: 2,
            maxBarThickness: 30,
            yAxisID: "sales"
          },
          {
            type: "line",
            label: "재고",
            data: output.groupedRecords.map(function (record) { return record.stock; }),
            borderColor: colors.accent,
            backgroundColor: colors.accent,
            pointBackgroundColor: colors.surface,
            pointBorderColor: colors.accent,
            pointRadius: 2,
            pointHoverRadius: 4,
            borderWidth: 2,
            tension: 0.24,
            yAxisID: "stock"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: colors.text,
            titleColor: colors.surface,
            bodyColor: colors.surface,
            padding: 10,
            cornerRadius: 4
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.muted, maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 10 } },
            border: { color: colors.line }
          },
          sales: {
            beginAtZero: true,
            position: "left",
            grid: { color: colors.line },
            ticks: { color: colors.muted, precision: 0, font: { size: 10 } },
            border: { display: false }
          },
          stock: {
            beginAtZero: true,
            position: "right",
            grid: { drawOnChartArea: false },
            ticks: { color: colors.accent, precision: 0, font: { size: 10 } },
            border: { display: false }
          }
        }
      }
    });
  }

  function riskLabel(record, output) {
    if (record.stock <= output.recentAverage * output.product.leadDays) {
      return { text: "발주 검토", className: "status-danger" };
    }
    if (output.trendPct >= 15) {
      return { text: "수요 증가", className: "status-watch" };
    }
    return { text: "정상", className: "status-normal" };
  }

  function renderTable(output) {
    tableBody.replaceChildren();
    output.groupedRecords.slice().reverse().slice(0, 12).forEach(function (record) {
      const row = document.createElement("tr");
      const risk = riskLabel(record, output);
      const values = [record.period, `${formatInteger(record.sales)}개`, `${formatInteger(record.coupang)}개`, `${formatInteger(record.naver)}개`, `${formatInteger(record.own)}개`, `${formatInteger(record.stock)}개`];
      values.forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      const statusCell = document.createElement("td");
      const status = document.createElement("span");
      status.className = `demo-row-status ${risk.className}`;
      status.textContent = risk.text;
      statusCell.appendChild(status);
      row.appendChild(statusCell);
      tableBody.appendChild(row);
    });
  }

  function insightPoints(output) {
    const trendText = Math.abs(output.trendPct) < 1
      ? "최근 판매 속도는 이전 기간과 비슷합니다."
      : `최근 7일 판매가 이전 7일보다 ${Math.abs(output.trendPct).toFixed(0)}% ${output.trendPct > 0 ? "증가" : "감소"}했습니다.`;
    const channelText = `${output.topChannel.label} 판매 비중이 ${output.topChannelShare.toFixed(0)}%로 가장 높습니다.`;
    const actionText = output.recommendedQty > 0
      ? `리드타임과 안전재고를 반영해 ${formatInteger(output.recommendedQty)}개 발주 검토를 권장합니다.`
      : "현재 재고로 목표 보유기간을 충족해 즉시 발주가 필요하지 않습니다.";
    return [trendText, channelText, actionText];
  }

  function renderAiOverview(output) {
    const isCritical = output.runoutDays <= output.product.leadDays;
    aiOverview.classList.toggle("is-critical", isCritical);
    aiHeadline.textContent = isCritical
      ? `${Math.max(1, Math.ceil(output.runoutDays))}일 내 재고 소진 가능성이 있어 발주 검토가 필요합니다.`
      : `${Math.ceil(output.runoutDays)}일분 재고를 보유해 단기 품절 위험은 낮습니다.`;
    aiPoints.replaceChildren();
    insightPoints(output).forEach(function (point) {
      const item = document.createElement("li");
      item.textContent = point;
      aiPoints.appendChild(item);
    });
  }

  function resetChat(output) {
    aiChat.replaceChildren();
    const exampleQuestion = "오늘 주의해야 할 사항이 있어?";
    appendChat("user", exampleQuestion);
    appendChat("assistant", answerQuestion(exampleQuestion, output));
  }

  function appendChat(role, message) {
    const wrapper = document.createElement("div");
    wrapper.className = `chat-message ${role}`;
    const mark = document.createElement("span");
    mark.textContent = role === "assistant" ? "J" : "ME";
    const text = document.createElement("p");
    text.textContent = message;
    wrapper.append(mark, text);
    aiChat.appendChild(wrapper);
    while (aiChat.children.length > 5) {
      aiChat.firstElementChild.remove();
    }
    aiChat.scrollTop = aiChat.scrollHeight;
  }

  function answerQuestion(question, output) {
    const normalized = question.replace(/\s/g, "");
    if (/오늘|주의|체크|점검|브리핑/.test(normalized)) {
      const trendDirection = output.trendPct >= 0 ? "증가" : "감소";
      const stockRisk = output.runoutDays <= output.product.leadDays
        ? `현재 재고 ${formatInteger(output.latestStock)}개는 약 ${output.runoutDays.toFixed(1)}일분으로, 입고 리드타임 ${output.product.leadDays}일보다 짧습니다.`
        : `현재 재고 ${formatInteger(output.latestStock)}개는 약 ${output.runoutDays.toFixed(1)}일분으로, 단기 품절 위험은 낮습니다.`;
      const priority = output.recommendedQty > 0
        ? `${formatInteger(output.recommendedQty)}개 발주 검토와 ${output.topChannel.label}의 가격·노출 변화를 먼저 확인하세요.`
        : `즉시 발주보다는 재고 추이와 ${output.topChannel.label}의 가격·노출 변화를 먼저 확인하세요.`;
      return `오늘 주의해서 볼 사항은 3가지입니다. 1) 최근 7일 판매가 이전 7일보다 ${Math.abs(output.trendPct).toFixed(0)}% ${trendDirection}했습니다. 2) ${stockRisk} 3) ${output.topChannel.label} 판매 비중이 ${output.topChannelShare.toFixed(0)}%로 가장 높습니다. 오늘 우선순위는 ${priority}`;
    }
    if (/재고|소진|품절/.test(normalized)) {
      return `현재 재고는 ${formatInteger(output.latestStock)}개이고 최근 판매속도 기준 약 ${output.runoutDays.toFixed(1)}일분입니다. ${output.runoutDays <= output.product.leadDays ? "입고 리드타임보다 짧아 오늘 발주 검토가 필요합니다." : "리드타임 안에는 소진되지 않지만 판매 증가 여부를 계속 확인하세요."}`;
    }
    if (/발주|수량|시점/.test(normalized)) {
      if (output.recommendedQty === 0) {
        return `현재는 즉시 발주보다 관찰이 우선입니다. 재고가 ${formatInteger(Math.ceil(output.recentAverage * output.product.leadDays))}개 수준에 가까워질 때 다시 계산하세요.`;
      }
      return `안전재고 14일과 리드타임 ${output.product.leadDays}일을 반영하면 ${output.reorderInDays === 0 ? "오늘" : `${output.reorderInDays}일 이내`} ${formatInteger(output.recommendedQty)}개 발주 검토가 적절합니다. 최소 주문단위 ${formatInteger(output.product.moq)}개를 반영했습니다.`;
    }
    if (/판매처|채널|이상/.test(normalized)) {
      return `${output.topChannel.label}가 기간 판매의 ${output.topChannelShare.toFixed(0)}%를 차지합니다. 한 판매처 비중이 높아 해당 채널의 노출·가격 변화가 전체 수요에 미치는 영향을 우선 확인하는 것이 좋습니다.`;
    }
    if (/판매량|증가|올랐|원인|분석/.test(normalized)) {
      const direction = output.trendPct >= 0 ? "증가" : "감소";
      return `최근 7일 일평균 판매량은 ${output.recentAverage.toFixed(1)}개로, 이전 7일보다 ${Math.abs(output.trendPct).toFixed(0)}% ${direction}했습니다. ${output.topChannel.label} 비중이 ${output.topChannelShare.toFixed(0)}%로 가장 커서 해당 판매처의 노출·가격·행사 변화를 먼저 확인하는 것이 좋습니다. 현재 재고는 ${formatInteger(output.latestStock)}개이므로 판매 증가가 이어질 경우 발주 시점도 함께 다시 계산해야 합니다.`;
    }
    return `${insightPoints(output).join(" ")} 우선순위는 재고 확인 → 발주 검토 → 주요 판매처 변동 확인 순서입니다.`;
  }

  function askJarvis(question) {
    if (!state.output || !question.trim()) {
      return;
    }
    appendChat("user", question.trim());
    appendChat("assistant", answerQuestion(question, state.output));
  }

  function renderOutput(output) {
    state.output = output;
    setKpi("sales", `${formatInteger(output.totalSales)}개`, `${output.dailyRecords.length}일 선택 조건 합계`);
    setKpi("average", `${output.average.toFixed(1)}개`, "선택 판매처 기준");
    setKpi("stock", `${formatInteger(output.latestStock)}개`, `${output.options.map(function (option) { return option.label; }).join(" · ")} 합계`);
    setKpi("runout", `${output.runoutDays.toFixed(1)}일`, `입고 리드타임 ${output.product.leadDays}일`);
    queryStatus.textContent = "조회 완료";
    queryScope.textContent = `${output.dailyRecords.length}일 · ${output.options.length}개 옵션 · ${output.channels.length}개 판매처`;
    chartTitle.textContent = `${output.product.name} 판매·재고 추이`;
    aiProduct.textContent = output.product.name;
    chartCaption.textContent = `${formatShortDate(output.dailyRecords[0].date)}부터 ${formatShortDate(output.dailyRecords[output.dailyRecords.length - 1].date)}까지 선택 판매처의 판매량과 최신 재고를 비교합니다.`;
    updatedAt.textContent = new Intl.DateTimeFormat("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date());
    renderChart(output);
    renderTable(output);
    renderAiOverview(output);
    resetChat(output);
  }

  function runQuery() {
    const typed = searchInput.value.trim().toLocaleLowerCase("ko-KR");
    const matchingProduct = products.find(function (product) {
      return product.name.toLocaleLowerCase("ko-KR") === typed || product.sku.toLocaleLowerCase("ko-KR") === typed;
    }) || products.find(function (product) {
      return product.name.toLocaleLowerCase("ko-KR").includes(typed) || product.sku.toLocaleLowerCase("ko-KR").includes(typed);
    });

    if (matchingProduct && matchingProduct.id !== state.productId) {
      selectProduct(matchingProduct.id);
    } else if (!matchingProduct) {
      queryStatus.textContent = "상품 검색 필요";
      queryScope.textContent = "목록에서 합성 상품을 선택해주세요.";
      renderProductResults(searchInput.value);
      return;
    }

    const output = calculateOutput();
    if (output.error) {
      queryStatus.textContent = "조건 확인 필요";
      queryScope.textContent = output.error;
      return;
    }
    closeProductResults();
    renderOutput(output);
  }

  searchInput.addEventListener("focus", function () {
    renderProductResults(searchInput.value);
  });
  searchInput.addEventListener("input", function () {
    renderProductResults(searchInput.value);
  });
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeProductResults();
    }
  });
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".demo-product-field")) {
      closeProductResults();
    }
  });

  queryForm.addEventListener("submit", function (event) {
    event.preventDefault();
    runQuery();
  });

  productSwitches.forEach(function (button) {
    button.addEventListener("click", function () {
      selectProduct(button.dataset.productSwitch || "");
      runQuery();
    });
  });

  demo.querySelectorAll("[data-ai-prompt]").forEach(function (button) {
    button.addEventListener("click", function () {
      askJarvis(button.dataset.aiPrompt || "");
    });
  });

  aiForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const question = aiInput.value;
    aiInput.value = "";
    askJarvis(question);
  });

  window.addEventListener("portfolio-theme-change", function () {
    if (state.output) {
      renderChart(state.output);
    }
  });

  initializeDates();
  selectProduct(products[0].id);
  runQuery();
})();
