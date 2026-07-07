import { Hero } from './components/Hero.js';
import { Categories } from './components/Categories.js';
import { FeaturedProducts } from './components/FeaturedProducts.js';
import { Promotion } from './components/Promotion.js';
import { Testimonials } from './components/Testimonials.js';
import { Newsletter } from './components/Newsletter.js';
import { DefaultLayout } from './layouts/DefaultLayout.js';
import { CartPage } from './pages/CartPage.js';
import { MenuPage } from './pages/MenuPage.js';

const app = document.querySelector('#app');

if (app) {
  const HomePage = `
      ${Hero()}
      ${Categories()}
      ${FeaturedProducts()}
      ${Promotion()}
      ${Testimonials()}
      ${Newsletter()}
  `;

  const routes = {
    '/cart': CartPage,
    '/menu': MenuPage
  };
  const Page = routes[window.location.pathname];

  app.innerHTML = DefaultLayout(Page ? Page() : HomePage);
}
