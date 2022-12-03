importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.precaching.precacheAndRoute([
  'index.html',
  'offline.html',
  'contacto.html',
  'galeria.html',
  'nosotros.html',
  'icon/offline.jpg',
  'img/smart.png',
  'img/ke.jpg',
  'img/imagen.png',
  'img/fon1.jpg',
  'img/audi.png',
  'img/12.jpg',
]);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.NetworkOnly()
);


workbox.routing.registerRoute(
  ({request}) => request.destination === 'document',
  new workbox.strategies.NetworkFirst()
);

//si hay una respuesta que genere error 
workbox.routing.setCatchHandler(async context=>{
  console.log(context);
  console.log(context.request);

  if (context.request.destination === 'image') {
    return workbox.precaching.matchPrecache('icon/offline.jpg');}
    else if (context.request.destination === 'document') {
      return workbox.precaching.matchPrecache('offline.html');
    }
    return Response.error();
})


/*var cacheName = "appV1";
var contenidoCache = [
    "index.html",
    "contacto.html",
    "app.js", 
    "sw.js", 
    "manifest.webmanifest"];

self.addEventListener("install", (e) => {
  console.log("instalado");

  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(contenidoCache);
  })());
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      cache.put(e.request, response.clone());
      return response;
    })());
});

self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    const r = await cachself.addEventListener("install", (e) => {
      console.log("instaldo");
      e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(contenidoCache);
      }))
    })
  })())
});
*/