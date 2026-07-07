// Kessen — Service Worker
// Strategy:
//   - App shell (index.html, app.js, styles.css, icons, manifest) → cache-first, update in background
//   - Netlify Functions (/.netlify/functions/*) → network-only (always fresh)
//   - AniList GraphQL API → network-only (always fresh)
//   - Cover image CDNs → stale-while-revalidate via dedicated capped cache
//   - Everything else → network-first, fall back to cache

// ⚠️  VERSION SOURCE OF TRUTH
// Must stay in lockstep with `package.json > version` and the `<meta name="version">`
// tag in index.html. Bumping this value invalidates all prior app-shell caches
// (old `kessen-v*` entries are purged in the `activate` handler below).
const APP_VERSION  = '1.0.223';
const CACHE_NAME   = `kessen-v${APP_VERSION}`;
// v1.0.149 — Cover image cache. Unversioned so it survives app-shell bumps
// (covers never change for a given AniList ID, so re-downloading on every
// app upgrade is pure waste). Capped at COVER_CACHE_MAX via a soft LRU
// inside the fetch handler.
const COVER_CACHE  = 'kessen-covers-v1';
const COVER_CACHE_MAX = 1500;

// Hosts whose images get the dedicated cover cache treatment.
function isCoverHost(hostname) {
  return hostname === 's4.anilist.co'
      || hostname === 'img.anili.st'
      || hostname.endsWith('.media-amazon.com')
      || hostname.endsWith('myanimelist.net')
      || hostname.endsWith('cdn.myanimelist.net');
}

// Cache the canonical root only. Netlify serves index.html at both '/' and
// '/index.html', but caching both wastes a slot and doubles the install cost —
// and cache keys are URL-exact, so a hit on '/' doesn't cover '/index.html'
// regardless. Direct visits to '/index.html' (rare) fall through to network
// and then offline.html when the user is offline.
const SHELL = [
  '/',
  '/app.js',
  '/styles.css',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/offline.html',
];

// ── Install: pre-cache the app shell ────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL)));
  self.skipWaiting();
});

// ── Activate: delete old caches, then reload all open pages ─────────────────
// After a version bump the old cached responses (including their CSP headers)
// are deleted and the new shell is fetched fresh. But any page that was already
// open loaded with the OLD cached headers and won't pick up the new ones until
// it reloads. client.navigate() does that reload automatically, so users always
// see the new version without needing to manually refresh twice.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        // Preserve the cover cache (unversioned) and the current shell cache.
        Promise.all(keys
          .filter(k => k !== CACHE_NAME && k !== COVER_CACHE)
          .map(k => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients =>
        Promise.all(clients.map(c => c.navigate(c.url).catch(() => {})))
      )
  );
});

// v1.0.149 — Soft FIFO eviction for the cover cache. We don't have access
// to real LRU metadata in the Cache API, so we use insertion order (which
// matches "first downloaded" in our usage pattern — close enough to LRU
// for cover images where re-render fetches the same URL).
//
// v1.0.200 — trim is AMORTISED: cache.keys() enumerates the whole cache, and
// running that after every single store made a burst of cover loads (season
// grids, Watch Together nominations) queue dozens of full-index scans on
// IndexedDB, contending with the cache.match() reads of covers still loading.
// Now it runs once every TRIM_EVERY stores. Worst-case overshoot is
// COVER_CACHE_MAX + TRIM_EVERY entries — negligible.
const TRIM_EVERY = 25;
let _coverPutCount = 0;
async function _trimCoverCache(cache) {
  if (++_coverPutCount % TRIM_EVERY !== 0) return;
  const keys = await cache.keys();
  if (keys.length <= COVER_CACHE_MAX) return;
  const removeCount = Math.ceil(COVER_CACHE_MAX * 0.1);
  for (let i = 0; i < removeCount; i++) {
    await cache.delete(keys[i]);
  }
}

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Always go to network for API calls — never cache GraphQL or function responses
  if (
    url.pathname.startsWith('/.netlify/functions/') ||
    url.hostname === 'graphql.anilist.co' ||
    url.hostname.includes('jikan.moe')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // v1.0.149 — Cover images: stale-while-revalidate from a dedicated cache.
  // Previously these were network-only — every Rankings scroll re-fetched
  // every cover from the CDN, hammering AniList's image hosts and burning
  // user mobile data. Covers are content-addressed by AniList ID and
  // effectively immutable, so cache aggressively and revalidate in
  // background for free CDN cache busts.
  if (isCoverHost(url.hostname)) {
    event.respondWith((async () => {
      const cache = await caches.open(COVER_CACHE);
      const cached = await cache.match(request);
      // v1.0.200 — cache-first, NO background revalidate. Covers are
      // immutable per AniList/MAL ID (same reason this cache is unversioned),
      // so a hit is final: revalidating re-downloaded every cover on every
      // render (the mobile-data waste this cache exists to prevent) and
      // re-stored it, triggering the trim scan each time. A hit now costs
      // zero network and zero cache writes. If a CDN ever does change a
      // cover, FIFO eviction at the cap eventually refetches it.
      if (cached) return cached;
      const fresh = await fetch(request)
        .then(response => {
          if (response && response.status === 200 && response.type !== 'opaque') {
            cache.put(request, response.clone()).then(() => _trimCoverCache(cache));
          }
          return response;
        })
        .catch(() => null);
      return fresh || Response.error();
    })());
    return;
  }

  // v1.0.204 — Navigation requests (HTML page loads) use NETWORK-FIRST. The
  // app shell HTML changes on every release and serving a stale cached copy
  // means users see an OLD version of the page until the SW updates in the
  // background and the controller-change reload fires — which on iOS Safari
  // is unreliable and visibly slow. A confirmed report from a beta tester:
  // the Guest Mode button (added later in development) was literally absent
  // from the DOM on first load and only appeared after a manual refresh,
  // because the SW was serving HTML cached from before Guest Mode existed.
  // Network-first ensures the HTML is always fresh on a healthy connection
  // and falls back to the cached copy (or offline.html) only when offline.
  // Other shell assets — JS, CSS, icons — stay cache-first below.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const fresh = await fetch(request);
        if (fresh && fresh.status === 200) {
          cache.put(request, fresh.clone());
        }
        return fresh;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        return cache.match('/offline.html');
      }
    })());
    return;
  }

  // App shell (JS / CSS / icons): cache-first, revalidate in background
  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(request);
      const networkFetch = fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => null);

      if (cached) return cached;

      const networkResponse = await networkFetch;
      if (networkResponse) return networkResponse;

      // Network failed and nothing cached — serve offline page for navigation
      if (request.mode === 'navigate') {
        return cache.match('/offline.html');
      }
      // v1.0.109 — non-navigate fetch with no cache and no network. Return
      // an explicit network error so callers see a real failure instead of
      // an undefined response, which some browsers turn into "Failed to fetch".
      return Response.error();
    })
  );
});

// ── Push notifications (Phase 0) ────────────────────────────────────────────
// v1.0.168 — Web Push handler. Receives messages dispatched by the
// /api/push-send Netlify Function (signed with VAPID private key, delivered
// via FCM / Apple Push / whichever endpoint the browser registered with).
//
// Payload shape (JSON):
//   {
//     kind:    'wt-invite' | 'lc-invite' | 'tower-retry' | 'test',
//     title:   'Lewis invited you to Watch Together',
//     body:    'Tap to join session TM5Y5G8',
//     url?:    '/?wt=TM5Y5G8',           // deep link on click
//     icon?:   '/icon-192.png',
//     badge?:  '/icon.svg',
//     tag?:    'wt-TM5Y5G8',             // collapse multiple of same kind
//     data?:   { ... }                   // round-trips to notificationclick
//   }
//
// Missing / malformed payload still shows a generic fallback so we never
// suppress a notification the user expected — push delivery itself is a
// strong signal of intent.

// v1.0.223 — DIAGNOSTIC: respond to client version-check pings. Lets the
// client confirm whether the running SW is this v1.0.223 build or an older
// stale one — invaluable for figuring out why notification postMessages
// aren't firing. Old SWs ignore this message type (no handler), so the
// client times out and knows the SW is stale.
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'kessen-version-check') return;
  event.waitUntil((async () => {
    try {
      const clients = await self.clients.matchAll();
      const payload = { type: 'kessen-version-reply', version: APP_VERSION };
      clients.forEach(c => { try { c.postMessage(payload); } catch { /* defensive */ } });
    } catch { /* defensive */ }
  })());
});

self.addEventListener('push', event => {
  let payload = {};
  try {
    if (event.data) payload = event.data.json();
  } catch {
    try { payload.body = event.data?.text?.() || ''; } catch { /* noop */ }
  }

  const title = payload.title || 'Kessen';
  const options = {
    body:        payload.body  || '',
    icon:        payload.icon  || '/icon-192.png',
    badge:       payload.badge || '/icon.svg',
    tag:         payload.tag,
    data:        { url: payload.url || '/', ...(payload.data || {}) },
    requireInteraction: false,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click — focus an existing Kessen tab if one is open, otherwise
// open a new one at the payload's deep-link target.
//
// v1.0.220 — When the TWA is in the background and the user taps a
// notification, the previous "navigate + focus" approach was structurally
// broken in two ways:
//   1. WindowClient.navigate() is unreliable inside TWAs / standalone PWAs:
//      it either throws or returns without triggering a true page load.
//      The catch silently swallowed the error and we'd just focus the
//      existing window at whatever URL it was already on — the deep-link
//      query string ('?tower=1&mediaId=…') never reached the client.
//   2. Even if the navigation HAD happened, the client's deep-link handlers
//      (_towerCheckDeepLink etc.) only run once at boot from inside
//      showResults(). A background TWA is past boot; navigating it doesn't
//      re-run that path, so the handler never fires even with the right URL.
// New approach: ALWAYS postMessage the deep-link data to the focused client.
// The client has a 'message' listener that calls the appropriate deep-link
// handler in-app, without depending on URL change or page reload. We still
// try navigate() as a courtesy so the URL bar reflects the deep link, but
// nothing depends on it succeeding.
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const data   = event.notification.data || {};
  const target = data.url || '/';

  event.waitUntil((async () => {
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    // Prefer an existing visible Kessen tab on the same origin
    for (const c of allClients) {
      const sameOrigin = new URL(c.url).origin === self.location.origin;
      if (sameOrigin && 'focus' in c) {
        // Best-effort URL update so the address bar reflects the deep link.
        if (c.navigate && target !== '/') {
          try { await c.navigate(target); } catch { /* unreliable in TWAs */ }
        }
        // Authoritative: postMessage drives the in-app handler.
        try {
          c.postMessage({
            type: 'kessen-notification-click',
            url:  target,
            data,
          });
        } catch { /* defensive */ }
        return c.focus();
      }
    }
    // No existing client — open a fresh one at the target. The boot-time
    // deep-link handlers will pick up the URL params normally.
    if (self.clients.openWindow) {
      return self.clients.openWindow(target);
    }
  })());
});
