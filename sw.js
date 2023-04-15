self.addEventListener('install', Event=> {
    console.log('Service worker instalado');
  });
  
  
  self.addEventListener('activate', Event => {
    console.log('Service worker ativado');
  });
  
  
  self.addEventListener('fetch', Event => {
    console.log('Service worker interceptando solicitação de rede');
  });
  
  
  self.addEventListener('fetch', event => {
    if (event.request.url === '/') {
      event.respondWith(
        caches.match(event.request).then(response => {
          if (response) {
            console.log('Recuperando a página inicial do cache');
            return response;
          }
          console.log('Armazenando a página inicial no cache');
          return fetch(event.request).then(response => {
            return caches.open('meu-cache').then(cache => {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    }
  });
  