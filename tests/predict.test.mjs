#!/usr/bin/env node
// tests/predict.test.mjs
//
// v1.0.253 — Predict (Discover → Predict): self-calibrated tier, honest
// confidence and typed-title matching.
//
// Runs via:   node --test tests/predict.test.mjs
// Or via:     npm test
//
// Unlike the older suites this does not copy the logic: it pulls the real
// function bodies out of app.js by name and runs them in a vm context with
// the few globals they read, so drift is impossible.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const src  = readFileSync(join(here, '..', 'app.js'), 'utf8');

// Source of a top-level function declaration, by brace matching.
function grab(name) {
  const start = src.indexOf(`\nfunction ${name}(`);
  assert.ok(start >= 0, `function ${name} not found in app.js`);
  let i = src.indexOf(') {', start) + 2, depth = 0; // body brace (skips `(` `)` in default params)
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}' && --depth === 0) break;
  }
  return src.slice(start + 1, i + 1);
}
function grabLine(re) {
  const m = src.match(re);
  assert.ok(m, `line ${re} not found in app.js`);
  return m[0];
}

function makeContext() {
  const ctx = vm.createContext({});
  const code = [
    'var animeList = []; var excludedIds = new Set(); var battleCount = 0;',
    grabLine(/const SETTLING_MIN_BATTLES = \d+;/),
    grabLine(/const MIN_RANKED_FOR_INSIGHTS = \d+;/),
    grabLine(/const PREDICT_CALIB_PAIRS = \d+;/),
    'let _predictCalib = null;',
    ...['getTier', '_isRanked', '_rankedEloOrder', '_predictRaw', '_predictCalibration',
        '_predictPctAbove', '_predictElo', '_predictorBestMatch'].map(grab),
    'globalThis.__calib = () => _predictCalib;',
  ].join('\n');
  vm.runInContext(code, ctx);
  return ctx;
}

// Deterministic synthetic list: hidden quality q drives ELO; genres carry taste.
function rng(seed) {
  return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; };
}
const GENRES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Thriller'];
function makeWorld(seed, n, battles) {
  const r = rng(seed);
  const gauss = () => { let u = 0; while (!u) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); };
  const aff = Object.fromEntries(GENRES.map(g => [g, gauss() * 0.6]));
  const make = id => {
    const gs = new Set(); while (gs.size < 3) gs.add(GENRES[Math.floor(r() * GENRES.length)]);
    const genres = [...gs];
    const q = gauss() + genres.reduce((s, g) => s + aff[g], 0) / Math.sqrt(3);
    return { id, title: 'A' + id, genres, format: r() < 0.8 ? 'TV' : 'MOVIE', seasonYear: 2000 + Math.floor(r() * 25),
      globalScore: Math.round(Math.max(45, Math.min(90, 72 + 4 * q + 3 * gauss()))), q,
      elo: Math.round(1200 + 120 * q + 30 * gauss()), battles };
  };
  const list = Array.from({ length: n }, (_, i) => make(i + 1));
  const targets = Array.from({ length: 150 }, (_, i) => make(100000 + i));
  const toMedia = t => ({ genres: t.genres, seasonYear: t.seasonYear, averageScore: t.globalScore, format: t.format });
  return { list, targets: targets.map(toMedia) };
}

test('tiers spread across S..D instead of piling into B/C', () => {
  const ctx = makeContext();
  const { list, targets } = makeWorld(12345, 370, 5); // about Lewis's list size
  ctx.animeList = list; ctx.battleCount = 500;
  const t0 = performance.now();
  ctx._predictElo(targets[0]); // first call also calibrates
  console.log(`    calibration for 370 ranked anime: ${(performance.now() - t0).toFixed(0)} ms (cached afterwards)`);
  const counts = { S: 0, A: 0, B: 0, C: 0, D: 0 };
  for (const t of targets) counts[ctx._predictElo(t).tier]++;
  assert.ok(counts.S > 0 && counts.D > 0, `S and D reachable: ${JSON.stringify(counts)}`);
  assert.ok(counts.B + counts.C < targets.length * 0.75, `B+C no longer dominate: ${JSON.stringify(counts)}`);
});

test('#N of M, tier and ELO match the ranked list the Rankings tab uses', () => {
  const ctx = makeContext();
  const { list, targets } = makeWorld(7, 120, 5);
  list[0].elo = 1200; list[0].battles = 0; // one unranked anime: not counted in M
  ctx.animeList = list; ctx.battleCount = 300;
  const { ranked, total } = ctx._rankedEloOrder();
  assert.equal(total, 119);
  for (const t of targets.slice(0, 40)) {
    const p = ctx._predictElo(t);
    assert.equal(p.totalAnime, total + 1);
    assert.ok(p.rankPos >= 1 && p.rankPos <= total + 1);
    assert.equal(p.tier, ctx.getTier(p.rankPos - 1, total + 1));
    assert.equal(p.predictedElo, ranked[Math.min(p.rankPos - 1, total - 1)].elo);
  }
});

test('calibration is cached, and refreshed when battleCount or an ELO changes', () => {
  const ctx = makeContext();
  const { list, targets } = makeWorld(99, 150, 5);
  ctx.animeList = list; ctx.battleCount = 400;
  ctx._predictElo(targets[0]);
  const first = ctx.__calib();
  assert.equal(first.raw.length, 150, 'every ranked anime scored (leave-one-out)');
  ctx._predictElo(targets[1]);
  assert.equal(ctx.__calib(), first, 'same state → cached');
  ctx.battleCount = 401;
  ctx._predictElo(targets[1]);
  const second = ctx.__calib();
  assert.notEqual(second, first, 'battleCount change → recalibrated');
  list[5].elo += 24; // e.g. undo then a different pick: same battleCount, different ELOs
  ctx._predictElo(targets[1]);
  assert.notEqual(ctx.__calib(), second, 'ELO change → recalibrated');
});

test('first-run cost is bounded on very long lists', () => {
  const ctx = makeContext();
  const { list, targets } = makeWorld(3, 2000, 5);
  ctx.animeList = list; ctx.battleCount = 4000;
  const t0 = performance.now();
  ctx._predictElo(targets[0]);
  const ms = performance.now() - t0;
  const n = ctx.__calib().raw.length;
  assert.ok(n >= 40 && n <= 80, `scored an even sample, not all 2000 (got ${n})`);
  console.log(`    calibration for 2000 ranked anime: ${n} scored in ${ms.toFixed(0)} ms`);
});

test('confidence is not High when similar anime are unsettled', () => {
  const ctx = makeContext();
  const { list, targets } = makeWorld(42, 200, 1); // every anime has 1 battle
  ctx.animeList = list; ctx.battleCount = 100;
  for (const t of targets) {
    const c = ctx._predictElo(t).confidence;
    assert.notEqual(c.level, 'high');
    assert.match(c.note, /^0 of 12 similar anime have 3\+ battles · /);
  }
});

test('confidence can reach High when neighbours are settled and signals agree', () => {
  const ctx = makeContext();
  const { list, targets } = makeWorld(42, 200, 10);
  ctx.animeList = list; ctx.battleCount = 1000;
  const levels = targets.map(t => ctx._predictElo(t).confidence.level);
  assert.ok(levels.includes('high'), 'some High');
  assert.ok(levels.some(l => l !== 'high'), 'not High by default');
});

test('Predict still needs MIN_RANKED_FOR_INSIGHTS ranked anime', () => {
  const ctx = makeContext();
  const { list, targets } = makeWorld(1, 19, 3);
  ctx.animeList = list;
  assert.equal(ctx._predictElo(targets[0]), null);
});

// Real AniList Page(search:, sort: SEARCH_MATCH) results, trimmed (captured 2026-10-01).
const FRIEREN = [
  { id: 170068, title: { english: null, romaji: 'Sousou no Frieren: ●● no Mahou', userPreferred: 'Sousou no Frieren: ●● no Mahou' }, popularity: 11020 },
  { id: 189513, title: { english: null, romaji: 'Sousou no Frieren: ●● no Mahou Part 2', userPreferred: 'Sousou no Frieren: ●● no Mahou Part 2' }, popularity: 4582 },
  { id: 154587, title: { english: 'Frieren: Beyond Journey’s End', romaji: 'Sousou no Frieren', userPreferred: 'Sousou no Frieren' }, popularity: 485296 },
  { id: 182255, title: { english: 'Frieren: Beyond Journey’s End Season 2', romaji: 'Sousou no Frieren 2nd Season', userPreferred: 'Sousou no Frieren 2nd Season' }, popularity: 228039 },
];
const BOCCHI = [
  { id: 102448, title: { english: 'Ouch, Chou Chou', romaji: 'Aitata Bocchi', userPreferred: 'Aitata Bocchi' }, popularity: 241 },
  { id: 130003, title: { english: 'BOCCHI THE ROCK!', romaji: 'Bocchi the Rock!', userPreferred: 'Bocchi the Rock!' }, popularity: 267854 },
  { id: 165253, title: { english: 'BOCCHI THE ROCK! Recap Part 1', romaji: 'Bocchi the Rock! Re:', userPreferred: 'Bocchi the Rock! Re:' }, popularity: 25989 },
];
const YOUR_NAME = [
  { id: 97962, title: { english: null, romaji: 'Suntory Minami Alps no Tennen Mizu', userPreferred: 'Suntory Minami Alps no Tennen Mizu' }, popularity: 7376 },
  { id: 21519, title: { english: 'Your Name.', romaji: 'Kimi no Na wa.', userPreferred: 'Kimi no Na wa.' }, popularity: 718199 },
];
const MONSTER = [
  { id: 19, title: { english: 'Monster', romaji: 'MONSTER', userPreferred: 'MONSTER' }, popularity: 344353 },
  { id: 204541, title: { english: 'MONSTER', romaji: 'MONSTER (Music)', userPreferred: 'MONSTER (Music)' }, popularity: 327 },
];

test('typed title picks the closest of several results', () => {
  const { _predictorBestMatch: best } = makeContext();
  assert.equal(best(FRIEREN, "Frieren: Beyond Journey's End").id, 154587, 'straight apostrophe matches the curly one');
  assert.equal(best(FRIEREN, 'sousou no frieren').id, 154587, 'romaji exact beats the spin-off prefix');
  assert.equal(best(FRIEREN, 'frieren').id, 154587, 'prefix tie → most popular');
  assert.equal(best(BOCCHI, 'bocchi').id, 130003);
  assert.equal(best(YOUR_NAME, 'your name').id, 21519);
  assert.equal(best(MONSTER, 'Monster').id, 19);
  assert.equal(best([], 'anything'), null);
  assert.equal(best(undefined, 'anything'), null);
});
