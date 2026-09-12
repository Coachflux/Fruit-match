const CACHE='fruit-fusion-v7';
const ASSETS=['./','./index.html','./manifest.json',
'./assets/appicon.svg','./assets/strawberry.svg','./assets/orange.svg','./assets/grape.svg',
'./assets/blueberry.svg','./assets/apple.svg','./assets/banana.svg','./assets/line.svg',
'./assets/rainbow.svg','./assets/bomb.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET')e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>caches.match('./'))))});
