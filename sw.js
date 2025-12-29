
const CACHE_NAME = 'meddeb-v1';
// Utilisation de chemins relatifs pour fonctionner sur GitHub Pages (ex: /meddeb/)
const urlsToCache = [
  './',
  'index.html',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Retourne le fichier du cache s'il existe, sinon fait une requête réseau
      return response || fetch(event.request);
    })
  );
});
