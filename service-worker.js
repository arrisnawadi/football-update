importScripts('/js/workbox/workbox-sw.js');
importScripts('/js/workbox/workbox-core.prod.js');
importScripts('/js/workbox/workbox-strategies.prod.js');
importScripts('/js/workbox/workbox-routing.prod.js');

workbox.setConfig({
  modulePathPrefix: '/js/workbox/'
});

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
    ({request}) => request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css',
    })
  );
  
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        })
      ],
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );
   
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
          maxEntries: 30,
        }),
      ],
    })
  );
  
  workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'football-api'
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