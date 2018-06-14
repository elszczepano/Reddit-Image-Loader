const CACHE_NAME = 'redditjson';
const CACHED_FILES = [
    '/'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
    Promise.resolve()
        .then(() => {
        return caches.open(CACHE_NAME);
})
.then((cache) => {
    return cache.addAll(CACHED_FILES);
})
.then(() => {
    self.skipWaiting();
})
);
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
    caches.keys()
        .then((keys) => {
        return Promise.all(keys
            .filter((key) => {
            return key !== CACHE_NAME;
})
.map((key) => {
    return caches.delete(key);
})
);
})
);
});

function isForeignRequest(request) {
    return (/youtube|google|gstatic|twitter|codepen|cdn-cgi|disqus|github|twimg/).test(request.url);
}

function fetchAndCache(request, cache) {
    return fetch(request)
        .then((response) => {
        cache.put(request, response.clone());
    // console.log('fetch (online)', request.url);
    return response;
})
.catch(() => {
        // console.log('fetch (cache)', request.url);
        return cache.match(request);
});
}

function networkFirst(evt) {
    evt.respondWith(
        caches.open(CACHE_NAME)
            .then((cache) => {
            return fetchAndCache(evt.request, cache);
})
);
}

self.addEventListener('fetch', (evt) => {
    if (isForeignRequest(evt.request)) {
    return;
}

networkFirst(evt);
});