self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// Обработчик push-уведомлений (можно будет использовать позже)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.text,
      icon: "https://cdn-icons-png.flaticon.com/512/134/134718.png",
      badge: "https://cdn-icons-png.flaticon.com/512/134/134718.png",
      vibrate: [200, 100, 200]
    };
    event.waitUntil(self.registration.showNotification(data.sender, options));
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/supa-chat/supa-chat.html"));
});