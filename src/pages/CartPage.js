import { CartContent } from '../components/cart/CartContent.js';
import { getCartQuantity } from '../store/cartStore.js';
import { t } from '../utils/i18n.js';

export function CartPage() {
  return `
    <section class="cart-page" aria-labelledby="cart-title">
      <div class="cart-container">
        <nav class="menu-breadcrumb" aria-label="${t('menu.breadcrumbAria')}">
          <ol>
            <li><a href="/">${t('navbar.home')}</a></li>
            <li aria-current="page">${t('cart.breadcrumb')}</li>
          </ol>
        </nav>
        <div class="cart-heading" data-reveal>
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('cart.eyebrow')}</p>
            <h1 id="cart-title">${t('cart.title')}</h1>
          </div>
          <p><span data-cart-page-count>${getCartQuantity()}</span> ${t('cart.itemCount')}</p>
        </div>
        <div data-cart-content>
          ${CartContent()}
        </div>
      </div>
    </section>
  `;
}
