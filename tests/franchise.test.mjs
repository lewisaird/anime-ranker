#!/usr/bin/env node
// tests/franchise.test.mjs
//
// Regression tests for the franchise-grouping subsystem in app.js.
//
// Runs via:   node --test tests/franchise.test.mjs
// Or via:     npm test
//
// ⚠️  These reimplement the pure logic from app.js so they can run outside
// the browser. If you change _franchiseBaseName / _franchiseKey /
// _franchiseSuffixLookup / FRANCHISE_ALIASES / _GENERIC_BASES in app.js,
// update these copies too — the suite's job is to lock in the long history
// of patches catalogued in patch-notes-v121-145.md so regressions don't
// silently return.

import { test } from 'node:test';
import assert from 'node:assert/strict';

// ─── Constants copied from app.js ────────────────────────────────────────────

const FRANCHISE_ALIASES = Object.freeze([
  { pattern: /^love\s*live!/i,        canon: 'Love Live!' },
  { pattern: /\bpre(tty\s*)?cure\b/i, canon: 'Pretty Cure' },
  { pattern: /^flcl\b/i,              canon: 'FLCL' },
  { pattern: /\bgundam\b/i,           canon: 'Gundam' },
  { pattern: /^milky☆/i,              canon: 'Milky' },
  { pattern: /^ssss\./i,              canon: 'SSSS.' },
  { pattern: /\bzeonic\b/i,           canon: 'Gundam' },
  { pattern: /^\.hack\/\//i,          canon: '.hack//' },
  { pattern: /^saiyuki\b/i,           canon: 'Saiyuki' },
  { pattern: /\bmacross\b/i,          canon: 'Macross' },
  { pattern: /^lupin\s+(?:iii|the\s+third|3rd|3)\b/i, canon: 'Lupin III' },
  { pattern: /^slayers\b/i,           canon: 'Slayers' },
  { pattern: /^saint\s+seiya\b|^knights\s+of\s+the\s+zodiac\b/i, canon: 'Saint Seiya' },
  { pattern: /^yu-?gi-?oh!?/i,        canon: 'Yu-Gi-Oh!' },
  { pattern: /^(?:the\s+)?idolm[a@]ster\b/i, canon: 'The iDOLM@STER' },
  { pattern: /\b(?:meitantei\s+conan|detective\s+conan|case\s+closed)\b/i, canon: 'Detective Conan' },
  { pattern: /^aikatsu/i,             canon: 'Aikatsu!' },
  { pattern: /^tenchi\s+muyou?/i,     canon: 'Tenchi Muyou!' },
]);

const _GENERIC_BASES = new Set([
  'the', 'movie', 'special', 'first', 'last',
  'sekai meisaku douwa', 'world masterpiece fairy tales',
  'sekai meisaku gekijou', 'world masterpiece theater',
  'aoi bungaku', 'aoi bungaku series',
  'animated classics of japanese literature',
  'manga nippon mukashibanashi', 'folk tales from japan',
  'saiyuuki',
]);

// ─── Pure functions copied from app.js ───────────────────────────────────────

function _franchiseAlias(title) {
  if (!title) return null;
  for (const { pattern, canon } of FRANCHISE_ALIASES) {
    if (pattern.test(title)) return canon;
  }
  return null;
}

function _franchiseBaseName(title) {
  const alias = _franchiseAlias(title);
  if (alias) return alias;
  const stripped = title
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/\s+-[^-\s][^-]*-/g, '')
    .replace(/\s+-\s+.+$/, '')
    .replace(/\s+tri\.?\s*(Chapter.*)?$/i, '')
    .replace(/\s+Chapter\s*[\d]+.*$/i, '')
    .replace(/^(.+?\s+.+?)\s+[A-Z]{2,}:\s+.*$/, '$1')
    .replace(/^(.{3,}?)\s*:\s+.*$/, '$1')
    .replace(/[!\s]+(Specials?|OVAs?|ONAs?|Recaps?|Extra|Encore)$/i, s => s.startsWith('!') ? '!' : '')
    .replace(/!+$/, '!')
    .replace(/\s+(The\s+)?Movie\b.*/i, '')
    .replace(/\s+(Final|The\s+Final)\s+(Season|Part|Chapter|Arc|Cour).*$/i, '')
    .replace(/\s+(Season|Part|Cour)\s*[IVXivx\d]+.*$/i, '')
    .replace(/\s+\d+(?:st|nd|rd|th)\s+Season.*$/i, '')
    .replace(/\s+Season\s*$/i, '')
    .replace(/\s+(II|III|IV|VI|VII|VIII|IX|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX)$/i, '')
    .replace(/[\s×✕✗]+[\d×✕✗]{1,2}$/, '')
    .replace(/[?!]?\s+On\s+the\s+Side[?!]?$/i, '')
    .replace(/\s+(Twin|Twins|Origins?|Returns?|Revenge|Reborn|Reload|Revolution|More|Plus|Ultra|Beyond|Kai|Heroes|Alternative|Progressive)$/i, '')
    .replace(/\s+\d{1,2}$/, '')
    .replace(/\s+#[\d.]+$/, '')
    .replace(/\?+$/, '')
    .trim();
  return _GENERIC_BASES.has(stripped.toLowerCase()) ? title : stripped;
}

function _franchiseKey(title) {
  return _franchiseBaseName(title).toLowerCase().replace(/\./g, '');
}

function _franchiseSuffixLookup(key, keyMap, _indexes, afterColonKeys) {
  if (!key || key.length < 6) return null;
  const SUFFIX_MIN = 10;
  const PREFIX_MIN = 8;
  for (const [existingKey, existingCanon] of keyMap) {
    if (existingKey.length < 6) continue;
    // v1.0.189 — after-colon keys: skip SUFFIX-direction matches to prevent
    // generic English nouns ("resurrection", "the motion picture", "tales of")
    // from bridging unrelated franchises via key.endsWith(' ' + existingKey).
    const isAfterColon = afterColonKeys && afterColonKeys.has(existingKey);
    if (!isAfterColon && Math.min(key.length, existingKey.length) >= SUFFIX_MIN) {
      if (existingKey.endsWith(' ' + key) || key.endsWith(' ' + existingKey)) {
        return existingCanon;
      }
    }
    // v1.0.193 — after-colon keys: raise PREFIX threshold to 10 chars on the
    // shorter side, blocking short common-word PREFIX bridges (e.g. standalone
    // "Mononoke" 8 chars matching "mononoke ninja chinpuuden" after-colon).
    const prefixMin = isAfterColon ? 10 : PREFIX_MIN;
    if (Math.min(key.length, existingKey.length) >= prefixMin) {
      if (key.startsWith(existingKey + ' ') || existingKey.startsWith(key + ' ')) {
        return existingCanon;
      }
    }
  }
  return null;
}

const _CROSSOVER_RE_FRANCHISE = /^(.+?)\s+(VS|vs|×|✕|✗)\.?\s+(.+)$/;
function _isCrossoverTitle(title) {
  if (!title) return false;
  const cleaned = title.replace(/\s*\([^)]*\)\s*$/, '');
  const m = _CROSSOVER_RE_FRANCHISE.exec(cleaned);
  if (!m) return false;
  const left   = m[1].trim().toLowerCase();
  const marker = m[2];
  const right  = m[3].trim().toLowerCase();
  if (!left || !right) return false;
  // v1.0.197 — within-franchise sub-title (left contains colon) is NOT a crossover.
  // v1.0.199 — colon guard scoped to "vs" markers only; × crossovers can
  // legitimately carry a colon in a franchise name ("IS: Infinite Stratos × Sonico").
  if (/^vs$/i.test(marker) && left.includes(':')) return false;
  return left !== right;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test('_franchiseBaseName: known historical fixes (from patch-notes-v121-145)', () => {
  const cases = [
    // v1.0.127 — colon strip requires whitespace after colon
    ['Re:Zero kara Hajimeru Isekai Seikatsu', 'Re:Zero kara Hajimeru Isekai Seikatsu'],
    // v1.0.127 — second-pass merge by display name (Sword Art Online)
    ['Sword Art Online: Alicization', 'Sword Art Online'],
    // v1.0.128 — FLCL alias collapses sub-series
    ['FLCL Alternative', 'FLCL'],
    ['FLCL Progressive', 'FLCL'],
    // v1.0.129 — all-caps subtitle requires ≥2 words to remain
    ['GOLDEN BOY: Sasurai no Obenkyou Yarou', 'GOLDEN BOY'],
    ['GOLDEN BOY', 'GOLDEN BOY'],
    ['Golden Time', 'Golden Time'],
    // v1.0.130 — Love Live umbrella
    ['Love Live! Sunshine!!', 'Love Live!'],
    ['Love Live! The School Idol Movie', 'Love Live!'],
    // v1.0.131 — M.D. Geist
    ['M.D. Geist II: Death Force', 'M.D. Geist'],
    ['M.D. Geist 2 - Death Force', 'M.D. Geist'],
    // v1.0.131 — Yu-Gi-Oh! internal hyphen preserved (via new alias in v1.0.149)
    ['Yu-Gi-Oh!', 'Yu-Gi-Oh!'],
    // v1.0.132 — Gundam alias
    ['Mobile Suit Gundam SEED Destiny', 'Gundam'],
    ['Mobile Police Patlabor', 'Mobile Police Patlabor'],  // NOT Gundam
    ['Princess Mononoke', 'Princess Mononoke'],  // doesn't fuzzy-match Mononoke
    // v1.0.134 — after-colon length gate
    ['Pokemon: The First Movie', 'Pokemon'],
    // v1.0.135 — Samurai stays separate from Samurai Champloo/Flamenco
    ['Samurai Champloo', 'Samurai Champloo'],
    ['Samurai X: Trust and Betrayal', 'Samurai X'],
    // v1.0.135 — Pupa year-suffix preserved
    ['Pupa 2019', 'Pupa 2019'],
    ['Pupa 2', 'Pupa'],  // single-digit sequel still strips
    // v1.0.135 — Re: Cutie Honey stays Re: Cutie Honey, doesn't collapse to "Re"
    ['Re: Cutie Honey', 'Re: Cutie Honey'],
    ['Re:ZERO -Starting Life in Another World-', 'Re:ZERO'],
    // v1.0.135 — Milky umbrella
    ['Milky☆Highway', 'Milky'],
    // v1.0.136 — generic-base safety net (The Return → "The" would have polluted canon)
    ['The Return', 'The Return'],
    ['The Movie', 'The Movie'],
    ['The Special', 'The Special'],
    // v1.0.136 — SSSS. + Zeonic aliases
    ['SSSS.GRIDMAN', 'SSSS.'],
    ['SSSS.DYNAZENON', 'SSSS.'],
    ['Zeonic Toyota Special Movie', 'Gundam'],
    // v1.0.138 — .hack// alias
    ['.hack//G.U. Returner', '.hack//'],
    ['.hack//Sign', '.hack//'],
    // v1.0.141 — anthology blacklist
    ['Sekai Meisaku Douwa: Aladdin to Mahou no Lamp', 'Sekai Meisaku Douwa: Aladdin to Mahou no Lamp'],
    ['Sekai Meisaku Douwa: Hakuchou no Mizuumi', 'Sekai Meisaku Douwa: Hakuchou no Mizuumi'],
    // v1.0.144 — Saiyuuki source-name blacklist
    ['Saiyuuki RELOAD', 'Saiyuuki RELOAD'],  // doesn't reduce to bare "Saiyuuki"
    // v1.0.145 — Saiyuki modern series alias (single u)
    ['Saiyuki Reload', 'Saiyuki'],
    ['Saiyuki Gunlock', 'Saiyuki'],
    ['Saiyuki Requiem', 'Saiyuki'],
    // v1.0.145 — Saiyuuki (double u) NOT in the modern Saiyuki alias
    ['Saiyuuki', 'Saiyuuki'],
    // v1.0.149 — new aliases
    ['Macross Frontier', 'Macross'],
    ['Macross Delta', 'Macross'],
    ['Lupin III: Part 6', 'Lupin III'],
    ['Lupin the Third: Castle of Cagliostro', 'Lupin III'],
    ['Slayers Next', 'Slayers'],
    ['Saint Seiya Omega', 'Saint Seiya'],
    ['Knights of the Zodiac', 'Saint Seiya'],
    ['Yu-Gi-Oh! GX', 'Yu-Gi-Oh!'],
    ['The iDOLM@STER Cinderella Girls', 'The iDOLM@STER'],
    ['Detective Conan', 'Detective Conan'],
    ['Case Closed', 'Detective Conan'],
    ['Aikatsu Stars!', 'Aikatsu!'],
    ['Tenchi Muyou! Ryououki', 'Tenchi Muyou!'],
    // v1.0.149 — XIII-XIX Roman numerals
    ['Final Fantasy XIV', 'Final Fantasy'],
    ['Final Fantasy XV', 'Final Fantasy'],
    // Internal hyphens preserved (paired-dash regex tightening)
    ['Re-Kan!', 'Re-Kan!'],
    ['B-Project', 'B-Project'],
  ];

  for (const [title, expected] of cases) {
    assert.equal(_franchiseBaseName(title), expected,
      `_franchiseBaseName(${JSON.stringify(title)}) should equal ${JSON.stringify(expected)}`);
  }
});

test('_franchiseAlias: every alias entry matches at least one canonical example', () => {
  const aliasExamples = [
    ['Love Live! Sunshine!!',                'Love Live!'],
    ['Heartcatch Precure!',                  'Pretty Cure'],
    ['FLCL Alternative',                     'FLCL'],
    ['Mobile Suit Gundam',                   'Gundam'],
    ['Milky☆Subway: The Galactic Limited Express', 'Milky'],
    ['SSSS.GRIDMAN UNIVERSE',                'SSSS.'],
    ['Zeonic Toyota Special Movie',          'Gundam'],
    ['.hack//Quantum',                       '.hack//'],
    ['Saiyuki Reload Blast',                 'Saiyuki'],
    ['Macross 7',                            'Macross'],
    ['Lupin III: The First',                 'Lupin III'],
    ['Slayers Try',                          'Slayers'],
    ['Saint Seiya: Saintia Sho',             'Saint Seiya'],
    ['YuGiOh ZEXAL',                         'Yu-Gi-Oh!'],
    ['IDOLM@STER SideM',                     'The iDOLM@STER'],
    ['Meitantei Conan',                      'Detective Conan'],
    ['Aikatsu Planet!',                      'Aikatsu!'],
    ['Tenchi Muyo in Tokyo',                 'Tenchi Muyou!'],
  ];
  for (const [title, expected] of aliasExamples) {
    assert.equal(_franchiseAlias(title), expected,
      `_franchiseAlias(${JSON.stringify(title)}) should equal ${JSON.stringify(expected)}`);
  }
});

test('_franchiseAlias: negative cases — must not false-match', () => {
  const negatives = [
    'Hunter × Hunter',     // not Aikatsu, not Macross, etc.
    'Hellsing Ultimate',
    'Naruto Shippuden',
    'Aladdin and the Wonderful Lamp',
    'Saiyuuki',            // double-u, NOT modern Saiyuki
    'Saiyuuki RELOAD',
    'Alakazam the Great',
    'Pokémon: The First Movie',
    'Hack and Slash',
    'Life Hack',
    'Mobile Police Patlabor',  // NOT Gundam
  ];
  for (const title of negatives) {
    assert.equal(_franchiseAlias(title), null,
      `_franchiseAlias(${JSON.stringify(title)}) should be null`);
  }
});

test('_franchiseSuffixLookup: prefix-match threshold (≥8 chars)', () => {
  // Samurai (7 chars) must NOT prefix-match unrelated Samurai titles
  const samuraiMap = new Map([['samurai', 'samurai']]);
  assert.equal(_franchiseSuffixLookup('samurai champloo', samuraiMap), null);
  assert.equal(_franchiseSuffixLookup('samurai flamenco', samuraiMap), null);
  assert.equal(_franchiseSuffixLookup('samurai x', samuraiMap), null);

  // Promise (7 chars) must NOT prefix-match Promise Neverland
  const promiseMap = new Map([['promise', 'promise']]);
  assert.equal(_franchiseSuffixLookup('promise neverland', promiseMap), null);

  // Naruto (6 chars) below threshold — relations graph handles this in app
  const narutoMap = new Map([['naruto', 'naruto']]);
  assert.equal(_franchiseSuffixLookup('naruto shippuden', narutoMap), null);

  // Hellsing (8 chars) at threshold — should still match
  const hellsingMap = new Map([['hellsing', 'hellsing']]);
  assert.equal(_franchiseSuffixLookup('hellsing ultimate', hellsingMap), 'hellsing');

  // Great Pretender (15 chars) prefix
  const gpMap = new Map([['great pretender', 'great pretender']]);
  assert.equal(_franchiseSuffixLookup('great pretender razbliuto', gpMap), 'great pretender');
});

test('_franchiseSuffixLookup: suffix-match threshold (≥10 chars)', () => {
  // Mononoke (8 chars) below threshold — Princess Mononoke must NOT fuzzy match
  const mononokeMap = new Map([['mononoke', 'mononoke']]);
  assert.equal(_franchiseSuffixLookup('princess mononoke', mononokeMap), null);

  // Evangelion (10 chars) at threshold — should still match
  const evaMap = new Map([['evangelion', 'evangelion']]);
  assert.equal(_franchiseSuffixLookup('neon genesis evangelion', evaMap), 'evangelion');
  const ngeMap = new Map([['neon genesis evangelion', 'neon genesis evangelion']]);
  assert.equal(_franchiseSuffixLookup('evangelion', ngeMap), 'neon genesis evangelion');
});

test('_franchiseSuffixLookup: after-colon keys block SUFFIX direction (v1.0.189)', () => {
  // After-colon key "resurrection" (registered from "Afro Samurai: Resurrection")
  // must NOT suffix-match unrelated "Ninja Resurrection" or "Princess Resurrection".
  // Pre-v1.0.189 these would bridge via key.endsWith(' ' + existingKey).
  const resurrectionMap = new Map([['resurrection', 'afro-samurai']]);
  const afterColonSet = new Set(['resurrection']);
  assert.equal(_franchiseSuffixLookup('ninja resurrection', resurrectionMap, null, afterColonSet), null);
  assert.equal(_franchiseSuffixLookup('princess resurrection', resurrectionMap, null, afterColonSet), null);

  // Same shape but NOT in after-colon set — legitimate suffix bridge stays
  // (Evangelion alone → Neon Genesis Evangelion via main-key suffix match).
  const evaMap = new Map([['evangelion', 'evangelion']]);
  assert.equal(_franchiseSuffixLookup('neon genesis evangelion', evaMap, null, new Set()), 'evangelion');

  // After-colon key "alicization" must STILL allow PREFIX-direction matches —
  // legitimate "Alicization War of Underworld" sub-arc bridging to SAO.
  const saoMap = new Map([['alicization', 'sword-art-online']]);
  const saoAfterColon = new Set(['alicization']);
  assert.equal(
    _franchiseSuffixLookup('alicization war of underworld', saoMap, null, saoAfterColon),
    'sword-art-online'
  );

  // Backwards compat: when afterColonKeys is undefined (existing test harnesses
  // that pre-date v1.0.189), suffix-direction matches behave as before.
  assert.equal(_franchiseSuffixLookup('ninja resurrection', resurrectionMap), 'afro-samurai');
});

test('_isCrossoverTitle: real crossovers vs stylisation', () => {
  // True crossovers (different sides)
  assert.equal(_isCrossoverTitle("Queen's Blade Rebellion VS Hagure Yuusha no Estetica"), true);
  assert.equal(_isCrossoverTitle('Aliens vs Predator'), true);
  assert.equal(_isCrossoverTitle('Lupin III vs Detective Conan'), true);
  assert.equal(_isCrossoverTitle('IS: Infinite Stratos × Sonico'), true);

  // Stylisation (same word both sides) — NOT crossovers
  assert.equal(_isCrossoverTitle('Hunter × Hunter'), false);
  assert.equal(_isCrossoverTitle('Hunter × Hunter (2011)'), false);

  // Words that contain "vs"/"versus" but no whitespace boundary — NOT crossovers
  assert.equal(_isCrossoverTitle('Senran Kagura Estival Versus'), false);
  assert.equal(_isCrossoverTitle('Mobile Suit Gundam'), false);
  assert.equal(_isCrossoverTitle('Pokémon'), false);
  assert.equal(_isCrossoverTitle(''), false);
  assert.equal(_isCrossoverTitle(null), false);

  // v1.0.197 — left side with colon = within-franchise sub-title, NOT crossover
  assert.equal(_isCrossoverTitle('Crayon Shin-chan: Action Mask vs. Leotard Devil'), false);
  assert.equal(_isCrossoverTitle('Dragon Ball Z: Goku vs Vegeta'), false);
});

test('_franchiseKey: period normalisation', () => {
  // v1.0.131 — M.D. Geist ↔ MD Geist
  assert.equal(_franchiseKey('M.D. Geist'), _franchiseKey('MD Geist'));
  assert.equal(_franchiseKey('Dr. Stone'), _franchiseKey('Dr Stone'));
  assert.equal(_franchiseKey('Dr. Slump'), 'dr slump');
});

test('_GENERIC_BASES: each entry exists for a documented reason', () => {
  // Stop-words: come from over-aggressive strips
  assert.equal(_franchiseBaseName('The Return'), 'The Return', 'Returns spinoff strip would reduce to "The"');
  assert.equal(_franchiseBaseName('The Movie'), 'The Movie', 'Movie strip would reduce to "The"');
  // Anthology: each entry is standalone
  assert.equal(_franchiseBaseName('Sekai Meisaku Douwa: Aladdin to Mahou no Lamp'),
               'Sekai Meisaku Douwa: Aladdin to Mahou no Lamp');
  // Japanese source-name
  assert.equal(_franchiseBaseName('Saiyuuki RELOAD'), 'Saiyuuki RELOAD');
});
