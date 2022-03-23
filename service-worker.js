const timestamp = 1648007102041;
const build = [
  "/check-split/_app/start-49f2dc39.js",
  "/check-split/_app/pages/__layout.svelte-f7df85c0.js",
  "/check-split/_app/assets/pages/__layout.svelte-a66fd1a1.css",
  "/check-split/_app/error.svelte-71d509d1.js",
  "/check-split/_app/pages/index.svelte-c0022953.js",
  "/check-split/_app/assets/pages/index.svelte-d5c4df9c.css",
  "/check-split/_app/chunks/vendor-b755ecce.js"
];
const files = [
  "/check-split/PXL_20220211_143502777.jpeg",
  "/check-split/android-chrome-192x192.png",
  "/check-split/android-chrome-512x512.png",
  "/check-split/apple-touch-icon.png",
  "/check-split/browserconfig.xml",
  "/check-split/favicon-16x16.png",
  "/check-split/favicon-32x32.png",
  "/check-split/favicon.ico",
  "/check-split/favicon.png",
  "/check-split/manifest.json",
  "/check-split/mstile-150x150.png",
  "/check-split/robots.txt",
  "/check-split/safari-pinned-tab.svg",
  "/check-split/svelte-welcome.png",
  "/check-split/svelte-welcome.webp"
];
const worker = self;
const FILES = `cache${timestamp}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(FILES).then((cache) => cache.addAll(to_cache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== FILES)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${timestamp}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
