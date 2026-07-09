import { getDiscount, getShipping, getSubtotal, getTotal } from '../../store/cartStore.js';
import { formatCurrency } from '../../utils/format.js';
import { t } from '../../utils/i18n.js';

function checkoutField(id, label, type = 'text', autocomplete = '', extra = '') {
  return `
    <label class="checkout-field" for="${id}">
      <span>${label}</span>
      <input id="${id}" type="${type}" ${autocomplete ? `autocomplete="${autocomplete}"` : ''} ${extra} />
    </label>
  `;
}

function deliveryOption(value, title, description, checked = false) {
  return `
    <label class="checkout-option">
      <input type="radio" name="delivery-method" value="${value}" ${checked ? 'checked' : ''} />
      <span>
        <strong>${title}</strong>
        <small>${description}</small>
      </span>
    </label>
  `;
}

function paymentOption(value, title, description, checked = false) {
  return `
    <label class="checkout-option">
      <input type="radio" name="payment-method" value="${value}" ${checked ? 'checked' : ''} />
      <span>
        <strong>${title}</strong>
        <small>${description}</small>
      </span>
    </label>
  `;
}

function checkoutSummary() {
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const total = getTotal();

  return `
    <aside class="checkout-panel checkout-summary-panel" aria-labelledby="checkout-summary-title">
      <h3 id="checkout-summary-title">${t('checkout.orderSummary')}</h3>
      <dl class="checkout-summary-list">
        <div>
          <dt>${t('cart.subtotal')}</dt>
          <dd>${formatCurrency(subtotal)}</dd>
        </div>
        <div>
          <dt>${t('cart.itemDiscount')}</dt>
          <dd>-${formatCurrency(discount)}</dd>
        </div>
        <div>
          <dt>${t('cart.shipping')}</dt>
          <dd>${shipping === 0 ? t('cart.freeShipping') : formatCurrency(shipping)}</dd>
        </div>
        <div class="cart-summary-total">
          <dt>${t('cart.total')}</dt>
          <dd>${formatCurrency(total)}</dd>
        </div>
      </dl>
      <p>${t('checkout.securePayment')}</p>
      <a href="#order-success" class="btn-primary w-full ripple-button">${t('checkout.placeOrder')}</a>
    </aside>
  `;
}

export function CheckoutContent() {
  return `
    <section id="checkout" class="checkout-section" aria-labelledby="checkout-title" data-reveal>
      <div class="checkout-heading">
        <p>${t('checkout.eyebrow')}</p>
        <h2 id="checkout-title">${t('checkout.title')}</h2>
      </div>

      <div class="checkout-grid">
        <form class="checkout-form" aria-label="${t('checkout.formAria')}">
          <section class="checkout-panel" aria-labelledby="customer-info-title">
            <h3 id="customer-info-title">${t('checkout.customerInfo')}</h3>
            <div class="checkout-form-grid">
              ${checkoutField('checkout-name', t('checkout.fullName'), 'text', 'name', 'required')}
              ${checkoutField('checkout-email', t('checkout.email'), 'email', 'email', 'required')}
              ${checkoutField('checkout-phone', t('checkout.phone'), 'tel', 'tel', 'required')}
            </div>
          </section>

          <section class="checkout-panel" aria-labelledby="shipping-address-title">
            <h3 id="shipping-address-title">${t('checkout.shippingAddress')}</h3>
            <div class="checkout-form-grid">
              ${checkoutField('checkout-address', t('checkout.address'), 'text', 'street-address', 'required')}
              ${checkoutField('checkout-city', t('checkout.city'), 'text', 'address-level1', 'required')}
              ${checkoutField('checkout-district', t('checkout.district'), 'text', 'address-level2', 'required')}
              ${checkoutField('checkout-ward', t('checkout.ward'), 'text', 'address-level3')}
            </div>
          </section>

          <section class="checkout-panel" aria-labelledby="delivery-method-title">
            <h3 id="delivery-method-title">${t('checkout.deliveryMethod')}</h3>
            <div class="checkout-option-grid">
              ${deliveryOption('standard', t('checkout.delivery.standard.title'), t('checkout.delivery.standard.description'), true)}
              ${deliveryOption('express', t('checkout.delivery.express.title'), t('checkout.delivery.express.description'))}
              ${deliveryOption('pickup', t('checkout.delivery.pickup.title'), t('checkout.delivery.pickup.description'))}
            </div>
          </section>

          <section class="checkout-panel" aria-labelledby="payment-method-title">
            <h3 id="payment-method-title">${t('checkout.paymentMethod')}</h3>
            <div class="checkout-option-grid checkout-payment-grid">
              ${paymentOption('cash', t('checkout.payment.cash.title'), t('checkout.payment.cash.description'), true)}
              ${paymentOption('bank-transfer', t('checkout.payment.bankTransfer.title'), t('checkout.payment.bankTransfer.description'))}
              ${paymentOption('momo', t('checkout.payment.momo.title'), t('checkout.payment.momo.description'))}
              ${paymentOption('vnpay', t('checkout.payment.vnpay.title'), t('checkout.payment.vnpay.description'))}
              ${paymentOption('stripe', t('checkout.payment.stripe.title'), t('checkout.payment.stripe.description'))}
              ${paymentOption('paypal', t('checkout.payment.paypal.title'), t('checkout.payment.paypal.description'))}
            </div>
          </section>

          <section class="checkout-panel" aria-labelledby="checkout-coupon-title">
            <h3 id="checkout-coupon-title">${t('checkout.coupon')}</h3>
            <div class="checkout-coupon-row">
              <label class="sr-only" for="checkout-coupon">${t('checkout.coupon')}</label>
              <input id="checkout-coupon" type="text" placeholder="${t('checkout.couponPlaceholder')}" autocomplete="off" />
              <button type="button" class="ripple-button">${t('checkout.applyCoupon')}</button>
            </div>
          </section>

          <section class="checkout-panel" aria-labelledby="checkout-notes-title">
            <h3 id="checkout-notes-title">${t('checkout.notes')}</h3>
            <label class="sr-only" for="checkout-notes">${t('checkout.notes')}</label>
            <textarea id="checkout-notes" rows="4" placeholder="${t('checkout.notesPlaceholder')}"></textarea>
          </section>
        </form>

        ${checkoutSummary()}
      </div>
    </section>
  `;
}
