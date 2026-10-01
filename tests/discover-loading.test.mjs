#!/usr/bin/env node
// tests/discover-loading.test.mjs
//
// v1.0.254 — Discover's loading placeholders have the finished page's shape
// (headed groups of cards inside a display:block #recs-grid), error and empty
// states no longer use the grid layout, and the pulse shows in light mode.
// Runs the real functions from app.js in a vm sandbox with small DOM stubs.
//
// Runs via:   node --test tests/discover-loading.test.mjs
// Or via:     npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const js   = readFileSync(join(here, '..', 'app.js'), 'utf8');
const css  = readFileSync(join(here, '..', 'styles.css'), 'utf8');

// Top-level functions in app.js start at column 0 and end at the first "}" line.
function fnSource(name) {
  const m = js.match(new RegExp(`^(?:async )?function ${name}\\(`, 'm'));
  assert.ok(m, `${name} not found in app.js`);
  return js.slice(m.index, js.indexOf('\n}\n', m.index) + 2);
}

const perSection = Number(js.match(/^const SEASON_RECS_PER_SECTION = (\d+);/m)?.[1]);
const count = (html, cls) => html.split(`class="${cls}"`).length - 1;
const fakeEl = () => ({
  innerHTML: '', textContent: '', disabled: false, style: {},
  classList: { add() {}, remove() {}, toggle() {} },
  querySelector: () => null,
});

function sandbox(extra = {}, fns = ['_loadRecsGrid']) {
  const els = {};
  const ctx = vm.createContext({
    IDS: new Proxy({}, { get: (_, k) => String(k) }),
    byId: (id) => (els[id] ??= fakeEl()),
    document: { createElement: fakeEl, querySelectorAll: () => [] },
    recsTab: 'foryou', _recsCache: {}, _recsLoadedTab: null, _forYouGen: 0,
    SEASON_RECS_PER_SECTION: perSection,
    renderErrorInto: (el, msg) => { el.innerHTML = `<p style="text-align:center">${msg}</p>`; },
    ...extra,
  });
  for (const name of ['_recsSkeletonCards', '_recsSkeletonHtml', ...fns]) vm.runInContext(fnSource(name), ctx);
  return { ctx, grid: () => els.recsGrid };
}
const never = () => new Promise(() => {});

test('For You placeholder: 3 headed groups of 6 cards, painted as block', () => {
  const { ctx, grid } = sandbox({ fetchRecommendationsForYou: never });
  ctx._loadRecsGrid();                       // paints before its first await
  const html = grid().innerHTML;
  assert.equal(grid().style.display, 'block');
  assert.equal(count(html, 'recs-group'), 3);
  assert.equal(count(html, 'recs-group-heading'), 3);
  assert.equal(count(html, 'recs-subgrid'), 3);
  assert.equal(count(html, 'skeleton-card'), 18);
});

test('This Season placeholder: 2 headed sections of the shared per-section cap', () => {
  assert.ok(perSection > 0, 'SEASON_RECS_PER_SECTION should be a top-level const');
  assert.ok(fnSource('fetchSeasonalRecommendations').includes('.slice(0, SEASON_RECS_PER_SECTION)'));
  const { ctx, grid } = sandbox({ fetchSeasonalRecommendations: never });
  ctx.recsTab = 'seasonal';
  ctx._loadRecsGrid();
  const html = grid().innerHTML;
  assert.equal(grid().style.display, 'block');
  assert.equal(count(html, 'recs-extra-section'), 2);
  assert.equal(count(html, 'recs-extra-heading'), 2);
  assert.equal(count(html, 'skeleton-card'), 2 * perSection);
});

test('error and empty states are committed full width (block), not grid', async () => {
  const a = sandbox({ fetchSeasonalRecommendations: () => Promise.reject(new Error('boom')) });
  a.ctx.recsTab = 'seasonal';
  assert.equal((await a.ctx._loadRecsGrid()).gridDisplay, 'block');
  assert.equal(a.grid().style.display, 'block');
  assert.match(a.grid().innerHTML, /boom/);

  const b = sandbox({ fetchSeasonalRecommendations: async () => ({ current: [], next: [], currentLabel: 'FALL 2026', nextLabel: 'WINTER 2027' }) });
  b.ctx.recsTab = 'seasonal';
  assert.equal((await b.ctx._loadRecsGrid()).gridDisplay, 'block');
  assert.match(b.grid().innerHTML, /No seasonal results/);

  const c = sandbox({ fetchRecommendationsForYou: () => Promise.reject(new Error('down')) });
  assert.equal((await c.ctx._loadRecsGrid()).gridDisplay, 'block');
  assert.match(c.grid().innerHTML, /down/);

  for (const name of ['_loadRecsGrid', 'refreshDiscover', 'setRecsTab', 'renderDiscoverTab', 'applyMoodRec']) {
    assert.doesNotMatch(fnSource(name), /display = 'grid'|commit\('grid'\)/, `${name} should keep #recs-grid display:block`);
  }
});

test('a superseded For You load still leaves the grid to the newer run (v1.0.251)', async () => {
  const { ctx, grid } = sandbox({ fetchRecommendationsForYou: () => Promise.reject(new Error('late')) });
  const load = ctx._loadRecsGrid();
  ctx._forYouGen++;                          // a mood run (or newer load) takes over
  grid().innerHTML = 'mood picks';
  await load;
  assert.equal(grid().innerHTML, 'mood picks');
});

test('a mood run shows its heading over one placeholder group per seed', () => {
  const { ctx, grid } = sandbox({
    activeResultsTab: 'discover', animeList: [], _moodRecActive: false, _activeMoodKey: null,
    _MOOD_DEFS: [{ key: 'intense', label: 'Intense', emoji: '⚡', genres: [] }],
    _moodCoverCache: { intense: [{ id: 1 }, { id: 2 }] },
    _metric() {}, _paintTasteMoods() {},
    _anilistFetch: never,                    // keep the run loading
  }, ['applyMoodRec']);
  ctx.applyMoodRec('intense');
  const html = grid().innerHTML;
  assert.equal(grid().style.display, 'block');
  assert.match(html, /⚡ Intense picks/);
  assert.equal(count(html, 'recs-group'), 2);
  assert.equal(count(html, 'skeleton-card'), 12);
});

test('skeleton pulse animates opacity, so it shows in light mode too', () => {
  const kf = css.match(/@keyframes skeleton-pulse\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? '';
  assert.match(kf, /opacity/);
  assert.doesNotMatch(kf, /border-subtle/); // equal to --border-default in light mode
});
