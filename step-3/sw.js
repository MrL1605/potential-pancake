/**
 * Created By : Lalit Umbarkar
 * Created On : 02/11/20
 */

const CACHE_KEY = "randomKash";
const staticFiles = ["/potential-pancake/step-2/", "/potential-pancake/step-2/index.html",
    "/potential-pancake/step-3/game-loader.js",
    "/potential-pancake/step-3/queries.js",
    "/potential-pancake/assets/castle-inverted-1024.png",
    "https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js",
    "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.css",
    "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.js",
    "https://mrl1605.github.io/potential-pancake/assets/common-styles.css"]

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_KEY).then((cache) => {
            return cache.addAll(staticFiles);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            return r || fetch(e.request).then((response) => {
                return caches.open(CACHE_KEY).then((cache) => {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});


