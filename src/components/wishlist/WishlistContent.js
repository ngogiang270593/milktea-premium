import { getWishlist } from '../../store/wishlistStore.js';
import { formatCategoryName, formatCurrency } from '../../utils/format.js';
import { imageAttributes } from '../../utils/images.js';

function wishlistItem(item) {
  return `
    <article class="wishlist-item" data-wishlist-item="${item.id}">
      <img ${imageAttributes(item.image, {
        alt: item.name,
        width: 180,
        height: 180,
        sizes: '128px'
      })} />
      <div class="min-w-0">
        <span>${formatCategoryName(item.category)}</span>
        <h2>${item.name}</h2>
        <p aria-label="${item.rating} out of 5 stars">★ ${item.rating}</p>
      </div>
      <div class="wishlist-actions">
        <strong>${formatCurrency(item.price)}</strong>
        <button type="button" class="btn-primary" data-wishlist-move="${item.id}" aria-label="Move ${item.name} to cart">Move to cart</button>
        <button type="button" class="cart-remove" data-wishlist-remove="${item.id}" aria-label="Remove ${item.name} from wishlist">Remove</button>
      </div>
    </article>
  `;
}

function emptyWishlist() {
  return `
    <section class="cart-empty" aria-label="Empty wishlist">
      <div class="wishlist-empty-illustration" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path>
        </svg>
      </div>
      <h2>Your wishlist is waiting.</h2>
      <p>Tap the heart on any product to save your premium tea favorites here.</p>
      <a href="/menu" class="btn-primary">Browse Menu</a>
    </section>
  `;
}

export function WishlistContent() {
  const items = getWishlist();

  if (!items.length) {
    return emptyWishlist();
  }

  return `
    <section class="wishlist-grid" aria-label="Wishlist items">
      ${items.map(wishlistItem).join('')}
    </section>
  `;
}
