/* Air Canvas service worker — offline-capable PWA.
   Strategy:
     • navigations  -> network-first (always fresh app), fall back to cached shell
     • same-origin   -> cache-first, fill cache on first network hit
     • MediaPipe CDN -> cache-first (model + wasm are large & immutable per version)
   Conservative on purpose: nothing here can hard-break the page — every path
   falls back to the network, and a bad cache is wiped on the next version bump. */
const CACHE = "air-canvas-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isCDN = url.hostname.endsWith("jsdelivr.net");
  const sameOrigin = url.origin === self.location.origin;

  // Always-fresh app shell when online; cached fallback when offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((r) => { caches.open(CACHE).then((c) => c.put("./index.html", r.clone())); return r; })
        .catch(() => caches.match("./index.html").then((c) => c || caches.match("./")))
    );
    return;
  }

  if (sameOrigin || isCDN) {
    e.respondWith(
      caches.match(req).then((cached) =>
        cached ||
        fetch(req).then((r) => {
          if (r && r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
          return r;
        })
      )
    );
  }
});
