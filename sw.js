const CACHE_NAME = 'pwa-notes-cache-v1';
// 需要缓存的核心文件列表 (App Shell)
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/icon-192.png'
];

// 1. 安装 Service Worker
self.addEventListener('install', event => {
    // 等待所有核心资源都缓存成功后，才完成安装
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. 拦截网络请求
self.addEventListener('fetch', event => {
    event.respondWith(
        // 策略：缓存优先 (Cache First)
        caches.match(event.request)
            .then(response => {
                // 如果在缓存中找到了匹配的资源，则直接返回
                if (response) {
                    return response;
                }
                // 如果缓存中没有，则从网络请求
                return fetch(event.request);
            })
    );
});

// 3. 激活 Service Worker (用于清理旧缓存)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
