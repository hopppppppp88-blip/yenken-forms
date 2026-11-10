// 元科打卡 啟動頁 service worker：讓 Android Chrome 可「安裝應用程式」，啟動頁與圖示離線也能顯示
const C = 'yk-clock-v1';
const FILES = ['./', './index.html', './manifest.json', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './icon-512-maskable.png', './favicon-32.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;            // Apps Script 內容一律走網路，不快取
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
