// Guarda la app para que abra rápido y funcione sin conexión.
const V='mp-v2', SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET') return;
  if(u.origin===location.origin){ // app: red primero, caché si no hay conexión
    e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
  } else if(u.hostname==='image.tmdb.org'){ // pósters: caché primero
    e.respondWith(caches.open(V+'-img').then(c=>c.match(e.request).then(h=>h||fetch(e.request).then(r=>{c.put(e.request,r.clone());return r}))));
  }
});
