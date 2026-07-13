import './assets/css/base.css';
import './assets/css/components.css';
import './assets/css/utilities.css';
history.scrollRestoration = 'manual';
import { APP_ROUTES } from './constants/routes.js';
import { preloadRoute, renderApp } from './App.js';
import { applyLanguage, subscribe as subscribeToLanguage } from './store/languageStore.js';
import { initAppInteractions } from './utils/animations.js';
import { prefetchRoute, prefetchRoutes } from './utils/prefetch.js';
import { isPlainLeftClick, routeToString, shouldHandleLink } from './utils/router.js';
import { scrollToHashAfterRender } from './utils/scroll.js';
import { registerServiceWorker, updateDocumentMeta } from './utils/seo.js';

const appRoutes = new Set(APP_ROUTES);

let isRenderingLanguageChange = false;

function hideSplashScreen() {
  const splash = document.querySelector('#app-splash');

  if (!splash) {
    return;
  }

  splash.classList.add('is-hidden');
  window.setTimeout(() => splash.remove(), 320);
}

async function renderCurrentRoute({ preserveScroll = false } = {}) {
  const scrollPosition = preserveScroll
    ? { x: window.scrollX, y: window.scrollY }
    : null;

  applyLanguage();
  await renderApp();
  updateDocumentMeta();
  initAppInteractions();
  hideSplashScreen();

  if (scrollPosition) {
    window.scrollTo(scrollPosition.x, scrollPosition.y);
  } else {
    scrollToHashAfterRender();
  }
}

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || !isPlainLeftClick(event)) {
    return;
  }

  const link = event.target.closest('a[href]');

  if (!link) {
    return;
  }

  const url = new URL(link.href, window.location.href);

  if (!shouldHandleLink(link, url, appRoutes)) {
    return;
  }

  event.preventDefault();

  const nextUrl = routeToString(url);
  const currentUrl = routeToString(window.location);
  const isSameRoute = url.pathname === window.location.pathname && url.search === window.location.search;

  if (nextUrl !== currentUrl) {
    window.history.pushState(null, '', nextUrl);
  }

  if (isSameRoute && url.hash) {
    scrollToHashAfterRender();
    return;
  }

  renderCurrentRoute();
});

window.addEventListener('popstate', renderCurrentRoute);
window.addEventListener('site-config:updated', renderCurrentRoute);
subscribeToLanguage(async () => {
  if (isRenderingLanguageChange) {
    return;
  }

  isRenderingLanguageChange = true;

  try {
    await renderCurrentRoute({ preserveScroll: true });
  } finally {
    isRenderingLanguageChange = false;
  }
});

registerServiceWorker();
renderCurrentRoute();
prefetchRoutes(['/menu', '/product', '/cart', '/wishlist'], preloadRoute);

document.addEventListener('pointerover', (event) => {
  const link = event.target.closest('a[href]');

  if (!link) {
    return;
  }

  const url = new URL(link.href, window.location.href);

  if (shouldHandleLink(link, url, appRoutes)) {
    prefetchRoute(url.pathname, preloadRoute);
  }
}, { passive: true });
