import { formatCategoryName, formatCurrency } from '../../utils/format.js';
import { imageAttributes } from '../../utils/images.js';

export function MenuProductCard(product) {
  return `
    <article
      class="menu-product-card"
      data-menu-product
      data-name="${product.name.toLowerCase()}"
      data-category="${product.category}"
      data-price="${product.price}"
      data-rating="${product.rating}"
      data-size="${product.size}"
      data-sugar="${product.sugar}"
      data-ice="${product.ice}"
      data-availability="${product.availability}"
      data-new="${product.isNew}"
      data-product-id="${product.id}"
    >
      <div class="menu-product-media">
        <img ${imageAttributes(product.image, {
          alt: product.name,
          width: 900,
          height: 900,
          sizes: '(min-width: 1280px) 276px, (min-width: 768px) 42vw, 92vw'
        })} />
        <span class="product-discount" aria-label="${product.discount} percent discount">-${product.discount}%</span>
        <button type="button" class="favorite-button ripple-button" aria-label="Add ${product.name} to wishlist" aria-pressed="false" data-favorite-button="${product.id}">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path>
          </svg>
        </button>
      </div>
      <div class="menu-product-body">
        <div class="flex items-center justify-between gap-3">
          <span class="menu-product-category">${formatCategoryName(product.category)}</span>
          <span class="menu-product-rating" aria-label="${product.rating} out of 5 stars">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-brand-gold text-brand-gold" aria-hidden="true"><path d="m12 3 2.7 5.47 6.04.88-4.37 4.26 1.03 6.01L12 16.78l-5.4 2.84 1.03-6.01-4.37-4.26 6.04-.88L12 3Z"></path></svg>
            ${product.rating}
          </span>
        </div>
        <h2 class="menu-product-title"><a href="/product?id=${product.id}" class="outline-none hover:text-brand-green focus-visible:text-brand-green">${product.name}</a></h2>
        <p class="menu-product-meta">${product.size} / ${product.sugar} sugar / ${product.ice}</p>
        <div class="mt-5 flex items-end justify-between gap-4">
          <div>
            <div class="text-2xl font-semibold text-brand-green">${formatCurrency(product.price)}</div>
            <div class="text-sm text-[#a39080] line-through">${formatCurrency(product.oldPrice)}</div>
          </div>
          <div class="flex gap-2">
            <a href="/product?id=${product.id}" class="quick-view-icon ripple-button" aria-label="View details for ${product.name}">View</a>
            <button type="button" class="add-cart-button ripple-button" aria-label="Add ${product.name} to cart" data-add-to-cart="${product.id}">Add</button>
          </div>
        </div>
      </div>
    </article>
  `;
}
