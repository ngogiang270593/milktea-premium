import { getSiteConfig } from '../config/siteConfig.js';
import { MENU_CATEGORIES } from '../repositories/CategoryRepository.js';
import { getProductById } from '../repositories/ProductRepository.js';
import { getLanguage } from '../store/languageStore.js';
import { t } from './i18n.js';

const DEFAULT_OG_IMAGE = '/assets/og-image.jpg';

function siteUrl() {
  return getSiteConfig().siteUrl.replace(/\/$/, '');
}

function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

function productImageUrl(product) {
  if (!product?.image) {
    return absoluteUrl(DEFAULT_OG_IMAGE);
  }

  try {
    return new URL(product.image, window.location.origin).href.replace(window.location.origin, siteUrl());
  } catch {
    return absoluteUrl(DEFAULT_OG_IMAGE);
  }
}

function selectedProduct() {
  return getProductById(new URLSearchParams(window.location.search).get('id'));
}

function selectedCategory() {
  const category = new URLSearchParams(window.location.search).get('category');

  return MENU_CATEGORIES.find((item) => item.value === category);
}

function translatedProductName(product) {
  const key = `products.items.${product.id}.name`;
  const value = t(key);

  return value === key ? product.name || product.title : value;
}

function translatedProductDescription(product) {
  const key = `products.items.${product.id}.description`;
  const value = t(key);

  return value === key ? product.description || t('productDetail.defaults.description') : value;
}

function routeMeta(path) {
  const config = getSiteConfig();
  const product = path === '/product' ? selectedProduct() : null;
  const category = path === '/menu' ? selectedCategory() : null;
  const categoryName = category ? t(`filters.categoryOptions.${category.value}`) : '';

  if (product) {
    const name = translatedProductName(product);

    return {
      title: `${name} | ${config.brand.name}`,
      description: translatedProductDescription(product),
      type: 'product',
      image: productImageUrl(product)
    };
  }

  const routes = {
    '/': {
      title: config.seo[getLanguage()]?.title || config.seo.vi.title,
      description: config.seo[getLanguage()]?.description || config.seo.vi.description
    },
    '/about': {
      title: `${t('footer.links.about')} | ${config.brand.name}`,
      description: t('about.story.paragraphs')[0]
    },
    '/contact': {
      title: `${t('footer.links.contact')} | ${config.brand.name}`,
      description: t('contact.hero.subtitle')
    },
    '/faq': {
      title: `${t('faq.hero.eyebrow')} | ${config.brand.name}`,
      description: t('faq.hero.subtitle')
    },
    '/menu': {
      title: `${categoryName || t('navbar.menu')} | ${config.brand.name}`,
      description: categoryName ? `${categoryName} - ${t('menu.title')}` : t('menu.title')
    },
    '/cart': {
      title: `${t('cart.breadcrumb')} | ${config.brand.name}`,
      description: t('cart.emptyCopy'),
      robots: 'noindex, nofollow'
    },
    '/wishlist': {
      title: `${t('wishlist.breadcrumb')} | ${config.brand.name}`,
      description: t('wishlist.emptyCopy'),
      robots: 'noindex, nofollow'
    },
    '/admin': {
      title: `Admin | ${config.brand.name}`,
      description: 'Configure editable storefront content.',
      robots: 'noindex, nofollow'
    }
  };

  return routes[path] || {
    title: `${t('notFound.badge')} | ${config.brand.name}`,
    description: t('notFound.copy'),
    robots: 'noindex, follow'
  };
}

function canonicalPath(path) {
  const params = new URLSearchParams(window.location.search);

  if (path === '/product' && params.get('id')) {
    return `${path}?id=${encodeURIComponent(params.get('id'))}`;
  }

  if (path === '/menu' && params.get('category')) {
    return `${path}?category=${encodeURIComponent(params.get('category'))}`;
  }

  return path === '/' ? '/' : path;
}

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

function setJsonLd(id, data) {
  let script = document.getElementById(id);

  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.append(script);
  }

  script.textContent = JSON.stringify(data).replaceAll('</', '<\\/');
}

function organizationSchema() {
  const config = getSiteConfig();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl()}/#organization`,
    name: config.brand.name,
    legalName: config.brand.legalName,
    url: siteUrl(),
    logo: absoluteUrl('/icons/icon.svg'),
    sameAs: Object.values(config.social)
  };
}

function localBusinessSchema() {
  const config = getSiteConfig();
  const language = getLanguage();

  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${siteUrl()}/#local-business`,
    name: config.brand.name,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    url: siteUrl(),
    telephone: config.business.phone,
    email: config.business.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.business.address[language]
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.business.geo.latitude,
      longitude: config.business.geo.longitude
    },
    openingHours: config.business.openingHours.en,
    sameAs: Object.values(config.social)
  };
}

function websiteSchema() {
  const config = getSiteConfig();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl()}/#website`,
    name: config.brand.name,
    url: siteUrl(),
    publisher: { '@id': `${siteUrl()}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl()}/menu?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

function breadcrumbSchema(path, url) {
  const product = path === '/product' ? selectedProduct() : null;
  const category = path === '/menu' ? selectedCategory() : null;
  const items = [
    { name: t('navbar.home'), item: absoluteUrl('/') }
  ];

  const routeNames = {
    '/about': t('footer.links.about'),
    '/contact': t('footer.links.contact'),
    '/faq': t('footer.links.faq'),
    '/menu': t('navbar.menu'),
    '/cart': t('cart.breadcrumb'),
    '/wishlist': t('wishlist.breadcrumb'),
    '/product': t('navbar.menu')
  };

  if (path === '/product') {
    items.push({ name: t('navbar.menu'), item: absoluteUrl('/menu') });
    if (product) {
      items.push({ name: translatedProductName(product), item: url });
    }
  } else if (path !== '/') {
    items.push({ name: routeNames[path] || t('notFound.badge'), item: url });
    if (category) {
      items.push({ name: t(`filters.categoryOptions.${category.value}`), item: url });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
}

function productSchema(product) {
  if (!product) {
    return null;
  }

  const name = translatedProductName(product);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${absoluteUrl(`/product?id=${product.id}`)}#product`,
    name,
    description: translatedProductDescription(product),
    image: productImageUrl(product),
    sku: product.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: getSiteConfig().brand.name
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews || 1
    },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/product?id=${product.id}`),
      priceCurrency: getLanguage() === 'vi' ? 'VND' : 'USD',
      price: getLanguage() === 'vi' ? Math.round(product.price * 25000) : product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition'
    }
  };
}

function faqSchema() {
  const faq = t('faq.categories');

  if (!Array.isArray(faq)) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.flatMap((category) => category.items).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

function structuredData(path, url) {
  const graph = [
    organizationSchema(),
    localBusinessSchema(),
    websiteSchema(),
    breadcrumbSchema(path, url)
  ];
  const product = path === '/product' ? productSchema(selectedProduct()) : null;
  const faq = path === '/faq' ? faqSchema() : null;

  if (product) {
    graph.push(product);
  }

  if (faq) {
    graph.push(faq);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

/**
 * Updates route-aware document metadata, canonical tags, social tags, and JSON-LD.
 */
export function updateDocumentMeta() {
  if (typeof document === 'undefined') {
    return;
  }

  const path = window.location.pathname;
  const meta = routeMeta(path);
  const canonical = canonicalPath(path);
  const url = absoluteUrl(canonical);
  const image = meta.image || absoluteUrl(DEFAULT_OG_IMAGE);
  const locale = getLanguage() === 'vi' ? 'vi_VN' : 'en_US';
  const config = getSiteConfig();

  document.title = meta.title;
  document.documentElement.lang = getLanguage();
  getCanonical().href = url;

  setMeta('meta[name="description"]', { name: 'description' }, meta.description);
  setMeta('meta[name="robots"]', { name: 'robots' }, meta.robots || 'index, follow');
  setMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, config.brand.name);
  setMeta('meta[property="og:title"]', { property: 'og:title' }, meta.title);
  setMeta('meta[property="og:description"]', { property: 'og:description' }, meta.description);
  setMeta('meta[property="og:type"]', { property: 'og:type' }, meta.type || 'website');
  setMeta('meta[property="og:url"]', { property: 'og:url' }, url);
  setMeta('meta[property="og:image"]', { property: 'og:image' }, image);
  setMeta('meta[property="og:locale"]', { property: 'og:locale' }, locale);
  setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, meta.title);
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, meta.description);
  setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, image);
  setJsonLd('seo-structured-data', structuredData(path, url));
}

/**
 * Registers the production service worker after the app shell has loaded.
 */
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
