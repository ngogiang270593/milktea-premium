import { getCart, getDiscount, getShipping, getSubtotal, getTotal } from '../../store/cartStore.js';
import { formatCurrency } from '../../utils/format.js';
import { imageAttributes } from '../../utils/images.js';

function cartItem(item) {
  return `
    <article class="cart-item" data-cart-item="${item.id}">
      <img ${imageAttributes(item.image, {
        alt: item.name,
        width: 180,
        height: 180,
        sizes: '112px'
      })} />
      <div class="min-w-0">
        <h2>${item.name}</h2>
        <p>${item.variant}</p>
        <div class="mt-4 flex flex-wrap items-center gap-3">
          <div class="cart-quantity" aria-label="Quantity for ${item.name}">
            <button type="button" data-cart-decrease="${item.id}" aria-label="Decrease ${item.name} quantity">-</button>
            <output aria-live="polite">${item.quantity}</output>
            <button type="button" data-cart-increase="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
          </div>
          <button type="button" class="cart-remove" data-cart-remove="${item.id}" aria-label="Remove ${item.name} from cart">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">
        <strong>${formatCurrency(item.price * item.quantity)}</strong>
        <span>${formatCurrency(item.price)} each</span>
      </div>
    </article>
  `;
}

function emptyCart() {
  return `
    <section class="cart-empty" aria-label="Empty cart">
      <div class="cart-empty-illustration" aria-hidden="true">
        <div></div>
        <span></span>
      </div>
      <h2>Your cart is ready for a treat.</h2>
      <p>Add premium milk tea, cakes, or toppings from the menu and they will appear here.</p>
      <a href="/menu" class="btn-primary">Browse Menu</a>
    </section>
  `;
}

function orderSummary() {
  const subtotal = getSubtotal();
  const itemDiscount = getDiscount();
  const shipping = getShipping();
  const total = getTotal();

  return `
    <aside class="cart-summary" aria-labelledby="cart-summary-title">
      <h2 id="cart-summary-title">Order summary</h2>
      <form class="cart-coupon" aria-label="Apply coupon">
        <label for="cart-coupon">Coupon code</label>
        <div>
          <input id="cart-coupon" type="text" placeholder="MILKTEA10" autocomplete="off" data-coupon-input />
          <button type="submit" data-coupon-apply>Apply</button>
        </div>
        <p data-coupon-message aria-live="polite"></p>
      </form>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>${formatCurrency(subtotal)}</dd>
        </div>
        <div>
          <dt>Item discount</dt>
          <dd>-${formatCurrency(itemDiscount)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>${shipping === 0 ? 'Free' : formatCurrency(shipping)}</dd>
        </div>
        <div class="cart-summary-total">
          <dt>Total</dt>
          <dd data-cart-total>${formatCurrency(total)}</dd>
        </div>
      </dl>
      <button type="button" class="btn-primary w-full" ${subtotal === 0 ? 'disabled aria-disabled="true"' : ''}>Checkout</button>
      <button type="button" class="cart-clear" data-cart-clear ${subtotal === 0 ? 'disabled aria-disabled="true"' : ''}>Clear cart</button>
    </aside>
  `;
}

export function CartContent() {
  const items = getCart();

  if (!items.length) {
    return `
      <div class="cart-content-grid">
        ${emptyCart()}
        ${orderSummary()}
      </div>
    `;
  }

  return `
    <div class="cart-content-grid">
      <section class="cart-items" aria-label="Cart items">
        ${items.map(cartItem).join('')}
      </section>
      ${orderSummary()}
    </div>
  `;
}
