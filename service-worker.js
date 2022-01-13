/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-b9a97f2';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./valka_s_mloky_001.html","./valka_s_mloky_002.html","./valka_s_mloky_003.html","./valka_s_mloky_004.html","./valka_s_mloky_005.html","./valka_s_mloky_006.html","./valka_s_mloky_007.html","./valka_s_mloky_008.html","./valka_s_mloky_009.html","./valka_s_mloky_010.html","./valka_s_mloky_011.html","./valka_s_mloky_012.html","./valka_s_mloky_013.html","./valka_s_mloky_014.html","./valka_s_mloky_015.html","./valka_s_mloky_016.html","./valka_s_mloky_017.html","./valka_s_mloky_018.html","./valka_s_mloky_019.html","./valka_s_mloky_020.html","./valka_s_mloky_021.html","./valka_s_mloky_022.html","./valka_s_mloky_023.html","./valka_s_mloky_024.html","./valka_s_mloky_025.html","./valka_s_mloky_026.html","./valka_s_mloky_027.html","./valka_s_mloky_028.html","./valka_s_mloky_029.html","./valka_s_mloky_030.html","./valka_s_mloky_031.html","./valka_s_mloky_032.html","./valka_s_mloky_033.html","./valka_s_mloky_034.html","./valka_s_mloky_035.html","./valka_s_mloky_036.html","./valka_s_mloky_037.html","./valka_s_mloky_038.html","./valka_s_mloky_039.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/1.jpg","./resources/2.jpg","./resources/3.jpg","./resources/4.jpg","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
