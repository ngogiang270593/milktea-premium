import { CheckoutContent } from '../checkout/CheckoutContent.js';
import { OrderSuccess } from '../checkout/OrderSuccess.js';
import { getCart, getDiscount, getShipping, getSubtotal, getTotal } from '../../store/cartStore.js';
import { formatCurrency } from '../../utils/format.js';
import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { imageAttributes } from '../../utils/image.js';
import { t } from '../../utils/i18n.js';

function translatedProductName(item) {
  const key = `products.items.${item.id}.name`;
  const name = t(key);

  return name === key ? item.name : name;
}

function translatedOption(value) {
  const option = value.trim();
  const size = t(`filters.sizeOptions.${option}`);
  const ice = t(`filters.iceOptions.${option}`);
  const topping = t(`productDetail.toppings.${option}`);

  if (size !== `filters.sizeOptions.${option}`) {
    return size;
  }

  if (ice !== `filters.iceOptions.${option}`) {
    return ice;
  }

  if (topping !== `productDetail.toppings.${option}`) {
    return topping;
  }

  if (option.endsWith(' sugar')) {
    return t('filters.sugarValue', {
      value: option.replace(' sugar', '')
    });
  }

  return option;
}

function translatedVariant(variant = '') {
  return variant
    .split(' / ')
    .map(translatedOption)
    .join(' / ');
}

function cartItem(item) {
  const name = translatedProductName(item);
  const escapedName = escapeAttribute(name);

  return `
    <article class="cart-item" data-cart-item="${item.id}">
      <img ${imageAttributes(item.image, {
        alt: name,
        width: 180,
        height: 180,
        sizes: '112px'
      })} />
      <div class="min-w-0">
        <h2>${escapeHtml(name)}</h2>
        <p>${escapeHtml(translatedVariant(item.variant))}</p>
        <div class="mt-4 flex flex-wrap items-center gap-3">
          <div class="cart-quantity" aria-label="${t('cart.quantityFor', { name: escapedName })}">
            <button type="button" data-cart-decrease="${escapeAttribute(item.id)}" aria-label="${t('cart.decreaseQuantity', { name: escapedName })}">-</button>
            <output aria-live="polite">${item.quantity}</output>
            <button type="button" data-cart-increase="${escapeAttribute(item.id)}" aria-label="${t('cart.increaseQuantity', { name: escapedName })}">+</button>
          </div>
          <button type="button" class="cart-remove" data-cart-remove="${escapeAttribute(item.id)}" aria-label="${t('cart.removeItem', { name: escapedName })}">${t('cart.remove')}</button>
        </div>
      </div>
      <div class="cart-item-price">
        <strong>${formatCurrency(item.price * item.quantity)}</strong>
        <span>${t('cart.each', { price: formatCurrency(item.price) })}</span>
      </div>
    </article>
  `;
}

function emptyCart() {
  return `
    <section class="cart-empty" aria-label="${t('cart.emptyAria')}">
      <div class="cart-empty-illustration" aria-hidden="true">
        <div></div>
        <span></span>
      </div>
      <h2>${t('cart.emptyTitle')}</h2>
      <p>${t('cart.emptyCopy')}</p>
      <a href="/menu" class="btn-primary ripple-button">${t('cart.browseMenu')}</a>
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
      <h2 id="cart-summary-title">${t('cart.summaryTitle')}</h2>
      <p class="cart-summary-note">${t('cart.summaryNote')}</p>
      <form class="cart-coupon" aria-label="${t('cart.couponAria')}">
        <label for="cart-coupon">${t('cart.couponLabel')}</label>
        <div>
          <input id="cart-coupon" type="text" placeholder="${t('cart.couponPlaceholder')}" autocomplete="off" data-coupon-input />
          <button type="submit" class="ripple-button" data-coupon-apply>${t('cart.applyCoupon')}</button>
        </div>
        <p data-coupon-message aria-live="polite"></p>
      </form>
      <div class="shipping-estimate">
        <strong>${t('cart.shippingEstimateTitle')}</strong>
        <span>${t('cart.shippingEstimateCopy')}</span>
      </div>
      <dl>
        <div>
          <dt>${t('cart.subtotal')}</dt>
          <dd>${formatCurrency(subtotal)}</dd>
        </div>
        <div>
          <dt>${t('cart.itemDiscount')}</dt>
          <dd>-${formatCurrency(itemDiscount)}</dd>
        </div>
        <div>
          <dt>${t('cart.shipping')}</dt>
          <dd>${shipping === 0 ? t('cart.freeShipping') : formatCurrency(shipping)}</dd>
        </div>
        <div class="cart-summary-total">
          <dt>${t('cart.total')}</dt>
          <dd data-cart-total>${formatCurrency(total)}</dd>
        </div>
      </dl>
      ${subtotal === 0
        ? `<button type="button" class="btn-primary w-full" disabled aria-disabled="true">${t('cart.checkoutDisabled')}</button>`
        : `<a href="#checkout" class="btn-primary w-full ripple-button">${t('buttons.checkout')}</a>`}
      <button type="button" class="cart-clear" data-cart-clear ${subtotal === 0 ? 'disabled aria-disabled="true"' : ''}>${t('cart.clearCart')}</button>
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
      <section class="cart-items" aria-label="${t('cart.itemsRegion')}">
        ${items.map(cartItem).join('')}
      </section>
      ${orderSummary()}
    </div>
    ${CheckoutContent()}
    ${OrderSuccess()}
  `;
}
