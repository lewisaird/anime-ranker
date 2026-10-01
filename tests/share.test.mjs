#!/usr/bin/env node
// tests/share.test.mjs — the short-share-link function (netlify/functions/share.js).
//
// The payload is attacker-controlled on both ends, so most of the value here
// is in sanitisePayload: every field clamped, covers host-allowlisted, junk
// rejected. The handler itself is exercised with an in-memory Blobs store
// via node:test's module mocking.
//
// Runs via:   node --test tests/share.test.mjs   (npm test runs the folder)

import { test } from 'node:test';
import assert from 'node:assert/strict';

// In-memory stand-in for @netlify/blobs.
// v1.0.253 — records get's options (share.js reads with consistency 'strong') and
// honours set's onlyIfNew, returning { modified } the way @netlify/blobs 10.7.4 does.
const memory = new Map();
let lastGetOpts;
const fakeStore = {
  async get(key, opts) { lastGetOpts = opts; const v = memory.get(key); if (v === undefined) return null; return opts?.type === 'json' ? JSON.parse(v) : v; },
  async set(key, value, opts) {
    if (opts?.onlyIfNew && memory.has(key)) return { modified: false };
    memory.set(key, String(value));
    return { etag: `"${key}-${memory.size}"`, modified: true };
  },
};
import { sanitisePayload, newId, MAX_ENTRIES, createHandler } from '../netlify/functions/share.js';
const handler = createHandler(() => fakeStore);

const goodPayload = {
  u: 'lewis', b: 412,
  top: [
    { r: 1, t: 'Fullmetal Alchemist: Brotherhood', e: 1612, c: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114.jpg' },
    { r: 2, t: 'Steins;Gate', e: 1580, c: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg' },
  ],
};

test('sanitisePayload keeps a valid payload intact', () => {
  const out = sanitisePayload(goodPayload);
  assert.deepEqual(out, goodPayload);
});

test('sanitisePayload rejects non-payloads', () => {
  for (const bad of [null, 42, 'x', {}, { top: 'nope' }, { top: [] }, { top: [{ r: 1 }] }]) {
    assert.equal(sanitisePayload(bad), null, JSON.stringify(bad));
  }
});

test('sanitisePayload clamps lengths, strips control chars, drops bad covers, caps entries', () => {
  const long = 'x'.repeat(500);
  const out = sanitisePayload({
    u: long, b: '-5', ms: 'Battle\u0000 100',
    top: Array.from({ length: MAX_ENTRIES + 10 }, (_, i) => ({
      r: i + 1, t: `Title ${i}\u0007`, e: 99999999,
      c: i % 2 ? 'javascript:alert(1)' : 'https://evil.example/x.jpg',
    })),
  });
  assert.equal(out.u.length, 80);
  assert.equal(out.b, 0);
  assert.equal(out.ms, 'Battle 100');
  assert.equal(out.top.length, MAX_ENTRIES);
  assert.equal(out.top[0].t, 'Title 0');
  assert.equal(out.top[0].e, 10_000);
  assert.ok(out.top.every(a => a.c === ''), 'non-allowlisted covers become blank');
  assert.equal(Object.keys(out.top[0]).sort().join(), 'c,e,r,t', 'no extra fields survive');
});

test('sanitisePayload only accepts https covers on the known CDNs', () => {
  const mk = c => sanitisePayload({ top: [{ r: 1, t: 't', e: 1, c }] }).top[0].c;
  assert.equal(mk('https://s4.anilist.co/a.jpg'), 'https://s4.anilist.co/a.jpg');
  assert.equal(mk('http://s4.anilist.co/a.jpg'), '');
  assert.equal(mk('https://s4.anilist.co.evil.example/a.jpg'), '');
  assert.equal(mk('data:image/png;base64,AAAA'), '');
});

test('newId is 8 chars from the unambiguous alphabet', () => {
  for (let i = 0; i < 50; i++) {
    const id = newId();
    assert.match(id, /^[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789]{8}$/);
  }
  assert.equal(newId(Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7])), 'ABCDEFGH');
});

test('POST stores a sanitised payload and GET returns it', async () => {
  const post = await handler(new Request('https://kessen.co.uk/.netlify/functions/share', {
    method: 'POST', headers: { origin: 'https://kessen.co.uk' },
    body: JSON.stringify({ payload: { ...goodPayload, top: [...goodPayload.top, { r: 3, t: 'Bad cover', e: 1, c: 'https://evil.example/x.jpg' }] } }),
  }), {});
  assert.equal(post.status, 200);
  const { id } = await post.json();
  assert.match(id, /^[A-Za-z0-9]{8}$/);
  assert.equal(memory.size, 1);

  const get = await handler(new Request(`https://kessen.co.uk/.netlify/functions/share?id=${id}`), {});
  assert.equal(get.status, 200);
  assert.equal(get.headers.get('cache-control'), 'public, max-age=86400');
  const payload = await get.json();
  assert.equal(payload.top.length, 3);
  assert.equal(payload.top[2].c, '', 'stored copy is the sanitised one');
  assert.equal(payload.u, 'lewis');
});

test('GET rejects bad ids and unknown ids', async () => {
  assert.equal((await handler(new Request('https://kessen.co.uk/.netlify/functions/share?id=../x'), {})).status, 400);
  assert.equal((await handler(new Request('https://kessen.co.uk/.netlify/functions/share?id=zzzzzzzz'), {})).status, 404);
});

test('POST rejects foreign origins, oversized bodies, junk', async () => {
  const mk = (body, headers = { origin: 'https://kessen.co.uk' }) => handler(new Request('https://kessen.co.uk/.netlify/functions/share', { method: 'POST', headers, body }), {});
  assert.equal((await mk(JSON.stringify({ payload: goodPayload }), { origin: 'https://evil.example' })).status, 403);
  assert.equal((await mk('x'.repeat(20_000))).status, 413);
  assert.equal((await mk('{not json')).status, 400);
  assert.equal((await mk(JSON.stringify({ payload: { top: [] } }))).status, 400);
  assert.equal((await mk(JSON.stringify({ payload: goodPayload }), {})).status, 200, 'no Origin header is allowed');
  assert.equal((await handler(new Request('https://kessen.co.uk/.netlify/functions/share', { method: 'DELETE' }), {})).status, 405);
});

// v1.0.254 — the client's 404 retry window (tryLoadSharedView) must outlast the ~10.5 s a fresh
// link took to become readable on the live site: about 25 s of waits.
test('tryLoadSharedView retries a 404 for about 25 s', async () => {
  const { readFileSync } = await import('node:fs');
  const app = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
  const waits = app.match(/const retryWaits = \[([\d,\s]+)\];/)?.[1].split(',').map(Number);
  assert.ok(waits, 'retryWaits not found in app.js');
  const total = waits.reduce((a, b) => a + b, 0);
  assert.ok(total >= 20000 && total <= 30000, `retry waits total ${total} ms`);
  assert.deepEqual(waits, [...waits].sort((a, b) => a - b), 'waits should not shrink');
});

// v1.0.253 — a just-created link 404'd for ~15 s under eventual consistency; GET must read strongly.
test('GET reads with strong consistency', async () => {
  memory.set('Strong23', JSON.stringify({ v: 1, payload: goodPayload }));
  lastGetOpts = undefined;
  const res = await handler(new Request('https://kessen.co.uk/.netlify/functions/share?id=Strong23'), {});
  assert.equal(res.status, 200);
  assert.equal(lastGetOpts?.consistency, 'strong');
  assert.equal(lastGetOpts?.type, 'json');
});

// v1.0.253 — environments without the uncached edge URL throw BlobsConsistencyError on strong reads.
test('GET falls back to a normal read when strong consistency is unavailable', async () => {
  memory.set('Fallbk23', JSON.stringify({ v: 1, payload: goodPayload }));
  const noStrong = { ...fakeStore, async get(key, opts) {
    if (opts?.consistency === 'strong') throw Object.assign(new Error('no uncachedEdgeURL'), { name: 'BlobsConsistencyError' });
    return fakeStore.get(key, opts);
  } };
  const res = await createHandler(() => noStrong)(new Request('https://kessen.co.uk/.netlify/functions/share?id=Fallbk23'), {});
  assert.equal(res.status, 200);
  assert.equal((await res.json()).u, 'lewis');
});

// v1.0.253 — POST writes create-only (onlyIfNew); an id that is already taken is never overwritten.
test('POST never overwrites an existing id and allocates a fresh one', async () => {
  let taken = null;
  const firstIdTaken = { ...fakeStore, async set(key, value, opts) {
    if (!taken) { taken = key; memory.set(key, 'EXISTING'); } // the first id generated is already in use
    return fakeStore.set(key, value, opts);
  } };
  const res = await createHandler(() => firstIdTaken)(new Request('https://kessen.co.uk/.netlify/functions/share', {
    method: 'POST', headers: { origin: 'https://kessen.co.uk' }, body: JSON.stringify({ payload: goodPayload }),
  }), {});
  assert.equal(res.status, 200);
  const { id } = await res.json();
  assert.notEqual(id, taken, 'a fresh id was allocated');
  assert.equal(memory.get(taken), 'EXISTING', 'the existing record was not overwritten');
  assert.equal(JSON.parse(memory.get(id)).payload.u, 'lewis');
});

// v1.0.253 — a blob-edge 4xx comes back as { modified: true } with no etag; that must not hand out an id.
test('POST fails (500) when the store reports a write without an etag', async () => {
  const noEtag = { ...fakeStore, async set() { return { modified: true }; } };
  const res = await createHandler(() => noEtag)(new Request('https://kessen.co.uk/.netlify/functions/share', {
    method: 'POST', headers: { origin: 'https://kessen.co.uk' }, body: JSON.stringify({ payload: goodPayload }),
  }), {});
  assert.equal(res.status, 500);
  assert.equal((await res.json()).id, undefined);
});
