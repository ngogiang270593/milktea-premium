import { MenuProductCard } from '../components/menu/MenuProductCard.js';
import { Accordion } from '../components/ui/Accordion.js';
import { Badge } from '../components/ui/Badge.js';
import { Rating } from '../components/ui/Rating.js';
import { Tag } from '../components/ui/Tag.js';
import { getSiteConfig } from '../config/siteConfig.js';
import { getProductById, MENU_PRODUCTS } from '../repositories/ProductRepository.js';
import { formatCurrency } from '../utils/format.js';
import { escapeAttribute, escapeHtml } from '../utils/html.js';
import { escapeImageAttribute, imageAttributes, imageSourceSet, resizeImageUrl } from '../utils/image.js';
import { t } from '../utils/i18n.js';

const SIZES = ['Regular', 'Large'];
const SUGAR_LEVELS = ['0%', '30%', '50%', '70%', '100%'];
const ICE_LEVELS = ['No ice', 'Less ice', 'Regular ice'];
const TOPPINGS = ['Brown sugar pearls', 'Crystal boba', 'Cream foam', 'Aloe jelly', 'Pudding'];

function optionLabel(name, value) {
  if (name === 'size') {
    return t(`filters.sizeOptions.${value}`);
  }

  if (name === 'ice') {
    return t(`filters.iceOptions.${value}`);
  }

  if (name === 'sugar') {
    return t('filters.sugarValue', { value });
  }

  return value;
}

function optionButton(name, value, active = false) {
  const label = optionLabel(name, value);

  return `
    <button type="button" class="product-option${active ? ' is-active' : ''}" data-product-option="${name}" data-option-value="${value}" aria-pressed="${active}" aria-label="${t('productDetail.optionAria', { option: label })}">
      ${label}
    </button>
  `;
}

function toppingOption(value) {
  return `
    <label class="product-topping">
      <input type="checkbox" value="${value}" data-product-topping />
      <span>${t(`productDetail.toppings.${value}`)}</span>
    </label>
  `;
}

function accordion(title, content, open = false) {
  return Accordion({ title, children: content, open });
}

function getSoldCount(product) {
  return product.reviews * 8 + product.discount;
}

function getRelatedProducts(product) {
  return MENU_PRODUCTS
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);
}

function productText(product, key) {
  const path = `products.items.${product.id}.${key}`;
  const value = t(path);

  if (value !== path) {
    return value;
  }

  if (key === 'description') {
    return product.description;
  }

  if (key === 'ingredients' || key === 'nutrition') {
    return t(`productDetail.defaults.${key}`);
  }

  return product[key] || product.name || product.title;
}

function productCategory(product) {
  const path = `filters.categoryOptions.${product.category}`;
  const value = t(path);

  return value === path ? product.category.replaceAll('-', ' ') : value;
}

function categoryUrl(product) {
  const params = new URLSearchParams();
  params.set('category', product.category);

  return `/menu?${params.toString()}`;
}

function availabilityText(product) {
  const path = `filters.availabilityOptions.${product.availability}`;
  const value = t(path);

  return value === path ? product.availability : value;
}

function productSku(product) {
  return `MT-${product.id.replaceAll('-', '').slice(0, 10).toUpperCase()}`;
}

function tagLabel(tag, product) {
  const categoryPath = `filters.categoryOptions.${tag}`;
  const category = t(categoryPath);

  if (category !== categoryPath) {
    return category;
  }

  if (tag === product.availability) {
    return availabilityText(product);
  }

  if (SIZES.includes(tag)) {
    return t(`filters.sizeOptions.${tag}`);
  }

  if (ICE_LEVELS.includes(tag)) {
    return t(`filters.iceOptions.${tag}`);
  }

  if (String(tag).includes('%')) {
    return t('filters.sugarValue', { value: tag });
  }

  return tag;
}

function productTags(product) {
  const tags = [
    product.category,
    product.size,
    product.sugar,
    product.ice,
    product.availability,
    ...(product.tags || [])
  ];

  return [...new Set(tags.filter(Boolean))]
    .map((tag) => tagLabel(tag, product))
    .slice(0, 6);
}

function metaItem(label, value) {
  return `
    <div>
      <dt>${label}</dt>
      <dd>${value}</dd>
    </div>
  `;
}

function shareUrl(platform, productId) {
  const path = `/product?id=${encodeURIComponent(productId)}`;

  if (platform === 'facebook') {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(path)}`;
  }

  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(path)}`;
}

function notFound() {
  return `
    <section class="product-page" aria-labelledby="product-title">
      <div class="product-container">
        <div class="cart-empty">
          <h1 id="product-title" class="text-3xl font-semibold text-[#1f1710]">${t('productDetail.notFoundTitle')}</h1>
          <p>${t('productDetail.notFoundCopy')}</p>
          <a href="/menu" class="btn-primary">${t('productDetail.backToMenu')}</a>
        </div>
      </div>
    </section>
  `;
}

export function ProductPage() {
  const id = new URLSearchParams(window.location.search).get('id') || 'royal-brown-sugar';
  const product = getProductById(id);

  if (!product) {
    return notFound();
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const title = productText(product, 'name');
  const description = productText(product, 'description');
  const relatedProducts = getRelatedProducts(product);
  const soldCount = getSoldCount(product);
  const categoryTitle = productCategory(product);
  const availabilityLabel = availabilityText(product);
  const ratingLabel = t('products.ratingAria', { rating: product.rating, reviews: product.reviews });
  const sku = productSku(product);
  const brandName = getSiteConfig().brand.name;
  const tags = productTags(product);

  return `
    <section class="product-page" aria-labelledby="product-title" data-product-detail="${product.id}">
      <div class="product-container">
        <nav class="menu-breadcrumb" aria-label="${t('menu.breadcrumbAria')}">
          <ol>
            <li><a href="/">${t('navbar.home')}</a></li>
            <li><a href="/menu">${t('navbar.menu')}</a></li>
            <li><a href="${categoryUrl(product)}">${categoryTitle}</a></li>
            <li aria-current="page">${title}</li>
          </ol>
        </nav>

        <div class="product-detail-layout">
          <section class="product-gallery" aria-label="${t('productDetail.galleryAria', { name: title })}" data-reveal>
            <div class="product-main-image" data-product-zoom>
              <img ${imageAttributes(gallery[0], {
                alt: title,
                width: 1000,
                height: 1000,
                sizes: '(min-width: 1024px) 48vw, 92vw',
                loading: 'eager',
                fetchPriority: 'high',
                extra: 'data-gallery-main'
              })} />
            </div>
            <div class="product-thumbnails" aria-label="${t('productDetail.thumbnailsAria')}" role="group">
              ${gallery.map((image, index) => `
                <button
                  type="button"
                  class="${index === 0 ? 'is-active' : ''}"
                  data-gallery-thumb="${escapeImageAttribute(resizeImageUrl(image, 1000))}"
                  data-gallery-srcset="${imageSourceSet(image, 1000)}"
                  aria-label="${t('productDetail.viewImageAria', { index: index + 1 })}"
                  aria-pressed="${index === 0}"
                >
                  <img ${imageAttributes(image, {
                    alt: '',
                    width: 160,
                    height: 160,
                    sizes: '120px'
                  })} />
                </button>
              `).join('')}
            </div>
          </section>

          <aside class="product-info product-purchase-panel" data-reveal>
            <div class="product-info-topline">
              ${Badge({ children: escapeHtml(categoryTitle), tone: 'brand', className: 'menu-product-category' })}
              <span class="product-sku">${t('productDetail.meta.sku')}: ${sku}</span>
            </div>
            <div class="mt-4 flex items-start justify-between gap-4">
              <h1 id="product-title">${title}</h1>
              <button type="button" class="favorite-button ripple-button static shrink-0" aria-label="${t('products.addWishlistAria', { name: title })}" aria-pressed="false" data-favorite-button="${product.id}">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path></svg>
              </button>
            </div>

            <div class="product-rating">
              ${Rating({ value: product.rating, label: ratingLabel })}
              <small>${t('products.reviewCount', { count: product.reviews })}</small>
              <small>${t('products.soldCount', { count: soldCount.toLocaleString() })}</small>
              <small class="product-stock-pill">${availabilityLabel}</small>
            </div>

            <div class="mt-6 flex items-end gap-3">
              <span class="product-detail-old-price">${formatCurrency(product.oldPrice)}</span>
              <strong class="product-detail-price">${formatCurrency(product.price)}</strong>
              <span class="product-detail-discount">-${product.discount}%</span>
            </div>

            <p class="mt-6 text-base leading-8 text-[#6f5f51]">${description}</p>
            <p class="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-green">${t('productDetail.origin')}: ${t('productDetail.originValue')}</p>

            <dl class="product-meta-list" aria-label="${t('productDetail.meta.title')}">
              ${metaItem(t('productDetail.meta.category'), `<a href="${categoryUrl(product)}">${escapeHtml(categoryTitle)}</a>`)}
              ${metaItem(t('productDetail.meta.brand'), escapeHtml(brandName))}
              ${metaItem(t('productDetail.meta.availability'), escapeHtml(availabilityLabel))}
              ${metaItem(t('productDetail.meta.sku'), sku)}
            </dl>

            <div class="product-tag-list" aria-label="${t('productDetail.tagsAria')}">
              ${tags.map((tag) => Tag({ children: escapeHtml(tag) })).join('')}
            </div>

            <div class="product-choice-group" data-option-group="size">
              <h2>${t('productDetail.chooseSize')}</h2>
              <div>${SIZES.map((size) => optionButton('size', size, size === product.size)).join('')}</div>
            </div>

            <div class="product-choice-group" data-option-group="sugar">
              <h2>${t('productDetail.chooseSugar')}</h2>
              <div>${SUGAR_LEVELS.map((level) => optionButton('sugar', level, level === product.sugar)).join('')}</div>
            </div>

            <div class="product-choice-group" data-option-group="ice">
              <h2>${t('productDetail.chooseIce')}</h2>
              <div>${ICE_LEVELS.map((level) => optionButton('ice', level, level === product.ice)).join('')}</div>
            </div>

            <div class="product-choice-group">
              <h2>${t('productDetail.chooseToppings')}</h2>
              <div class="product-topping-grid">${TOPPINGS.map(toppingOption).join('')}</div>
            </div>

            <div class="product-action-row">
              <div class="cart-quantity" aria-label="${t('productDetail.quantityAria')}">
                <button type="button" data-detail-quantity="decrease" aria-label="${t('productDetail.decreaseQuantity')}">-</button>
                <input
                  type="number"
                  value="1"
                  min="1"
                  max="12"
                  inputmode="numeric"
                  class="product-quantity-input"
                  data-detail-quantity-value
                  aria-label="${t('productDetail.quantityInputAria')}"
                />
                <button type="button" data-detail-quantity="increase" aria-label="${t('productDetail.increaseQuantity')}">+</button>
              </div>
              <button type="button" class="btn-primary ripple-button flex-1 product-cart-action" data-detail-add="${product.id}" data-action-label="${escapeAttribute(t('buttons.addToCart'))}" data-action-success="${escapeAttribute(t('productDetail.addedToCart'))}">${t('buttons.addToCart')}</button>
              <button type="button" class="btn-secondary ripple-button flex-1 bg-white/60 product-buy-action" data-detail-buy="${product.id}" data-action-label="${escapeAttribute(t('buttons.buyNow'))}" data-action-success="${escapeAttribute(t('productDetail.addedToCart'))}">${t('buttons.buyNow')}</button>
            </div>

            <div class="product-share" aria-label="${t('productDetail.shareAria')}">
              <span>${t('buttons.share')}</span>
              <a href="${shareUrl('facebook', product.id)}" target="_blank" rel="noopener noreferrer" aria-label="${t('productDetail.shareFacebook')}">Facebook</a>
              <a href="${shareUrl('twitter', product.id)}" target="_blank" rel="noopener noreferrer" aria-label="${t('productDetail.shareTwitter')}">X</a>
              <button type="button" class="ripple-button" data-product-share="copy" aria-label="${t('productDetail.copyLink')}">${t('productDetail.copyLinkShort')}</button>
            </div>

            <div class="product-accordions">
              ${accordion(t('productDetail.tabs.description'), description, true)}
              ${accordion(t('productDetail.tabs.ingredients'), productText(product, 'ingredients'))}
              ${accordion(t('productDetail.tabs.nutrition'), productText(product, 'nutrition'))}
              ${accordion(t('productDetail.tabs.reviews'), t('productDetail.reviewsCopy', { rating: product.rating }))}
            </div>
          </aside>
        </div>

        <section class="product-related" aria-labelledby="related-products-title" data-reveal>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('productDetail.relatedEyebrow')}</p>
              <h2 id="related-products-title" class="section-heading mt-4">${t('productDetail.relatedTitle')}</h2>
            </div>
            <a href="${categoryUrl(product)}" class="btn-secondary">${t('productDetail.viewAllProducts')}</a>
          </div>
          <div class="product-related-grid">
            ${relatedProducts.map(MenuProductCard).join('')}
          </div>
        </section>
      </div>

      <div class="mobile-product-bar" data-mobile-product-bar>
        <div>
          <span>${title}</span>
          <strong>${formatCurrency(product.price)}</strong>
        </div>
        <button type="button" class="btn-primary ripple-button product-cart-action" data-detail-add="${product.id}" data-action-label="${escapeAttribute(t('buttons.add'))}" data-action-success="${escapeAttribute(t('productDetail.addedToCart'))}">${t('buttons.add')}</button>
      </div>
    </section>
  `;
}
