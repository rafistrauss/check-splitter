const timestamp = 1648007511570;
const build = [
  "/check-splitter/_app/start-e1471e56.js",
  "/check-splitter/_app/pages/__layout.svelte-f7df85c0.js",
  "/check-splitter/_app/assets/pages/__layout.svelte-0d2c5dbb.css",
  "/check-splitter/_app/error.svelte-71d509d1.js",
  "/check-splitter/_app/pages/index.svelte-c0022953.js",
  "/check-splitter/_app/assets/pages/index.svelte-d5c4df9c.css",
  "/check-splitter/_app/chunks/vendor-b755ecce.js"
];
const files = [
  "/check-splitter/PXL_20220211_143502777.jpeg",
  "/check-splitter/android-chrome-192x192.png",
  "/check-splitter/android-chrome-512x512.png",
  "/check-splitter/apple-touch-icon.png",
  "/check-splitter/browserconfig.xml",
  "/check-splitter/favicon-16x16.png",
  "/check-splitter/favicon-32x32.png",
  "/check-splitter/favicon.ico",
  "/check-splitter/favicon.png",
  "/check-splitter/manifest.json",
  "/check-splitter/mstile-150x150.png",
  "/check-splitter/robots.txt",
  "/check-splitter/safari-pinned-tab.svg",
  "/check-splitter/svelte-welcome.png",
  "/check-splitter/svelte-welcome.webp"
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
