import { DefaultLayout } from './layouts/DefaultLayout.js';
import { ROUTES } from './constants/routes.js';

const routes = {
  [ROUTES.ABOUT]: () => import('./pages/AboutPage.js').then((module) => module.AboutPage),
  [ROUTES.ADMIN]: () => import('./pages/AdminPage.js').then((module) => module.AdminPage),
  [ROUTES.CART]: () => import('./pages/CartPage.js').then((module) => module.CartPage),
  [ROUTES.CONTACT]: () => import('./pages/ContactPage.js').then((module) => module.ContactPage),
  [ROUTES.FAQ]: () => import('./pages/FaqPage.js').then((module) => module.FaqPage),
  [ROUTES.MENU]: () => import('./pages/MenuPage.js').then((module) => module.MenuPage),
  [ROUTES.PRODUCT]: () => import('./pages/ProductPage.js').then((module) => module.ProductPage),
  [ROUTES.WISHLIST]: () => import('./pages/WishlistPage.js').then((module) => module.WishlistPage)
};

function loadHomeComponents() {
  return Promise.all([
    import('./components/Hero.js'),
    import('./components/Categories.js'),
    import('./components/TrustSection.js'),
    import('./components/FeaturedProducts.js'),
    import('./components/Promotion.js'),
    import('./components/Testimonials.js'),
    import('./components/Newsletter.js')
  ]);
}

async function renderHomePage() {
  const [
    { Hero },
    { Categories },
    { TrustSection },
    { FeaturedProducts },
    { Promotion },
    { Testimonials },
    { Newsletter }
  ] = await loadHomeComponents();

  return `
    ${Hero()}
    ${Categories()}
    ${TrustSection()}
    ${FeaturedProducts()}
    ${Promotion()}
    ${Testimonials()}
    ${Newsletter()}
  `;
}

/**
 * Prefetches the module graph for a route without rendering it.
 *
 * @param {string} pathname Route pathname.
 * @returns {Promise<unknown>|undefined} Module preload promise.
 */
export function preloadRoute(pathname) {
  if (routes[pathname]) {
    return routes[pathname]();
  }

  if (pathname === ROUTES.HOME) {
    return loadHomeComponents();
  }

  return undefined;
}

/**
 * Renders the active SPA route into the application shell.
 *
 * @returns {Promise<void>}
 */
export async function renderApp() {
  const app = document.querySelector('#app');

  if (!app) {
    return;
  }

  const pageLoader = routes[window.location.pathname];
  const content = pageLoader ? (await pageLoader())() : await renderHomePage();

  app.innerHTML = DefaultLayout(content);
}
