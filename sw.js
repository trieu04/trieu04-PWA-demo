var CACHE_NAME = "my-cache-1"
var urlsToAdd = ["./", "./src/style.css", "./src/index.js"]
self.addEventListener("install", event => {
    console.log("install")
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(urlsToAdd);
            })
    )
    self.skipWaiting();
})

self.addEventListener("fetch", event => {
    console.log("Intercepting fetch request for:", event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if(response) {
                    return response
                }
                return fetch(event.request)
            })
    )
})