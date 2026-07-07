import { WishlistContent } from '../components/wishlist/WishlistContent.js';
import { getWishlistCount } from '../store/wishlistStore.js';

export function WishlistPage() {
  return `
    <section class="wishlist-page" aria-labelledby="wishlist-title">
      <div class="cart-container">
        <nav class="menu-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li aria-current="page">Wishlist</li>
          </ol>
        </nav>
        <div class="cart-heading" data-reveal>
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Wishlist</p>
            <h1 id="wishlist-title">Saved favorites.</h1>
          </div>
          <p><span data-wishlist-page-count>${getWishlistCount()}</span> saved</p>
        </div>
        <div class="mt-12" data-wishlist-content>
          ${WishlistContent()}
        </div>
      </div>
    </section>
  `;
}
