import { Navbar } from './components/Navbar.js';
import { Hero } from './components/Hero.js';
import { Categories } from './components/Categories.js';
import { FeaturedProducts } from './components/FeaturedProducts.js';
import { Promotion } from './components/Promotion.js';
import { Testimonials } from './components/Testimonials.js';
import { Newsletter } from './components/Newsletter.js';
import { Footer } from './components/Footer.js';

const app = document.querySelector('#app');

if (app) {
  app.innerHTML = `
    ${Navbar()}
    <main>
      <section id="home"></section>
      ${Hero()}
      ${Categories()}
      ${FeaturedProducts()}
      ${Promotion()}
      ${Testimonials()}
      ${Newsletter()}
      ${Footer()}
    </main>
  `;
}
