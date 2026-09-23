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
  sempio: { company: '샘표', order: ['data-platform', 'order-ai', 'jarvis'] },
  hanwha: { company: '한화금융', order: ['data-platform', 'jarvis', 'order-ai'] },
  hyundai: { company: '현대엘리베이터', order: ['data-platform', 'jarvis', 'order-ai'] },
  nh: { company: 'NH투자증권', order: ['data-platform', 'jarvis', 'order-ai'] },
  cj: { company: 'CJ올리브네트웍스', order: ['data-platform', 'jarvis', 'order-ai'] }
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
      assert.equal(await supportingSource.isVisible(), ['daou', 'sempio', 'lotte', 'hanwha', 'hyundai', 'nh', 'cj'].includes(key));
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
      } else if (key === 'lotte') {
        assert.match(await page.locator('[data-profile-experience-title]').innerText(), /서비스 설계/);
        assert.match(await page.locator('[data-profile-work-summary]').innerText(), /2025\.12.*2026\.03.*2026\.07/);
        assert.match(await page.locator('.hero-metrics').innerText(), /FastAPI/);
        assert.equal(await supportingSource.getAttribute('href'), 'https://recruit.lotte.co.kr/apply/announcement/detail/21933850?compcd=30007');
        assert.match(await page.locator('[data-profile-direction-source]').getAttribute('href'), /\/press\/list\/0\/931$/);
      } else if (key === 'hanwha') {
        assert.match(await page.title(), /AI\/데이터 Engineer/);
        assert.match(await page.locator('[data-profile-experience-summary]').innerText(), /SQLD·ADsP/);
        assert.match(await page.locator('[data-profile-foundation-title]').innerText(), /실무로 확장/);
        assert.match(await page.locator('[data-profile-contribution-body]').innerText(), /금융 상품과 업무 절차.*배우고/);
        assert.match(await page.locator('[data-profile-work-summary]').innerText(), /2025\.12.*2026\.03.*2026\.07/);
        assert.equal(await supportingSource.getAttribute('href'), 'https://www.hanwhain.com/portal/apply/recruit/detail?rtSeq=19498');
        assert.match(await page.locator('[data-project-key="jarvis"] .case-summary').innerText(), /평가하며 개선 중/);
      } else if (key === 'cj') {
        assert.match(await page.title(), /CJ올리브네트웍스 Data Engineer/);
        assert.match(await page.locator('[data-profile-direction-source]').getAttribute('href'), /\/863\?ca=ALL$/);
        assert.equal(await supportingSource.getAttribute('href'), 'https://www.cjolivenetworks.co.kr/business/ai_bigdata');
        assert.match(await page.locator('[data-profile-contribution-body]').innerText(), /더 배워야 할 영역/);
        assert.match(await page.locator('[data-project-key="data-platform"] .case-summary').innerText(), /집계 단위/);
        assert.match(await page.locator('[data-project-key="jarvis"] .case-summary').innerText(), /상품 약칭·오타/);
        for (const selector of ['#cj-data-quality', '#cj-query-validation']) {
          const detail = page.locator(selector);
          assert.equal(await detail.isVisible(), true);
          await detail.locator('summary').click();
          assert.equal(await detail.evaluate(node => Array.from(node.querySelectorAll('h4, h5, dd')).some(element => element.scrollWidth > element.clientWidth + 1)), false);
          await detail.locator('summary').click();
        }
      } else if (key === 'nh') {
        assert.match(await page.title(), /NH투자증권 IT/);
        assert.equal(await page.locator('[data-profile-direction-source]').getAttribute('href'), 'https://nhqv.recruiter.co.kr/career/jobs/128898');
        assert.equal(await supportingSource.getAttribute('href'), 'https://github.com/PLUG-OpenAPI');
        assert.match(await page.locator('[data-profile-contribution-body]').innerText(), /보안·변경관리.*입사 후/);
        assert.match(await page.locator('[data-profile-fit-summary]').innerText(), /입사 후 학습할 금융업무/);
        assert.match(await page.locator('.hero-metrics').innerText(), /Python · SQL/);
        assert.match(await page.locator('[data-project-key="data-platform"] .case-summary').innerText(), /미완료 항목/);
        assert.match(await page.locator('[data-project-key="jarvis"] .case-summary').innerText(), /92개 기본 회귀 문항/);
      } else if (key === 'hyundai') {
        assert.match(await page.title(), /데이터\/AI개발/);
        assert.equal(await page.locator('[data-profile-direction-source]').getAttribute('href'), 'https://careers.hyundaigroup.com/jobs/RC20260828033768');
        assert.equal(await supportingSource.getAttribute('href'), 'https://careers.hyundaigroup.com/people-bigdata');
        assert.match(await page.locator('[data-profile-contribution-body]').innerText(), /생성·사용 기준을 배우겠습니다/);
        assert.match(await page.locator('[data-project-key="jarvis"] .case-summary').innerText(), /오프라인 테스트/);
        assert.match(await page.locator('[data-profile-adoption-body]').innerText(), /실제 화면.*아이디어/);
        assert.match(await page.locator('[data-profile-order-effect-body]').innerText(), /담당자가 판단/);
        assert.equal(await page.locator('.hyundai-outcomes > dl > div').count(), 3);
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
      assert.equal(await page.locator('[data-profile-only="sempio lotte hanwha hyundai nh cj"]').isVisible(), ['sempio', 'lotte', 'hanwha', 'hyundai', 'nh', 'cj'].includes(key));
      assert.equal(await page.locator('#cj-data-quality').isVisible(), key === 'cj');
      assert.equal(await page.locator('#cj-query-validation').isVisible(), key === 'cj');
      assert.equal(await page.locator('.hyundai-outcomes').isVisible(), key === 'hyundai');
      assert.equal(await page.locator('[data-profile-only="lotte"]').first().isVisible(), key === 'lotte');
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
          const selectors = '.hero-statement, .hero-description, .hero-metrics strong, .role-fit-list strong, .role-fit-list p, .role-fit-contribution p, .direction-source, .case-eval-note, .case-summary, .brand, .hero-console, .hyundai-outcomes h4, .hyundai-outcomes dt, .hyundai-outcomes dd';
          return {
            page: document.documentElement.scrollWidth > innerWidth + 1,
            text: Array.from(document.querySelectorAll(selectors)).filter(node => node.getBoundingClientRect().width > 0 && node.scrollWidth > node.clientWidth + 1).map(node => node.className || node.tagName)
          };
        });
        assert.equal(overflow.page, false, `${key} @ ${width}: page overflow`);
        assert.deepEqual(overflow.text, [], `${key} @ ${width}: text overflow`);
        if (['sempio', 'lotte', 'hanwha', 'hyundai', 'nh', 'cj'].includes(key)) {
          const platformDetail = page.locator('#platform-engineering');
          await platformDetail.locator('summary').click();
          assert.match(await platformDetail.innerText(), /기존 시트를 선호하던 일부 직원/);
          assert.match(await platformDetail.innerText(), /상품 식별정보·가격·수집시간/);
          assert.equal(await platformDetail.evaluate(node => Array.from(node.querySelectorAll('h4, h5, dd')).some(element => element.scrollWidth > element.clientWidth + 1)), false);
          await platformDetail.locator('summary').click();
        }
        if (key === 'hyundai') {
          const modeling = page.locator('#hyundai-data-modeling');
          await modeling.locator('summary').focus();
          await page.keyboard.press('Enter');
          assert.notEqual(await modeling.getAttribute('open'), null);
          assert.equal(await modeling.locator('.agent-flow > li').count(), 4);
          assert.equal(await modeling.evaluate(node => Array.from(node.querySelectorAll('p, h4, h5, strong')).some(element => element.scrollWidth > element.clientWidth + 1)), false);
          if (screenshotDir && [1440, 390].includes(width)) {
            await page.locator('.hyundai-outcomes').screenshot({ path: path.join(screenshotDir, `hyundai-outcomes-${width}.png`), style: '.site-header, .skip-link { visibility: hidden !important; }' });
          }
          await modeling.locator('summary').focus();
          await page.keyboard.press('Enter');
          assert.equal(await modeling.getAttribute('open'), null);
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
      ['company=hanwha-finance', 'hanwha'], ['target=hanwhalife', 'hanwha'], ['target=%20HANWHA%20', 'hanwha'],
      ['company=hyundai-elevator', 'hyundai'], ['target=hyundaielevator', 'hyundai'], ['target=%20HYUNDAI%20', 'hyundai'],
      ['company=nh-investment', 'nh'], ['target=nhqv', 'nh'], ['target=%20NH%20', 'nh'],
      ['company=cj-olivenetworks', 'cj'], ['target=%20CJ%20', 'cj'],
      ['', undefined], ['target=toss', undefined], ['target=unknown', undefined],
      ['target=__proto__', undefined], ['target=constructor', undefined], ['target=toString', undefined]
    ]) {
      await page.goto(`${baseUrl}?${query}`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.evaluate(() => window.PORTFOLIO_TARGET?.key), expected, query);
      if (!expected) {
        assert.equal(await page.locator('[data-academic-identity]').count(), 2);
        assert.equal(await page.locator('[data-profile-direction-source]').isVisible(), false);
        assert.equal(await page.locator('[data-profile-supporting-source]').isVisible(), false);
        assert.equal(await page.locator('.hyundai-outcomes').isVisible(), false);
      }
    }
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ status: 'PASS', profiles: results, routeChecks: 22, pageErrors: errors }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
