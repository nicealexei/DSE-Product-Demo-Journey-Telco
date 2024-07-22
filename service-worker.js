/*
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
//});



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

/*
self.addEventListener('push', event => {
  const data = event.data.json();
  console.log('Push received:', data);

  const options = {
    body: data.body,
    icon: 'assets/images/logo192.png',
    badge: 'assets/images/logo192.png',
    data: {
      url: data.url
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

*/

self.addEventListener('message', event => {
  console.log('Service Worker received message:', event.data);
 
  if (event.data && event.data.type === 'CHAT_MESSAGE_POSTED') {      
    console.log('CHAT_MESSAGE_POSTED fired!');
  
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {      
      let isPWAInForeground = false;
      for (const client of clients) {
        console.log('Client visibilityState:', client.visibilityState);
        if (client.visibilityState === 'visible') {
          isPWAInForeground = true;
          break;
        }
      }  
      if (!isPWAInForeground) {
        showNotification();
      }
    }).catch(error => {
      console.error('Error matching clients:', error);
    });
  }

  if (event.data && event.data.type === 'INIT_CALLBACK') {
    const callback = () => {
      console.log('Callback from Service Worker for MessageAddedIntoCase fired!');      
    
      /*
      const notificationTitle = 'Hey there from Telco!';
      const notificationOptions = {
          body: 'Agent sent you a new message.',
          icon: 'assets/images/logo192.png'
      }
      self.registration.showNotification(notificationTitle, notificationOptions);
      */

      /*
      self.registration.showNotification('Hey there from Telco!', {
        body: 'Agent sent you a new message.',
        icon: 'assets/images/logo192.png',
        badge: 'assets/images/logo192.png',
        data: {
          url: 'https://nicealexei.github.io/DSE-Product-Demo-Journey-Telco/'
        }
      }).then(() => {
        console.log('Notification displayed successfully.');
      }).catch(error => {
        console.error('Error displaying notification:', error);
      });
      */

      /*
      const data = {
        title: 'Hey there from Telco!',
        body: 'Agent sent you a new message.',
        url: 'https://nicealexei.github.io/DSE-Product-Demo-Journey-Telco/'
      };    
      const event = new Event('push');
      event.data = {
        json: () => data
      };    
      self.dispatchEvent(event);
      */

    };
    //event.ports[0].postMessage({ type: 'CALLBACK_RESPONSE', callback: callback.toString() });
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


// Function to show notification
function showNotification() {
  console.log('Sending Notification...');
  self.registration.showNotification('Hello from Telco!', {
    body: 'Agent sent you a new message!',
    icon: 'assets/images/logo192.png',
    badge: 'assets/images/logo192.png',
    data: {
      url: 'https://nicealexei.github.io/DSE-Product-Demo-Journey-Telco/'
    }
  }).then(() => {
    console.log('Notification displayed successfully.');
  }).catch(error => {
    console.error('Error displaying notification:', error);
  });
}

// Function to send notifications at intervals
function sendNotifications() {
  let count = 0;
  const interval = setInterval(() => {
    if (count < 5) {
      showNotification();
      count++;
    } else {
      clearInterval(interval);
    }
  }, 15000); // 15 seconds interval
}

