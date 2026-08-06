const CACHE='pilog-v0.9';
const ASSETS=['./','./index.html?v=090','./manifest.webmanifest?v=090','./icon.svg?v=090','./world-map.svg?v=090','./a350-sample.jpeg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html?v=090')));return}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
