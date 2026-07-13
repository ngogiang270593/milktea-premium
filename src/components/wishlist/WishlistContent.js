import { getWishlist } from '../../store/wishlistStore.js';
import { formatCurrency } from '../../utils/format.js';
import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { imageAttributes } from '../../utils/image.js';
import { t } from '../../utils/i18n.js';
import { EmptyState } from '../ui/index.js';

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
  return EmptyState({
    title: t('wishlist.emptyTitle'),
    description: t('wishlist.emptyCopy'),
    actionHref: '/menu',
    actionLabel: t('wishlist.browseMenu'),
    illustration: 'favorites',
    className: 'cart-empty wishlist-empty',
    attributes: {
      'aria-label': t('wishlist.emptyAria')
    }
  });
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
