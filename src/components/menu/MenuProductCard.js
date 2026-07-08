import { formatCategoryName, formatCurrency } from '../../utils/format.js';
import { imageAttributes } from '../../utils/images.js';

function getProductBadge(product) {
  if (product.isNew) {
    return 'New';
  }

  if (product.reviews >= 300 || product.rating >= 4.9) {
    return 'Best Seller';
  }

  if (product.availability === 'Seasonal') {
    return 'Hot';
  }

  return 'Hot';
}

function getSoldCount(product) {
  return product.reviews * 8 + product.discount;
}

function getStockClass(availability) {
  return availability === 'Available now' ? 'is-available' : 'is-limited';
}

export function MenuProductCard(product) {
  const badge = getProductBadge(product);
  const soldCount = getSoldCount(product);

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
          sizes: '(min-width: 1280px) 276px, (min-width: 768px) 42vw, 92vw',
          className: 'menu-product-image'
        })} />
        <span class="menu-product-badge">${badge}</span>
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
          <span class="menu-product-rating" aria-label="${product.rating} out of 5 stars from ${product.reviews} reviews">
            <span class="menu-product-stars" aria-hidden="true">★★★★★</span>
            <strong>${product.rating}</strong>
          </span>
        </div>
        <h2 class="menu-product-title"><a href="/product?id=${product.id}" class="outline-none hover:text-brand-green focus-visible:text-brand-green">${product.name}</a></h2>
        <p class="menu-product-meta">${product.size} / ${product.sugar} sugar / ${product.ice}</p>
        <div class="menu-product-proof">
          <span>${product.reviews} reviews</span>
          <span>${soldCount.toLocaleString()} sold</span>
        </div>
        <p class="menu-product-stock ${getStockClass(product.availability)}">${product.availability}</p>
        <div class="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <div class="menu-product-price">${formatCurrency(product.price)}</div>
            <div class="menu-product-old-price">${formatCurrency(product.oldPrice)}</div>
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
