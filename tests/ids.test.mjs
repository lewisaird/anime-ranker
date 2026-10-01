#!/usr/bin/env node
// tests/ids.test.mjs
//
// Invariant tests for the DOM-ID registry introduced in §4.2.15.
//
// The premise: every `IDS.camelKey` reference in the main `<script>` block
// should resolve to an actual entry in the frozen `IDS` object, and every
// value in `IDS` should correspond to an `id="..."` attribute somewhere in
// the HTML. Either half failing means a typo or a dead entry.
//
// Runs via:   node --test tests/ids.test.mjs
// Or via:     npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(here, '..', 'index.html');
const jsPath   = join(here, '..', 'app.js');
const html = readFileSync(htmlPath, 'utf8');
const js   = readFileSync(jsPath,   'utf8');

// ── Extract the IDS block from app.js ───────────────────────────────────────
const idsBlockMatch = js.match(/const IDS = Object\.freeze\(\{([\s\S]*?)\}\);/);
if (!idsBlockMatch) {
  throw new Error('IDS registry block not found in app.js — §4.2.15 regression?');
}
const idsBody = idsBlockMatch[1];

// Parse `camelKey: 'kebab-value',` pairs
const idsEntries = [...idsBody.matchAll(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*'([^']+)',/g)];
const idsKeys   = new Set(idsEntries.map(m => m[1]));
const idsValues = new Set(idsEntries.map(m => m[2]));

// ── Collect all `IDS.camelKey` references in app.js ─────────────────────────
const refMatches = [...js.matchAll(/\bIDS\.([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g)];
const referencedKeys = new Set(refMatches.map(m => m[1]));

// ── Collect all `id="..."` declarations, from both the static HTML and the ──
// ── dynamically-injected HTML strings inside app.js. A UI element is "real" ─
// ── as long as its id lands in the DOM at runtime, regardless of where the ──
// ── markup originated.                                                     ──
const idAttrPattern = /\bid\s*=\s*["']([A-Za-z][A-Za-z0-9_\-]*)["']/g;
const declaredIds = new Set([
  ...[...html.matchAll(idAttrPattern)].map(m => m[1]),
  ...[...js.matchAll(idAttrPattern)].map(m => m[1]),
]);

// ─── Tests ──────────────────────────────────────────────────────────────────

test('IDS registry has entries', () => {
  assert.ok(idsEntries.length > 100, `expected >100 IDS entries, got ${idsEntries.length}`);
});

test('every IDS.camelKey reference matches a key in the registry', () => {
  const missing = [...referencedKeys].filter(k => !idsKeys.has(k));
  assert.deepEqual(missing, [], `IDS references with no matching registry key: ${missing.join(', ')}`);
});

test('every IDS value maps to an HTML id="..." declaration', () => {
  const orphans = [...idsValues].filter(v => !declaredIds.has(v));
  assert.deepEqual(orphans, [], `IDS values with no HTML declaration: ${orphans.join(', ')}`);
});

test('no duplicate values in the IDS registry', () => {
  const seen = new Map();
  for (const [, key, val] of idsEntries.map(m => [null, m[1], m[2]])) {
    if (seen.has(val)) {
      assert.fail(`duplicate IDS value '${val}' (keys: ${seen.get(val)} and ${key})`);
    }
    seen.set(val, key);
  }
});

test('byId helper is defined exactly once', () => {
  const defs = [...js.matchAll(/const byId\s*=\s*\(\s*id\s*\)\s*=>\s*document\.getElementById\(id\);?/g)];
  assert.equal(defs.length, 1, `expected exactly 1 byId definition, got ${defs.length}`);
});
