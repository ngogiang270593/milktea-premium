import { attrs, classNames } from './utils.js';

export function Skeleton({ className = '', attributes = {} } = {}) {
  return `<span class="${classNames('skeleton', className)}" aria-hidden="true" ${attrs(attributes)}></span>`;
}

function line(width = '100%', className = '') {
  return Skeleton({
    className: classNames('skeleton-line', className),
    attributes: {
      style: `--skeleton-width:${width}`
    }
  });
}

function block(className = '') {
  return Skeleton({ className: classNames('skeleton-block', className) });
}

export function HeroSkeleton() {
  return `
    <section class="skeleton-shell skeleton-hero" aria-hidden="true">
      <div>
        ${line('9rem', 'skeleton-pill')}
        ${line('82%', 'skeleton-title')}
        ${line('64%', 'skeleton-title skeleton-title-short')}
        ${line('78%')}
        ${line('58%')}
        <div class="skeleton-row">
          ${line('9rem', 'skeleton-button')}
          ${line('9rem', 'skeleton-button skeleton-button-soft')}
        </div>
        <div class="skeleton-stat-grid">
          ${Array.from({ length: 4 }, () => block('skeleton-stat')).join('')}
        </div>
      </div>
      ${block('skeleton-hero-visual')}
    </section>
  `;
}

export function ProductCardSkeleton() {
  return `
    <article class="skeleton-shell skeleton-product-card" aria-hidden="true">
      ${block('skeleton-product-media')}
      <div class="skeleton-product-body">
        ${line('42%', 'skeleton-pill')}
        ${line('76%', 'skeleton-heading')}
        ${line('58%')}
        <div class="skeleton-row skeleton-row-between">
          ${line('5rem', 'skeleton-price')}
          ${line('7rem', 'skeleton-button')}
        </div>
      </div>
    </article>
  `;
}

export function MenuSkeleton({ count = 6 } = {}) {
  return `
    <section class="skeleton-menu" aria-hidden="true">
      <aside class="skeleton-shell skeleton-menu-sidebar">
        ${line('55%', 'skeleton-heading')}
        ${Array.from({ length: 6 }, () => line('88%', 'skeleton-filter')).join('')}
      </aside>
      <div>
        <div class="skeleton-shell skeleton-menu-toolbar">
          ${line('42%')}
          ${line('12rem', 'skeleton-button')}
          ${line('7rem', 'skeleton-button')}
        </div>
        <div class="skeleton-menu-grid">
          ${Array.from({ length: count }, () => ProductCardSkeleton()).join('')}
        </div>
      </div>
    </section>
  `;
}

export function CartSkeleton({ count = 3 } = {}) {
  return `
    <section class="skeleton-cart" aria-hidden="true">
      <div class="skeleton-cart-list">
        ${Array.from({ length: count }, () => `
          <article class="skeleton-shell skeleton-cart-item">
            ${block('skeleton-cart-media')}
            <div>
              ${line('66%', 'skeleton-heading')}
              ${line('48%')}
              <div class="skeleton-row">
                ${line('7rem', 'skeleton-button')}
                ${line('5rem', 'skeleton-pill')}
              </div>
            </div>
            ${line('5rem', 'skeleton-price')}
          </article>
        `).join('')}
      </div>
      <aside class="skeleton-shell skeleton-cart-summary">
        ${line('62%', 'skeleton-heading')}
        ${Array.from({ length: 5 }, () => line('100%')).join('')}
        ${line('100%', 'skeleton-button')}
      </aside>
    </section>
  `;
}

export function ProductSkeleton() {
  return `
    <section class="skeleton-product-detail" aria-hidden="true">
      <div>
        ${block('skeleton-product-gallery')}
        <div class="skeleton-thumbnail-row">
          ${Array.from({ length: 3 }, () => block('skeleton-thumbnail')).join('')}
        </div>
      </div>
      <div class="skeleton-shell skeleton-product-info">
        ${line('38%', 'skeleton-pill')}
        ${line('86%', 'skeleton-title')}
        ${line('58%', 'skeleton-heading')}
        ${line('100%')}
        ${line('82%')}
        <div class="skeleton-option-grid">
          ${Array.from({ length: 8 }, () => line('7rem', 'skeleton-button skeleton-button-soft')).join('')}
        </div>
        <div class="skeleton-row">
          ${line('10rem', 'skeleton-button')}
          ${line('10rem', 'skeleton-button skeleton-button-soft')}
        </div>
      </div>
    </section>
  `;
}

export function NewsletterSkeleton() {
  return `
    <section class="skeleton-shell skeleton-newsletter" aria-hidden="true">
      <div>
        ${line('9rem', 'skeleton-pill')}
        ${line('78%', 'skeleton-heading')}
        ${line('92%')}
        ${line('68%')}
      </div>
      <div class="skeleton-newsletter-form">
        ${line('100%', 'skeleton-input')}
        ${line('9rem', 'skeleton-button')}
      </div>
    </section>
  `;
}
