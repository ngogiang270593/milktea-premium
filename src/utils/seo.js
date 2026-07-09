import { siteConfig } from '../config/siteConfig.js';
import { getLanguage } from '../store/languageStore.js';
import { t } from './i18n.js';

const SITE_URL = 'https://milktea-premium.example';
const DEFAULT_IMAGE = `${SITE_URL}/assets/og-image.jpg`;

const routeMeta = {
  '/': {
    title: () => siteConfig.seo[getLanguage()]?.title || siteConfig.seo.vi.title,
    description: () => siteConfig.seo[getLanguage()]?.description || siteConfig.seo.vi.description
  },
  '/menu': {
    title: () => `${t('navbar.menu')} | ${siteConfig.brand.name}`,
    description: () => t('menu.title')
  },
  '/product': {
    title: () => `${t('productDetail.relatedTitle')} | ${siteConfig.brand.name}`,
    description: () => t('productDetail.defaults.ingredients')
  },
  '/cart': {
    title: () => `${t('cart.breadcrumb')} | ${siteConfig.brand.name}`,
    description: () => t('cart.emptyCopy')
  },
  '/wishlist': {
    title: () => `${t('wishlist.breadcrumb')} | ${siteConfig.brand.name}`,
    description: () => t('wishlist.emptyCopy')
  }
};

function getOrCreateMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.append(element);
  }

  return element;
}

function setMeta(selector, attributes, content) {
  const element = getOrCreateMeta(selector, attributes);
  element.setAttribute('content', content);
}

function getCanonical() {
  let canonical = document.head.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }

  return canonical;
}

export function updateDocumentMeta() {
  if (typeof document === 'undefined') {
    return;
  }

  const path = window.location.pathname;
  const meta = routeMeta[path] || routeMeta['/'];
  const title = meta.title();
  const description = meta.description();
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;
  const locale = getLanguage() === 'vi' ? 'vi_VN' : 'en_US';

  document.title = title;
  document.documentElement.lang = getLanguage();
  getCanonical().href = url;

  setMeta('meta[name="description"]', { name: 'description' }, description);
  setMeta('meta[property="og:title"]', { property: 'og:title' }, title);
  setMeta('meta[property="og:description"]', { property: 'og:description' }, description);
  setMeta('meta[property="og:url"]', { property: 'og:url' }, url);
  setMeta('meta[property="og:image"]', { property: 'og:image' }, DEFAULT_IMAGE);
  setMeta('meta[property="og:locale"]', { property: 'og:locale' }, locale);
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
  setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, DEFAULT_IMAGE);
}

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration should never block the app shell.
    });
  }, { once: true });
}
