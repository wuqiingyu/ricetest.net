// RiceTests Service Worker
// Basic service worker for handling background requests

self.addEventListener('install', event => {
  // Skip waiting to activate immediately
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  // Claim all clients immediately
  event.waitUntil(clients.claim())
})

self.addEventListener('fetch', event => {
  // Pass through all requests for now
  event.respondWith(fetch(event.request))
})