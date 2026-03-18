const CACHE_NAME = 'behälter-rechner-v1.1.37';
const urlsToCache = [
	'./',
	'./index.html',
	'./style.css',
	'./script.js',
	'./phoneNumbers.json',
	'./manifest.json',
	'./ios/16.png',
	'./ios/32.png',
	'./ios/60.png',
	'./ios/76.png',
	'./ios/120.png',
	'./ios/152.png',
	'./ios/167.png',
	'./ios/180.png',
	'./ios/192.png',
	'./ios/512.png',
	'./logo.PNG'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache => {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if (response) {
				return response;
			}
			return fetch(event.request).then(
				response => {
					if (!response || response.status !== 200 || response.type !== 'basic') {
						return response;
					}

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
