#!/usr/bin/env node
// tests/metrics-report.test.mjs — the pure aggregation behind
// tools/metrics-report.mjs. The Netlify read is not exercised here.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aggregate, formatReport } from '../tools/metrics-report.mjs';

const now = Date.parse('2026-09-29T12:00:00Z');
const iso = daysAgo => new Date(now - daysAgo * 86400000).toISOString();

const sessions = [
  { savedAt: iso(1),  battleCount: 300, animeList: new Array(250), metrics: { sessions: 40, counts: { battle: 300, 'tab.discover': 12, 'tower.start': 3 } } },
  { savedAt: iso(10), battleCount: 50,  animeList: new Array(80),  metrics: { sessions: 5,  counts: { battle: 50, 'tab.discover': 1 } } },
  { savedAt: iso(45), battleCount: 0,   animeList: new Array(30),  metrics: { sessions: 1,  counts: {} } },
  { savedAt: 'garbage', battleCount: 'x', animeList: null, metrics: null },   // malformed but counted as a user
  null,                                                                        // unreadable blob → skipped
];

test('aggregate: user counts, recency windows, totals and medians', () => {
  const r = aggregate(sessions, now);
  assert.equal(r.users, 4);
  assert.equal(r.active7, 1);
  assert.equal(r.active30, 2);
  assert.equal(r.battles, 350);
  assert.equal(r.sessions, 46);
  assert.equal(r.medianList, 55);       // [0,30,80,250] → (30+80)/2
  assert.equal(r.medianBattles, 25);    // [0,0,50,300] → (0+50)/2
});

test('aggregate: per-feature rows sorted by adoption then volume', () => {
  const r = aggregate(sessions, now);
  assert.deepEqual(r.features.map(f => f.key), ['battle', 'tab.discover', 'tower.start']);
  const battle = r.features[0];
  assert.equal(battle.users, 2);
  assert.equal(battle.pctUsers, 50);
  assert.equal(battle.total, 350);
  assert.equal(battle.perUser, 175);
  assert.equal(r.features[2].perUser, 3);
});

test('aggregate: empty input', () => {
  const r = aggregate([], now);
  assert.equal(r.users, 0);
  assert.deepEqual(r.features, []);
  assert.match(formatReport(r), /no counters found/);
});

test('formatReport prints one row per feature and no per-user data', () => {
  const out = formatReport(aggregate(sessions, now));
  assert.match(out, /Users with a cloud save: 4/);
  assert.match(out, /^battle\s+2\s+50%\s+350\s+175$/m);
  assert.doesNotMatch(out, /garbage|savedAt/);
});
