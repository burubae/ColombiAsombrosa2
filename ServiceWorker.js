const cacheName = "Digital Clay-Colombia Asombrosa-1.1";
const contentToCache = [
    "Build/ColombiAsombrosa.loader.js",
    "Build/ColombiAsombrosa.framework.js.unityweb",
    "Build/ColombiAsombrosa.data.unityweb",
    "Build/ColombiAsombrosa.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Evita solicitudes de extensiones u otros esquemas no HTTP/HTTPS
  if (url.protocol.startsWith("http")) {
    event.respondWith(
      caches.open("mi-cache").then(cache => {
        return cache.match(event.request).then(response => {
          return (
            response ||
            fetch(event.request).then(res => {
              cache.put(event.request, res.clone());
              return res;
            })
          );
        });
      })
    );
  }
});
