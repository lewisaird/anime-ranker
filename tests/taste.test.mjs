#!/usr/bin/env node
// tests/taste.test.mjs
//
// v1.0.253 — Strong match badge. Unlike elo/franchise tests, these functions
// are pulled straight out of app.js (by name) and run against fixture lists,
// so a later edit to the real code is what gets tested — no copy to drift.
//
// Runs via:   node --test tests/taste.test.mjs
// Or via:     npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const js   = readFileSync(join(here, '..', 'app.js'), 'utf8');

// Top-level `function name(` … closing `}` at column 0, or a one-line `const name = …;`.
function grab(name) {
  const fn = js.match(new RegExp(`^function ${name}\\([\\s\\S]*?^}`, 'm'));
  if (fn) return fn[0];
  const c = js.match(new RegExp(`^const ${name} = .*;$`, 'm'));
  if (c) return c[0];
  throw new Error(`${name} not found in app.js`);
}
const NAMES = ['_isRanked', 'MIN_RANKED_FOR_INSIGHTS', '_buildGenreAffinity', '_meanGenreElo',
  '_computeTasteScore', '_tasteEloRange', 'STRONG_MATCH_PERCENTILE', '_strongMatchTest',
  '_strongMatchPick']; // v1.0.254 — per-section cap
// animeList / excludedIds are app globals; the factory takes them as arguments.
function load(animeList, excludedIds = new Set()) {
  return new Function('animeList', 'excludedIds',
    `${NAMES.map(grab).join('\n')}\nreturn { ${NAMES.join(', ')} };`)(animeList, excludedIds);
}

// Fixture: 30 ranked anime. Action titles sit high, Romance low, Comedy middling.
let nextId = 1;
const a = (genres, elo, battles = 3) => ({ id: nextId++, genres, elo, battles });
function rankedList() {
  nextId = 1;
  return [
    ...Array.from({ length: 10 }, (_, i) => a(['Action', 'Comedy'], 1350 + i * 5)),
    ...Array.from({ length: 10 }, (_, i) => a(['Romance', 'Comedy'], 1050 + i * 5)),
    ...Array.from({ length: 10 }, (_, i) => a(['Comedy', 'Drama'],   1180 + i * 5)),
  ];
}

test('no badge below MIN_RANKED_FOR_INSIGHTS ranked anime', () => {
  const list = rankedList().slice(0, 19);                       // 19 ranked
  list.push(...Array.from({ length: 50 }, () => a(['Action'], 1200, 0))); // unranked don't count
  const { _strongMatchTest, MIN_RANKED_FOR_INSIGHTS } = load(list);
  assert.equal(MIN_RANKED_FOR_INSIGHTS, 20);
  assert.equal(_strongMatchTest()({ genres: ['Action'] }), false);
});

test('a rec in the user\'s best genre is badged; weak or unknown genres are not', () => {
  const isStrong = load(rankedList())._strongMatchTest();
  assert.equal(isStrong({ genres: ['Action'] }), true);
  assert.equal(isStrong({ genres: ['Action', 'Comedy'] }), true);
  assert.equal(isStrong({ genres: ['Romance'] }), false);
  assert.equal(isStrong({ genres: ['Comedy', 'Drama'] }), false);
  assert.equal(isStrong({ genres: ['Mecha'] }), false);          // genre the user hasn't ranked
  assert.equal(isStrong({ genres: [] }), false);
  assert.equal(isStrong({}), false);
});

test('only ranked, non-excluded anime shape the test', () => {
  const base = rankedList();
  const ref  = load(base)._strongMatchTest();
  // 200 unranked Romance titles at the neutral 1200 must not change anything
  const withUnranked = [...base, ...Array.from({ length: 200 }, () => a(['Romance'], 1200, 0))];
  const t1 = load(withUnranked)._strongMatchTest();
  for (const g of [['Action'], ['Romance'], ['Comedy', 'Drama'], ['Action', 'Comedy']]) {
    assert.equal(t1({ genres: g }), ref({ genres: g }), g.join('+'));
  }
  // Excluding every Action title removes Action from the map entirely
  const actionIds = new Set(base.filter(x => x.genres.includes('Action')).map(x => x.id));
  const t2 = load(base, actionIds)._strongMatchTest();
  assert.equal(t2({ genres: ['Action'] }), false);
});

test('badges roughly the top fifth of the user\'s own ranked list, never below their mean', () => {
  // 40 anime, one distinct genre each in 8 groups of 5, ELO rising by group
  nextId = 1;
  const list = [];
  for (let gi = 0; gi < 8; gi++) for (let k = 0; k < 5; k++) list.push(a([`G${gi}`], 1000 + gi * 50 + k));
  const isStrong = load(list)._strongMatchTest();
  const share = list.filter(x => isStrong(x)).length / list.length;
  assert.ok(share > 0.1 && share <= 0.25, `own-list badge share ${share}`);
  const mean = list.reduce((s, x) => s + x.elo, 0) / list.length;
  for (const x of list) if (isStrong(x)) assert.ok(x.elo > mean);
});

// v1.0.254 — a section badges at most a fifth of its cards (rounded up), best genre fit first.
test('a section badges at most a fifth of its cards, best fit first', () => {
  const f = load(rankedList());
  const isStrong = f._strongMatchTest();
  const pick = medias => f._strongMatchPick(medias.map(media => ({ media })), isStrong);
  const action = () => ({ genres: ['Action'] });                  // best fit
  const mixed  = () => ({ genres: ['Action', 'Comedy'] });        // passes, lower fit
  const weak   = () => ({ genres: ['Romance'] });                 // fails
  // a For You row of 6 that all pass → 2, and the two pure-Action cards win
  const row = [mixed(), mixed(), action(), mixed(), action(), mixed()];
  assert.ok(row.every(m => isStrong(m)));
  const got = pick(row);
  assert.equal(got.size, 2);
  assert.ok(got.has(row[2]) && got.has(row[4]));
  // 4 cards → 1; 8 → 2; 10 → 2; 12 (a This Season section) → 3; a single card behaves like the plain test
  assert.equal(pick([mixed(), action(), mixed(), mixed()]).size, 1);
  assert.equal(pick(Array.from({ length: 8 }, action)).size, 2);
  assert.equal(pick(Array.from({ length: 10 }, action)).size, 2);
  assert.equal(pick(Array.from({ length: 12 }, action)).size, 3);
  const one = action();
  assert.ok(pick([one]).has(one));
  // never badges a card that fails the test, even when the cap has room
  const w = weak();
  assert.equal(pick([w, mixed(), mixed(), mixed(), mixed()]).has(w), false);
  assert.equal(pick([weak(), weak(), weak()]).size, 0);
  assert.equal(pick([]).size, 0);
  // below MIN_RANKED_FOR_INSIGHTS the test is () => false: nothing picked, no throw
  const few = load(rankedList().slice(0, 19));
  assert.equal(few._strongMatchPick([{ media: action() }], few._strongMatchTest()).size, 0);
});

test('This Season sort score is unchanged (all-anime map, count >= 2, min-max scale)', () => {
  const list = [...rankedList(), a(['Action', 'Mecha'], 1200, 0), a(['Mecha'], 1100, 0)];
  const f = load(list);
  const aff = f._buildGenreAffinity();
  assert.ok(aff.has('Mecha'));                                  // count 2, unranked included, as before
  const { eloMin, eloRange } = f._tasteEloRange();
  const m = { genres: ['Action', 'Mecha'] };
  const hits = m.genres.map(g => aff.get(g));
  const expected = ((hits[0] + hits[1]) / 2 - eloMin) / eloRange;
  assert.equal(f._computeTasteScore(m, aff, eloMin, eloRange), expected);
  assert.equal(f._computeTasteScore({ genres: ['Nope'] }, aff, eloMin, eloRange), null);
  assert.equal(f._computeTasteScore({ genres: [] }, aff, eloMin, eloRange), null);
  assert.equal(f._computeTasteScore(m, new Map(), eloMin, eloRange), null);
});
