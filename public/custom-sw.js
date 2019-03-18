// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
//workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const precacheResources = [
'/',
'Components/Login.js',
'Components/CreateCaregiver.js',
'Components/AuthService.js',
'Components/withAuth.js',
'Components/CreatePatient.js',
'Component/DiagnoseComponent.js',
'Components/Header.js',
'Components/PatientFind.js',
'Components/reviewForm.js', 
'Components/ScreeningForm.js',
'Components/SymptomComponent.js',
'Components/TreatmentComponent.js', 
'Components/ViewPatient.js', 
'Components/ViewVisit.js', 
'Components/VisitTD.js', 
'routes/Routes.js', 
'App.css', 
'App.js', 
'index.css', 
'index.js', 
'logo.svg'
];

if (typeof idb === "undefined") {
  self.importScripts('idb.js');
}

self.addEventListener('install', event => {
  console.log('Service worker: Installed');
  self.skipWaiting();
  workbox.precaching.precacheAndRoute(precacheResources);
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  event.waitUntil(self.clients.claim())
});

/*

const queue = new workbox.backgroundSync.Queue('myQueueName');

//disconnect to internet, do stuff, connect to internet
self.addEventListener('fetch', (event) => {

            const promiseChain = fetch(event.request.clone())
                .catch((err) => {
                    return queue.addRequest(event.request);
                });
            event.waitUntil(promiseChain);

    })
    */
/*
    self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );


    })
    */

function readDB(key) {
  var request = idb.openDb('amedic', 1);
  
  request.then(function(db) {
    var tx = db.transaction('patient', 'readonly');
    var store = tx.objectStore('patient');
    return store.get(key);
  }).then(function(val) {
    console.log(val);
  });
}

// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.routing.registerNavigationRoute("./index.html", {

  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

// app-shell
workbox.routing.registerRoute("/", workbox.strategies.networkFirst());