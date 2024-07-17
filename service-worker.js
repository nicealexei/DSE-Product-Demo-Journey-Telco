self.addEventListener('install', function(event) {
  // The service worker is installing.
});

self.addEventListener('fetch', function(event) {
  // The service worker is fetching resources.
});

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

const firebaseConfig = {
  apiKey: "AIzaSyDyjZ_hPS5f4MN2d8iqkUQdV7w0hFNpPko",
  authDomain: "sendnotifications-fd4ab.firebaseapp.com",
  projectId: "sendnotifications-fd4ab",
  storageBucket: "sendnotifications-fd4ab.appspot.com",
  messagingSenderId: "188964222220",
  appId: "1:188964222220:web:d2fc465b9148a8d07ac529"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '%PUBLIC_URL%/assets/images/assets/images/logo192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});