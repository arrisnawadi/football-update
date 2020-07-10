importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')
workbox.loadModule('workbox-strategies')
workbox.loadModule('workbox-expiration')
workbox.loadModule('workbox-cacheable-response')

const CACHE_NAME = 'football-league-v1'

if (workbox)
  console.log('Workbox berhasil dimuat');
else
  console.log('Workbox gagal dimuat');

// Instalasi service worker
workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/league.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/match.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/favorite.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/contentLoaded.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/img/Bundesliga.png', revision: '1' },
    { url: '/img/icon.png', revision: '1' },
    { url: '/img/icon-512.png', revision: '1' },
    { url: '/img/icon-192.png', revision: '1' },
    { url: '/img/Serie-A.png', revision: '1' },
    { url: '/img/Primera-Division.png', revision: '1' },
    { url: '/img/Premier-League.png', revision: '1' },
    { url: '/img/logo.png', revision: '1' },
    { url: '/manifest.json', revision: '1' }
],
{
    // Ignore all URL parameters.
    ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /\.(?:js|css|html|json)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static'
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60
            }),
        ],
    })
);

workbox.routing.registerRoute(
    'http://api.football-data.org/v2/',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'api-football',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                headers: {
                    'X-Auth-Token': 'true'
                }
            })
        ]
    })
);

self.addEventListener('push', event => {
    let body
    if (event.data) {
        body = 'Notifikasi baru dari aplikasi football'
    } else {
        body = 'Push message no payload'
    }

    const options = {
        body: body,
        icon: 'img/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Football Notification', options)
    )
})