self.addEventListener('install', function(event) {
  // The service worker is installing.
});

self.addEventListener('fetch', function(event) {
  // The service worker is fetching resources.
});

self.addEventListener('push', function(event) {
  // Show a notification every 5 minutes
  event.waitUntil(
    self.registration.showNotification('Telco PWA', {
      body: 'This is a mobile push notification from Telco PWA. Have a great day!',
      icon: '%PUBLIC_URL%/assets/images/assets/images/logo192.png'
    })
  );
});

// Set an interval to dispatch push events every 5 minutes
setInterval(() => {
  self.dispatchEvent(new PushEvent('push'));
}, 300000); // 300000 milliseconds = 5 minutes