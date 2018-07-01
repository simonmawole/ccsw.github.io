'use strict'

//Register service worker
if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration){
            console.log('Service worker registered');
        }, function(error){
            console.log('Service worker registration fail: ' + error);
        });
    });
}

