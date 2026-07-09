import { WishlistContent } from '../components/wishlist/WishlistContent.js';
import { getWishlistCount } from '../store/wishlistStore.js';
import { t } from '../utils/i18n.js';

export function WishlistPage() {
  return `
    <section class="wishlist-page" aria-labelledby="wishlist-title">
      <div class="cart-container">
        <nav class="menu-breadcrumb" aria-label="${t('menu.breadcrumbAria')}">
          <ol>
            <li><a href="/">${t('navbar.home')}</a></li>
            <li aria-current="page">${t('wishlist.breadcrumb')}</li>
          </ol>
        </nav>
        <div class="cart-heading" data-reveal>
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('wishlist.eyebrow')}</p>
            <h1 id="wishlist-title">${t('wishlist.title')}</h1>
          </div>
          <p><span data-wishlist-page-count>${getWishlistCount()}</span> ${t('wishlist.savedCount')}</p>
        </div>
        <div class="mt-12" data-wishlist-content>
          ${WishlistContent()}
        </div>
      </div>
    </section>
  `;
}
