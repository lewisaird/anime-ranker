#!/usr/bin/env node
// tests/missing-account.test.mjs
//
// v1.0.255 — a Missing (franchise gaps) scan belongs to the account that
// started it. If the user logs out or switches account before a long scan
// finishes, the scan stops and nothing is saved, kept in memory or painted
// for the new account; the previous account's in-memory scan is never shown
// to the next one. Runs the real functions from app.js in a vm sandbox with
// small DOM / storage / network stubs.
//
// Runs via:   node --test tests/missing-account.test.mjs
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
  innerHTML: '', textContent: '', value: '', checked: false, style: {},
  classList: { add() {}, remove() {}, toggle() {} },
  closest: () => null,
});
const flush = async () => { for (let i = 0; i < 5; i++) await new Promise(r => setImmediate(r)); };
const gate = () => { let open; const p = new Promise(r => { open = r; }); return { p, open }; };

const A = 'kessen.session.anilist.alice';
const B = 'kessen.session.anilist.bob';
const gapGroup = (title) => ({ parent: { id: 1, title: 'Parent' }, gaps: [{ id: 99, title, format: 'TV', status: 'FINISHED' }] });

// `hooks.relations(onProgress, onWait)` and `hooks.recaps(onProgress, onWait)`
// stand in for the two AniList passes; they can await a gate and flip saveKey.
function sandbox(hooks = {}) {
  const els = {};
  const store = new Map();
  const toasts = [];
  const ctx = vm.createContext({
    console: { warn() {}, log() {} },
    IDS: new Proxy({}, { get: (_, k) => String(k) }),
    byId: (id) => (els[id] ??= fakeEl()),
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
    },
    KESSEN_KEYS: { data: { franchiseGaps: (key) => `kessen.data.franchiseGaps.${key || 'guest'}` } },
    FRANCHISE_GAPS_TTL_MS: 7 * 24 * 60 * 60 * 1000,
    FRANCHISE_GAP_UPCOMING_STATUSES: new Set(['NOT_YET_RELEASED']),
    saveKey: A, animeList: [{ id: 1 }], recsTab: 'gaps',
    authToken: null, malAuthToken: null,
    _franchiseGaps: null, _franchiseGapsKey: '', _franchiseGapsLoading: false,
    _franchiseGapsGroupBy: false, _franchiseGapsSortMode: 'yearDesc', _franchiseGapsView: 'list',
    _franchiseGapsHiddenFormats: new Set(), _planningIdsCache: null,
    _paintGapFormatChips() {}, _paintGapRelationChips() {}, _paintGapsFiltersBtn() {}, _syncGapsViewButtons() {},
    _paintGapsRefreshBtn() {},
    _gapsHiddenRelations: () => new Set(), _gapIsRecap: () => false,
    _mergeGapsByFranchise: (g) => g, _gapSortComparator: () => () => 0,
    _renderGapCardList: (x) => `<div class="gap">${x.title}</div>`, _renderGapCardGrid: (x) => `<div class="gap">${x.title}</div>`,
    _escapeHtml: (s) => s,
    _fetchPlanningIds: async () => new Set(),
    showToast: (msg) => toasts.push(msg),
    _fetchFranchiseRelations: async (src, onProgress, onWait) => {
      if (hooks.relations) await hooks.relations(onProgress, onWait);
      onProgress(src.length, src.length);
      return [];
    },
    _buildFranchiseGapGroups: () => [gapGroup('Alice gap')],
    _flagRecapsFromDescriptions: async (groups, onProgress, onWait) => {
      if (hooks.recaps) await hooks.recaps(onProgress, onWait);
    },
  });
  for (const name of ['_loadFranchiseGapsCache', '_saveFranchiseGapsCache', '_isFranchiseGapsCacheFresh',
    'fetchFranchiseGaps', 'renderFranchiseGaps']) {
    vm.runInContext(fnSource(name), ctx);
  }
  const saved = (key) => store.get(ctx.KESSEN_KEYS.data.franchiseGaps(key));
  return { ctx, els, store, toasts, saved };
}

test('a scan that finishes for the same account is saved, kept and painted (control)', async () => {
  const { ctx, els, toasts, saved } = sandbox();
  await ctx.renderFranchiseGaps();
  assert.ok(saved(A), 'saved under the scanning account');
  assert.equal(ctx._franchiseGaps.groups[0].gaps[0].title, 'Alice gap');
  assert.equal(ctx._franchiseGapsKey, A);
  assert.match(els.gapsResults.innerHTML, /Alice gap/);
  assert.deepEqual(toasts, []);
});

test('logging out during the recap pass: nothing saved under any key, kept or painted', async () => {
  const g = gate();
  const { ctx, els, store, toasts } = sandbox({ recaps: () => g.p });
  const run = ctx.renderFranchiseGaps({ force: true });
  await flush();
  assert.equal(ctx._franchiseGapsLoading, true);
  // _clearRankingState: saveKey and the list are wiped, the in-memory scan dropped
  ctx.saveKey = ''; ctx.animeList = []; ctx._franchiseGaps = null;
  g.open();
  await run;
  assert.equal(store.size, 0, 'no franchiseGaps key written (was: the guest key)');
  assert.equal(ctx._franchiseGaps, null);
  assert.equal(ctx._franchiseGapsLoading, false);
  assert.doesNotMatch(els.gapsResults.innerHTML, /Alice gap/);
  assert.equal(els.gapsLoading.style.display, 'none');
  assert.deepEqual(toasts, [], 'no "scan couldn\'t finish" toast for the next session');
});

test('switching account mid-scan stops at the next batch; the new account sees its own state', async () => {
  const g = gate();
  let recapsRan = false;
  const { ctx, els, store, toasts, saved } = sandbox({
    relations: () => g.p,
    recaps: () => { recapsRan = true; },
  });
  const run = ctx.renderFranchiseGaps({ force: true });
  await flush();
  ctx.saveKey = B; ctx.animeList = [{ id: 2 }];   // Change User → Bob loaded (no _clearRankingState)
  g.open();
  await run;
  assert.equal(recapsRan, false, 'the recap pass never started for the old account');
  assert.equal(saved(A), undefined);
  assert.equal(saved(B), undefined);
  assert.equal(store.size, 0);
  assert.equal(ctx._franchiseGaps, null);
  assert.deepEqual(toasts, []);
  // Missing is the open sub-tab, so it re-renders for Bob from his (empty) cache
  assert.doesNotMatch(els.gapsResults.innerHTML, /Alice gap/);
  assert.match(els.gapsEmpty.textContent, /Scan hasn't run yet/);
});

test('a rate-limit wait stops as soon as the account changes', async () => {
  let ticks = 0;
  const { ctx, store } = sandbox({
    relations: async (onProgress, onWait) => {
      onWait(60); ticks++;
      ctx.saveKey = '';                                // logout during the countdown
      onWait(59); ticks++;                             // next tick throws
    },
  });
  await ctx.renderFranchiseGaps({ force: true });
  assert.equal(ticks, 1);
  assert.equal(store.size, 0);
  assert.equal(ctx._franchiseGapsLoading, false);
});

test('Bob\'s saved scan is shown (not Alice\'s) when the old scan is dropped', async () => {
  const g = gate();
  const { ctx, els, store } = sandbox({ recaps: () => g.p });
  const run = ctx.renderFranchiseGaps({ force: true });
  await flush();
  store.set(ctx.KESSEN_KEYS.data.franchiseGaps(B), JSON.stringify({ fetchedAt: Date.now(), groups: [gapGroup('Bob gap')] }));
  ctx.saveKey = B; ctx.animeList = [{ id: 2 }];
  g.open();
  await run;
  assert.match(els.gapsResults.innerHTML, /Bob gap/);
  assert.doesNotMatch(els.gapsResults.innerHTML, /Alice gap/);
  assert.equal(store.get(ctx.KESSEN_KEYS.data.franchiseGaps(A)), undefined);
});

test('after Change User, the previous account\'s in-memory scan is not shown', async () => {
  const { ctx, els } = sandbox();
  ctx._franchiseGaps = { fetchedAt: Date.now(), groups: [gapGroup('Alice gap')] };
  ctx._franchiseGapsKey = A;
  ctx.saveKey = B; ctx.animeList = [{ id: 2 }];
  await ctx.renderFranchiseGaps({ skipFetch: true });   // e.g. a filter chip toggled
  assert.equal(ctx._franchiseGaps, null);
  assert.doesNotMatch(els.gapsResults.innerHTML, /Alice gap/);
  assert.match(els.gapsEmpty.textContent, /Scan hasn't run yet/);
});

test('_clearRankingState drops the Missing scan and planning-list IDs', () => {
  const src = fnSource('_clearRankingState');
  for (const line of ['_franchiseGaps    = null;', '_planningIdsCache = null;']) {
    assert.ok(src.includes(line), `_clearRankingState should contain ${line}`);
  }
});
