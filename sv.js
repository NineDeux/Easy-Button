const CACHE_NAME = "easy-button-cache";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "https://www.soundjay.com/button/sounds/button-1.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
