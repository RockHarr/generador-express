/* sw.js - Generador Express - offline cache */
const SW_VERSION = 'v1.0.0';
const APP_SHELL = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/assets/favicon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SW_VERSION).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== SW_VERSION).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// Network-first for HTML, cache-first for others
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return;

  // HTML pages: network first
  if (req.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(SW_VERSION).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('/index.html')))
    );
    return;
  }

  // Other: cache first
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(SW_VERSION).then(c => c.put(req, copy));
      return res;
    }))
  );
});
