// See https://developers.google.com/web/tools/workbox/guides/configure-workbox
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

if (typeof idb === "undefined") {
  self.importScripts('static/js/idb.js');
}

self.addEventListener('install', event => {
  console.log('Service worker: Installed')
  event.waitUntil(
    self.skipWaiting())
});

self.addEventListener('activate', event => {
	console.log('Service Worker: Activated');
  createDB();
  event.waitUntil(self.clients.claim())
});



function createDB() {
  fetch('http://localhost:3000/patient').then(res => res.json())
  .then(
    (result) => {
      console.log(result[1].nationalID + " " + result[1].mobileNo);
        //for(var i = 0; i < result.length; i++) {
          idb.openDb('amedic', 1, function(upgradeDB) {
            var store = upgradeDB.createObjectStore('patient', {
              keyPath: 'nationalID'
            });
            for(var i = 0; i < result.length; i++) {
              store.put({nationalID: result[i].nationalID, name: result[i].name, mobileNo: result[i].mobileNo, sex: result[i].sex, village: result[i].village, dateOfBirth: result[i].dateOfBirth});
            }
          })
        });
}


const queue = new workbox.backgroundSync.Queue('myQueueName');

//gotta disconnect to the internet
self.addEventListener('fetch', (event) => {
  // Clone the request to ensure it's save to read when
 //readDB();
  // adding to the Queue.

  /*
  console.log('url: ' + event.request.url);
  console.log('event.request: ' + event.request);
  console.log('body: ' + event.request.body);
  console.log('header: ' + event.request.header);
  */
  const promiseChain = fetch(event.request.clone())
  .catch((err) => {
    return queue.addRequest(event.request);
  });

  event.waitUntil(promiseChain);
});

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
workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerNavigationRoute("./index.html", {

  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

// app-shell
workbox.routing.registerRoute("/", workbox.strategies.networkFirst());