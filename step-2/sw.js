/**
 * Created By : Lalit Umbarkar
 * Created On : 01/11/20
 */

const CACHE_KEY = "randomKash";

self.addEventListener("install", (e) => {
    console.log("[ServiceWorker]: Installed");
    e.waitUntil(
        caches.open(CACHE_KEY).then((cache) => {
            console.log("[ServiceWorker]: Caching");
            return cache.addAll(["./index.html"])
        })
    );
});

self.addEventListener('fetch', (e) => {
    console.log("[ServiceWorker]: Fetching");
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
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


