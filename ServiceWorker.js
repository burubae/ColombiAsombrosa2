const cacheName = "DigitalClay-ColombiaAsombrosa-v1.1";
const contentToCache = [
  "Build/ColombiAsombrosa.loader.js",
  "Build/ColombiAsombrosa.framework.js.unityweb",
  "Build/ColombiAsombrosa.data.unityweb",
  "Build/ColombiAsombrosa.wasm.unityweb",
  "TemplateData/style.css"
];

// 📦 Carga inicial al instalar
self.addEventListener("install", event => {
  console.log("[SW] Instalando...");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("[SW] Cacheando assets iniciales...");
      return cache.addAll(contentToCache);
    })
  );
});

// ⚙️ Responde a solicitudes de red
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // 🚫 Ignora requests que no son GET (POST, etc.)
  if (event.request.method !== "GET") return;

  // 🚫 Ignora extensiones y protocolos raros
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
