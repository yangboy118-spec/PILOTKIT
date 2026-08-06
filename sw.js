const CACHE='pilog-v0.8.1';
const ASSETS=['./','./index.html?v=081','./manifest.webmanifest?v=081','./icon.svg?v=081','./world-map.svg?v=081'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html?v=081')));return}e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
