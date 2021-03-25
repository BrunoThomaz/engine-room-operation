const cacheName = 'Application'
const resources = [
    '/',
    '/index.html',
    './src/css/main.css',
    './src/js/Chart.min.js',
    './src/js/charting.js',
    './src/js/forming.js',
    './src/js/main.js',
    './src/js/styling.js',
    './src/js/tasking.js',
]

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing Service Worker...', event)
    if (!('caches' in self)) return
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
                return cache.addAll(resources)
            })
    )
})

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating Service Worker...', event)
    return self.clients.claim()
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request)
                .then((res) => {
                    return caches.open(cacheName)
                    .then((cache) => {
                        cache.put(event.request.url, res.clone());
                        return res
                    })
                })
            })
            .catch((err) => {
                console.log('[Service Worker] Error on caching: ', err)
            })
    )
})