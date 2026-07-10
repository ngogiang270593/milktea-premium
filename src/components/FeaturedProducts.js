import { getSiteContent } from '../config/siteConfig.js';
import { FEATURED_PRODUCTS } from '../repositories/ProductRepository.js';
import { formatCurrency } from '../utils/currency.js';
import { getLanguage } from '../store/languageStore.js';
import { imageAttributes } from '../utils/image.js';
import { t } from '../utils/i18n.js';

function featuredCard(product, featuredContent) {
  const productContent = featuredContent.items[product.id];
  const title = productContent.title;
  const description = productContent.description;
  const badge = productContent.badge;
  const label = featuredContent.labels[product.label];

  return `
    <article class="product-card featured-premium-card group flex h-full flex-col" data-product-card>
      <div class="product-image-wrap">
        <img ${imageAttributes(product.image, {
          alt: title,
          width: 900,
          height: 900,
          sizes: '(min-width: 1280px) 288px, (min-width: 640px) 45vw, 92vw',
          className: 'product-image'
        })} />
        <span class="product-discount" aria-label="${t('home.featured.discountAria', { discount: product.discount })}">-${product.discount}%</span>
        <span class="product-badge">${badge}</span>
        <button type="button" class="favorite-button ripple-button" aria-label="${t('home.featured.favoriteAria', { title })}" aria-pressed="false" data-favorite-button="${product.id}">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path>
          </svg>
        </button>
        <button type="button" class="quick-view-button ripple-button text-center" aria-label="${t('home.featured.quickViewAria', { title })}" data-quick-view="${product.id}">
          ${t('home.featured.quickView')}
        </button>
      </div>

      <div class="featured-product-body flex flex-1 flex-col p-6 pt-5">
        <div class="flex items-center justify-between gap-3">
          <span class="rounded-full bg-brand-mint/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">${label}</span>
          <span class="flex shrink-0 items-center gap-1 text-sm font-bold text-[#6f4329]" aria-label="${t('home.featured.ratingAria', { rating: product.rating })}">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-brand-gold text-brand-gold" aria-hidden="true">
              <path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.01L12 16.78l-5.4 2.84 1.03-6.01-4.37-4.26 6.04-.88L12 3Z"></path>
            </svg>
            ${product.rating}
            <span class="font-medium text-[#9a8675]" aria-hidden="true">(${product.reviews})</span>
          </span>
        </div>

        <h3 class="mt-4 text-xl font-bold tracking-tight text-[#1f1710]"><a href="/product?id=${product.id}" class="outline-none transition hover:text-brand-green focus-visible:text-brand-green">${title}</a></h3>
        <p class="mt-2 min-h-[4.5rem] text-sm leading-6 text-[#6f5f51]">${description}</p>
        <div class="mt-4 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#7b6a5a]">
          <span>${t('home.featured.fastPickup')}</span>
          <span>${t('products.soldCount', { count: (product.reviews * 8).toLocaleString() })}</span>
        </div>

        <div class="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <div class="text-2xl font-extrabold leading-none text-brand-green">${formatCurrency(product.price)}</div>
            <div class="mt-1 text-sm font-medium text-[#8f7d6c] line-through">${formatCurrency(product.oldPrice)}</div>
          </div>
          <button type="button" class="add-cart-button ripple-button" aria-label="${t('home.featured.addToCartAria', { title })}" data-add-to-cart="${product.id}">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M6.5 8h11l-1.1 7.2a2 2 0 0 1-2 1.8H9.6a2 2 0 0 1-2-1.8L6.5 8Z"></path>
              <path d="M9 8a3 3 0 0 1 6 0"></path>
              <path d="M12 11v4M10 13h4"></path>
            </svg>
            ${t('home.featured.add')}
          </button>
        </div>
      </div>
    </article>
  `;
}

export function FeaturedProducts() {
  const featured = getSiteContent(getLanguage()).home.featured;

  return `
    <section id="order" class="featured-products-section relative overflow-hidden py-20 lg:py-24" aria-labelledby="featured-title" data-reveal>
      <div class="pointer-events-none absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-brand-peach/30 blur-3xl" aria-hidden="true"></div>
      <div class="pointer-events-none absolute right-[-7rem] bottom-16 h-80 w-80 rounded-full bg-brand-mint/45 blur-3xl" aria-hidden="true"></div>

      <div id="featured" class="relative mx-auto max-w-7xl px-6 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${featured.eyebrow}</p>
          <h2 id="featured-title" class="section-heading mt-4">${featured.title}</h2>
        </div>
        <div class="mt-6 max-w-xl lg:mt-0">
          <p class="section-copy text-gray-600">${featured.copy}</p>
          <a href="/menu" class="mt-5 inline-flex text-sm font-extrabold text-brand-green outline-none transition hover:text-[#0b3427] focus-visible:ring-2 focus-visible:ring-brand-gold/70">${t('home.featured.viewMenu')}</a>
        </div>
      </div>

      <div class="relative mx-auto mt-12 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        ${FEATURED_PRODUCTS.map((product) => featuredCard(product, featured)).join('')}
      </div>
    </section>
  `;
}
