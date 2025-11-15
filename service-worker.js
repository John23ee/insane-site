self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('fetch', e => {
  if (e.request.url.includes('index.html')) {
    e.respondWith(fetch(e.request));
  }
});