const CACHE = 'dropp-driver-v2';
const ASSETS = [
  '/dropp-driver/',
  '/dropp-driver/index.html',
  '/dropp-driver/manifest.json',
  '/dropp-driver/icon-192.png',
  '/dropp-driver/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request)
      .catch(() => caches.match('/dropp-driver/index.html')))
  );
});
