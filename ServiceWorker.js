const cacheName = "Digital Clay-Colombia Asombrosa-1.1";
const contentToCache = [
  "Build/ColombiAsombrosa.loader.js",
  "Build/ColombiAsombrosa.framework.js.unityweb",
  "Build/ColombiAsombrosa.data.unityweb",
  "Build/ColombiAsombrosa.wasm.unityweb",
  "TemplateData/style.css"
];

self.addEventListener("install", function (e) {
  console.log("[Service Worker] Install");

  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("[Service Worker] Caching app shell");
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith("http")) return;

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;

      return fetch(event.request).then(res => {
        return caches.open(cacheName).then(cache => {
          cache.put(event.request, res.clone());
          return res;
        });
      });
    })
  );
});
