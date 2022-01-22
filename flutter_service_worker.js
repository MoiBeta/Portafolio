'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "5aec17ff6a70ccaaca9858b59685f57e",
"assets/assets/GoogleSans-Regular.ttf": "b5c77a6aed75cdad9489effd0d5ea411",
"assets/assets/image/androidFlutter.png": "b34d39dd980b2ef651db5b599c4a97fd",
"assets/assets/image/android_icon.png": "738f371a37704058d562438b1e5cb09a",
"assets/assets/image/appDesign.jpg": "194cbe9ac6b7b594643a4fa23bded5d3",
"assets/assets/image/apple_icon.png": "cf90d1de9f0770874ee8fcda40112d6c",
"assets/assets/image/avatar.png": "ed203017ee7e680bd084739acb170a25",
"assets/assets/image/bilingual.jfif": "9e6e6a84e529cf4e69f000f79a83424a",
"assets/assets/image/blue_sky.jpg": "7cf570a68698d68cd449c2d8697a278f",
"assets/assets/image/designPatterns.jpg": "179321e37af49f4d323de37605a0cbf1",
"assets/assets/image/expenses_icon.png": "c1c72099abb1ed3e92d1eb9c386a246a",
"assets/assets/image/facebook.png": "8b9c428d8aa83dac96750101d9fd513a",
"assets/assets/image/flutter+firebase.png": "7a089a861213f29b3a39c7a859019047",
"assets/assets/image/flutter_icon.png": "3c19844633ad2f6a5de4c1dc280481fd",
"assets/assets/image/git.jpeg": "55b6e06f519610581bb8ee2f6daa9cc6",
"assets/assets/image/github.png": "b7e7a627717fd47f3aad7d992ac71384",
"assets/assets/image/img.png": "5878fb01020e7d7d3ce5aa3fe1c41bb8",
"assets/assets/image/JavaKotlin.jpg": "ca88b09c8a4185d9d15576627483f7fb",
"assets/assets/image/jetpack_icon.PNG": "56341d2aa819316f9f8b22922cebdcb6",
"assets/assets/image/linkedin.png": "780a3517324e1ee68a127b26ff78eadf",
"assets/assets/image/moon.png": "526c0b835c55bb86382419d43d6368ad",
"assets/assets/image/nigh_sky.jpg": "fbe812ec7ae3a2087352b35add5f5583",
"assets/assets/image/otherIcon.png": "77575d3e859003c35fce18d5fca2e934",
"assets/assets/image/reponsive_icon.PNG": "7b040cf51da03e8648a6809bdd7a783a",
"assets/assets/image/restAPI.jpg": "071efbf6614ef43b62e9fb9b43acb49a",
"assets/assets/image/scrum.png": "b8ca54c48291a0369b60bad37d7853ea",
"assets/assets/image/sqLite.jpg": "9992af36d95e81c86d58ed2cae62fe29",
"assets/assets/image/sun.png": "7cc9db32f5c2d4ace0472292ac512610",
"assets/assets/image/triqui_icon.png": "fb420f8419e10a4d528e999d431ac55d",
"assets/assets/image/yo.png": "dc8e1873ea16107db3da641319269732",
"assets/FontManifest.json": "5ce289308f0777564762a51e3517d78c",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "a984bc536bcf51a96951bf4214d68acf",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "43fa9e17039a625450b6aba93baf521e",
"canvaskit/canvaskit.wasm": "04ed3c745ff1dee16504be01f9623498",
"canvaskit/profiling/canvaskit.js": "f3bfccc993a1e0bfdd3440af60d99df4",
"canvaskit/profiling/canvaskit.wasm": "a9610cf39260f60fbe7524a785c66101",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "1eceefafafd6dfe683b86fe3e80f65d8",
"/": "1eceefafafd6dfe683b86fe3e80f65d8",
"main.dart.js": "c4f90b834ec8ced88b5b75ef03514faf",
"manifest.json": "a2e663b7ce00debff628a06023f8bf6f",
"version.json": "038eeb21ccc77b35d6751844670f87d7"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
