// Kessen — Service Worker
// Strategy:
//   - App shell (index.html, icons, manifest) → cache-first, update in background
//   - Netlify Functions (/.netlify/functions/*) → network-only (always fresh)
//   - AniList GraphQL API → network-only (always fresh)
//   - Everything else → network-first, fall back to cache

const CACHE_NAME = 'kessen-v2';
const SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
];

// ── Install: pre-cache the app shell ────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

// ── Activate: delete old caches ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Always go to network for API calls
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
  if (request.method === 'GET') {
    event.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request).then(response => {
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        }).catch(() => null);

        // Return cached immediately if available, otherwise wait for network
        return cached || networkFetch;
      })
    );
  }
});
