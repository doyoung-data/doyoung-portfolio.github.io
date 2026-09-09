const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright');

const baseUrl = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4173/';
const screenshotDir = process.env.PORTFOLIO_SCREENSHOTS;
const profiles = {
  lgcns: { company: 'LG CNS', order: ['jarvis', 'data-platform', 'order-ai'] },
  lotte: { company: '롯데이노베이트', order: ['data-platform', 'jarvis', 'order-ai'] },
  dbinc: { company: 'DB Inc.', order: ['jarvis', 'order-ai', 'data-platform'] },
  daou: { company: '다우기술', order: ['jarvis', 'data-platform', 'order-ai'] },
  sempio: { company: '샘표', order: ['data-platform', 'order-ai', 'jarvis'] }
};

async function main() {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PORTFOLIO_BROWSER_CHANNEL ? { channel: process.env.PORTFOLIO_BROWSER_CHANNEL } : {})
  });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(baseUrl) && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  if (screenshotDir) await fs.mkdir(screenshotDir, { recursive: true });
  const summaries = new Set();
  const results = [];
  try {
    for (const [key, profile] of Object.entries(profiles)) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}?target=${key}`, { waitUntil: 'networkidle' });
      assert.equal(await page.evaluate(() => window.PORTFOLIO_TARGET.key), key);
      assert.ok((await page.title()).includes(profile.company));
      assert.ok((await page.locator('[data-profile-description]').innerText()).includes('1인 개발자'));
      assert.equal(await page.locator('[data-profile-direction-source]').isVisible(), true);
      assert.match(await page.locator('[data-profile-direction-source]').getAttribute('href'), /^https:\/\//);
      const supportingSource = page.locator('[data-profile-supporting-source]');
      assert.equal(await supportingSource.isVisible(), ['daou', 'sempio'].includes(key));
      if (key === 'daou') {
        assert.ok((await page.title()).includes('AI 개발 신입'));
        assert.equal(await page.locator('[data-profile-direction-source]').getAttribute('href'), 'https://blog.naver.com/daoustory/224389961466');
        assert.equal(await supportingSource.getAttribute('href'), 'https://blog.naver.com/daoustory/224388659565');
        assert.match(await page.locator('[data-profile-fit-body="2"]').innerText(), /952시간·349시간/);
        assert.match(await page.locator('[data-profile-experience-title]').innerText(), /교육에서 쌓은 기본기/);
        assert.match(await page.locator('[data-profile-foundation-title]').innerText(), /모델 학습/);
        assert.match(await page.locator('[data-project-key="jarvis"] .case-summary').innerText(), /복잡한 질문의 완결성/);
      } else if (key === 'sempio') {
        assert.ok((await page.title()).includes('플랫폼 개발자'));
        assert.match(await page.locator('[data-profile-experience-title]').innerText(), /설계를 바꾼 경험/);
        assert.match(await page.locator('[data-profile-foundation-title]').innerText(), /웹 서비스와 데이터 처리/);
        assert.match(await page.locator('.hero-metrics').innerText(), /Web · API/);
        assert.ok(!(await page.locator('.hero-metrics').innerText()).includes('92'));
        assert.equal(await supportingSource.getAttribute('href'), 'https://sempio.recruiter.co.kr/career/jobs/127143');
        assert.equal(await page.locator('.operating-lane:nth-child(2) header strong').innerText(), '데이터·웹 시스템 개발');
        assert.equal(await page.locator('[data-profile-current-role]').innerText(), '이커머스 기업 · AI팀 매니저');
        assert.match(await page.locator('[data-profile-scope-summary]').innerText(), /Codex.*결과 검증/);
      } else {
        assert.match(await page.locator('[data-profile-experience-title]').innerText(), /현업과 함께 정의하고/);
        assert.equal(await page.locator('[data-profile-foundation-title]').innerText(), 'AI 서비스의 기반이 된 프로젝트');
      }
      assert.ok(await page.evaluate(() => document.getElementById('work').compareDocumentPosition(document.getElementById('scope')) & Node.DOCUMENT_POSITION_FOLLOWING));
      const engineering = page.locator('#jarvis-engineering');
      assert.equal(await engineering.getAttribute('open'), null);
      await engineering.locator('summary').click();
      assert.ok((await engineering.innerText()).includes('TF-IDF'));
      assert.ok((await engineering.innerText()).includes('판매 분석 100문항'));
      assert.equal(await engineering.locator('.agent-flow > li').count(), 4);
      assert.equal(await engineering.locator('.engineering-incidents > article').count(), 2);
      await engineering.locator('summary').click();
      const projectKeys = await page.locator('.case-list > [data-project-key]').evaluateAll(nodes => nodes.map(node => node.dataset.projectKey));
      assert.deepEqual(projectKeys, profile.order);
      assert.equal(await page.locator('.case-list > .case-featured').count(), 1);
      assert.deepEqual(await page.locator('.case-list > [data-project-key] .case-index').allTextContents(), ['01', '02', '03']);
      assert.equal(await page.locator('[data-academic-identity]').count(), key === 'lotte' ? 0 : 2);
      assert.equal(await page.locator('[data-profile-only="sempio"]').isVisible(), key === 'sempio');
      if (key === 'lotte') {
        assert.ok(!/안동대학교|정보통계학|주전공|복수전공/.test(await page.locator('body').innerText()));
      }
      const body = await page.locator('body').innerText();
      for (const other of Object.values(profiles)) {
        if (other.company !== profile.company) assert.ok(!body.includes(other.company), `Company leakage: ${key} / ${other.company}`);
      }
      summaries.add(await page.locator('[data-project-key="jarvis"] .case-summary').innerText());
      const portraitLoaded = await page.locator('.hero-portrait img').evaluate(img => img.complete && img.naturalWidth > 0);
      assert.ok(portraitLoaded, `${key}: missing portrait`);
      const missingAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(link.getAttribute('href').slice(1))).map(link => link.getAttribute('href')));
      assert.deepEqual(missingAnchors, []);

      for (const width of [1440, 1024, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        const overflow = await page.evaluate(() => {
          const selectors = '.hero-statement, .hero-description, .role-fit-list strong, .role-fit-list p, .role-fit-contribution p, .direction-source, .case-eval-note, .case-summary, .brand, .hero-console';
          return {
            page: document.documentElement.scrollWidth > innerWidth + 1,
            text: Array.from(document.querySelectorAll(selectors)).filter(node => node.getBoundingClientRect().width > 0 && node.scrollWidth > node.clientWidth + 1).map(node => node.className || node.tagName)
          };
        });
        assert.equal(overflow.page, false, `${key} @ ${width}: page overflow`);
        assert.deepEqual(overflow.text, [], `${key} @ ${width}: text overflow`);
        if (key === 'sempio') {
          const platformDetail = page.locator('#platform-engineering');
          await platformDetail.locator('summary').click();
          assert.match(await platformDetail.innerText(), /기존 시트를 선호하던 일부 직원/);
          assert.match(await platformDetail.innerText(), /상품 식별정보·가격·수집시간/);
          assert.equal(await platformDetail.evaluate(node => Array.from(node.querySelectorAll('h4, h5, dd')).some(element => element.scrollWidth > element.clientWidth + 1)), false);
          await platformDetail.locator('summary').click();
        }
        await engineering.locator('summary').click();
        const detailOverflow = await engineering.evaluate(node => {
          const elements = Array.from(node.querySelectorAll('h4, h5, p, dd, strong, summary'));
          return document.documentElement.scrollWidth > innerWidth + 1 || elements.some(element => element.scrollWidth > element.clientWidth + 1 && getComputedStyle(element).display !== 'inline');
        });
        assert.equal(detailOverflow, false, `${key} @ ${width}: engineering overflow`);
        await engineering.locator('summary').click();
        if (screenshotDir && [1440, 390].includes(width)) {
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.screenshot({ path: path.join(screenshotDir, `${key}-${width}.png`) });
        }
      }

      if (screenshotDir) {
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.locator('#position-fit').screenshot({ path: path.join(screenshotDir, `${key}-fit.png`) });
        if (key === 'sempio') {
          await page.locator('[data-project-key="data-platform"]').screenshot({ path: path.join(screenshotDir, 'sempio-platform.png') });
          await page.setViewportSize({ width: 390, height: 844 });
          const platformDetail = page.locator('#platform-engineering');
          await platformDetail.locator('summary').focus();
          await page.keyboard.press('Enter');
          assert.notEqual(await platformDetail.getAttribute('open'), null);
          await platformDetail.screenshot({ path: path.join(screenshotDir, 'sempio-platform-mobile.png') });
          await page.keyboard.press('Enter');
        }
        await page.setViewportSize({ width: 390, height: 844 });
        await page.locator('[data-project-key="jarvis"]').evaluate(node => window.scrollTo(0, node.getBoundingClientRect().top + window.scrollY - 90));
        await page.screenshot({ path: path.join(screenshotDir, `${key}-jarvis-mobile.png`) });
      }

      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('[data-menu-toggle]').click();
      assert.equal(await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'), 'true');
      await page.locator('[data-nav] a[href="#work"]').click();
      assert.equal(await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'), 'false');
      const oldTheme = await page.locator('html').getAttribute('data-theme');
      await page.locator('[data-theme-toggle]').click();
      assert.notEqual(await page.locator('html').getAttribute('data-theme'), oldTheme);
      await engineering.locator('summary').focus();
      await page.keyboard.press('Enter');
      assert.notEqual(await engineering.getAttribute('open'), null);
      if (screenshotDir) {
        await engineering.screenshot({ path: path.join(screenshotDir, `${key}-engineering-mobile.png`) });
      }
      await page.keyboard.press('Enter');
      await page.locator('[data-open-journey="jarvis"]').click();
      assert.equal(await page.locator('[data-journey-panel="jarvis"]').isVisible(), true);
      assert.match(page.url(), /#journey-jarvis$/);
      await page.locator('[data-ai-prompt="판매처별 판매 합계를 검산해줘"]').click();
      assert.match(await page.locator('[data-ai-chat] .assistant').last().innerText(), /부분합.*일치/);
      await page.locator('[data-journey-tab="order"]').click();
      assert.equal(await page.locator('[data-journey-panel="order"]').isVisible(), true);
      await page.locator('[data-journey-tab="jarvis"]').click();
      assert.equal(await page.locator('[data-journey-panel="jarvis"]').isVisible(), true);
      await page.locator('[data-journey-tab="site"]').click();
      assert.equal(await page.locator('[data-journey-panel="site"]').isVisible(), true);
      if (key === 'sempio') {
        await page.locator('[data-journey-tab="jarvis"]').click();
        await page.locator('[data-open-journey="site"]').click();
        assert.equal(await page.locator('[data-journey-panel="site"]').isVisible(), true);
        assert.match(page.url(), /target=sempio#journey-site$/);
      }
      results.push({ target: key, viewports: 5, menu: 'PASS', theme: 'PASS', demo: 'PASS' });
    }
    assert.equal(summaries.size, Object.keys(profiles).length, 'Project summaries must differ across profiles');

    await page.goto(`${baseUrl}#journey-jarvis`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('[data-journey-panel="jarvis"]').isVisible(), true);
    for (const question of ['영업이익이 얼마야?', '오늘 단종된 상품 알려줘', '내일 날씨는?']) {
      await page.locator('[data-ai-input]').fill(question);
      await page.locator('[data-ai-form] button').click();
      assert.match(await page.locator('[data-ai-chat] .assistant').last().innerText(), /원천 자료|범위/);
    }
    for (const product of ['tumbler', 'folding-cart', 'neck-band']) {
      await page.locator('[data-journey-tab="site"]').click();
      await page.locator(`[data-product-switch="${product}"]`).click();
      await page.locator('[data-channel][value="own"]').uncheck();
      await page.locator('[data-demo-form] button[type="submit"]').click();
      const total = await page.locator('[data-kpi-value="sales"]').innerText();
      await page.locator('[data-journey-tab="jarvis"]').click();
      const check = await page.locator('[data-demo-check]').innerText();
      const subtotals = await page.locator('[data-demo-subtotals]').innerText();
      const sum = Array.from(subtotals.matchAll(/([\d,]+)개/g)).reduce((value, match) => value + Number(match[1].replaceAll(',', '')), 0);
      assert.equal(sum, Number(total.replace(/[^\d]/g, '')));
      assert.ok(check.includes(total));
      assert.ok(check.endsWith('일치'));
      assert.ok(!subtotals.includes('자사몰'));
      assert.ok((await page.locator('[data-demo-scope]').innerText()).includes('2개 판매처'));
    }
    if (screenshotDir) {
      for (const theme of ['light', 'dark']) {
        if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('[data-theme-toggle]').click();
        for (const width of [1440, 390]) {
          await page.setViewportSize({ width, height: 1000 });
          await page.locator('#jarvis-engineering').evaluate(node => { node.open = true; });
          await page.locator('#jarvis-engineering').screenshot({ path: path.join(screenshotDir, `engineering-${theme}-${width}.png`), style: '.site-header, .skip-link { visibility: hidden !important; }' });
          await page.locator('.jarvis-demo').screenshot({ path: path.join(screenshotDir, `demo-${theme}-${width}.png`), style: '.site-header, .skip-link { visibility: hidden !important; }' });
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
        }
      }
    }

    for (const [query, expected] of [
      ['company=daou-tech', 'daou'], ['target=lg', 'lgcns'], ['target=lotte-innovate', 'lotte'],
      ['target=db', 'dbinc'], ['target=%20DAOU%20', 'daou'],
      ['company=sempio-platform', 'sempio'], ['target=%20SEMPIO%20', 'sempio'],
      ['', undefined], ['target=toss', undefined], ['target=unknown', undefined],
      ['target=__proto__', undefined], ['target=constructor', undefined], ['target=toString', undefined]
    ]) {
      await page.goto(`${baseUrl}?${query}`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.evaluate(() => window.PORTFOLIO_TARGET?.key), expected, query);
      if (!expected) {
        assert.equal(await page.locator('[data-academic-identity]').count(), 2);
        assert.equal(await page.locator('[data-profile-direction-source]').isVisible(), false);
        assert.equal(await page.locator('[data-profile-supporting-source]').isVisible(), false);
      }
    }
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ status: 'PASS', profiles: results, routeChecks: 13, pageErrors: errors }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
