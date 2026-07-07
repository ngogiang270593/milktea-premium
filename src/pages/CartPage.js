import { CartContent } from '../components/cart/CartContent.js';
import { getCartQuantity } from '../store/cartStore.js';

export function CartPage() {
  return `
    <section class="cart-page" aria-labelledby="cart-title">
      <div class="cart-container">
        <nav class="menu-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li aria-current="page">Cart</li>
          </ol>
        </nav>
        <div class="cart-heading" data-reveal>
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Shopping Cart</p>
            <h1 id="cart-title">Review your order.</h1>
          </div>
          <p><span data-cart-page-count>${getCartQuantity()}</span> items</p>
        </div>
        <div data-cart-content>
          ${CartContent()}
        </div>
      </div>
    </section>
  `;
}
