#!/usr/bin/env node
// tests/header-progress.test.mjs
//
// v1.0.254 — the header stats are built as three spans (battles, " · ",
// anime) so phones can stack the two counts and hide the dot. Runs the real
// updateProgress from app.js in a vm sandbox with a tiny DOM stub, and checks
// the phone CSS no longer hides the anime count.
//
// Runs via:   node --test tests/header-progress.test.mjs
// Or via:     npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const js  = readFileSync(join(here, '..', 'app.js'), 'utf8');
const css = readFileSync(join(here, '..', 'styles.css'), 'utf8');

// Top-level `function name(...) {` up to the first column-0 `}` after it.
function fnSource(name) {
  const m = js.match(new RegExp(`^function ${name}\\(.*\\{$[\\s\\S]*?^\\}$`, 'm'));
  if (!m) throw new Error(`function ${name} not found in app.js`);
  return m[0];
}
const ladder = js.match(/^const _BATTLE_MILESTONE_LADDER = .*$/m);
assert.ok(ladder, '_BATTLE_MILESTONE_LADDER not found in app.js');

// Just enough of an element: textContent clears children, like the DOM.
function fakeEl() {
  return {
    className: '', title: '', style: {}, children: [], _text: '',
    appendChild(c) { this.children.push(c); return c; },
    get textContent() { return this._text + this.children.map(c => c.textContent).join(''); },
    set textContent(v) { this._text = String(v); this.children = []; },
  };
}

function run({ battles, anime, excluded = [] }) {
  const els = {};
  const ctx = vm.createContext({
    IDS: new Proxy({}, { get: (_, k) => String(k) }),
    byId: (id) => (els[id] ??= fakeEl()),
    document: { createElement: fakeEl },
    animeList: Array.from({ length: anime }, (_, i) => ({ id: i + 1 })),
    excludedIds: new Set(excluded),
    battleCount: battles,
    _renderDailyStreakBadge() {},
  });
  vm.runInContext(
    [ladder[0].replace(/^const /, 'var '), fnSource('_nextBattleMilestone'), fnSource('updateProgress')].join('\n'),
    ctx,
  );
  ctx.updateProgress();
  return { els, ctx };
}

test('header stats: battles, separator and anime count are separate spans', () => {
  const info = run({ battles: 341, anime: 367 }).els.progressInfo;
  assert.deepEqual(info.children.map(c => c.className), ['progress-battles', 'progress-sep', 'progress-anime-count']);
  assert.deepEqual(info.children.map(c => c.textContent), ['341 battles', ' · ', '367 anime']);
  // Desktop shows the spans inline, so the combined text is unchanged.
  assert.equal(info.textContent, '341 battles · 367 anime');
});

test('header stats: singular battle, excluded anime not counted', () => {
  const info = run({ battles: 1, anime: 5, excluded: [1, 2] }).els.progressInfo;
  assert.equal(info.textContent, '1 battle · 3 anime');
});

test('header stats: a second render replaces the spans, not adds to them', () => {
  const { els, ctx } = run({ battles: 10, anime: 4 });
  ctx.battleCount = 11;
  ctx.updateProgress();
  assert.equal(els.progressInfo.children.length, 3);
  assert.equal(els.progressInfo.textContent, '11 battles · 4 anime');
});

test('header stats: empty list still reads "0 battles" with no spans', () => {
  const { els } = run({ battles: 12, anime: 0 });
  assert.equal(els.progressInfo.textContent, '0 battles');
  assert.equal(els.progressInfo.children.length, 0);
  assert.equal(els.progressBar.style.width, '0%');
});

test('phone CSS stacks the counts instead of hiding the anime count', () => {
  const start = css.indexOf('header { padding: 10px 14px; }');
  assert.ok(start > 0, 'phone header block not found in styles.css');
  const block = css.slice(start, css.indexOf('/* ── Manage tab ── */', start));
  assert.doesNotMatch(block, /\.progress-anime-count\s*\{\s*display:\s*none/);
  assert.match(block, /#progress-info \.progress-sep \{ display: none; \}/);
  assert.match(block, /\.progress-anime-count \{\s*display: block;/);
});
