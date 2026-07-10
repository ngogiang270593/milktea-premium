import { Button, Input, Textarea } from '../ui/index.js';
import { getDiscount, getShipping, getSubtotal } from '../../store/cartStore.js';
import { formatCurrency } from '../../utils/format.js';
import { t } from '../../utils/i18n.js';

const TAX_RATE = 0.08;
const EXPRESS_SURCHARGE = 2.5;
const COUPON_RATE = 0.1;

function field({
  id,
  label,
  type = 'text',
  autocomplete = '',
  required = false,
  validate = 'text',
  inputmode
}) {
  return `
    <label class="checkout-field" for="${id}">
      <span>${label}${required ? ' *' : ''}</span>
      ${Input({
        id,
        type,
        autocomplete,
        required,
        attributes: {
          'data-checkout-field': validate,
          'data-required': required ? 'true' : undefined,
          inputmode,
          'aria-describedby': `${id}-error`
        }
      })}
      <small id="${id}-error" class="checkout-error" data-field-error aria-live="polite"></small>
    </label>
  `;
}

function deliveryOption(value, title, description, price, checked = false) {
  return `
    <label class="checkout-option${checked ? ' is-active' : ''}">
      <input type="radio" name="delivery-method" value="${value}" data-shipping-option data-shipping-cost="${price}" ${checked ? 'checked' : ''} />
      <span>
        <strong>${title}</strong>
        <small>${description}</small>
      </span>
      <em>${price === 0 ? t('cart.freeShipping') : formatCurrency(price)}</em>
    </label>
  `;
}

function paymentOption(value, title, description, checked = false) {
  return `
    <label class="checkout-option${checked ? ' is-active' : ''}">
      <input type="radio" name="payment-method" value="${value}" ${checked ? 'checked' : ''} data-payment-option />
      <span>
        <strong>${title}</strong>
        <small>${description}</small>
      </span>
    </label>
  `;
}

function summaryRow(label, value, dataAttr = '') {
  return `
    <div>
      <dt>${label}</dt>
      <dd ${dataAttr}>${value}</dd>
    </div>
  `;
}

function checkoutSummary() {
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShipping();
  const tax = Math.max(0, subtotal) * TAX_RATE;
  const total = subtotal + shipping + tax;

  return `
    <aside class="checkout-panel checkout-summary-panel" aria-labelledby="checkout-summary-title">
      <h3 id="checkout-summary-title">${t('checkout.orderSummary')}</h3>
      <dl class="checkout-summary-list" data-checkout-summary data-tax-rate="${TAX_RATE}" data-coupon-rate="${COUPON_RATE}">
        ${summaryRow(t('cart.subtotal'), formatCurrency(subtotal), 'data-checkout-subtotal')}
        ${summaryRow(t('cart.itemDiscount'), `-${formatCurrency(discount)}`, 'data-checkout-discount')}
        ${summaryRow(t('checkout.couponDiscount'), `-${formatCurrency(0)}`, 'data-checkout-coupon-discount')}
        ${summaryRow(t('checkout.shippingFee'), shipping === 0 ? t('cart.freeShipping') : formatCurrency(shipping), 'data-checkout-shipping')}
        ${summaryRow(t('checkout.tax'), formatCurrency(tax), 'data-checkout-tax')}
        ${summaryRow(t('checkout.grandTotal'), formatCurrency(total), 'data-checkout-total class="checkout-grand-total"')}
      </dl>
      <p data-checkout-summary-note>${t('checkout.securePayment')}</p>
      ${Button({
        children: t('checkout.placeOrder'),
        type: 'submit',
        className: 'w-full checkout-place-order',
        disabled: true,
        attributes: {
          'data-checkout-submit': '',
          'data-action-label': t('checkout.placeOrder'),
          'data-action-success': t('checkout.orderSuccess')
        }
      })}
    </aside>
  `;
}

export function CheckoutContent() {
  const standardShipping = getShipping();
  const expressShipping = standardShipping + EXPRESS_SURCHARGE;

  return `
    <section id="checkout" class="checkout-section" aria-labelledby="checkout-title" data-reveal>
      <div class="checkout-heading">
        <p>${t('checkout.eyebrow')}</p>
        <h2 id="checkout-title">${t('checkout.title')}</h2>
      </div>

      <form class="checkout-grid" aria-label="${t('checkout.formAria')}" data-checkout-form novalidate>
        <div class="checkout-form">
          <section class="checkout-panel" aria-labelledby="customer-info-title">
            <h3 id="customer-info-title">${t('checkout.customerInfo')}</h3>
            <div class="checkout-form-grid">
              ${field({ id: 'checkout-name', label: t('checkout.fullName'), autocomplete: 'name', required: true })}
              ${field({ id: 'checkout-phone', label: t('checkout.phone'), type: 'tel', autocomplete: 'tel', required: true, validate: 'phone', inputmode: 'tel' })}
              ${field({ id: 'checkout-email', label: t('checkout.email'), type: 'email', autocomplete: 'email', required: true, validate: 'email', inputmode: 'email' })}
              ${field({ id: 'checkout-city', label: t('checkout.city'), autocomplete: 'address-level1', required: true })}
              ${field({ id: 'checkout-district', label: t('checkout.district'), autocomplete: 'address-level2', required: true })}
              ${field({ id: 'checkout-ward', label: t('checkout.ward'), autocomplete: 'address-level3', required: true })}
            </div>
          </section>

          <section class="checkout-panel" aria-labelledby="shipping-address-title">
            <h3 id="shipping-address-title">${t('checkout.shippingAddress')}</h3>
            <div class="checkout-form-grid checkout-form-grid-single">
              ${field({ id: 'checkout-address', label: t('checkout.address'), autocomplete: 'street-address', required: true })}
            </div>
            <label class="checkout-field checkout-notes-field" for="checkout-notes">
              <span>${t('checkout.notes')}</span>
              ${Textarea({
                id: 'checkout-notes',
                rows: 4,
                placeholder: t('checkout.notesPlaceholder'),
                attributes: { 'data-checkout-notes': '' }
              })}
            </label>
          </section>

          <section class="checkout-panel" aria-labelledby="delivery-method-title">
            <h3 id="delivery-method-title">${t('checkout.deliveryMethod')}</h3>
            <div class="checkout-option-grid">
              ${deliveryOption('standard', t('checkout.delivery.standard.title'), t('checkout.delivery.standard.description'), standardShipping, true)}
              ${deliveryOption('express', t('checkout.delivery.express.title'), t('checkout.delivery.express.description'), expressShipping)}
              ${deliveryOption('pickup', t('checkout.delivery.pickup.title'), t('checkout.delivery.pickup.description'), 0)}
            </div>
          </section>

          <section class="checkout-panel" aria-labelledby="payment-method-title">
            <h3 id="payment-method-title">${t('checkout.paymentMethod')}</h3>
            <div class="checkout-option-grid checkout-payment-grid">
              ${paymentOption('cash', t('checkout.payment.cash.title'), t('checkout.payment.cash.description'), true)}
              ${paymentOption('bank-transfer', t('checkout.payment.bankTransfer.title'), t('checkout.payment.bankTransfer.description'))}
              ${paymentOption('credit-card', t('checkout.payment.creditCard.title'), t('checkout.payment.creditCard.description'))}
              ${paymentOption('digital-wallet', t('checkout.payment.digitalWallet.title'), t('checkout.payment.digitalWallet.description'))}
            </div>
          </section>

          <section class="checkout-panel" aria-labelledby="checkout-coupon-title">
            <h3 id="checkout-coupon-title">${t('checkout.coupon')}</h3>
            <div class="checkout-coupon-row">
              <label class="sr-only" for="checkout-coupon">${t('checkout.coupon')}</label>
              ${Input({
                id: 'checkout-coupon',
                placeholder: t('checkout.couponPlaceholder'),
                autocomplete: 'off',
                attributes: { 'data-checkout-coupon': '' }
              })}
              <button type="button" class="ripple-button" data-checkout-apply-coupon>${t('checkout.applyCoupon')}</button>
            </div>
            <p class="checkout-coupon-message" data-checkout-coupon-message aria-live="polite"></p>
          </section>
        </div>

        ${checkoutSummary()}
      </form>
    </section>
  `;
}
