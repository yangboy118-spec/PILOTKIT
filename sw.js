const CACHE='pilog-v0.7';
const ASSETS=['./','./index.html?v=070','./manifest.webmanifest?v=070','./icon.svg?v=070','./world-map.svg?v=070'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html?v=070')));return}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
