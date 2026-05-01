const CACHE = 'glovia-v1';
  const ASSETS = [                                                                                       
    '/accounting_app/',                                                                                
    '/accounting_app/index.html',
    '/accounting_app/icon.svg',
    '/accounting_app/manifest.json',                                                                     
  ];
                                                                                                         
  self.addEventListener('install', e => {                                                              
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
    self.skipWaiting();                                                                                  
  });
                                                                                                         
  self.addEventListener('activate', e => {
    e.waitUntil(
      caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
      )                                                                                                  
    );
    self.clients.claim();                                                                                
  });             

  self.addEventListener('fetch', e => {
    const url = e.request.url;
    if (url.includes('script.google.com') || url.includes('googleapis.com')) return;
    e.respondWith(                                                                                       
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );                                                                                                   
  });
