#!/usr/bin/env node
// tests/elo.test.mjs
//
// Invariant tests for the ELO engine used by Kessen.
//
// Runs via:   node --test tests/elo.test.mjs
// Or via:     npm test
//
// ⚠️  These reimplement the pure logic from index.html so they can run outside
// the browser. If you change the functions in index.html, update these copies
// too — the suite's job is to catch accidental drift in either direction.

import { test } from 'node:test';
import assert from 'node:assert/strict';

// ─── Constants copied from index.html ────────────────────────────────────────
const K         = 32;
const ELO_FLOOR = 400;
const TARGET_BATTLES_PER_ANIME = 10;

// ─── Pure functions copied from index.html ───────────────────────────────────
function expectedScore(ra, rb) {
  return 1 / (1 + Math.pow(10, (rb - ra) / 400));
}

function updateElo(winner, loser) {
  const ea = expectedScore(winner.elo, loser.elo);
  const eb = expectedScore(loser.elo, winner.elo);
  winner.elo = Math.round(winner.elo + K * (1 - ea));
  loser.elo  = Math.max(ELO_FLOOR, Math.round(loser.elo + K * (0 - eb)));
  winner.wins++;
  loser.losses++;
  winner.comparisons++;
  loser.comparisons++;
}

function eloToScore10(rank0, total) {
  const pct = 1 - (rank0 / Math.max(total, 1));
  if (pct >= 0.95) return 10;
  if (pct >= 0.85) return 9;
  if (pct >= 0.70) return 8;
  if (pct >= 0.50) return 7;
  if (pct >= 0.30) return 6;
  if (pct >= 0.15) return 5;
  if (pct >= 0.08) return 4;
  if (pct >= 0.04) return 3;
  if (pct >= 0.02) return 2;
  return 1;
}

function confidenceLabel(battles) {
  if (battles < 3) return 'uncertain';
  if (battles < TARGET_BATTLES_PER_ANIME) return 'settling';
  return 'confident';
}

const makePlayer = (elo) => ({ elo, wins: 0, losses: 0, comparisons: 0 });

// ─── expectedScore ───────────────────────────────────────────────────────────

test('expectedScore: equal ratings produce 0.5 each', () => {
  assert.equal(expectedScore(1200, 1200), 0.5);
});

test('expectedScore: pair sums to 1 at any rating difference', () => {
  for (const [ra, rb] of [[1200, 1200], [800, 1600], [2000, 400], [1234, 987]]) {
    const total = expectedScore(ra, rb) + expectedScore(rb, ra);
    assert.ok(Math.abs(total - 1) < 1e-12, `a+b=${total} for (${ra},${rb})`);
  }
});

test('expectedScore: higher rating → score > 0.5', () => {
  assert.ok(expectedScore(1400, 1200) > 0.5);
  assert.ok(expectedScore(1200, 1400) < 0.5);
});

test('expectedScore: monotonic in rating difference', () => {
  let prev = -Infinity;
  for (let d = -800; d <= 800; d += 50) {
    const s = expectedScore(1200 + d, 1200);
    assert.ok(s > prev, `monotonicity broken at diff=${d}`);
    prev = s;
  }
});

// ─── updateElo ───────────────────────────────────────────────────────────────

test('updateElo: conservation of rating points (no floor)', () => {
  const w = makePlayer(1200);
  const l = makePlayer(1200);
  const before = w.elo + l.elo;
  updateElo(w, l);
  // Rounding introduces up to ±1 drift; real code accepts this.
  assert.ok(Math.abs((w.elo + l.elo) - before) <= 1);
});

test('updateElo: upset (800 vs 1600) rewards winner heavily', () => {
  const w = makePlayer(800);
  const l = makePlayer(1600);
  updateElo(w, l);
  assert.equal(w.elo, 832);  // 800 + 32*(1 - 0.009) ≈ 832
  assert.equal(l.elo, 1568); // 1600 + 32*(0 - 0.991) ≈ 1568
});

test('updateElo: equal ratings give ±16 swing', () => {
  const w = makePlayer(1200);
  const l = makePlayer(1200);
  updateElo(w, l);
  assert.equal(w.elo, 1216);
  assert.equal(l.elo, 1184);
});

test('updateElo: ELO floor is respected', () => {
  const w = makePlayer(1600);
  const l = makePlayer(ELO_FLOOR + 5); // 5 above floor, single loss would push below
  updateElo(w, l);
  assert.ok(l.elo >= ELO_FLOOR, `loser dipped below floor: ${l.elo}`);
});

test('updateElo: win/loss/comparisons counters increment', () => {
  const w = makePlayer(1200);
  const l = makePlayer(1200);
  updateElo(w, l);
  assert.equal(w.wins, 1);
  assert.equal(w.losses, 0);
  assert.equal(w.comparisons, 1);
  assert.equal(l.wins, 0);
  assert.equal(l.losses, 1);
  assert.equal(l.comparisons, 1);
});

// ─── eloToScore10 ────────────────────────────────────────────────────────────

test('eloToScore10: top rank is 10, bottom is 1', () => {
  assert.equal(eloToScore10(0, 100), 10);
  assert.equal(eloToScore10(99, 100), 1);
});

test('eloToScore10: median lands at 7 for even lists', () => {
  for (const n of [10, 20, 100, 200, 500]) {
    // Middle rank: a list of 100 has median between rank 49 and 50; both should be 7.
    assert.equal(eloToScore10(n / 2, n), 7, `n=${n}`);
  }
});

test('eloToScore10: monotonically non-increasing as rank grows', () => {
  for (const n of [50, 100, 200, 500, 1000]) {
    let prev = 11;
    for (let i = 0; i < n; i++) {
      const s = eloToScore10(i, n);
      assert.ok(s <= prev, `non-monotonic at n=${n} i=${i}: ${prev} → ${s}`);
      prev = s;
    }
  }
});

test('eloToScore10: all ten buckets reachable for N ≥ 100', () => {
  const seen = new Set();
  for (let i = 0; i < 200; i++) seen.add(eloToScore10(i, 200));
  for (let s = 1; s <= 10; s++) assert.ok(seen.has(s), `score ${s} unreachable`);
});

test('eloToScore10: total bucket widths sum to 100%', () => {
  const n = 10000; // huge N to approximate percentiles
  const hist = {};
  for (let i = 0; i < n; i++) {
    const s = eloToScore10(i, n);
    hist[s] = (hist[s] || 0) + 1;
  }
  const total = Object.values(hist).reduce((a, b) => a + b, 0);
  assert.equal(total, n);
  // Sanity: widest bucket is 6 or 7 (each 20% of the list), narrowest is 1 (2%).
  const widest   = Math.max(...Object.values(hist));
  const narrowest = hist[1];
  assert.ok(widest  >= 0.19 * n && widest  <= 0.21 * n, `widest bucket = ${widest}`);
  assert.ok(narrowest <= 0.025 * n, `bucket 1 too wide = ${narrowest}`);
});

// ─── confidenceLabel ─────────────────────────────────────────────────────────

test('confidenceLabel: thresholds at 3 and TARGET_BATTLES_PER_ANIME', () => {
  assert.equal(confidenceLabel(0),  'uncertain');
  assert.equal(confidenceLabel(2),  'uncertain');
  assert.equal(confidenceLabel(3),  'settling');
  assert.equal(confidenceLabel(TARGET_BATTLES_PER_ANIME - 1), 'settling');
  assert.equal(confidenceLabel(TARGET_BATTLES_PER_ANIME),     'confident');
  assert.equal(confidenceLabel(100), 'confident');
});

// ─── End-to-end simulation: a small tournament converges ────────────────────

test('end-to-end: best anime rises to top after a round-robin', () => {
  // 5 anime, truly-ordered strength: indices 0 > 1 > 2 > 3 > 4.
  // Every pair plays 8 rounds; "truly stronger" always wins.
  const list = [0, 1, 2, 3, 4].map(() => makePlayer(1200));
  for (let round = 0; round < 8; round++) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        updateElo(list[i], list[j]); // i has lower index (strongest), so i wins
      }
    }
  }
  // After round-robin, ELO must be strictly descending.
  for (let i = 0; i < list.length - 1; i++) {
    assert.ok(list[i].elo > list[i + 1].elo,
      `tournament ordering broken: list[${i}].elo=${list[i].elo} ≤ list[${i+1}].elo=${list[i+1].elo}`);
  }
});
