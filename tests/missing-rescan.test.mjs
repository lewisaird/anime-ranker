#!/usr/bin/env node
// tests/missing-rescan.test.mjs
//
// v1.0.255 — Discover → Missing: the ↻ Rescan button follows the running scan.
// It shows a disabled "Scanning…" for any scan (tab-open auto-scan or Rescan),
// a tap mid-scan no longer re-enables it early, and it comes back only when the
// scan ends (success or failure). Runs the real functions from app.js in a vm
// sandbox with small DOM/network stubs.
//
// Runs via:   node --test tests/missing-rescan.test.mjs
// Or via:     npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const js   = readFileSync(join(here, '..', 'app.js'), 'utf8');

// Top-level functions in app.js start at column 0 and end at the first "}" line.
function fnSource(name) {
  const m = js.match(new RegExp(`^(?:async )?function ${name}\\(`, 'm'));
  assert.ok(m, `${name} not found in app.js`);
  return js.slice(m.index, js.indexOf('\n}\n', m.index) + 2);
}

const fakeEl = () => ({
  innerHTML: '', textContent: '', value: '', checked: false, disabled: false, style: {},
  classList: { add() {}, remove() {}, toggle() {} },
  closest: () => null,
});
const flush = () => new Promise(r => setImmediate(r));

// `finish` settles the pending relations-scan stub ({ res, rej }); `cache` is
// what _loadFranchiseGapsCache returns (fresh when it carries fresh: true).
function sandbox({ cache = null } = {}) {
  const calls = [];
  const finish = {};
  const els = { gapsRefreshBtn: Object.assign(fakeEl(), { textContent: '↻ Rescan' }) }; // index.html default
  const ctx = vm.createContext({
    IDS: new Proxy({}, { get: (_, k) => String(k) }),
    byId: (id) => (els[id] ??= fakeEl()),
    console: { warn() {} },
    animeList: [{ id: 1 }], authToken: null, malAuthToken: null,
    saveKey: 'kessen.session.guest', _franchiseGapsKey: '', recsTab: 'gaps', // v1.0.255 — Missing scans are per account (missing-account.test)
    _franchiseGaps: null, _franchiseGapsLoading: false, _franchiseGapsGroupBy: false,
    _franchiseGapsSortMode: 'yearDesc', _franchiseGapsHiddenFormats: null, _franchiseGapsView: 'list',
    FRANCHISE_GAP_UPCOMING_STATUSES: new Set(),
    _paintGapFormatChips() {}, _paintGapRelationChips() {}, _paintGapsFiltersBtn() {}, _syncGapsViewButtons() {},
    _gapsHiddenRelations: () => new Set(), _gapIsRecap: () => false,
    _mergeGapsByFranchise: (g) => g, _gapSortComparator: () => () => 0, _escapeHtml: (s) => s,
    _loadFranchiseGapsCache: () => cache,
    _isFranchiseGapsCacheFresh: (c) => !!c?.fresh,
    _saveFranchiseGapsCache: () => calls.push('save'),
    _fetchPlanningIds: async () => new Set(),
    _fetchFranchiseRelations: () => { calls.push('scan'); return new Promise((res, rej) => Object.assign(finish, { res, rej })); },
    _buildFranchiseGapGroups: () => [],
    _flagRecapsFromDescriptions: async () => {},
    showToast: (msg) => calls.push(`toast:${msg}`),
    _metric: (k) => calls.push(`metric:${k}`),
  });
  for (const name of ['renderFranchiseGaps', 'fetchFranchiseGaps', 'refreshFranchiseGaps', '_paintGapsRefreshBtn', 'onGapsFilterChange']) {
    vm.runInContext(fnSource(name), ctx);
  }
  return { ctx, calls, finish, btn: () => els.gapsRefreshBtn };
}

test('a scan started by opening the tab shows a disabled Scanning… Rescan until it finishes', async () => {
  const { ctx, calls, finish, btn } = sandbox();
  ctx.renderFranchiseGaps();             // Missing opened with nothing cached -> auto-scan
  assert.deepEqual(calls, ['scan']);
  assert.equal(btn().disabled, true);
  assert.equal(btn().textContent, '↻ Scanning…');

  ctx.refreshFranchiseGaps();            // tap mid-scan: no second scan, button stays put
  ctx.onGapsFilterChange();              // filter toggle mid-scan re-renders without fetching
  await flush();
  assert.equal(calls.filter(c => c === 'scan').length, 1);
  assert.ok(!calls.includes('metric:missing.rescan'), 'a dropped tap is not counted as a rescan');
  assert.ok(calls.some(c => /^toast:.*already running/.test(c)));
  assert.equal(btn().disabled, true);
  assert.equal(btn().textContent, '↻ Scanning…');

  finish.res([]);
  await flush();
  assert.ok(calls.includes('save'));
  assert.equal(ctx._franchiseGapsLoading, false);
  assert.equal(btn().disabled, false);
  assert.equal(btn().textContent, '↻ Rescan');
});

test('Rescan disables the button for the whole scan and restores it when the scan fails', async () => {
  const { ctx, calls, finish, btn } = sandbox();
  ctx.refreshFranchiseGaps();
  assert.deepEqual(calls, ['metric:missing.rescan', 'scan']);
  assert.equal(btn().disabled, true);
  assert.equal(btn().textContent, '↻ Scanning…');

  ctx.refreshFranchiseGaps();            // second tap mid-scan used to re-enable the button at once
  await flush();
  assert.equal(calls.filter(c => c === 'scan').length, 1);
  assert.equal(btn().disabled, true);

  finish.rej(new Error('HTTP 429'));     // AniList cut the scan short
  await flush();
  assert.equal(ctx._franchiseGapsLoading, false);
  assert.equal(btn().disabled, false);
  assert.equal(btn().textContent, '↻ Rescan');

  ctx.refreshFranchiseGaps();            // and the next tap starts a new scan
  assert.equal(calls.filter(c => c === 'scan').length, 2);
  assert.equal(btn().disabled, true);
});

test('opening the tab with a fresh cached scan leaves Rescan enabled', async () => {
  const { ctx, calls, btn } = sandbox({ cache: { fetchedAt: Date.now(), groups: [], fresh: true } });
  await ctx.renderFranchiseGaps();
  assert.deepEqual(calls, []);
  assert.equal(btn().disabled, false);
  assert.equal(btn().textContent, '↻ Rescan');
});

test('only fetchFranchiseGaps starts or ends a scan, so the button cannot drift from _franchiseGapsLoading', () => {
  const re = /^\s+_franchiseGapsLoading = (?:true|false);/gm;
  const all = js.match(re) || [];
  assert.equal(all.length, 2);
  assert.deepEqual(fnSource('fetchFranchiseGaps').match(re), all);
});
