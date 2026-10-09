#!/usr/bin/env node
// tools/build-site.mjs
//
// v1.0.261 — Netlify used to publish the whole repo root, so function sources, tests,
// tools, docs and package files were downloadable (and redirect rules can't hide them:
// Netlify serves static files in any letter case and with encoded slashes, while rules
// only match the exact path). This build step copies ONLY the site's own files into
// dist/, and netlify.toml publishes dist/. Anything not listed here is never online.
//
// Adding a public file (a new icon, image or page)? Add it to SITE_FILES — the build
// fails if a listed file is missing, and tests/hidden-files.test.mjs fails if the app
// refers to a file that isn't listed.
//
// Netlify runs:  node tools/build-site.mjs   (see [build] command in netlify.toml)

import { rmSync, mkdirSync, cpSync, existsSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Files and folders served at the site root. _headers MUST stay: Netlify reads it from
// the published folder, and without it the site loses its security headers (CSP etc.).
export const SITE_FILES = Object.freeze([
  'index.html', 'app.js', 'styles.css', 'sw.js', 'manifest.json',
  'icon.svg', 'icon-192.png', 'icon-512.png', 'og-image.png',
  'offline.html', 'privacy.html', 'LICENSE',
  'screenshots',
  '_headers',
]);

export function buildSite(outDir = join(ROOT, 'dist')) {
  const missing = SITE_FILES.filter(f => !existsSync(join(ROOT, f)));
  if (missing.length) throw new Error(`build-site: missing ${missing.join(', ')} — nothing was published`);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  // hidden files (a stray .DS_Store in screenshots/ from an upload) are never published
  for (const f of SITE_FILES) cpSync(join(ROOT, f), join(outDir, f), { recursive: true, filter: s => !basename(s).startsWith('.') });
  return outDir;
}

// run when called directly (realpath, so a symlinked path still counts); importing it (the test) only builds on request
if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  const out = buildSite();
  console.log(`build-site: copied ${SITE_FILES.length} entries to ${out}`);
}
