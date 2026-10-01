#!/usr/bin/env node
// tests/franchise-stats.test.mjs
//
// v1.0.254 — franchise card numbers (_franchiseGroupStats). Like
// battle-within.test.mjs, the real functions (and the confidence cut-offs)
// are read out of app.js and run in a vm sandbox, so the test can't drift
// from the app.
//
// Runs via:   node --test tests/franchise-stats.test.mjs
// Or via:     npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const js = readFileSync(join(here, '..', 'app.js'), 'utf8');

// Top-level `function name(...) {` up to the first column-0 `}` after it.
function fnSource(name) {
  const m = js.match(new RegExp(`^function ${name}\\(.*\\{$[\\s\\S]*?^\\}$`, 'm'));
  if (!m) throw new Error(`function ${name} not found in app.js`);
  return m[0];
}
function constNumber(name) {
  const m = js.match(new RegExp(`^const ${name} = (\\d+);`, 'm'));
  if (!m) throw new Error(`const ${name} not found in app.js`);
  return Number(m[1]);
}

const SETTLING = constNumber('SETTLING_MIN_BATTLES');
const TARGET   = constNumber('TARGET_BATTLES_PER_ANIME');
const SRC = ['_franchiseGroupStats', '_isRanked', '_battleWithinKey', 'confidenceLabel', '_nBattles']
  .map(fnSource).join('\n\n');

function stats(members, matchupStats = {}) {
  const ctx = vm.createContext({ matchupStats, SETTLING_MIN_BATTLES: SETTLING, TARGET_BATTLES_PER_ANIME: TARGET });
  vm.runInContext(SRC, ctx);
  const sorted = members.slice().sort((a, b) => b.elo - a.elo); // _buildFranchiseGroups sorts first
  return { s: ctx._franchiseGroupStats(sorted), ctx };
}
const anime = (id, elo, battles = 0, wins = 0, losses = 0) =>
  ({ id, elo, battles, wins, losses, cover: `c${id}`, format: 'TV' });

test('average, best and cover ignore Unranked 1200 entries', () => {
  const { s } = stats([anime(1, 1550, 5, 4, 1), anime(2, 1200), anime(3, 1200)]);
  assert.equal(s.bestElo, 1550); // was 1317 with the 1200s averaged in
  assert.equal(s.peakElo, 1550);
  assert.equal(s.cover, 'c1');
});

test('an Unranked 1200 entry is never the ★ Best or the cover', () => {
  const { s } = stats([anime(1, 1200), anime(2, 1180, 4, 1, 3), anime(3, 1150, 4, 1, 3)]);
  assert.equal(s.peakElo, 1180);
  assert.equal(s.cover, 'c2');
  assert.equal(s.bestElo, 1165);
});

test('a score-seeded entry (ELO away from 1200, no battles) counts as ranked', () => {
  const { s } = stats([anime(1, 1300), anime(2, 1200)]);
  assert.equal(s.bestElo, 1300);
  assert.equal(s.statMembers.length, 1);
});

test('no ranked member: falls back to every member', () => {
  const { s } = stats([anime(1, 1200), anime(2, 1200)]);
  assert.equal(s.bestElo, 1200);
  assert.equal(s.statMembers.length, 2);
  assert.equal(s.avgBattles, 0);
  assert.equal(s.winRate, null);
  assert.equal(s.coherence, undefined); // was "Consistent" from two untouched 1200s
});

test('battles between two members count once and stay out of the win rate', () => {
  // 1 and 2 battle each other 6 times (1 wins 4); 1 beats outsider 99 once; 2 loses to 99 twice.
  const ms = {
    '1-2':  { wins: { 1: 4, 2: 2 }, total: 6 },
    '1-99': { wins: { 1: 1 }, total: 1 },
    '2-99': { wins: { 99: 2 }, total: 2 },
  };
  const { s } = stats([anime(1, 1300, 7, 5, 2), anime(2, 1250, 8, 2, 6)], ms);
  assert.equal(s.insideBattles, 6);
  assert.equal(s.totalBattles, 9); // was 15
  assert.equal(s.wins, 1);
  assert.equal(s.losses, 2);
  assert.equal(s.winRate, 33); // was 47
});

test('inside battles never push the counters negative', () => {
  const ms = { '1-2': { wins: { 1: 10 }, total: 10 } }; // more than the counters hold
  const { s } = stats([anime(1, 1300, 2, 1, 1), anime(2, 1250, 2, 1, 1)], ms);
  assert.ok(s.wins >= 0 && s.losses >= 0 && s.totalBattles >= 0);
  assert.equal(s.insideBattles, 2); // clamped to the 2 wins / 2 losses on record
});

test('confidence uses battles per ranked entry against the per-anime cut-offs', () => {
  // Five entries just under the "settling" cut-off: the old franchise sum read as far more.
  const per = SETTLING - 1;
  const five = [1, 2, 3, 4, 5].map(id => anime(id, 1200 + id, per));
  const { s, ctx } = stats(five);
  assert.equal(s.avgBattles, per);
  assert.equal(ctx.confidenceLabel(s.avgBattles).label, 'Uncertain');
  // Half a battle short of the cut-off stays below it (shown to one decimal); the Unranked entry isn't counted.
  const { s: s2, ctx: c2 } = stats([anime(1, 1300, SETTLING), anime(2, 1250, SETTLING - 1), anime(3, 1200)]);
  assert.equal(s2.avgBattles, SETTLING - 0.5);
  assert.equal(c2.confidenceLabel(s2.avgBattles).label, 'Uncertain');
  // Never rounds up across a cut-off: 2 × (TARGET) + 1 × (TARGET − 1) → TARGET − 1/3 → shows TARGET − 0.4.
  const { s: s3, ctx: c3 } = stats([anime(1, 1300, TARGET), anime(2, 1250, TARGET), anime(3, 1210, TARGET - 1)]);
  assert.equal(s3.avgBattles, TARGET - 0.4);
  assert.equal(c3.confidenceLabel(s3.avgBattles).label, 'Settling');
  const { s: s4, ctx: c4 } = stats([anime(1, 1300, TARGET + 2), anime(2, 1250, TARGET)]);
  assert.equal(c4.confidenceLabel(s4.avgBattles).label, 'Confident');
});

test('consistency (Consistent / Mixed / Divisive) is measured over ranked entries only', () => {
  // One ranked entry plus two Unranked 1200s: no spread to judge (was "Divisive").
  const { s } = stats([anime(1, 1550, 5, 4, 1), anime(2, 1200), anime(3, 1200)]);
  assert.equal(s.coherence, undefined);
  // Two ranked entries 200 apart, plus an Unranked 1200 that is ignored.
  const { s: s2 } = stats([anime(1, 1500, 6, 4, 2), anime(2, 1300, 6, 2, 4), anime(3, 1200)]);
  assert.equal(s2.eloRange, 200);
  assert.equal(s2.eloStdDev, 100);
  assert.equal(s2.coherence, 'divisive');
  const { s: s3 } = stats([anime(1, 1310, 6, 3, 3), anime(2, 1290, 6, 3, 3), anime(3, 1200)]);
  assert.equal(s3.coherence, 'consistent');
});

test('a single-entry franchise keeps its own numbers', () => {
  const { s } = stats([anime(7, 1420, 9, 6, 3)]);
  assert.deepEqual(
    { bestElo: s.bestElo, peakElo: s.peakElo, totalBattles: s.totalBattles, winRate: s.winRate, avgBattles: s.avgBattles, coherence: s.coherence },
    { bestElo: 1420, peakElo: 1420, totalBattles: 9, winRate: 67, avgBattles: 9, coherence: undefined },
  );
});
