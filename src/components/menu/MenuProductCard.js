import { formatCategoryName, formatCurrency } from '../../utils/format.js';
import { imageAttributes } from '../../services/ImageService.js';
import { t } from '../../utils/i18n.js';

function getProductBadge(product) {
  if (product.isNew) {
    return 'new';
  }

  if (product.reviews >= 300 || product.rating >= 4.9) {
    return 'bestSeller';
  }

  if (product.availability === 'Seasonal') {
    return 'hot';
  }

  return 'hot';
}

function getSoldCount(product) {
  return product.reviews * 8 + product.discount;
}

function getStockClass(availability) {
  return availability === 'Available now' ? 'is-available' : 'is-limited';
}

function productName(product) {
  return t(`products.items.${product.id}.name`);
}

function productCategory(product) {
  const translatedCategory = t(`filters.categoryOptions.${product.category}`);

  return translatedCategory === `filters.categoryOptions.${product.category}`
    ? formatCategoryName(product.category)
    : translatedCategory;
}

export function MenuProductCard(product) {
  const badge = getProductBadge(product);
  const soldCount = getSoldCount(product);
  const name = productName(product);

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
          alt: name,
          width: 900,
          height: 900,
          sizes: '(min-width: 1280px) 276px, (min-width: 768px) 42vw, 92vw',
          className: 'menu-product-image'
        })} />
        <span class="menu-product-badge">${t(`badges.${badge}`)}</span>
        <span class="product-discount" aria-label="${t('products.discountAria', { discount: product.discount })}">-${product.discount}%</span>
        <button type="button" class="favorite-button ripple-button" aria-label="${t('products.addWishlistAria', { name })}" aria-pressed="false" data-favorite-button="${product.id}">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path>
          </svg>
        </button>
      </div>
      <div class="menu-product-body">
        <div class="flex items-center justify-between gap-3">
          <span class="menu-product-category">${productCategory(product)}</span>
          <span class="menu-product-rating" aria-label="${t('products.ratingAria', { rating: product.rating, reviews: product.reviews })}">
            <span class="menu-product-stars" aria-hidden="true">★★★★★</span>
            <strong>${product.rating}</strong>
          </span>
        </div>
        <h2 class="menu-product-title"><a href="/product?id=${product.id}" class="outline-none hover:text-brand-green focus-visible:text-brand-green">${name}</a></h2>
        <p class="menu-product-meta">${t(`filters.sizeOptions.${product.size}`)} / ${t('filters.sugarValue', { value: product.sugar })} / ${t(`filters.iceOptions.${product.ice}`)}</p>
        <div class="menu-product-proof">
          <span>${t('products.reviewCount', { count: product.reviews })}</span>
          <span>${t('products.soldCount', { count: soldCount.toLocaleString() })}</span>
        </div>
        <p class="menu-product-stock ${getStockClass(product.availability)}">${t(`filters.availabilityOptions.${product.availability}`)}</p>
        <div class="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <div class="menu-product-price">${formatCurrency(product.price)}</div>
            <div class="menu-product-old-price">${formatCurrency(product.oldPrice)}</div>
          </div>
          <div class="flex gap-2">
            <a href="/product?id=${product.id}" class="quick-view-icon ripple-button" aria-label="${t('products.viewDetailsAria', { name })}">${t('buttons.view')}</a>
            <button type="button" class="add-cart-button ripple-button" aria-label="${t('products.addCartAria', { name })}" data-add-to-cart="${product.id}">${t('buttons.add')}</button>
          </div>
        </div>
      </div>
    </article>
  `;
}
