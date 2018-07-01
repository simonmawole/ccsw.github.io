'use strict'

//App cache name
const APP_CACHE = ['currency-converter-v1'];
//Urls that will be cached
const urls = [
    '/',
    '/index.html',
    '/app.js'
];


//Register service worker
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('SW registered');
        }, error => {
            console.log('SW registration fail: ' + error);
        });
    });
}

//Install
self.addEventListener('install', event => {
    console.log('install SW')
    event.waitUntil(
        caches.open(APP_CACHE).then(cache => {
            console.log('Cache opened');
            return cache.addAll(urls);
        })
    )
});

//Activate
self.addEventListener('activate', event => {
    console.log('activate SW');
    //Delete unwanted version of caches
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if(APP_CACHE.indexOf(key) === -1){
                    return caches.delete(key);
                }
            })).then(() => {
                console.log('New cache ready');
            });
        })
    );
    return self.clients.claim();
});

//Fetch
self.addEventListener('fetch', event => {
    console.log('fetch SW');
    const requestUrl = new URL(event.request.url);
    if(requestUrl.origin === location.origin){
        //Root route should load index.html
        if(requestUrl.pathname === '/' && event.request.method === 'GET'){
            event.respondWith(caches.match('/index.html'));
            return;
        }
        //User clicked the convert button
        if(requestUrl.pathname === '/' && event.request.method === 'POST'){
            event.respondWith(caches.match('/index.html'));
            return;
        }
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

