import './assets/css/base.css';
import './assets/css/components.css';
import './assets/css/utilities.css';
history.scrollRestoration = 'manual';
import { renderApp } from './App.js';
import { applyLanguage } from './store/languageStore.js';
import { initAppInteractions } from './utils/animations.js';

const appRoutes = new Set(['/', '/cart', '/menu', '/product', '/wishlist']);

function scrollToHashAfterRender() {
  const hash = window.location.hash;

  requestAnimationFrame(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  });
}

async function renderCurrentRoute() {
  applyLanguage();
  await renderApp();
  initAppInteractions();
  scrollToHashAfterRender();
}

function isPlainLeftClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function shouldHandleLink(link, url) {
  return (
    link.target !== '_blank' &&
    !link.hasAttribute('download') &&
    url.origin === window.location.origin &&
    appRoutes.has(url.pathname)
  );
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

  if (!shouldHandleLink(link, url)) {
    return;
  }

  event.preventDefault();

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
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

renderCurrentRoute();
