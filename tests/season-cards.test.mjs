#!/usr/bin/env node
// tests/season-cards.test.mjs
//
// v1.0.254 — This Season shows up to 12 cards per season (was 8: a ragged
// 6 + 2 row on desktop), unwatched first, from the same one fetch per season.
// Runs the real fetchSeasonalRecommendations from app.js in a vm sandbox.
//
// Runs via:   node --test tests/season-cards.test.mjs
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
const html = readFileSync(join(here, '..', 'index.html'), 'utf8'); // v1.0.255 — Help text check

// Top-level functions in app.js start at column 0 and end at the first "}" line.
function fnSource(name) {
  const m = js.match(new RegExp(`^(?:async )?function ${name}\\(`, 'm'));
  assert.ok(m, `${name} not found in app.js`);
  return js.slice(m.index, js.indexOf('\n}\n', m.index) + 2);
}

// The cap is a top-level const shared with the loading placeholder (tests/discover-loading.test.mjs).
const perSection = Number(js.match(/^const SEASON_RECS_PER_SECTION = (\d+);/m)?.[1]);

// AniList returns `perSeason` titles for each season; `owned` ids are on the user's list.
// v1.0.254 — `strongTest` stands in for _strongMatchTest (default: nothing passes).
function seasonal(perSeason, owned = [], strongTest = () => () => false) {
  const seasonsAsked = [];
  const ctx = vm.createContext({
    console,
    animeList: owned.map(id => ({ id })),
    SEASON_RECS_PER_SECTION: perSection,
    getCurrentSeason: () => ({ season: 'FALL', year: 2026 }),
    getNextSeason: () => ({ season: 'WINTER', year: 2027 }),
    _buildGenreAffinity: () => new Map(),
    _tasteEloRange: () => ({ eloMin: 0, eloRange: 1 }),
    _strongMatchTest: strongTest,
    _computeTasteScore: () => null,
    setTimeout: (fn) => fn(),
    _anilistFetch: async ({ variables }) => {
      seasonsAsked.push(variables.season);
      const base = variables.season === 'FALL' ? 1000 : 2000;
      const media = Array.from({ length: perSeason }, (_, i) => ({
        id: base + i, title: { english: `T${base + i}` }, averageScore: 90 - i, genres: [],
      }));
      return { ok: true, json: async () => ({ data: { Page: { media } } }) };
    },
  });
  vm.runInContext(fnSource('fetchSeasonalRecommendations'), ctx);
  vm.runInContext(fnSource('_strongMatchPick'), ctx); // v1.0.254 — the real per-section Strong match cap
  return { seasonsAsked, run: () => vm.runInContext('fetchSeasonalRecommendations()', ctx) };
}

test('each season shows 12 cards from one fetch per season', async () => {
  assert.equal(perSection, 12, 'SEASON_RECS_PER_SECTION should be 12 (full rows of 6/4/3/2)');
  const s = seasonal(50);
  const res = await s.run();
  assert.equal(res.current.length, 12);
  assert.equal(res.next.length, 12);
  assert.deepEqual(s.seasonsAsked, ['FALL', 'WINTER']); // no extra AniList requests
});

test('a season with fewer than 12 titles shows what there is', async () => {
  const res = await seasonal(5).run();
  assert.equal(res.current.length, 5);
  assert.equal(res.next.length, 5);
});

test('unwatched titles fill the 12 before any watched one', async () => {
  const owned = [1000, 1001, 1002]; // the three best-scored FALL titles
  const res = await seasonal(50, owned).run();
  assert.equal(res.current.length, 12);
  assert.ok(res.current.every(r => !r.watched));
  const thin = await seasonal(14, Array.from({ length: 10 }, (_, i) => 1000 + i)).run();
  assert.deepEqual(thin.current.map(r => r.watched), [...Array(4).fill(false), ...Array(8).fill(true)]);
});

// v1.0.254 — 🎯 on at most a fifth of a season's shown unwatched cards (rounded up), best fit first, never on watched.
test('Strong match is capped per season and skips watched cards', async () => {
  const all = () => { const t = () => true; t.fit = m => -m.id; return t; }; // every title passes; lower id fits better
  const res = await seasonal(50, [], all).run();
  assert.deepEqual(res.current.filter(r => r._strong).map(r => r.media.id), [1000, 1001, 1002]); // 12 → 3
  assert.equal(res.next.filter(r => r._strong).length, 3);
  const thin = await seasonal(14, Array.from({ length: 10 }, (_, i) => 1000 + i), all).run();
  assert.deepEqual(thin.current.filter(r => r._strong).map(r => r.media.id), [1010]); // 4 unwatched → 1
  assert.ok(thin.current.filter(r => r.watched).every(r => !r._strong));
  const none = await seasonal(50).run();
  assert.ok([...none.current, ...none.next].every(r => r._strong === false));
});

test('the rec-card hover lift only applies on hover-capable pointers', () => {
  const lines = css.split('\n').filter(l => l.includes('.rec-card:hover'));
  assert.ok(lines.length > 0, '.rec-card:hover rule not found');
  for (const l of lines) assert.match(l, /@media \(hover: hover\)/);
});

// v1.0.255 — the This Season subtitle must match the 12-card fill (unwatched first, then any ✓ Watched),
// not claim the list is unwatched-only. Runs the real setRecsTab with a cached grid, so nothing is fetched.
test('This Season subtitle says unwatched titles come first, not unwatched-only', () => {
  const els = {};
  const ctx = vm.createContext({
    IDS: new Proxy({}, { get: (_, k) => String(k) }),
    byId: (id) => (els[id] ??= { innerHTML: '', textContent: '', style: {}, classList: { toggle() {} } }),
    document: { querySelectorAll: () => [] },
    recsTab: 'foryou', _recsCache: { seasonal: { html: '<p>cards</p>', gridDisplay: 'block' } },
    _recsLoadedTab: null, _moodRecActive: false, _activeMoodKey: null,
    _metric() {}, _renderPredictorExamples() {}, renderFranchiseGaps() {},
    getCurrentSeason: () => ({ season: 'FALL', year: 2026 }),
    getNextSeason: () => ({ season: 'WINTER', year: 2027 }),
  });
  vm.runInContext(fnSource('setRecsTab'), ctx);
  ctx.setRecsTab('seasonal');
  const sub = els.recsSubText.innerHTML;
  assert.match(sub, /^Airing this season \(FALL 2026\) and next \(WINTER 2027\) — titles you haven't watched come first\.<br>/);
  assert.doesNotMatch(sub, /filtered/i);
  assert.match(sub, /🎯 <strong>Strong match<\/strong> highlights/); // second line unchanged
  assert.equal(els.recsGrid.innerHTML, '<p>cards</p>');            // cache restore untouched
  // Help describes This Season without an unwatched-only claim
  const help = html.match(/<em>This Season<\/em> \(([^)]*)\)/)?.[1];
  assert.ok(help, 'Help should describe This Season');
  assert.doesNotMatch(help, /unwatched|haven't watched|filtered/i);
});
