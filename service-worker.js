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
  // The service worker is fetching resources.
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close(); 
  event.waitUntil(
      clients.matchAll({ type: 'window' }).then(function(clientList) {
          for (var i = 0; i < clientList.length; i++) {
              var client = clientList[i];
              if (client.url === '/' && 'focus' in client) {
                  return client.focus();
              }
          }
          if (clients.openWindow) {
              return clients.openWindow('/');
          }
      })
  );
});

//remove cache
self.addEventListener('activate', event => {
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