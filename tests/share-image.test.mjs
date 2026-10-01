#!/usr/bin/env node
// tests/share-image.test.mjs
//
// v1.0.253 — the share-image cover loader. Pulls _loadCoverForCanvas out of
// app.js and runs it in a vm sandbox with stub fetch / createImageBitmap /
// Image, so the CSP-safe decode path, the <img> fallback and the time cap are
// covered without a browser. (The live CSP's img-src has no blob:, which is
// why the old blob-URL path drew title placeholders instead of covers.)
//
// Runs via:   node --test tests/share-image.test.mjs
// Or via:     npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const js = readFileSync(join(here, '..', 'app.js'), 'utf8');
const src = js.match(/async function _loadCoverForCanvas\([\s\S]*?\n\}\n/)?.[0];

// imgOutcome: 'load' | 'error' | 'hang' — what the fallback <img> does once src is set.
function makeLoader({ fetch, createImageBitmap, imgOutcome = 'error' }) {
  const images = [];
  class FakeImage {
    constructor() { images.push(this); }
    set src(v) {
      this._src = v;
      if (imgOutcome === 'load')  setTimeout(() => this.onload && this.onload(), 0);
      if (imgOutcome === 'error') setTimeout(() => this.onerror && this.onerror(), 0);
    }
    get src() { return this._src; }
  }
  const sandbox = { fetch, createImageBitmap, Image: FakeImage, AbortController, setTimeout, clearTimeout, Date };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return { load: sandbox._loadCoverForCanvas, images };
}

const okResponse = { ok: true, blob: async () => 'cover-bytes' };

test('_loadCoverForCanvas is found and no longer loads a blob: URL into an <img>', () => {
  assert.ok(src, '_loadCoverForCanvas not found in app.js');
  assert.doesNotMatch(src, /createObjectURL/);
  assert.match(src, /createImageBitmap\(/);
});

test('CORS fetch → returns the ImageBitmap, no <img> created', async () => {
  const bitmap = { width: 230, height: 345 };
  let init;
  const { load, images } = makeLoader({
    fetch: async (_url, opts) => { init = opts; return okResponse; },
    createImageBitmap: async blob => { assert.equal(blob, 'cover-bytes'); return bitmap; },
  });
  assert.equal(await load('https://s4.anilist.co/x.jpg'), bitmap);
  assert.equal(images.length, 0);
  assert.equal(init.mode, 'cors');
  assert.equal(init.cache, 'no-store'); // keeps the v1.0.201 stale-HTTP-cache guard
});

test('decode failure falls through to the crossOrigin <img> fallback', async () => {
  const { load, images } = makeLoader({
    fetch: async () => okResponse,
    createImageBitmap: async () => { throw new Error('decode failed'); },
    imgOutcome: 'load',
  });
  const img = await load('https://s4.anilist.co/x.jpg', 200);
  assert.equal(images.length, 1);
  assert.equal(img, images[0]);
  assert.equal(img.crossOrigin, 'anonymous');
  assert.match(img.src, /\?_cb=\d+$/);
});

test('non-ok response and fallback error → null', async () => {
  const { load } = makeLoader({
    fetch: async () => ({ ok: false }),
    createImageBitmap: async () => assert.fail('should not decode a failed response'),
    imgOutcome: 'error',
  });
  assert.equal(await load('https://s4.anilist.co/x.jpg', 200), null);
});

test('a fallback <img> that never settles resolves null within timeoutMs', { timeout: 2000 }, async () => {
  const { load } = makeLoader({
    fetch: async () => { throw new TypeError('Failed to fetch'); },
    createImageBitmap: async () => ({}),
    imgOutcome: 'hang',
  });
  const t0 = Date.now();
  assert.equal(await load('https://s4.anilist.co/x.jpg', 80), null);
  assert.ok(Date.now() - t0 < 1000, 'fallback was not capped');
});

test('a fetch that never answers is aborted at timeoutMs → null', { timeout: 2000 }, async () => {
  const { load } = makeLoader({
    fetch: (_url, { signal }) => new Promise((_, reject) => {
      signal.addEventListener('abort', () => reject(new Error('aborted')));
    }),
    createImageBitmap: async () => ({}),
    imgOutcome: 'hang',
  });
  const t0 = Date.now();
  assert.equal(await load('https://s4.anilist.co/x.jpg', 80), null);
  assert.ok(Date.now() - t0 < 1000, 'load was not capped');
});

test('no url → null without fetching', async () => {
  const { load } = makeLoader({
    fetch: async () => assert.fail('should not fetch'),
    createImageBitmap: async () => ({}),
  });
  assert.equal(await load(''), null);
});

test('share image draws the real logo, not the ⚔️ emoji wordmark', () => {
  assert.ok(!js.includes("fillText('⚔️ Kessen'"), 'Top 10 header still draws the emoji');
  assert.match(js, /_loadCoverForCanvas\('\/icon-512\.png', 3500\)/);
});

// ── v1.0.254 — one Top 10 image, built once per modal open ──────────────────
const html = readFileSync(join(here, '..', 'index.html'), 'utf8');
const fnSrc = (name) => js.match(new RegExp(`(?:async )?function ${name}\\([\\s\\S]*?\\n\\}\\n`))?.[0];

test('the 3×3 option is gone: no grid3 path, no kind toggle', () => {
  const build = fnSrc('_buildShareImageBlob');
  assert.ok(build, '_buildShareImageBlob not found');
  assert.doesNotMatch(build, /grid3|kind/);
  assert.match(build, /ranked\.slice\(0, 10\)/);
  assert.doesNotMatch(js, /setShareImageKind|SHARE_IMAGE_KINDS|_syncShareImageKindUI/);
  assert.doesNotMatch(html, /share-image-kind|setShareImageKind|3×3 grid/);
  assert.match(html, /<img id="share-preview"/);
});

// Run _prepareShareImage + the button handlers in a sandbox with fake DOM bits.
function makeShareModal({ canShare = true, build } = {}) {
  const el = () => ({ style: {}, dataset: {}, disabled: false, textContent: '', parentElement: { style: {} },
    attrs: {}, removeAttribute(k) { delete this.attrs[k]; if (k === 'src') delete this.src; } });
  const els = { sharePreview: el(), shareImageNote: el(), sharePrimaryBtn: el(), shareCopyImageBtn: el(), shareUrl: el() };
  els.sharePrimaryBtn.dataset.nativeShare = canShare ? '1' : '0';
  const calls = { share: [], downloads: [], toasts: [], clipboard: [] };
  class FakeFileReader { readAsDataURL(b) { setTimeout(() => { this.result = 'data:image/png;base64,' + b.bytes; this.onload(); }, 0); } }
  class FakeFile { constructor(parts, name, opts) { this.parts = parts; this.name = name; this.type = opts.type; } }
  const sandbox = {
    IDS: Object.fromEntries(Object.keys(els).map(k => [k, k])),
    byId: (k) => els[k],
    FileReader: FakeFileReader, File: FakeFile, setTimeout, clearTimeout, Promise, Error,
    location: { origin: 'https://kessen.co.uk' },
    navigator: {
      canShare: () => canShare,
      share: (data) => { calls.share.push(data); return Promise.resolve(); },
      clipboard: { write: (items) => { calls.clipboard.push(items); return Promise.resolve(); } },
    },
    ClipboardItem: class { constructor(o) { this.o = o; } },
    URL: { createObjectURL: () => 'blob:x', revokeObjectURL() {} },
    document: { createElement: () => ({ click() { calls.downloads.push(this.download); } }) },
    showToast: (m) => calls.toasts.push(m),
    _rankedEloOrder: () => ({ ranked: new Array(4).fill({}) }),
    _buildShareImageBlob: build || (async () => ({ blob: { bytes: 'PNG' }, filename: 'kessen-top10-lewis.png' })),
  };
  vm.createContext(sandbox);
  const decl = js.match(/let _shareImage = null;[\s\S]*?const _SHARE_COPY_LABEL = [^\n]*\n/)?.[0];
  assert.ok(decl, 'share-image state declarations not found');
  vm.runInContext(decl.replace(/^let /gm, 'var ').replace(/^const /gm, 'var '), sandbox);
  for (const n of ['_prepareShareImage', '_flashShareBtn', 'shareImageFromModal', 'copyShareImageToClipboard', '_downloadShareImage']) {
    const s = fnSrc(n);
    assert.ok(s, n + ' not found');
    vm.runInContext(s, sandbox);
  }
  return { sb: sandbox, els, calls };
}

test('opening builds once: data: URL preview (never blob:), buttons enabled, short-list note', async () => {
  let builds = 0;
  const { sb, els } = makeShareModal({ build: async () => { builds++; return { blob: { bytes: 'PNG' }, filename: 'f.png' }; } });
  const p = sb._prepareShareImage();
  assert.equal(els.sharePrimaryBtn.disabled, true, 'primary should wait for the image');
  assert.match(els.shareImageNote.textContent, /Making your image/);
  await p;
  assert.equal(builds, 1);
  assert.match(els.sharePreview.src, /^data:image\/png;base64,/);
  assert.equal(els.sharePreview.style.display, '');
  assert.equal(els.sharePrimaryBtn.disabled, false);
  assert.match(els.shareImageNote.textContent, /Only 4 ranked so far/);
  assert.doesNotMatch(fnSrc('_prepareShareImage'), /createObjectURL/);
});

test('Share calls navigator.share synchronously with the prepared file and the short link only', async () => {
  const { sb, els, calls } = makeShareModal({ canShare: true });
  await sb._prepareShareImage();
  els.shareUrl.value = 'https://kessen.co.uk/s/Ab3dE7fG';
  sb.shareImageFromModal();
  assert.equal(calls.share.length, 1, 'share must be called inside the tap, before any await');
  assert.equal(calls.share[0].files[0].name, 'kessen-top10-lewis.png');
  assert.match(calls.share[0].text, /\nhttps:\/\/kessen\.co\.uk\/s\/Ab3dE7fG$/);
  // Long #r= link still in place → the share text carries no link at all.
  els.shareUrl.value = 'https://kessen.co.uk/#r=' + 'A'.repeat(3000);
  sb.shareImageFromModal();
  assert.doesNotMatch(calls.share[1].text, /#r=|https:/);
});

test('no file sharing → the same button downloads the prepared image; nothing before it is ready', async () => {
  let builds = 0;
  const { sb, calls } = makeShareModal({ canShare: false, build: async () => { builds++; return { blob: { bytes: 'PNG' }, filename: 'kessen-top10.png' }; } });
  sb.shareImageFromModal();
  assert.equal(calls.downloads.length, 0, 'nothing to download before the image is ready');
  await sb._prepareShareImage();
  sb.shareImageFromModal();
  sb.copyShareImageToClipboard();
  assert.deepEqual(calls.downloads, ['kessen-top10.png']);
  assert.equal(calls.share.length, 0);
  assert.equal(calls.clipboard.length, 1, 'copy writes synchronously in the click');
  assert.equal(builds, 1, 'buttons reuse the one build');
});

test('a build that finishes after the modal closed or reopened is dropped', async () => {
  let release;
  const { sb, els } = makeShareModal({ build: () => new Promise(r => { release = () => r({ blob: { bytes: 'OLD' }, filename: 'old.png' }); }) });
  const first = sb._prepareShareImage();
  sb._shareImageGen++; // what closeShare does
  release();
  await first;
  assert.equal(els.sharePreview.src, undefined);
  assert.equal(sb._shareImage, null);
});

test('a failed build hides the preview and says the link still works', async () => {
  const { sb, els } = makeShareModal({ build: async () => { throw new Error('Canvas.toBlob returned null'); } });
  await sb._prepareShareImage();
  assert.equal(els.sharePreview.parentElement.style.display, 'none');
  assert.match(els.shareImageNote.textContent, /link below still works/);
  assert.equal(els.sharePrimaryBtn.disabled, true);
});
