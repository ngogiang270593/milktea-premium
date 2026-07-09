import { getWishlist } from '../../store/wishlistStore.js';
import { formatCurrency } from '../../utils/format.js';
import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { imageAttributes } from '../../utils/image.js';
import { t } from '../../utils/i18n.js';

function translatedProductName(item) {
  const key = `products.items.${item.id}.name`;
  const name = t(key);

  return name === key ? item.name : name;
}

function translatedCategory(category) {
  const key = `filters.categoryOptions.${category}`;
  const value = t(key);

  return value === key ? category : value;
}

function wishlistItem(item) {
  const name = translatedProductName(item);
  const escapedName = escapeAttribute(name);

  return `
    <article class="wishlist-item" data-wishlist-item="${escapeAttribute(item.id)}">
      <img ${imageAttributes(item.image, {
        alt: name,
        width: 180,
        height: 180,
        sizes: '128px'
      })} />
      <div class="min-w-0">
        <span>${escapeHtml(translatedCategory(item.category))}</span>
        <h2>${escapeHtml(name)}</h2>
        <p aria-label="${t('wishlist.ratingAria', { rating: item.rating })}">★ ${item.rating}</p>
      </div>
      <div class="wishlist-actions">
        <strong>${formatCurrency(item.price)}</strong>
        <button type="button" class="btn-primary ripple-button" data-wishlist-move="${escapeAttribute(item.id)}" aria-label="${t('wishlist.moveToCartAria', { name: escapedName })}">${t('wishlist.moveToCart')}</button>
        <button type="button" class="cart-remove" data-wishlist-remove="${escapeAttribute(item.id)}" aria-label="${t('wishlist.removeAria', { name: escapedName })}">${t('wishlist.remove')}</button>
      </div>
    </article>
  `;
}

function emptyWishlist() {
  return `
    <section class="cart-empty" aria-label="${t('wishlist.emptyAria')}">
      <div class="wishlist-empty-illustration" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path>
        </svg>
      </div>
      <h2>${t('wishlist.emptyTitle')}</h2>
      <p>${t('wishlist.emptyCopy')}</p>
      <a href="/menu" class="btn-primary ripple-button">${t('wishlist.browseMenu')}</a>
    </section>
  `;
}

export function WishlistContent() {
  const items = getWishlist();

  if (!items.length) {
    return emptyWishlist();
  }

  return `
    <section class="wishlist-grid" aria-label="${t('wishlist.itemsRegion')}">
      ${items.map(wishlistItem).join('')}
    </section>
  `;
}
