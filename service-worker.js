importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyjZ_hPS5f4MN2d8iqkUQdV7w0hFNpPko",
  authDomain: "sendnotifications-fd4ab.firebaseapp.com",
  projectId: "sendnotifications-fd4ab",
  storageBucket: "sendnotifications-fd4ab.appspot.com",
  messagingSenderId: "188964222220",
  appId: "1:188964222220:web:d2fc465b9148a8d07ac529"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('service-worker.js onBackgroundMessage - Received background message ', payload);
  /*
  if (payload.data && !payload.notification) {
    const notificationTitle = payload.data.title + " (Background)";
    const notificationOptions = {
        body: payload.data.body,
        icon: 'assets/images/logo192.png',
        tag: payload.data.tag
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
    */
});
/*
messaging.onBackgroundMessage((payload) => {
    console.log('service-worker.js onBackgroundMessage - Received background message ', payload);
    if (payload.notification) {
      const notificationTitle = payload.notification.title + " (Background)";
      const notificationOptions = {
          body: payload.notification.body,
          icon: 'assets/images/logo192.png',
          tag: payload.notification.tag
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
*/

self.addEventListener('install', function(event) {
  // The service worker is installing.
});

self.addEventListener('fetch', function(event) {
  //content being fetched
});

/*
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received:', event);
  event.notification.close();
  event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
          for (var i = 0; i < clientList.length; i++) {
              var client = clientList[i];
              console.log('client.url', client.url);
              if (client.url === event.notification.data.url && 'focus' in client) {
                  return client.focus();
              }
          }
          if (clients.openWindow) {
              return clients.openWindow(event.notification.data.url);
          }
          console.log('clients.openWindow:', clients.openWindow);
      })
  );
});
*/

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'INIT_CALLBACK') {
    const callback = () => {
      console.log('Callback from Service Worker for MessageAddedIntoCase');
      // Perform callback actions here

      // Check if there are any active clients
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
        if (clients.length === 0) {
          // No active clients, PWA is in the background
          self.registration.showNotification('Hey there from Telco!', {
            body: 'Agent sent you a new message.',
            icon: 'assets/images/logo192.png',
            badge: 'assets/images/logo192.png',
            data: {
              url: 'https://nicealexei.github.io/DSE-Product-Demo-Journey-Telco/'
            }
          });
        }
      });
    };

    event.ports[0].postMessage({ type: 'CALLBACK_RESPONSE', callback: callback.toString() });
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

//remove cache
self.addEventListener('activate', event => {
  console.log('clearing cache...');
  const cacheWhitelist = [];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});