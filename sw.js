const CACHE_NAME = "portfolio-cache-v1";
const urlsToCache = ["/", "/index.html", "/style.css", "/script.js", "/angulat-client.html", "/img/homepic.png", "/script.js", "/portfolio.style.css",
    "/img/favicon.png", "/img/icon-192.png", "/img/icon-512.png", "/img/screenshot.png", "/img/screenshot-wide.png", "/chatapp.html", "/cv.html", "/meet.html",
    "/movieapi.html", "/myflix-react.html", "/pokemon.html", "/img/api2.png", "/img/api3.png", "/img/banner3.jpg", "/img/chatapp1.jpg", "/img/chatapp2.jpg",
    "/img/chatapp3.jpg", "/img/jamesfoday.jpg", "/img/meet1.png", "/img/meet2.png", "/img/meet3.png", "/img/movieapi.png", "/img/p1.png", "/img/pi2.png", "/img/pi3.png",
    "/img/poke.png", "/img/poke2.png", "/img/poke3.png", "/img/poke4.png", "/img/react.png", "/img/react2.png", "/img/jamesf.pdf", "/img/jfjames.pdf"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
