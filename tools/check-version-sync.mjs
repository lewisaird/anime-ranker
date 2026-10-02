#!/usr/bin/env node
// tools/check-version-sync.mjs
//
// The app version lives in THREE places that must stay in lockstep:
//   1. package.json        → "version"
//   2. sw.js               → const APP_VERSION = '…'   (cache-busts the shell)
//   3. index.html          → <meta name="version" content="…">
//
// A mismatch means deployed clients keep serving a stale cached app shell
// (sw.js never byte-changes → no SW update → no force-reload). This script
// exits non-zero on mismatch so CI fails before that ships.
//
// Run directly:  node tools/check-version-sync.mjs
// Via npm:       npm run check:versions

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = f => readFileSync(join(root, f), 'utf8');

const pkg = JSON.parse(read('package.json')).version;

const swMatch = read('sw.js').match(/const APP_VERSION\s*=\s*'([^']+)'/);
const sw = swMatch && swMatch[1];

const htmlMatch = read('index.html').match(/<meta name="version" content="([^"]+)"/);
const html = htmlMatch && htmlMatch[1];

const rows = [
  ['package.json', pkg],
  ['sw.js APP_VERSION', sw],
  ['index.html <meta version>', html],
];

for (const [label, v] of rows) {
  console.log(`${label.padEnd(28)} ${v ?? 'NOT FOUND'}`);
}

if (!pkg || !sw || !html) {
  console.error('\n✖ Could not locate all three version declarations.');
  process.exit(1);
}
if (pkg !== sw || pkg !== html) {
  console.error('\n✖ Version mismatch — bump all three together before deploying.');
  process.exit(1);
}
console.log('\n✓ Versions in sync.');
