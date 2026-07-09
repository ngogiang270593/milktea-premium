import { DefaultLayout } from './layouts/DefaultLayout.js';
import { ROUTES } from './constants/routes.js';

const routes = {
  [ROUTES.ADMIN]: () => import('./pages/AdminPage.js').then((module) => module.AdminPage),
  [ROUTES.CART]: () => import('./pages/CartPage.js').then((module) => module.CartPage),
  [ROUTES.MENU]: () => import('./pages/MenuPage.js').then((module) => module.MenuPage),
  [ROUTES.PRODUCT]: () => import('./pages/ProductPage.js').then((module) => module.ProductPage),
  [ROUTES.WISHLIST]: () => import('./pages/WishlistPage.js').then((module) => module.WishlistPage)
};

async function renderHomePage() {
  const [
    { Hero },
    { Categories },
    { FeaturedProducts },
    { Promotion },
    { Testimonials },
    { Newsletter }
  ] = await Promise.all([
    import('./components/Hero.js'),
    import('./components/Categories.js'),
    import('./components/FeaturedProducts.js'),
    import('./components/Promotion.js'),
    import('./components/Testimonials.js'),
    import('./components/Newsletter.js')
  ]);

  return `
    ${Hero()}
    ${Categories()}
    ${FeaturedProducts()}
    ${Promotion()}
    ${Testimonials()}
    ${Newsletter()}
  `;
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
