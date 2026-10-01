#!/usr/bin/env node
// tests/mood-refresh.test.mjs
//
// v1.0.253 — Refresh with a mood chip selected must re-run that mood rather
// than load plain For You under the still-highlighted chip. Runs the real
// functions from app.js in a vm sandbox with small DOM/network stubs.
//
// Runs via:   node --test tests/mood-refresh.test.mjs
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
  innerHTML: '', textContent: '', disabled: false, style: {},
  classList: { add() {}, remove() {}, toggle() {} },
});
const flush = () => new Promise(r => setImmediate(r));

// `stubs(calls)` returns extra globals; `finish` settles the pending
// applyMoodRec / _loadRecsGrid stub promise ({ res, rej }).
function sandbox(stubs = () => ({}), fns = []) {
  const calls = [];
  const finish = {};
  const els = {};
  const pending = () => new Promise((res, rej) => Object.assign(finish, { res, rej }));
  const ctx = vm.createContext({
    IDS: new Proxy({}, { get: (_, k) => String(k) }),
    byId: (id) => (els[id] ??= fakeEl()),
    document: { querySelectorAll: () => [], createElement: fakeEl },
    recsTab: 'foryou', _recsCache: {}, _recsLoadedTab: null,
    _moodRecActive: false, _activeMoodKey: null, _forYouGen: 0,
    _metric() {}, _renderPredictorExamples() {}, renderFranchiseGaps() {},
    getCurrentSeason: () => ({ season: 'FALL', year: 2026 }),
    getNextSeason: () => ({ season: 'WINTER', year: 2027 }),
    applyMoodRec: (k) => { calls.push(`mood:${k}`); return pending(); },
    _loadRecsGrid: () => { calls.push(`plain:${ctx.recsTab}`); return pending(); },
    ...stubs(calls),
  });
  for (const name of ['refreshDiscover', 'setRecsTab', 'renderDiscoverTab', 'clearMoodRec', '_resetMoodChipUI', ...fns]) {
    vm.runInContext(fnSource(name), ctx);
  }
  return { ctx, calls, finish, btn: () => els.discoverRefreshBtn };
}

test('Refresh with a mood selected re-runs that mood, not plain For You', async () => {
  const { ctx, calls, finish, btn } = sandbox();
  ctx._activeMoodKey = 'devastating';
  ctx.refreshDiscover();
  assert.deepEqual(calls, ['mood:devastating']);
  assert.equal(btn().disabled, true);
  assert.match(btn().innerHTML, /Refreshing/);
  finish.res(); // success, nothing found and superseded all resolve
  await flush();
  assert.equal(btn().disabled, false);
  assert.match(btn().innerHTML, /> Refresh</);
});

test('Refresh with no mood, or on This Season, keeps the plain path', () => {
  const a = sandbox();
  a.ctx._recsCache.foryou = { html: 'old', gridDisplay: 'grid' };
  a.ctx.refreshDiscover();
  assert.deepEqual(a.calls, ['plain:foryou']);
  assert.equal(a.ctx._recsCache.foryou, undefined);

  const b = sandbox();
  b.ctx.recsTab = 'seasonal';
  b.ctx._activeMoodKey = 'devastating';
  b.ctx.refreshDiscover();
  assert.deepEqual(b.calls, ['plain:seasonal']);
});

test('For You with a selected mood and nothing cached reloads the mood', () => {
  const a = sandbox();
  a.ctx._activeMoodKey = 'comforting';
  a.ctx.setRecsTab('foryou');            // sub-tab round trip
  assert.deepEqual(a.calls, ['mood:comforting']);

  const b = sandbox();
  b.ctx._activeMoodKey = 'comforting';
  b.ctx.renderDiscoverTab();             // main-tab round trip after a failed run
  assert.deepEqual(b.calls, ['mood:comforting']);

  const c = sandbox();
  c.ctx._activeMoodKey = 'comforting';
  c.ctx._recsCache.foryou = { html: '<p>picks</p>', gridDisplay: 'block' };
  c.ctx.setRecsTab('foryou');            // cached picks are restored, no reload
  assert.deepEqual(c.calls, []);
});

test('Clear forgets the mood so For You loads plain recs', () => {
  const { ctx, calls } = sandbox();
  ctx._activeMoodKey = 'beautiful';
  ctx.clearMoodRec();
  assert.equal(ctx._activeMoodKey, null);
  assert.deepEqual(calls, ['plain:foryou']);
});

test('applyMoodRec remembers the mood, rebuilds seeds every run, and stays on Discover', async () => {
  const run = async (activeResultsTab) => {
    const { ctx, calls } = sandbox((calls) => ({
      activeResultsTab, animeList: [], _moodCoverCache: {},
      _MOOD_DEFS: [{ key: 'devastating', label: 'Devastating', emoji: '💔', genres: [] }],
      _paintTasteMoods: () => calls.push('paint'),   // no seeds -> run ends before any fetch
      showResults: () => calls.push('showResults'),
      switchResultsTab: (t) => calls.push(`tab:${t}`),
    }), ['applyMoodRec']);
    await ctx.applyMoodRec('devastating');
    await ctx.applyMoodRec('devastating');
    assert.equal(ctx._activeMoodKey, 'devastating');
    return calls;
  };
  assert.deepEqual(await run('discover'), ['paint', 'paint']);
  assert.deepEqual(await run('rankings'), ['showResults', 'tab:discover', 'paint', 'showResults', 'tab:discover', 'paint']);
});

test('_clearRankingState forgets the mood and supersedes in-flight For You / mood runs', () => {
  const src = fnSource('_clearRankingState');
  for (const line of ['_activeMoodKey = null;', '_moodRecActive = false;', '_forYouGen++;', '_resetMoodChipUI();']) {
    assert.ok(src.includes(line), `_clearRankingState should contain ${line}`);
  }
});
