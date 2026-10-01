#!/usr/bin/env node
// tests/battle-within.test.mjs
//
// Battle Within Franchise pair picking (v1.0.253). Unlike elo/franchise tests,
// these run the real functions: each is cut out of app.js by name and run in
// a vm sandbox with stub globals, so the test can't drift from the app.
//
// Runs via:   node --test tests/battle-within.test.mjs
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

const FNS = [
  'pickOpponents', '_battleWithinKey', '_pickBattleWithinPair', '_takeValidPreloadedPair',
  '_recordBattleWithinPair', '_battleWithinProgress', '_battleWithinCheckDone',
  'stopBattleWithinFranchise', 'pickOneOpponent',
];
const SRC = FNS.map(fnSource).join('\n\n');

// n franchise members (indices 0..n-1) plus two outsiders at the end.
function sandbox(n) {
  const els = {};
  const ctx = vm.createContext({
    animeList: Array.from({ length: n + 2 }, (_, i) => ({
      id: 100 + i, elo: 1000 + i * 400, comparisons: i % 3, format: 'TV', status: 'COMPLETED',
    })),
    excludedIds: new Set(), hiddenFormatsBattle: new Set(), hiddenStatusesBattle: new Set(),
    avoidSameFranchise: false, trioMode: false,
    currentA: null, currentB: null, _preloadedPair: null, _preloadedImgs: null,
    IDS: { poolWarningBanner: 'pw', poolWarningText: 'pt', withinFranchiseBanner: 'wb', withinFranchiseMsg: 'wm', filterBtn: 'fb' },
    toasts: [], renders: 0,
  });
  ctx.byId = id => (els[id] ||= { textContent: '', classList: { add() {}, remove() {} } });
  ctx.showToast = msg => ctx.toasts.push(msg);
  ctx.renderBattle = () => { ctx.renders++; };
  ctx.renderTrio = () => { ctx.renders++; };
  ctx._sameFranchise = () => true;
  ctx.battleWithinFranchise = {
    name: 'Test', ids: new Set(ctx.animeList.slice(0, n).map(a => a.id)), battledPairs: new Set(),
  };
  vm.runInContext(SRC, ctx);
  ctx.els = els;
  return ctx;
}

const key = (ctx, i, j) => ctx._battleWithinKey(ctx.animeList[i].id, ctx.animeList[j].id);
const show = (ctx, [a, b]) => { ctx.currentA = a; ctx.currentB = b; };

// One decided battle the way pickWinner + renderBattle + _preloadNextBattlePair do it.
function decide(ctx) {
  const { currentA: a, currentB: b } = ctx;
  ctx._recordBattleWithinPair(ctx.animeList[a].id, ctx.animeList[b].id);
  const next = ctx._takeValidPreloadedPair() ?? ctx.pickOpponents();
  show(ctx, next);
  ctx._preloadedPair = ctx.pickOpponents();
}

test('key matches pickWinner\'s matchupStats key shape', () => {
  const ctx = sandbox(3);
  assert.equal(ctx._battleWithinKey(250, 7), '7-250');
  assert.equal(ctx._battleWithinKey(7, 250), '7-250');
  assert.match(js, /const _mKey = \[Math\.min\(wId, lId\), Math\.max\(wId, lId\)\]\.join\('-'\);/);
});

test('a franchise of N finishes in exactly N(N-1)/2 battles with no repeated pair', () => {
  for (let n = 2; n <= 8; n++) {
    for (let run = 0; run < 40; run++) {
      const ctx = sandbox(n);
      show(ctx, ctx.pickOpponents());
      ctx._preloadedPair = ctx.pickOpponents();
      const seen = new Set();
      let battles = 0;
      while (ctx.battleWithinFranchise && battles < 200) {
        const [a, b] = [ctx.currentA, ctx.currentB];
        assert.ok(a < n && b < n && a !== b, `n=${n}: non-member or self pair ${a},${b}`);
        const k = key(ctx, a, b);
        assert.ok(!seen.has(k), `n=${n}: pair ${k} shown again`);
        seen.add(k);
        decide(ctx);
        battles++;
      }
      assert.equal(battles, (n * (n - 1)) / 2, `n=${n}: took ${battles} battles`);
      assert.match(ctx.toasts.at(-1), /battled every pair in "Test"/);
      assert.equal(ctx.renders, 0, 'auto-stop inside a pick must not render (the caller does)');
    }
  }
});

test('next pair avoids the on-screen anime when an unbattled disjoint pair exists', () => {
  for (let i = 0; i < 30; i++) {
    const ctx = sandbox(4);
    show(ctx, [0, 1]);
    const p = ctx.pickOpponents();
    assert.deepEqual([...p].sort(), [2, 3]);
  }
});

test('fallback order: shares one anime, then the on-screen pair, then null', () => {
  const ctx = sandbox(3);
  const w = ctx.animeList.map((_, i) => (i < 3 ? 1 : 0));
  ctx.battleWithinFranchise.battledPairs.add(key(ctx, 0, 1));
  show(ctx, [0, 1]);
  for (let i = 0; i < 20; i++) {
    const p = ctx._pickBattleWithinPair(w);
    assert.ok(p.includes(2) && (p.includes(0) || p.includes(1)));
  }
  ctx.battleWithinFranchise.battledPairs.add(key(ctx, 0, 2));
  show(ctx, [1, 2]);
  assert.deepEqual([...ctx._pickBattleWithinPair(w)].sort(), [1, 2]);
  ctx.battleWithinFranchise.battledPairs.add(key(ctx, 1, 2));
  assert.equal(ctx._pickBattleWithinPair(w), null);
});

test('banner shows "· done / total"; excluding a member drops its pairs and does not stop early', () => {
  const ctx = sandbox(5);
  ctx._battleWithinProgress();
  assert.equal(ctx.els.wm.textContent, '⚔ Battle within: Test · 0 / 10');
  // All four pairs with member 4, plus 0-1 and 0-2: six recorded pairs.
  for (const [a, b] of [[4, 0], [4, 1], [4, 2], [4, 3], [0, 1], [0, 2]]) {
    ctx._recordBattleWithinPair(ctx.animeList[a].id, ctx.animeList[b].id);
  }
  assert.equal(ctx.els.wm.textContent, '⚔ Battle within: Test · 6 / 10');
  ctx.excludedIds.add(ctx.animeList[4].id);
  assert.equal(ctx._battleWithinCheckDone(), false, 'stopped although 4 pairs are left');
  assert.equal(ctx.els.wm.textContent, '⚔ Battle within: Test · 2 / 6');
  for (const [a, b] of [[0, 3], [1, 2], [1, 3]]) {
    ctx._recordBattleWithinPair(ctx.animeList[a].id, ctx.animeList[b].id);
    assert.ok(ctx.battleWithinFranchise, 'stopped early');
  }
  ctx._recordBattleWithinPair(ctx.animeList[2].id, ctx.animeList[3].id);
  assert.equal(ctx.battleWithinFranchise, null);
});

test('stale preload: outsider, battled or on-screen pairs are dropped', () => {
  const ctx = sandbox(4);
  show(ctx, [0, 1]);
  ctx._preloadedPair = [2, 5];          // 5 is an outsider
  assert.equal(ctx._takeValidPreloadedPair(), null);
  ctx.battleWithinFranchise.battledPairs.add(key(ctx, 2, 3));
  ctx._preloadedPair = [3, 2];          // already battled
  assert.equal(ctx._takeValidPreloadedPair(), null);
  ctx._preloadedPair = [1, 0];          // the pair on screen
  assert.equal(ctx._takeValidPreloadedPair(), null);
  ctx._preloadedPair = [0, 2];
  assert.deepEqual([...ctx._takeValidPreloadedPair()], [0, 2]);
});

test('"✗ Not seen" replacement stays in the franchise and skips battled partners', () => {
  const ctx = sandbox(4);
  ctx.avoidSameFranchise = true;       // used to zero every member under the lock
  ctx.battleWithinFranchise.battledPairs.add(key(ctx, 0, 1));
  ctx.battleWithinFranchise.battledPairs.add(key(ctx, 0, 2));
  for (let i = 0; i < 20; i++) assert.equal(ctx.pickOneOpponent(0), 3);
  ctx.battleWithinFranchise.battledPairs.add(key(ctx, 0, 3));
  assert.equal(ctx.pickOneOpponent(0), null);
  ctx.battleWithinFranchise = null;    // unlocked: unchanged, never null
  assert.equal(typeof ctx.pickOneOpponent(0), 'number');
});

test('franchise modal buttons pass the name via data-franchise, not a quoted JS string', () => {
  assert.match(js, /onclick="startBattleWithinFranchise\(this\.dataset\.franchise\)"/);
  assert.match(js, /onclick="bulkExcludeFranchise\(this\.dataset\.franchise\)"/);
  assert.doesNotMatch(js, /startBattleWithinFranchise\('\$\{/);
  assert.doesNotMatch(js, /bulkExcludeFranchise\('\$\{/);
});

// v1.0.254 — Modes that ignore Battle within are greyed out in the Mode menu and refused by setMode.
test('only Standard and Blind are allowed while Battle within is on', () => {
  const ctx = vm.createContext({ battleWithinFranchise: { name: 'T', ids: new Set(), battledPairs: new Set() } });
  vm.runInContext(fnSource('_modeWorksInBattleWithin'), ctx);
  for (const m of ['normal', 'blind']) assert.equal(ctx._modeWorksInBattleWithin(m), true, m);
  for (const m of ['settle', 'trio', 'wso', undefined]) assert.equal(ctx._modeWorksInBattleWithin(m), false, String(m));
  ctx.battleWithinFranchise = null;
  for (const m of ['normal', 'blind', 'settle', 'trio', 'wso', undefined]) assert.equal(ctx._modeWorksInBattleWithin(m), true, String(m));
});

test('Mode menu greys out Settle, Trio, Winner Stays and Tower while locked, and re-enables them after', () => {
  const mk = mode => ({ dataset: mode ? { mode } : {}, disabled: false, attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } });
  const radios = ['normal', 'settle', 'blind', 'trio', 'wso'].map(mk);
  const tower = mk(null), note = { hidden: true };
  const ctx = vm.createContext({
    battleWithinFranchise: { name: 'T', ids: new Set(), battledPairs: new Set() },
    IDS: { modeTowerItem: 't', modeWithinNote: 'n' },
    document: { querySelectorAll: () => radios },
    byId: id => (id === 't' ? tower : id === 'n' ? note : null),
  });
  vm.runInContext([fnSource('_modeWorksInBattleWithin'), fnSource('_syncModeMenuLock')].join('\n\n'), ctx);
  ctx._syncModeMenuLock();
  assert.deepEqual(radios.filter(r => r.disabled).map(r => r.dataset.mode), ['settle', 'trio', 'wso']);
  assert.deepEqual(radios.map(r => r.attrs['aria-disabled']), ['false', 'true', 'false', 'true', 'true']);
  assert.equal(tower.disabled, true);
  assert.equal(note.hidden, false);
  ctx.battleWithinFranchise = null;
  ctx._syncModeMenuLock();
  assert.ok([...radios, tower].every(el => !el.disabled && el.attrs['aria-disabled'] === 'false'));
  assert.equal(note.hidden, true);
  assert.match(fnSource('toggleModeMenu'), /if \(willOpen\) \{\s*_syncModeMenuLock\(\);/);
});

test('setMode refuses Settle, Trio and Winner Stays while Battle within is on', () => {
  const ctx = vm.createContext({
    battleWithinFranchise: { name: 'T', ids: new Set(), battledPairs: new Set() },
    settleMode: false, blindMode: false, trioMode: false, wsoMode: false,
    toasts: [], metrics: [], closes: 0,
  });
  ctx.showToast = m => ctx.toasts.push(m);
  ctx._metric = m => ctx.metrics.push(m);
  ctx._closeModeMenu = () => { ctx.closes++; };
  vm.runInContext([fnSource('_modeWorksInBattleWithin'), fnSource('setMode')].join('\n\n'), ctx);
  for (const m of ['settle', 'trio', 'wso']) ctx.setMode(m);
  assert.equal(ctx.settleMode || ctx.trioMode || ctx.wsoMode, false);
  assert.equal(ctx.toasts.length, 3);
  assert.match(ctx.toasts[0], /Only Standard and Blind work during Battle within/);
  assert.equal(ctx.closes, 3);
  assert.deepEqual(ctx.metrics, [], 'a refused mode is not counted as used');
});

test('starting Battle within keeps Blind; a Tower run ends Battle within', () => {
  assert.match(fnSource('startBattleWithinFranchise'), /if \(!blindMode\) setMode\('normal'\);/);
  assert.match(fnSource('startTower'), /if \(battleWithinFranchise\) \{\s*stopBattleWithinFranchise\(true\);/);
});
