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
  daou: { company: '다우기술', order: ['jarvis', 'data-platform', 'order-ai'] }
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
      assert.ok(await page.evaluate(() => document.getElementById('work').compareDocumentPosition(document.getElementById('scope')) & Node.DOCUMENT_POSITION_FOLLOWING));
      assert.ok((await page.locator('[data-project-key="jarvis"]').innerText()).includes('TF-IDF'));
      assert.ok((await page.locator('[data-project-key="jarvis"]').innerText()).includes('판매 분석 100문항'));
      const projectKeys = await page.locator('.case-list > [data-project-key]').evaluateAll(nodes => nodes.map(node => node.dataset.projectKey));
      assert.deepEqual(projectKeys, profile.order);
      assert.equal(await page.locator('.case-list > .case-featured').count(), 1);
      assert.deepEqual(await page.locator('.case-list > [data-project-key] .case-index').allTextContents(), ['01', '02', '03']);
      assert.equal(await page.locator('[data-academic-identity]').count(), key === 'lotte' ? 0 : 2);
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
        if (screenshotDir && [1440, 390].includes(width)) {
          await page.screenshot({ path: path.join(screenshotDir, `${key}-${width}.png`) });
        }
      }

      if (screenshotDir) {
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.locator('#position-fit').screenshot({ path: path.join(screenshotDir, `${key}-fit.png`) });
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
      await page.locator('[data-journey-tab="order"]').click();
      assert.equal(await page.locator('[data-journey-panel="order"]').isVisible(), true);
      await page.locator('[data-journey-tab="jarvis"]').click();
      assert.equal(await page.locator('[data-journey-panel="jarvis"]').isVisible(), true);
      await page.locator('[data-journey-tab="site"]').click();
      assert.equal(await page.locator('[data-journey-panel="site"]').isVisible(), true);
      results.push({ target: key, viewports: 5, menu: 'PASS', theme: 'PASS', demo: 'PASS' });
    }
    assert.equal(summaries.size, 4, 'Project summaries must differ across all four profiles');

    for (const [query, expected] of [
      ['company=daou-tech', 'daou'], ['target=lg', 'lgcns'], ['target=lotte-innovate', 'lotte'],
      ['target=db', 'dbinc'], ['target=%20DAOU%20', 'daou'],
      ['', undefined], ['target=toss', undefined], ['target=unknown', undefined],
      ['target=__proto__', undefined], ['target=constructor', undefined], ['target=toString', undefined]
    ]) {
      await page.goto(`${baseUrl}?${query}`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.evaluate(() => window.PORTFOLIO_TARGET?.key), expected, query);
      if (!expected) {
        assert.equal(await page.locator('[data-academic-identity]').count(), 2);
        assert.equal(await page.locator('[data-profile-direction-source]').isVisible(), false);
      }
    }
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ status: 'PASS', profiles: results, routeChecks: 11, pageErrors: errors }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
