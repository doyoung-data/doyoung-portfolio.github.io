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
      unitPrice: 24900,
      unitCost: 10400,
      baseSales: 19,
      trend: 0.18,
      stockStart: 900,
      restocks: { 18: 260, 36: 220 },
      coupangStockStart: 340,
      coupangRestocks: { 20: 180, 34: 120 },
      inboundQty: 400,
      inboundDays: 4,
      leadDays: 10,
      moq: 120,
      paidShare: { meta: 0.44, naver: 0.48, coupang: 0.56 },
      targetRoas: { meta: 290, naver: 360, coupang: 420 },
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
      unitPrice: 38900,
      unitCost: 19200,
      baseSales: 12,
      trend: 0.07,
      stockStart: 950,
      restocks: { 33: 160 },
      coupangStockStart: 290,
      coupangRestocks: { 24: 120, 35: 90 },
      inboundQty: 240,
      inboundDays: 8,
      leadDays: 14,
      moq: 80,
      paidShare: { meta: 0.38, naver: 0.42, coupang: 0.48 },
      targetRoas: { meta: 310, naver: 390, coupang: 450 },
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
      unitPrice: 32900,
      unitCost: 14200,
      baseSales: 9,
      trend: 0.35,
      stockStart: 700,
      restocks: { 15: 120, 35: 180 },
      coupangStockStart: 230,
      coupangRestocks: { 18: 100, 33: 80 },
      inboundQty: 300,
      inboundDays: 3,
      leadDays: 7,
      moq: 100,
      paidShare: { meta: 0.52, naver: 0.46, coupang: 0.61 },
      targetRoas: { meta: 270, naver: 340, coupang: 380 },
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
  const chartKicker = demo.querySelector("[data-chart-kicker]");
  const chartLegend = demo.querySelector("[data-chart-legend]");
  const chartModeButtons = Array.from(demo.querySelectorAll("[data-chart-mode]"));
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
    chartMode: "sales",
    chart: null,
    output: null
  };

  function formatInteger(value) {
    return Math.round(value).toLocaleString("ko-KR");
  }

  function formatCurrency(value) {
    return `₩${Math.round(value).toLocaleString("ko-KR")}`;
  }

  function formatCompactCurrency(value) {
    const amount = Number(value || 0);
    if (Math.abs(amount) >= 1000000) {
      return `₩${(amount / 1000000).toFixed(1)}백만`;
    }
    if (Math.abs(amount) >= 10000) {
      return `₩${Math.round(amount / 10000).toLocaleString("ko-KR")}만`;
    }
    return formatCurrency(amount);
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
    let coupangStock = product.coupangStockStart;
    const records = [];
    const adPattern = [0.9, 0.96, 1.02, 1.08, 1.16, 1.07, 0.88];

    for (let index = 0; index < 42; index += 1) {
      const date = new Date(firstDate);
      date.setDate(firstDate.getDate() + index);
      const campaignLift = index % 13 === 9 ? 7 : 0;
      const sales = Math.max(1, Math.round(product.baseSales + (product.trend * index) + salesPattern[index % salesPattern.length] + campaignLift));
      const inbound = Number(product.restocks[index] || 0);
      const coupangInbound = Number(product.coupangRestocks[index] || 0);
      stock += inbound;
      coupangStock += coupangInbound;
      stock = Math.max(0, stock - sales);

      const coupang = Math.round(sales * product.channels.coupang);
      const naver = Math.round(sales * product.channels.naver);
      const own = Math.max(0, sales - coupang - naver);
      coupangStock = Math.max(0, coupangStock - coupang);

      const priceFactor = 1 + (((index % 5) - 2) * 0.004);
      const coupangRevenue = Math.round(coupang * product.unitPrice * priceFactor);
      const naverRevenue = Math.round(naver * product.unitPrice * priceFactor);
      const ownRevenue = Math.round(own * product.unitPrice * priceFactor);
      const revenue = coupangRevenue + naverRevenue + ownRevenue;
      const metaAdRevenue = Math.round((ownRevenue + (naverRevenue * 0.12)) * product.paidShare.meta);
      const naverAdRevenue = Math.round(naverRevenue * product.paidShare.naver);
      const coupangAdRevenue = Math.round(coupangRevenue * product.paidShare.coupang);
      const adPulse = adPattern[index % adPattern.length] * (campaignLift > 0 ? 1.08 : 1);
      const metaAdCost = Math.round((metaAdRevenue / (product.targetRoas.meta / 100)) * adPulse);
      const naverAdCost = Math.round((naverAdRevenue / (product.targetRoas.naver / 100)) * adPulse);
      const naverTopCost = Math.round(naverRevenue * (index % 7 === 4 ? 0.032 : 0.019));
      const coupangAdCost = Math.round((coupangAdRevenue / (product.targetRoas.coupang / 100)) * adPulse);
      const adCost = metaAdCost + naverAdCost + naverTopCost + coupangAdCost;
      const adRevenue = metaAdRevenue + naverAdRevenue + coupangAdRevenue;
      const roas = adCost > 0 ? (adRevenue / adCost) * 100 : 0;
      const contribution = revenue - (sales * product.unitCost) - adCost;
      records.push({
        date: formatDateInput(date),
        sales,
        stock,
        coupangStock,
        inbound,
        coupangInbound,
        coupang,
        naver,
        own,
        coupangRevenue,
        naverRevenue,
        ownRevenue,
        revenue,
        metaAdCost,
        naverAdCost,
        naverTopCost,
        coupangAdCost,
        adCost,
        metaAdRevenue,
        naverAdRevenue,
        coupangAdRevenue,
        adRevenue,
        roas,
        contribution
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
      const sum = function (key) {
        return chunk.reduce(function (total, record) { return total + Number(record[key] || 0); }, 0);
      };
      const adCost = sum("adCost");
      const adRevenue = sum("adRevenue");
      groups.push({
        date: last.date,
        period: `${formatShortDate(first.date)}–${formatShortDate(last.date)}`,
        sales: sum("sales"),
        coupang: sum("coupang"),
        naver: sum("naver"),
        own: sum("own"),
        revenue: sum("revenue"),
        coupangRevenue: sum("coupangRevenue"),
        naverRevenue: sum("naverRevenue"),
        ownRevenue: sum("ownRevenue"),
        metaAdCost: sum("metaAdCost"),
        naverAdCost: sum("naverAdCost"),
        naverTopCost: sum("naverTopCost"),
        coupangAdCost: sum("coupangAdCost"),
        adCost,
        adRevenue,
        roas: adCost > 0 ? (adRevenue / adCost) * 100 : 0,
        contribution: sum("contribution"),
        inbound: sum("inbound"),
        coupangInbound: sum("coupangInbound"),
        stock: last.stock,
        coupangStock: last.coupangStock
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
      const coupangRevenue = channels.includes("coupang") ? Math.round(record.coupangRevenue * optionFactor) : 0;
      const naverRevenue = channels.includes("naver") ? Math.round(record.naverRevenue * optionFactor) : 0;
      const ownRevenue = channels.includes("own") ? Math.round(record.ownRevenue * optionFactor) : 0;
      const metaFactor = channels.includes("own") && channels.includes("naver") ? 1 : (channels.includes("own") ? 0.78 : (channels.includes("naver") ? 0.22 : 0));
      const metaAdCost = Math.round(record.metaAdCost * optionFactor * metaFactor);
      const naverAdCost = channels.includes("naver") ? Math.round(record.naverAdCost * optionFactor) : 0;
      const naverTopCost = channels.includes("naver") ? Math.round(record.naverTopCost * optionFactor) : 0;
      const coupangAdCost = channels.includes("coupang") ? Math.round(record.coupangAdCost * optionFactor) : 0;
      const metaAdRevenue = Math.round(record.metaAdRevenue * optionFactor * metaFactor);
      const naverAdRevenue = channels.includes("naver") ? Math.round(record.naverAdRevenue * optionFactor) : 0;
      const coupangAdRevenue = channels.includes("coupang") ? Math.round(record.coupangAdRevenue * optionFactor) : 0;
      const sales = channelValues.coupang + channelValues.naver + channelValues.own;
      const revenue = coupangRevenue + naverRevenue + ownRevenue;
      const adCost = metaAdCost + naverAdCost + naverTopCost + coupangAdCost;
      const adRevenue = metaAdRevenue + naverAdRevenue + coupangAdRevenue;
      return {
        date: record.date,
        period: formatShortDate(record.date),
        sales,
        stock: Math.round(record.stock * optionFactor),
        coupangStock: Math.round(record.coupangStock * optionFactor),
        inbound: Math.round(record.inbound * optionFactor),
        coupangInbound: Math.round(record.coupangInbound * optionFactor),
        coupang: channelValues.coupang,
        naver: channelValues.naver,
        own: channelValues.own,
        coupangRevenue,
        naverRevenue,
        ownRevenue,
        revenue,
        metaAdCost,
        naverAdCost,
        naverTopCost,
        coupangAdCost,
        adCost,
        metaAdRevenue,
        naverAdRevenue,
        coupangAdRevenue,
        adRevenue,
        roas: adCost > 0 ? (adRevenue / adCost) * 100 : 0,
        contribution: revenue - (sales * product.unitCost) - adCost
      };
    });

    if (dailyRecords.length === 0) {
      return { error: "선택한 기간에 표시할 합성 데이터가 없습니다." };
    }

    const totalSales = dailyRecords.reduce(function (sum, record) { return sum + record.sales; }, 0);
    const totalRevenue = dailyRecords.reduce(function (sum, record) { return sum + record.revenue; }, 0);
    const totalAdCost = dailyRecords.reduce(function (sum, record) { return sum + record.adCost; }, 0);
    const totalAdRevenue = dailyRecords.reduce(function (sum, record) { return sum + record.adRevenue; }, 0);
    const totalContribution = dailyRecords.reduce(function (sum, record) { return sum + record.contribution; }, 0);
    const average = totalSales / dailyRecords.length;
    const latestStock = dailyRecords[dailyRecords.length - 1].stock;
    const latestCoupangStock = dailyRecords[dailyRecords.length - 1].coupangStock;
    const recent = dailyRecords.slice(-7);
    const previous = dailyRecords.slice(-14, -7);
    const recentAverage = recent.reduce(function (sum, record) { return sum + record.sales; }, 0) / Math.max(recent.length, 1);
    const previousAverage = previous.reduce(function (sum, record) { return sum + record.sales; }, 0) / Math.max(previous.length, 1);
    const trendPct = previous.length > 0 && previousAverage > 0 ? ((recentAverage - previousAverage) / previousAverage) * 100 : 0;
    const recentAdCost = recent.reduce(function (sum, record) { return sum + record.adCost; }, 0);
    const previousAdCost = previous.reduce(function (sum, record) { return sum + record.adCost; }, 0);
    const adCostTrendPct = previous.length > 0 && previousAdCost > 0 ? ((recentAdCost - previousAdCost) / previousAdCost) * 100 : 0;
    const recentCoupangAverage = recent.reduce(function (sum, record) { return sum + record.coupang; }, 0) / Math.max(recent.length, 1);
    const runoutDays = recentAverage > 0 ? latestStock / recentAverage : Infinity;
    const coupangRunoutDays = recentCoupangAverage > 0 ? latestCoupangStock / recentCoupangAverage : Infinity;
    const inboundQty = Math.round(product.inboundQty * optionFactor);
    const targetStock = recentAverage * (product.leadDays + 14);
    const shortage = Math.max(0, targetStock - latestStock - inboundQty);
    const recommendedQty = shortage > 0 ? Math.ceil(shortage / product.moq) * product.moq : 0;
    const reorderInDays = Math.max(0, Math.floor(runoutDays - product.leadDays));
    const totalRoas = totalAdCost > 0 ? (totalAdRevenue / totalAdCost) * 100 : 0;
    const adCostRate = totalRevenue > 0 ? (totalAdCost / totalRevenue) * 100 : 0;
    const contributionMargin = totalRevenue > 0 ? (totalContribution / totalRevenue) * 100 : 0;
    const adChannelTotals = [
      { id: "meta", label: "Meta", value: dailyRecords.reduce(function (sum, record) { return sum + record.metaAdCost; }, 0) },
      { id: "naver", label: "네이버", value: dailyRecords.reduce(function (sum, record) { return sum + record.naverAdCost + record.naverTopCost; }, 0) },
      { id: "coupang", label: "쿠팡", value: dailyRecords.reduce(function (sum, record) { return sum + record.coupangAdCost; }, 0) }
    ].sort(function (a, b) { return b.value - a.value; });
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
      totalRevenue,
      totalAdCost,
      totalAdRevenue,
      totalContribution,
      totalRoas,
      adCostRate,
      contributionMargin,
      adCostTrendPct,
      adChannelTotals,
      average,
      recentAverage,
      recentCoupangAverage,
      latestStock,
      latestCoupangStock,
      inboundQty,
      trendPct,
      runoutDays,
      coupangRunoutDays,
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
    const isDark = document.documentElement.dataset.theme === "dark";
    return {
      blue: styles.getPropertyValue("--blue").trim() || "#2d67d1",
      accent: styles.getPropertyValue("--accent-strong").trim() || "#16785f",
      warm: styles.getPropertyValue("--warm").trim() || "#c9503f",
      purple: isDark ? "#c4b5fd" : "#7c3aed",
      meta: isDark ? "#8bacf4" : "#2563eb",
      naver: isDark ? "#72e6c8" : "#16a34a",
      naverTop: isDark ? "#f6c85f" : "#d97706",
      coupang: isDark ? "#ff9684" : "#dc2626",
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
    const records = output.groupedRecords;
    let title = `${output.product.name} 판매·재고 추이`;
    let kicker = "SALES & STOCK";
    let caption = "판매량과 사내·쿠팡 재고 흐름을 같은 기간에서 비교합니다.";
    let legendItems = [];
    let datasets = [];
    let primaryType = "number";
    let secondaryType = "number";

    if (state.chartMode === "ads") {
      title = `${output.product.name} 매체별 광고비·ROAS`;
      kicker = "AD SPEND & ROAS";
      caption = `Meta·네이버·상위노출·쿠팡 광고비를 분리하고 통합 ROAS ${output.totalRoas.toFixed(0)}%와 함께 비교합니다.`;
      primaryType = "money";
      secondaryType = "percent";
      legendItems = [
        { label: "Meta", color: colors.meta, kind: "bar" },
        { label: "네이버", color: colors.naver, kind: "bar" },
        { label: "상위노출", color: colors.naverTop, kind: "bar" },
        { label: "쿠팡", color: colors.coupang, kind: "bar" },
        { label: "ROAS", color: colors.purple, kind: "line" }
      ];
      datasets = [
        { type: "bar", label: "Meta 광고비", data: records.map(function (record) { return record.metaAdCost; }), backgroundColor: colors.meta, borderWidth: 0, borderRadius: 1, maxBarThickness: 24, stack: "ads", yAxisID: "primary", metricType: "money" },
        { type: "bar", label: "네이버 광고비", data: records.map(function (record) { return record.naverAdCost; }), backgroundColor: colors.naver, borderWidth: 0, borderRadius: 1, maxBarThickness: 24, stack: "ads", yAxisID: "primary", metricType: "money" },
        { type: "bar", label: "상위노출비", data: records.map(function (record) { return record.naverTopCost; }), backgroundColor: colors.naverTop, borderWidth: 0, borderRadius: 1, maxBarThickness: 24, stack: "ads", yAxisID: "primary", metricType: "money" },
        { type: "bar", label: "쿠팡 광고비", data: records.map(function (record) { return record.coupangAdCost; }), backgroundColor: colors.coupang, borderWidth: 0, borderRadius: 1, maxBarThickness: 24, stack: "ads", yAxisID: "primary", metricType: "money" },
        { type: "line", label: "통합 ROAS", data: records.map(function (record) { return record.roas; }), borderColor: colors.purple, backgroundColor: colors.purple, pointBackgroundColor: colors.surface, pointBorderColor: colors.purple, pointRadius: 2, pointHoverRadius: 4, borderWidth: 2, tension: 0.24, yAxisID: "secondary", metricType: "percent" }
      ];
    } else if (state.chartMode === "inventory") {
      title = `${output.product.name} 재고·입고 흐름`;
      kicker = "INVENTORY & INBOUND";
      caption = `사내 재고와 쿠팡 재고, 기간 내 입고 이력을 비교합니다. 추가 입고 ${formatInteger(output.inboundQty)}개는 ${output.product.inboundDays}일 뒤 도착 예정입니다.`;
      legendItems = [
        { label: "사내 입고", color: colors.blue, kind: "bar" },
        { label: "쿠팡 입고", color: colors.warm, kind: "bar" },
        { label: "사내 재고", color: colors.accent, kind: "line" },
        { label: "쿠팡 재고", color: colors.purple, kind: "line" }
      ];
      datasets = [
        { type: "bar", label: "사내 입고", data: records.map(function (record) { return record.inbound; }), backgroundColor: colors.blue, borderWidth: 0, borderRadius: 2, maxBarThickness: 26, yAxisID: "primary", metricType: "number" },
        { type: "bar", label: "쿠팡 입고", data: records.map(function (record) { return record.coupangInbound; }), backgroundColor: colors.warm, borderWidth: 0, borderRadius: 2, maxBarThickness: 26, yAxisID: "primary", metricType: "number" },
        { type: "line", label: "사내 재고", data: records.map(function (record) { return record.stock; }), borderColor: colors.accent, backgroundColor: colors.accent, pointBackgroundColor: colors.surface, pointBorderColor: colors.accent, pointRadius: 2, pointHoverRadius: 4, borderWidth: 2, tension: 0.24, yAxisID: "secondary", metricType: "number" },
        { type: "line", label: "쿠팡 재고", data: records.map(function (record) { return record.coupangStock; }), borderColor: colors.purple, backgroundColor: colors.purple, borderDash: [5, 4], pointBackgroundColor: colors.surface, pointBorderColor: colors.purple, pointRadius: 2, pointHoverRadius: 4, borderWidth: 2, tension: 0.24, yAxisID: "secondary", metricType: "number" }
      ];
    } else {
      legendItems = [
        { label: "판매량", color: colors.blue, kind: "bar" },
        { label: "사내 재고", color: colors.accent, kind: "line" },
        { label: "쿠팡 재고", color: colors.purple, kind: "line" }
      ];
      datasets = [
        { type: "bar", label: "판매량", data: records.map(function (record) { return record.sales; }), backgroundColor: colors.blue, borderColor: colors.blue, borderWidth: 0, borderRadius: 2, maxBarThickness: 30, yAxisID: "primary", metricType: "number" },
        { type: "line", label: "사내 재고", data: records.map(function (record) { return record.stock; }), borderColor: colors.accent, backgroundColor: colors.accent, pointBackgroundColor: colors.surface, pointBorderColor: colors.accent, pointRadius: 2, pointHoverRadius: 4, borderWidth: 2, tension: 0.24, yAxisID: "secondary", metricType: "number" },
        { type: "line", label: "쿠팡 재고", data: records.map(function (record) { return record.coupangStock; }), borderColor: colors.purple, backgroundColor: colors.purple, borderDash: [5, 4], pointBackgroundColor: colors.surface, pointBorderColor: colors.purple, pointRadius: 2, pointHoverRadius: 4, borderWidth: 2, tension: 0.24, yAxisID: "secondary", metricType: "number" }
      ];
    }

    chartKicker.textContent = kicker;
    chartTitle.textContent = title;
    chartCaption.textContent = caption;
    chartCanvas.setAttribute("aria-label", `${title} 그래프`);
    chartLegend.replaceChildren();
    legendItems.forEach(function (item) {
      const wrapper = document.createElement("span");
      const swatch = document.createElement("i");
      swatch.className = item.kind === "line" ? "legend-line" : "legend-bar";
      swatch.style.backgroundColor = item.color;
      wrapper.append(swatch, document.createTextNode(item.label));
      chartLegend.appendChild(wrapper);
    });

    state.chart = new window.Chart(chartCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: records.map(function (record) { return record.period; }),
        datasets
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
            cornerRadius: 4,
            callbacks: {
              label: function (context) {
                const value = Number(context.raw || 0);
                const type = context.dataset.metricType;
                const formatted = type === "money" ? formatCurrency(value) : (type === "percent" ? `${value.toFixed(0)}%` : `${formatInteger(value)}개`);
                return `${context.dataset.label}: ${formatted}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.muted, maxRotation: 0, autoSkip: true, maxTicksLimit: 8, font: { size: 10 } },
            border: { color: colors.line }
          },
          primary: {
            beginAtZero: true,
            position: "left",
            grid: { color: colors.line },
            stacked: state.chartMode === "ads",
            ticks: {
              color: colors.muted,
              precision: 0,
              font: { size: 10 },
              callback: function (value) { return primaryType === "money" ? formatCompactCurrency(value) : formatInteger(value); }
            },
            border: { display: false }
          },
          secondary: {
            beginAtZero: true,
            position: "right",
            grid: { drawOnChartArea: false },
            ticks: {
              color: state.chartMode === "ads" ? colors.purple : colors.accent,
              precision: 0,
              font: { size: 10 },
              callback: function (value) { return secondaryType === "percent" ? `${value}%` : formatInteger(value); }
            },
            border: { display: false }
          }
        }
      }
    });
  }

  function riskLabel(record, output) {
    if (record.coupangStock <= output.recentCoupangAverage * 4) {
      return { text: "쿠팡 재고주의", className: "status-danger" };
    }
    if (record.stock <= output.recentAverage * output.product.leadDays) {
      return { text: "발주 검토", className: "status-danger" };
    }
    if (record.adCost > 0 && record.roas < 260) {
      return { text: "광고 점검", className: "status-watch" };
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
      const values = [
        record.period,
        `${formatInteger(record.sales)}개`,
        formatCurrency(record.revenue),
        `${formatInteger(record.stock)}개`,
        `${formatInteger(record.coupangStock)}개`,
        formatCurrency(record.adCost),
        formatCurrency(record.metaAdCost),
        formatCurrency(record.naverAdCost),
        formatCurrency(record.naverTopCost),
        formatCurrency(record.coupangAdCost),
        `${record.roas.toFixed(0)}%`,
        formatCurrency(record.contribution)
      ];
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
    const adText = `광고비 ${formatCurrency(output.totalAdCost)}, 통합 ROAS ${output.totalRoas.toFixed(0)}%이며 ${output.adChannelTotals[0].label} 비중이 가장 높습니다.`;
    const stockText = `사내 재고는 약 ${output.runoutDays.toFixed(1)}일분, 쿠팡 재고는 약 ${output.coupangRunoutDays.toFixed(1)}일분이며 ${output.inboundQty}개가 ${output.product.inboundDays}일 뒤 입고 예정입니다.`;
    const actionText = output.recommendedQty > 0
      ? `현재 재고와 입고 예정을 함께 반영해 ${formatInteger(output.recommendedQty)}개 추가 발주 검토를 권장합니다.`
      : "현재 재고와 입고 예정 물량으로 목표 보유기간을 충족합니다.";
    return [trendText, adText, stockText, actionText];
  }

  function renderAiOverview(output) {
    const isCoupangCritical = output.coupangRunoutDays <= 5;
    const isCritical = output.runoutDays <= output.product.leadDays || isCoupangCritical;
    aiOverview.classList.toggle("is-critical", isCritical);
    if (isCoupangCritical) {
      aiHeadline.textContent = output.latestCoupangStock <= 0
        ? "쿠팡 재고가 소진되어 채널 재고 이동을 먼저 확인해야 합니다."
        : `쿠팡 재고가 약 ${Math.ceil(output.coupangRunoutDays)}일분으로 채널 재고 이동을 먼저 확인해야 합니다.`;
    } else if (output.runoutDays <= output.product.leadDays) {
      aiHeadline.textContent = `${Math.max(1, Math.ceil(output.runoutDays))}일 내 사내 재고 소진 가능성이 있어 입고·발주 검토가 필요합니다.`;
    } else {
      aiHeadline.textContent = `판매·광고·재고·입고 데이터를 함께 확인한 결과 즉시 대응할 품절 위험은 낮습니다.`;
    }
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
      const adTrendDirection = output.adCostTrendPct >= 0 ? "증가" : "감소";
      const stockRisk = output.coupangRunoutDays <= 5
        ? `쿠팡 재고 ${formatInteger(output.latestCoupangStock)}개가 약 ${output.coupangRunoutDays.toFixed(1)}일분이라 채널 재고 보충을 먼저 확인해야 합니다.`
        : `사내 재고는 약 ${output.runoutDays.toFixed(1)}일분, 쿠팡 재고는 약 ${output.coupangRunoutDays.toFixed(1)}일분입니다.`;
      const priority = output.recommendedQty > 0
        ? `${output.product.inboundDays}일 뒤 입고 예정 ${formatInteger(output.inboundQty)}개를 반영해도 ${formatInteger(output.recommendedQty)}개가 부족하므로 추가 발주를 검토하세요.`
        : `${output.product.inboundDays}일 뒤 입고 예정 ${formatInteger(output.inboundQty)}개가 있어 추가 발주보다 판매·재고 추이 확인이 우선입니다.`;
      return `오늘 주의해서 볼 사항은 4가지입니다. 1) 최근 7일 판매가 이전 7일보다 ${Math.abs(output.trendPct).toFixed(0)}% ${trendDirection}했습니다. 2) 광고비는 ${Math.abs(output.adCostTrendPct).toFixed(0)}% ${adTrendDirection}했고 통합 ROAS는 ${output.totalRoas.toFixed(0)}%입니다. 3) ${stockRisk} 4) ${priority}`;
    }
    if (/광고|ROAS|효율|예산/.test(normalized)) {
      const adTrendDirection = output.adCostTrendPct >= 0 ? "증가" : "감소";
      const mediaBreakdown = output.adChannelTotals.map(function (channel) {
        return `${channel.label} ${formatCurrency(channel.value)}`;
      }).join(", ");
      const action = output.totalRoas < 300
        ? "예산 증액보다 소재·키워드별 효율 점검이 우선입니다."
        : `${output.adChannelTotals[0].label}처럼 비중이 큰 매체부터 매출 증가와 함께 움직였는지 확인한 뒤 예산을 조정하세요.`;
      return `기간 총 광고비는 ${formatCurrency(output.totalAdCost)}, 통합 ROAS는 ${output.totalRoas.toFixed(0)}%, 매출 대비 광고비율은 ${output.adCostRate.toFixed(1)}%입니다. 매체별 광고비는 ${mediaBreakdown}이며, 최근 7일 광고비는 이전 7일보다 ${Math.abs(output.adCostTrendPct).toFixed(0)}% ${adTrendDirection}했습니다. ${action}`;
    }
    if (/쿠팡재고|로켓재고|쿠팡.*재고/.test(normalized)) {
      const action = output.coupangRunoutDays <= 5
        ? "사내 재고에서 쿠팡으로 보낼 수 있는 물량과 다음 입고 일정을 오늘 확인하세요."
        : "현재는 즉시 이동보다 판매속도 변화를 계속 확인하는 단계입니다.";
      return `쿠팡 재고는 ${formatInteger(output.latestCoupangStock)}개이며 최근 쿠팡 판매속도 기준 약 ${output.coupangRunoutDays.toFixed(1)}일분입니다. 사내 재고는 ${formatInteger(output.latestStock)}개, 약 ${output.runoutDays.toFixed(1)}일분입니다. ${action}`;
    }
    if (/입고|도착/.test(normalized)) {
      const orderAction = output.recommendedQty > 0
        ? `이를 반영한 뒤에도 ${formatInteger(output.recommendedQty)}개 추가 발주 검토가 필요합니다.`
        : "이를 반영하면 목표 보유기간을 충족해 현재는 추가 발주보다 추이 확인이 우선입니다.";
      return `${formatInteger(output.inboundQty)}개가 ${output.product.inboundDays}일 뒤 입고 예정입니다. 현재 사내 재고 ${formatInteger(output.latestStock)}개와 입고 예정 물량을 함께 계산했습니다. ${orderAction}`;
    }
    if (/재고|소진|품절/.test(normalized)) {
      return `사내 재고는 ${formatInteger(output.latestStock)}개로 약 ${output.runoutDays.toFixed(1)}일분이고, 쿠팡 재고는 ${formatInteger(output.latestCoupangStock)}개로 약 ${output.coupangRunoutDays.toFixed(1)}일분입니다. ${formatInteger(output.inboundQty)}개가 ${output.product.inboundDays}일 뒤 입고 예정이므로 사내 재고, 채널 재고, 입고 일정을 따로 보지 않고 함께 판단해야 합니다.`;
    }
    if (/발주|수량|시점/.test(normalized)) {
      if (output.recommendedQty === 0) {
        return `현재 재고와 ${output.product.inboundDays}일 뒤 입고 예정 ${formatInteger(output.inboundQty)}개를 함께 반영하면 추가 발주는 아직 필요하지 않습니다. 재고가 ${formatInteger(Math.ceil(output.recentAverage * output.product.leadDays))}개 수준에 가까워질 때 다시 계산하세요.`;
      }
      return `안전재고 14일, 리드타임 ${output.product.leadDays}일, 입고 예정 ${formatInteger(output.inboundQty)}개를 반영하면 ${output.reorderInDays === 0 ? "오늘" : `${output.reorderInDays}일 이내`} ${formatInteger(output.recommendedQty)}개 추가 발주 검토가 적절합니다. 최소 주문단위 ${formatInteger(output.product.moq)}개도 반영했습니다.`;
    }
    if (/판매처|채널|이상/.test(normalized)) {
      return `${output.topChannel.label}가 기간 판매의 ${output.topChannelShare.toFixed(0)}%를 차지합니다. 한 판매처 비중이 높아 해당 채널의 노출·가격 변화가 전체 수요에 미치는 영향을 우선 확인하는 것이 좋습니다.`;
    }
    if (/판매량|증가|올랐|원인|분석/.test(normalized)) {
      const direction = output.trendPct >= 0 ? "증가" : "감소";
      const adDirection = output.adCostTrendPct >= 0 ? "늘어" : "줄어";
      return `최근 7일 일평균 판매량은 ${output.recentAverage.toFixed(1)}개로, 이전 7일보다 ${Math.abs(output.trendPct).toFixed(0)}% ${direction}했습니다. 같은 기간 광고비는 ${Math.abs(output.adCostTrendPct).toFixed(0)}% ${adDirection} 통합 ROAS ${output.totalRoas.toFixed(0)}%를 기록했습니다. ${output.topChannel.label} 판매 비중이 ${output.topChannelShare.toFixed(0)}%로 가장 크므로 광고비, 노출, 가격, 행사 변화를 함께 확인할 수 있지만 이 수치만으로 원인을 단정하지는 않습니다. 판매 증가가 이어지면 쿠팡 재고와 발주 시점도 다시 계산해야 합니다.`;
    }
    return `${insightPoints(output).join(" ")} 우선순위는 판매 변화 확인 → 광고 효율 점검 → 쿠팡 재고 확인 → 입고·발주 검토 순서입니다.`;
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
    setKpi("revenue", formatCompactCurrency(output.totalRevenue), `${output.channels.map(function (channel) { return channelLabels[channel]; }).join(" · ")} 매출`);
    setKpi("adCost", formatCompactCurrency(output.totalAdCost), `${output.adChannelTotals[0].label} 광고비 비중 최대`);
    setKpi("roas", `${output.totalRoas.toFixed(0)}%`, `매출 대비 광고비 ${output.adCostRate.toFixed(1)}%`);
    setKpi("stock", `${formatInteger(output.latestStock)}개`, `최근 속도 기준 ${output.runoutDays.toFixed(1)}일분`);
    setKpi("coupangStock", `${formatInteger(output.latestCoupangStock)}개`, `쿠팡 판매 기준 ${output.coupangRunoutDays.toFixed(1)}일분`);
    setKpi("inbound", `${formatInteger(output.inboundQty)}개`, `${output.product.inboundDays}일 뒤 도착 예정`);
    setKpi("reorder", output.recommendedQty > 0 ? `${formatInteger(output.recommendedQty)}개` : "관찰", `입고 예정 ${formatInteger(output.inboundQty)}개 반영`);
    queryStatus.textContent = "조회 완료";
    queryScope.textContent = `${output.dailyRecords.length}일 · ${output.options.length}개 옵션 · ${output.channels.length}개 판매처 · 광고·재고·입고 통합`;
    aiProduct.textContent = output.product.name;
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

  chartModeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      state.chartMode = button.dataset.chartMode || "sales";
      chartModeButtons.forEach(function (candidate) {
        const isSelected = candidate === button;
        candidate.classList.toggle("is-active", isSelected);
        candidate.setAttribute("aria-selected", String(isSelected));
      });
      if (state.output) {
        renderChart(state.output);
      }
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
