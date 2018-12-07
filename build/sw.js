importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
  } else {
    console.log(`Boo! Workbox didn't load 😬`);
  }
// custom ajustements
workbox.routing.registerRoute(
    new RegExp('https://jsonplaceholder.typicode.com/users'),
    workbox.strategies.cacheFirst()
);

//Cahche images
workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );
// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
    new RegExp('https::/fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 30,
          }),
          new workbox.cacheableResponse.Plugin({
              statuses: [0, 200]
          }),
      ],
    }),
  );

// Google analytic while offline
workbox.googleAnalytics.initialize();

workbox.precaching.precacheAndRoute([
  {
    "url": "css/main.css",
    "revision": "65d0b9e00c1c2790448ba5b86d1a0676"
  },
  {
    "url": "index.html",
    "revision": "cc4d4fcf24ce83152d7c088b7f025cc8"
  },
  {
    "url": "js/app.js",
    "revision": "fca2ad4c73b3ee023cb9262b104491f4"
  }
]);