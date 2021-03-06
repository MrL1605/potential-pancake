/**
 * Created By : Lalit Umbarkar
 * Created On : 02/11/20
 */

const CACHE_KEY = "randomKash";
const staticFiles = ["/potential-pancake/step-3/", "/potential-pancake/step-3/index.html",
    "/potential-pancake/step-3/game-loader.js",
    "/potential-pancake/step-3/queries.js",
    "/potential-pancake/assets/castle-inverted-1024.png",
    "/potential-pancake/assets/common-styles.css",
    "https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js",
    "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.css",
    "https://cdn.jsdelivr.net/npm/fomantic-ui@2.8.7/dist/semantic.min.js"]

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_KEY).then((cache) => {
            return cache.addAll(staticFiles);
        })
    );
});

self.addEventListener('fetch', (e) => {
    const requestUrl = new URL(e.request.url);

    // Skip GraphQL API
    if (requestUrl.hostname === "sharing-magpie-86.hasura.app")
        return;

    e.respondWith(
        caches.match(e.request).then((resp) => {
            let networkFetch = fetch(e.request).then((response) => {
                return caches.open(CACHE_KEY).then((cache) => {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
            return resp || networkFetch;
        })
    );
});


