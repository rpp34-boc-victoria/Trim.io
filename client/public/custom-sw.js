console.log("Service Worker Loaded...");
self.addEventListener('push', event => {
  const data = event.data.json()
  console.log('New notification  ', data)

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.description,
      icon: '/android-chrome-192x192.png'
    })
  );
})

self.addEventListener('notificationclick', function(event) {
  let url = 'https://www.youtube.com/';
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
      clients.matchAll({type: 'window'}).then( windowClients => {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // If so, just focus it.
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          // If not, then open the target URL in a new window/tab.
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
  );
});