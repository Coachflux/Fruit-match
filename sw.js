const CACHE='fruit-fusion-exact-v1';
const ASSETS=[
 './','./index.html','./manifest.json',
 './splash-art.jpg','./home-art.jpg','./levels-art.jpg','./game-art.jpg',
 './boss-art.jpg','./shop-art.jpg','./awards-art.jpg','./settings-art.jpg',
 './howto-art.jpg','./complete-art.jpg','./fusion-art.jpg','./outmoves-art.jpg',
 './icons/launchericon-192x192.png','./icons/launchericon-512x512.png'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(cached=>cached || fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r;
  }).catch(()=>caches.match('./index.html'))));
});