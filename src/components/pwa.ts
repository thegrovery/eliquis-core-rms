import { registerSW } from 'virtual:pwa-register'

window.addEventListener('load', () => {
  const pwaToast = document.querySelector<HTMLDivElement>('#pwa-toast')!
  const pwaToastMessage = pwaToast.querySelector<HTMLDivElement>('.message #toast-message')!
  const pwaCloseBtn = pwaToast.querySelector<HTMLButtonElement>('#pwa-close')!
  const pwaRefreshBtn = pwaToast.querySelector<HTMLButtonElement>('#pwa-refresh')!

  let refreshSW: ((reloadPage?: boolean) => Promise<void>) | undefined

  const refreshCallback = () => refreshSW?.(true)

  const hidePwaToast = (raf = false) => {
    if (raf) {
      requestAnimationFrame(() => hidePwaToast(false))
      return
    }
    if (pwaToast.classList.contains('refresh'))
      pwaRefreshBtn.removeEventListener('click', refreshCallback)

    pwaToast.classList.remove('show', 'refresh')
  }
  const showPwaToast = (offline: boolean) => {
    if (!offline)
      pwaRefreshBtn.addEventListener('click', refreshCallback)
    requestAnimationFrame(() => {
      hidePwaToast(false)
      if (!offline)
        pwaToast.classList.add('refresh')
      pwaToast.classList.add('show')
    })
  }

  pwaCloseBtn.addEventListener('click', () => hidePwaToast(true))

  refreshSW = registerSW({
    immediate: true,
    onOfflineReady() {
      pwaToastMessage.innerHTML = 'App ready to work offline'
      showPwaToast(true)
    },
    onNeedRefresh() {
      pwaToastMessage.innerHTML = 'New content available, click on reload button to update'
      showPwaToast(false)
    },
    onRegisteredSW(swScriptUrl) {

      console.log('SW registered: ', swScriptUrl)
    },
  })
})

// Establish a cache name
const cacheName = 'ManualPreCache_v1';

// Assets to precache
const precachedAssets = [
  '/introduction',
  '/introduction/how-to-use-the-toolkit',
  '/introduction/about-eliquis-360',
  '/introduction/faq',
  '/introduction/glossary'
];

self.addEventListener('install', (event) => {
  // Precache assets on install
  event.waitUntil(caches.open(cacheName).then((cache) => {
    console.log("precache function started");
    return cache.addAll(precachedAssets);
  }));
});

self.addEventListener('fetch', (event) => {
  // Is this one of our precached assets?
  const url = new URL(event.request.url);
  const isPrecachedRequest = precachedAssets.includes(url.pathname);

  if (isPrecachedRequest) {
    // Grab the precached asset from the cache
    event.respondWith(caches.open(cacheName).then((cache) => {
      return cache.match(event.request.url);
    }));
  } else {
    // Go to the network
    return;
  }
});