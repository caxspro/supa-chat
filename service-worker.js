self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

// Обрабатываем push-событие
self.addEventListener("push", event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/supa-chat/icon.png",
      badge: "/supa-chat/icon.png",
      vibrate: [200, 100, 200],
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// При клике на уведомление открываем чат
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/supa-chat/supa-chat.html"));
});
