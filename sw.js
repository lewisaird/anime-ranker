// Kessen — Service Worker
// Strategy:
//   - App shell (index.html, app.js, styles.css, icons, manifest) → cache-first, update in background
//   - Netlify Functions (/.netlify/functions/*) → network-only (always fresh)
//   - AniList GraphQL API + cover CDNs → network-only (always fresh)
//   - Everything else → network-first, fall back to cache

// ⚠️  VERSION SOURCE OF TRUTH
// Must stay in lockstep with `package.json > version` and the `<meta name="version">`
// tag in index.html. Bumping this value invalidates all prior app-shell caches
// (old `kessen-v*` entries are purged in the `activate` handler below).
const APP_VERSION = '1.0.4';
const CACHE_NAME  = `kessen-v${APP_VERSION}`;

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

// ── Activate: delete old caches ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Always go to network for API calls and cover image CDNs
  if (
    url.pathname.startsWith('/.netlify/functions/') ||
    url.hostname === 'graphql.anilist.co' ||
    url.hostname.includes('anilist.co') ||
    url.hostname.includes('myanimelist.net') ||
    url.hostname.includes('jikan.moe')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // App shell: cache-first, revalidate in background
  // Falls back to offline.html for navigation requests when network is unavailable
  if (request.method === 'GET') {
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
      })
    );
  }
});
