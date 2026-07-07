import { FEATURED_PRODUCTS } from '../data/products.js';
import { imageAttributes } from '../utils/images.js';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function featuredCard(product) {
  return `
    <article class="product-card group" data-product-card>
      <div class="product-image-wrap">
        <img ${imageAttributes(product.image, {
          alt: product.title,
          width: 900,
          height: 900,
          sizes: '(min-width: 1280px) 288px, (min-width: 640px) 45vw, 92vw',
          className: 'product-image'
        })} />
        <span class="product-discount" aria-label="${product.discount} percent discount">-${product.discount}%</span>
        <span class="product-badge">${product.badge}</span>
        <button type="button" class="favorite-button ripple-button" aria-label="Add ${product.title} to wishlist" aria-pressed="false" data-favorite-button="${product.id}">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path>
          </svg>
        </button>
        <a href="/product?id=${product.id}" class="quick-view-button ripple-button text-center" aria-label="Open product detail for ${product.title}">
          Quick view
        </a>
      </div>

      <div class="p-6">
        <div class="flex items-center justify-between gap-3">
          <span class="rounded-full bg-brand-mint/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">${product.label}</span>
          <span class="flex items-center gap-1 text-sm font-semibold text-[#6f4329]" aria-label="${product.rating} out of 5 stars">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-brand-gold text-brand-gold" aria-hidden="true">
              <path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.01L12 16.78l-5.4 2.84 1.03-6.01-4.37-4.26 6.04-.88L12 3Z"></path>
            </svg>
            ${product.rating}
            <span class="font-medium text-[#9a8675]" aria-hidden="true">(${product.reviews})</span>
          </span>
        </div>

        <h3 class="mt-4 text-xl font-semibold tracking-tight text-[#1f1710]"><a href="/product?id=${product.id}" class="outline-none hover:text-brand-green focus-visible:text-brand-green">${product.title}</a></h3>
        <p class="mt-2 min-h-[3rem] text-sm leading-6 text-[#7b6a5a]">${product.description}</p>

        <div class="mt-5 flex items-end justify-between gap-4">
          <div>
            <div class="text-2xl font-semibold text-brand-green">${formatPrice(product.price)}</div>
            <div class="text-sm text-[#a39080] line-through">${formatPrice(product.oldPrice)}</div>
          </div>
          <button type="button" class="add-cart-button ripple-button" aria-label="Add ${product.title} to cart" data-add-to-cart="${product.id}">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M6.5 8h11l-1.1 7.2a2 2 0 0 1-2 1.8H9.6a2 2 0 0 1-2-1.8L6.5 8Z"></path>
              <path d="M9 8a3 3 0 0 1 6 0"></path>
              <path d="M12 11v4M10 13h4"></path>
            </svg>
            Add
          </button>
        </div>
      </div>
    </article>
  `;
}

export function FeaturedProducts() {
  return `
    <section id="order" class="featured-products-section relative overflow-hidden py-20 lg:py-24" aria-labelledby="featured-title" data-reveal>
      <div class="pointer-events-none absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-brand-peach/30 blur-3xl" aria-hidden="true"></div>
      <div class="pointer-events-none absolute right-[-7rem] bottom-16 h-80 w-80 rounded-full bg-brand-mint/45 blur-3xl" aria-hidden="true"></div>

      <div id="featured" class="relative mx-auto max-w-7xl px-6 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Featured products</p>
          <h2 id="featured-title" class="section-heading mt-4">Premium picks, ready for your cart.</h2>
        </div>
        <p class="section-copy mt-6 max-w-xl text-gray-600 lg:mt-0">Image-led product cards with instant favorite, quick view, discounts, ratings, and polished cart actions.</p>
      </div>

      <div class="relative mx-auto mt-12 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        ${FEATURED_PRODUCTS.map(featuredCard).join('')}
      </div>
    </section>
  `;
}
