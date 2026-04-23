// Kessen — Service Worker
// Strategy:
//   - App shell (index.html, app.js, styles.css, icons, manifest) → cache-first, update in background
//   - Cover images (AniList / anili.st / MAL CDNs) → dedicated LRU cache, stale-while-revalidate
//   - Netlify Functions (/.netlify/functions/*) → network-only (always fresh)
//   - AniList GraphQL API → network-only (always fresh)
//   - Everything else → network-first, fall back to cache

// ⚠️  VERSION SOURCE OF TRUTH
// Must stay in lockstep with `package.json > version` and the `<meta name="version">`
// tag in index.html. Bumping this value invalidates all prior app-shell caches
// (old `kessen-v*` entries are purged in the `activate` handler below).
const APP_VERSION = '1.0.3';
const CACHE_NAME  = `kessen-v${APP_VERSION}`;

// Cover cache lives on its own version ladder so we can flush covers without
// rebuilding the shell cache (and vice-versa). Bumping this suffix is the
// only way to purge previously-cached covers on existing installs.
const CACHE_COVERS      = 'kessen-covers-v1';
const COVER_MAX_ENTRIES = 200; // ~200 distinct covers — enough for a heavy battle session

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

// ── Activate: delete old caches (but keep the current cover cache) ───────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_COVERS)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Cover-image cache helpers (§6.3.19) ─────────────────────────────────────
// Three CDNs serve cover art in this app. We match on hostname so the logic
// can't accidentally swallow requests to graphql.anilist.co or the Jikan API.
const COVER_HOSTS = new Set([
  's4.anilist.co',
  'img.anili.st',
  'cdn.myanimelist.net',
]);

function isCoverRequest(request, url) {
  return (
    request.method === 'GET' &&
    COVER_HOSTS.has(url.hostname) &&
    (request.destination === 'image' ||
      /\.(jpe?g|png|webp|avif|gif)(\?|$)/i.test(url.pathname))
  );
}

// The Cache API preserves insertion order in `keys()`, so FIFO-trim on the
// front of that list approximates LRU as long as every cache hit triggers a
// background refresh (`handleCoverRequest` below) — which re-inserts the
// entry at the tail via delete() + put(). That gives us strict LRU without
// paying for an IndexedDB timestamp side-table.
async function trimCoverCache(cache, maxEntries) {
  const keys = await cache.keys();
  const excess = keys.length - maxEntries;
  if (excess <= 0) return 0;
  const toDelete = keys.slice(0, excess);
  await Promise.all(toDelete.map(k => cache.delete(k)));
  return toDelete.length;
}

async function handleCoverRequest(request) {
  const cache = await caches.open(CACHE_COVERS);
  const cached = await cache.match(request);

  // Background refresh: delete + put re-orders this entry to the tail of
  // the cache key list, so subsequent trims evict genuinely-old entries.
  const refresh = fetch(request)
    .then(async response => {
      if (!response || response.status !== 200) return response;
      await cache.delete(request);
      await cache.put(request, response.clone());
      await trimCoverCache(cache, COVER_MAX_ENTRIES);
      return response;
    })
    .catch(() => null);

  // Stale-while-revalidate: serve the cached copy immediately if present.
  // The refresh promise is fire-and-forget; if the SW is killed before it
  // settles, the next cache hit will pick up the fresh copy next round.
  if (cached) return cached;

  const fresh = await refresh;
  if (fresh) return fresh;

  // Network failed and nothing cached — synthesize a 504 so the <img
  // onerror> fallback in index.html fires instead of leaving a broken icon.
  return new Response('', { status: 504, statusText: 'Offline' });
}

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Cover images → dedicated LRU cache with stale-while-revalidate.
  // Must run BEFORE the API bypass, because `hostname.includes('anilist.co')`
  // below would otherwise swallow s4.anilist.co cover requests too.
  if (isCoverRequest(request, url)) {
    event.respondWith(handleCoverRequest(request));
    return;
  }

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
