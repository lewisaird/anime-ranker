#!/usr/bin/env node
// tools/screenshots.mjs
//
// Capture Play Store / manifest screenshots at device-native resolutions.
//
// Output:
//   screenshots/phone-1.png   battle prompt    (1170 × 2532)
//   screenshots/phone-2.png   rankings table   (1170 × 2532)
//   screenshots/phone-3.png   taste compat     (1170 × 2532)
//   screenshots/phone-4.png   stats            (1170 × 2532)  (bonus)
//   screenshots/phone-5.png   discover         (1170 × 2532)  (bonus)
//   screenshots/tablet-1.png  rankings (iPad)  (2388 × 1668)
//
// Usage:
//   1) One-off setup:
//        npm install --save-dev playwright
//        npx playwright install chromium
//
//   2) First run — interactive login (saves auth state to tools/.auth-state.json):
//        node tools/screenshots.mjs --login
//      A headed Chromium opens pointing at Kessen. Log in via AniList or MAL
//      the way you normally would, then return to the terminal and press Enter.
//
//   3) Capture (headless, uses saved state):
//        node tools/screenshots.mjs
//
//   Override URL (e.g. to hit a local netlify dev):
//        KESSEN_URL=http://localhost:8888 node tools/screenshots.mjs
//
// Security note:
//   tools/.auth-state.json contains your AniList/MAL access tokens in plain
//   text. Do NOT commit it. Add `tools/.auth-state.json` to .gitignore.

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const SITE_URL  = process.env.KESSEN_URL || 'https://kessen.co.uk';
const STATE     = path.join(__dirname, '.auth-state.json');
const OUT       = path.join(ROOT, 'screenshots');
const DO_LOGIN  = process.argv.includes('--login');

fs.mkdirSync(OUT, { recursive: true });

// iPhone 14 Pro — 390 × 844 logical, DPR 3 → 1170 × 2532 output
const PHONE = {
  viewport:          { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile:          true,
  hasTouch:          true,
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) ' +
    'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
};

// iPad Pro 11" landscape — 1194 × 834 logical, DPR 2 → 2388 × 1668 output
// (Manifest says 1920 × 1200; resize the output or update the manifest after
//  capture — device-native is sharper so we prefer that and patch the manifest.)
const TABLET = {
  viewport:          { width: 1194, height: 834 },
  deviceScaleFactor: 2,
  isMobile:          true,
  hasTouch:          true,
  userAgent:
    'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) ' +
    'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
};

// ─────────────────────────── First-run login flow ──────────────────────────

async function loginFlow() {
  console.log(`Opening ${SITE_URL} for login…`);
  const browser = await chromium.launch({ headless: false });
  const ctx     = await browser.newContext({ ...PHONE });
  const page    = await ctx.newPage();
  await page.goto(SITE_URL);
  const rl = readline.createInterface({ input, output });
  await rl.question(
    '\nLog in to Kessen in the opened browser (AniList or MAL).\n' +
    'Once you see your rankings/battles load, come back here and press Enter…\n'
  );
  rl.close();
  await ctx.storageState({ path: STATE });
  await browser.close();
  console.log(`Saved auth state → ${STATE}`);
}

// ─────────────────────────── Capture helpers ───────────────────────────────

async function newPage(deviceOpts) {
  const browser = await chromium.launch({ headless: true });
  const ctx     = await browser.newContext({
    ...deviceOpts,
    storageState: fs.existsSync(STATE) ? STATE : undefined,
    colorScheme:  'dark',
  });
  const page = await ctx.newPage();
  await page.goto(SITE_URL, { waitUntil: 'networkidle' });

  // Wait for the app to be ready — either battle-screen visible, or rankings
  // populated. Cap at 10 s so a broken prod environment doesn't wedge CI.
  // Falls back to a 500 ms settle if the condition evaluates synchronously.
  await page.waitForFunction(() => {
    const bs = document.getElementById('battle-screen');
    const rs = document.getElementById('results-screen');
    const visible = el => el && getComputedStyle(el).display !== 'none';
    return !!(visible(bs) || visible(rs));
  }, null, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(500);

  return { browser, page };
}

// Directly drive the app via page-level functions — more reliable than clicks
// when layout shifts between captures.
async function goToBattle(page) {
  await page.evaluate(() => {
    // resumeBattle() is the app's built-in transition from results → battle view.
    if (typeof window.resumeBattle === 'function') {
      window.resumeBattle();
    } else {
      document.getElementById('results-screen')?.style?.setProperty('display', 'none');
      document.getElementById('battle-screen')?.style?.setProperty('display', 'block');
    }
    // Ensure a pair is rendered if the screen was never initialised.
    if (typeof window.renderBattle === 'function' &&
        (window.currentA == null || window.currentB == null)) {
      window.renderBattle();
    }
  });
  await page.waitForSelector('#battle-prompt-h2', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(500);
}

async function goToResultsTab(page, tab) {
  await page.evaluate((t) => {
    if (typeof window.showResults === 'function')        window.showResults();
    if (typeof window.switchResultsTab === 'function')   window.switchResultsTab(t);
  }, tab);
  await page.waitForSelector(`#tab-panel-${tab}`, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(800);
}

async function shot(page, file) {
  const outPath = path.join(OUT, file);
  await page.screenshot({ path: outPath, fullPage: false });
  console.log(`  wrote ${path.relative(ROOT, outPath)}`);
}

// ─────────────────────────── Main capture ──────────────────────────────────

async function capturePhone() {
  console.log('\nCapturing phone screenshots…');
  const { browser, page } = await newPage(PHONE);

  // phone-1 — battle prompt ("Which did you enjoy more?")
  await goToBattle(page);
  await shot(page, 'phone-1.png');

  // phone-2 — rankings (the default results tab)
  await goToResultsTab(page, 'rankings');
  await shot(page, 'phone-2.png');

  // phone-4 — stats
  await goToResultsTab(page, 'stats');
  await shot(page, 'phone-4.png');

  // phone-5 — discover (may take an extra beat to populate from AniList)
  await goToResultsTab(page, 'discover');
  // Wait for the discover grid to have at least one card, with a short fallback.
  await page.waitForFunction(() => {
    const grid = document.querySelector('#tab-panel-discover .recs-grid, #tab-panel-discover .rec-card');
    return grid && grid.children && grid.children.length > 0;
  }, null, { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(500);
  await shot(page, 'phone-5.png');

  // phone-3 — social / taste compatibility
  await goToResultsTab(page, 'social');
  await shot(page, 'phone-3.png');

  await browser.close();
}

async function captureTablet() {
  console.log('\nCapturing tablet screenshot…');
  const { browser, page } = await newPage(TABLET);
  await goToResultsTab(page, 'rankings');
  await shot(page, 'tablet-1.png');
  await browser.close();
}

// ─────────────────────────── Entry point ───────────────────────────────────

async function main() {
  if (DO_LOGIN) {
    await loginFlow();
    console.log('\nLogin complete. Re-run without --login to capture.');
    return;
  }
  if (!fs.existsSync(STATE)) {
    console.error(
      'No auth state found. Run once with --login first:\n' +
      '  node tools/screenshots.mjs --login'
    );
    process.exit(1);
  }
  await capturePhone();
  await captureTablet();
  console.log(`\nDone — wrote files to ${path.relative(ROOT, OUT)}/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
