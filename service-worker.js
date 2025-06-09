const CACHE_NAME = 'behälter-rechner-v2';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  'https://images.seeklogo.com/logo-png/54/2/motherson-logo-png_seeklogo-544537.png'
];

// Install Event: Cache statische Assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event: Assets aus dem Cache abrufen, falls vorhanden, sonst Netzwerk
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache Hit - returniere die Antwort
        if (response) {
          return response;
        }
        // Kein Cache Hit - rufe vom Netzwerk ab
        return fetch(event.request).then(
          response => {
            // Überprüfe, ob wir eine gültige Antwort erhalten haben
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Wenn die Antwort gültig ist, klone sie und speichere sie im Cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// Activate Event: Alte Caches löschen
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
