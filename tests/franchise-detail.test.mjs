#!/usr/bin/env node
// tests/franchise-detail.test.mjs
//
// v1.0.255 — the franchise overview (showFranchiseDetail) shows the same
// numbers as the franchise card it was opened from. The card and the list
// table group _franchiseSortedList() (excluded and format/length-hidden
// entries removed); the overview used the unfiltered list, so one excluded
// entry changed its Avg ELO, ★ Best, W/L and confidence, and a card left with
// a single entry did not open at all. Like battle-within.test.mjs, the real
// functions are cut out of app.js and run in a vm sandbox with stub DOM
// globals, so the test can't drift from the app.
//
// Runs via:   node --test tests/franchise-detail.test.mjs
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
// Top-level `const name = …;` on one line, or `const name = …([` up to the first column-0 `]);`.
function constSource(name) {
  const m = js.match(new RegExp(`^const ${name} = [^\\n]*\\[$[\\s\\S]*?^\\]\\);$|^const ${name} = [^\\n]*$`, 'm'));
  if (!m) throw new Error(`const ${name} not found in app.js`);
  return m[0];
}

const SRC = [
  constSource('FRANCHISE_ALIASES'), constSource('_GENERIC_BASES'), constSource('_CROSSOVER_RE_FRANCHISE'),
  constSource('_ascFirstSorts'), constSource('TARGET_BATTLES_PER_ANIME'), constSource('SETTLING_MIN_BATTLES'),
  ...[
    // grouping (the real grouper, so renamed groups behave as in the app)
    '_franchiseAlias', '_franchiseBaseName', '_franchiseKey', '_franchiseSuffixLookup', '_newFranchiseIndexes',
    '_indexFranchiseKey', '_isCrossoverTitle', '_isCrossoverAnime', '_computeFranchiseIds',
    '_franchiseGroupStats', '_buildFranchiseGroups', '_isRanked', '_battleWithinKey',
    // the two lists and the overview
    'getSortedList', '_franchiseSortedList', 'epRange', '_franchiseDetailGroups', 'showFranchiseDetail',
    // what the overview renders with
    '_franchiseTier', 'getTier', '_rankedEloOrder', 'confidenceLabel', '_coherenceLabel', '_nBattles', 'esc', 'displayTitle',
  ].map(fnSource),
].join('\n\n');

const anime = (id, title, elo, battles, wins, losses, extra = {}) => ({
  id, title, titleEn: title, titleRo: title, elo, battles, wins, losses,
  format: 'TV', episodes: 12, popularity: 0, cover: `c${id}`, ...extra,
});

// Attack on Titan (3 entries + a movie) and Spy x Family (2 entries).
function library() {
  return [
    anime(1,  'Attack on Titan',          1600, 10, 7, 3, { popularity: 900, eloHistory: [1200, 1800, 1600] }),
    anime(2,  'Attack on Titan Season 2', 1400,  6, 3, 3, { popularity: 500 }),
    anime(3,  'Attack on Titan Season 3', 1300,  4, 2, 2, { popularity: 400 }),
    anime(4,  'Attack on Titan Movie',    1700,  6, 5, 1, { popularity: 100, format: 'MOVIE' }),
    anime(10, 'Spy x Family',             1500,  8, 5, 3, { popularity: 800 }),
    anime(11, 'Spy x Family Season 2',    1250,  4, 2, 2, { popularity: 300 }),
  ];
}

function sandbox({ excluded = [], hiddenFormats = [] } = {}) {
  const els = {};
  const ctx = vm.createContext({
    animeList: library(),
    excludedIds: new Set(excluded),
    hiddenFormatsRanking: new Set(hiddenFormats),
    hiddenEpRangesRanking: new Set(),
    preferRomaji: false, currentSort: 'elo', sortAsc: false,
    // 1 v 2 four times (1 won 3), 2 v 3 twice (one each): battles between members.
    matchupStats: { '1-2': { wins: { 1: 3, 2: 1 }, total: 4 }, '2-3': { wins: { 2: 1, 3: 1 }, total: 2 } },
    battleHistory: [],
    IDS: new Proxy({}, { get: (_, k) => String(k) }),
    _resetDiscoverVariant() {}, _setCoverSrc() {}, coverCors: () => '', buildSparkline: () => '',
    pushModalBack() {}, closeDetailModal() {},
  });
  ctx.byId = id => (els[id] ||= { style: {}, classList: { add() {}, remove() {} }, dataset: {}, textContent: '', innerHTML: '' });
  vm.runInContext(SRC, ctx);
  ctx.els = els;
  // What renderRankingList / renderFranchiseTable hand the card and the table row.
  ctx.card = name => ctx._buildFranchiseGroups(ctx._franchiseSortedList()).find(g => g.name === name);
  ctx.open = name => { for (const k of Object.keys(els)) delete els[k]; ctx.showFranchiseDetail(name); return els; };
  return ctx;
}

const NUMBERS = ['bestElo', 'peakElo', 'wins', 'losses', 'totalBattles', 'insideBattles', 'winRate', 'avgBattles',
  'eloRank', 'rankedTotal', 'coherence', 'eloStdDev'];
const pick = g => Object.fromEntries(NUMBERS.map(k => [k, g[k]]));
const ids  = list => Array.from(list, a => a.id); // a plain array in this realm (vm arrays fail deepStrictEqual)

test('an excluded entry: the overview counts the same entries as the card', () => {
  const ctx = sandbox({ excluded: [1], hiddenFormats: ['MOVIE'] });
  const card = ctx.card('Attack on Titan');
  const d = ctx._franchiseDetailGroups('Attack on Titan');
  assert.deepEqual(ids(d.group.members), [2, 3]);
  assert.deepEqual(pick(d.group), pick(card));
  // The unfiltered group (what the overview used before) really does differ, so this test bites.
  const old = ctx._buildFranchiseGroups(ctx.getSortedList()).find(g => g.name === 'Attack on Titan');
  assert.notEqual(old.bestElo, card.bestElo);
  assert.notEqual(old.peakElo, card.peakElo);
  // Left-out entries are still listed (highest ELO first), and the actions get the full franchise.
  assert.deepEqual(ids(d.hidden), [4, 1]);
  assert.equal(d.full.name, 'Attack on Titan');
  assert.equal(d.full.members.length, 4);
});

test('the rendered overview shows the card\'s numbers', () => {
  const ctx = sandbox({ excluded: [1] });
  const card = ctx.card('Attack on Titan');
  const els = ctx.open('Attack on Titan');
  assert.match(els.modalRankLine.innerHTML, new RegExp(`${card.members.length} entries · Avg ELO ${card.bestElo} · Best now ${card.peakElo}`));
  assert.equal(els.modalEloVal.textContent, card.bestElo);
  assert.equal(els.modalWins.textContent, card.wins);
  assert.equal(els.modalLosses.textContent, card.losses);
  assert.match(els.modalMetaLine.innerHTML, new RegExp(`^${card.winRate}% win rate · ${card.totalBattles} total battles`));
  // Only 2 v 3 is inside the card's franchise now (1 v 2 involved the excluded entry).
  assert.equal(card.insideBattles, 2);
  assert.match(els.modalMetaLine.innerHTML, /\(2 within the franchise\)/);
  assert.match(els.modalConfidenceWrap.innerHTML, new RegExp(`${ctx.confidenceLabel(card.avgBattles).label} · avg ${card.avgBattles} battles per entry`));
  // The excluded entry's old 1800 peak is not the franchise's "All-time best", and its
  // history is not in the averaged sparkline (no counted entry has a history here).
  assert.doesNotMatch(els.modalRankLine.innerHTML, /All-time best/);
  assert.equal(els.modalSparklineWrap.style.display, 'none');
});

test('left-out entries are listed after the counted ones, greyed, with the reason', () => {
  const ctx = sandbox({ excluded: [1], hiddenFormats: ['MOVIE'] });
  const html = ctx.open('Attack on Titan').modalDescription.innerHTML;
  const rows = [...html.matchAll(/<div class="franchise-detail-member([^"]*)"[^>]*onclick="navigateToFranchiseMember\((\d+),/g)]
    .map(m => ({ id: Number(m[2]), cls: m[1] }));
  assert.deepEqual(rows.map(r => r.id), [2, 3, 4, 1]);
  assert.deepEqual(rows.map(r => r.cls.includes('not-counted')), [false, false, true, true]);
  assert.equal(html.split('franchise-detail-hidden-label').length - 1, 1);
  assert.ok(html.indexOf('franchise-detail-hidden-label') < html.indexOf('navigateToFranchiseMember(4,'));
  assert.match(html, /navigateToFranchiseMember\(4,[\s\S]*?Hidden by filter/);
  assert.match(html, /navigateToFranchiseMember\(1,[\s\S]*?Excluded/);
});

test('a card left with one entry by an exclusion opens (it was a silent no-op)', () => {
  const ctx = sandbox({ excluded: [10] });
  const card = ctx.card('Spy x Family Season 2');
  assert.ok(card, 'the card is named after its one remaining entry');
  // The old lookup (unfiltered list, by the card's name) found nothing, so the click did nothing.
  assert.equal(ctx._buildFranchiseGroups(ctx.getSortedList()).find(g => g.name === 'Spy x Family Season 2'), undefined);
  const els = ctx.open('Spy x Family Season 2');
  assert.equal(els.modalTitle.textContent, 'Spy x Family Season 2');
  assert.equal(els.modalEloVal.textContent, 1250);
  assert.equal(els.modalEloLabel.textContent, 'ELO');
  // Battle within / Exclude all re-resolve by name in the unfiltered list, so they get the full franchise.
  const html = els.modalDescription.innerHTML;
  assert.match(html, /<button[^>]*data-franchise="Spy x Family"\s/);
  assert.doesNotMatch(html, /<button[^>]*data-franchise="Spy x Family"\s+disabled/);
  // Member rows (and so ← Back) keep the card's name.
  assert.match(html, /class="franchise-detail-member"[^>]*data-franchise="Spy x Family Season 2"/);
});

test('nothing left out: one grouping pass, nothing hidden, same group as before', () => {
  const ctx = sandbox();
  let builds = 0;
  const real = ctx._buildFranchiseGroups;
  ctx._buildFranchiseGroups = list => { builds++; return real(list); };
  const d = ctx._franchiseDetailGroups('Attack on Titan');
  assert.equal(builds, 1);
  assert.equal(d.hidden.length, 0);
  assert.equal(d.full, d.group);
  assert.deepEqual(ids(d.group.members), [4, 1, 2, 3]);
  const html = ctx.open('Attack on Titan').modalDescription.innerHTML;
  assert.doesNotMatch(html, /not-counted|franchise-detail-hidden-label/);
});

test('an unknown name opens nothing', () => {
  const ctx = sandbox({ excluded: [1] });
  assert.equal(ctx._franchiseDetailGroups('No Such Franchise'), null);
  const els = ctx.open('No Such Franchise');
  assert.equal(els.detailModal, undefined);
});
