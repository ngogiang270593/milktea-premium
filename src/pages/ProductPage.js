import { getProductById } from '../data/products.js';
import { formatCategoryName, formatCurrency } from '../utils/format.js';

const SIZES = ['Regular', 'Large'];
const SUGAR_LEVELS = ['0%', '30%', '50%', '70%', '100%'];
const ICE_LEVELS = ['No ice', 'Less ice', 'Regular ice'];
const TOPPINGS = ['Brown sugar pearls', 'Crystal boba', 'Cream foam', 'Aloe jelly', 'Pudding'];

function optionButton(name, value, active = false) {
  return `
    <button type="button" class="product-option${active ? ' is-active' : ''}" data-product-option="${name}" data-option-value="${value}" aria-pressed="${active}">
      ${value}
    </button>
  `;
}

function toppingOption(value) {
  return `
    <label class="product-topping">
      <input type="checkbox" value="${value}" data-product-topping />
      <span>${value}</span>
    </label>
  `;
}

function accordion(title, content, open = false) {
  return `
    <details class="product-accordion" ${open ? 'open' : ''}>
      <summary>${title}</summary>
      <p>${content}</p>
    </details>
  `;
}

function notFound() {
  return `
    <section class="product-page" aria-labelledby="product-title">
      <div class="product-container">
        <div class="cart-empty">
          <h1 id="product-title" class="text-3xl font-semibold text-[#1f1710]">Product not found</h1>
          <p>The item you are looking for is no longer on the menu.</p>
          <a href="/menu" class="btn-primary">Back to Menu</a>
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
  const title = product.name || product.title;

  return `
    <section class="product-page" aria-labelledby="product-title" data-product-detail="${product.id}">
      <div class="product-container">
        <nav class="menu-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li aria-current="page">${title}</li>
          </ol>
        </nav>

        <div class="product-detail-layout">
          <section class="product-gallery" aria-label="${title} gallery" data-reveal>
            <div class="product-main-image" data-product-zoom>
              <img src="${gallery[0]}" alt="${title}" width="1000" height="1000" decoding="async" data-gallery-main />
            </div>
            <div class="product-thumbnails" aria-label="Product images">
              ${gallery.map((image, index) => `
                <button type="button" class="${index === 0 ? 'is-active' : ''}" data-gallery-thumb="${image}" aria-label="View image ${index + 1}">
                  <img src="${image}" alt="" loading="lazy" decoding="async" width="120" height="120" />
                </button>
              `).join('')}
            </div>
          </section>

          <aside class="product-info" data-reveal>
            <p class="menu-product-category">${formatCategoryName(product.category)}</p>
            <div class="mt-4 flex items-start justify-between gap-4">
              <h1 id="product-title">${title}</h1>
              <button type="button" class="favorite-button ripple-button static shrink-0" aria-label="Add ${title} to favorites" aria-pressed="false" data-favorite-button>
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path></svg>
              </button>
            </div>

            <div class="product-rating" aria-label="${product.rating} out of 5 stars from ${product.reviews} reviews">
              <span aria-hidden="true">★★★★★</span>
              <strong>${product.rating}</strong>
              <small>${product.reviews} reviews</small>
            </div>

            <div class="mt-6 flex items-end gap-3">
              <strong class="text-4xl font-semibold text-brand-green">${formatCurrency(product.price)}</strong>
              <span class="pb-1 text-lg text-[#a39080] line-through">${formatCurrency(product.oldPrice)}</span>
              <span class="product-detail-discount">-${product.discount}%</span>
            </div>

            <p class="mt-6 text-base leading-8 text-[#6f5f51]">${product.description}</p>

            <div class="product-choice-group" data-option-group="size">
              <h2>Choose size</h2>
              <div>${SIZES.map((size) => optionButton('size', size, size === product.size)).join('')}</div>
            </div>

            <div class="product-choice-group" data-option-group="sugar">
              <h2>Choose sugar level</h2>
              <div>${SUGAR_LEVELS.map((level) => optionButton('sugar', level, level === product.sugar)).join('')}</div>
            </div>

            <div class="product-choice-group" data-option-group="ice">
              <h2>Choose ice level</h2>
              <div>${ICE_LEVELS.map((level) => optionButton('ice', level, level === product.ice)).join('')}</div>
            </div>

            <div class="product-choice-group">
              <h2>Choose toppings</h2>
              <div class="product-topping-grid">${TOPPINGS.map(toppingOption).join('')}</div>
            </div>

            <div class="product-action-row">
              <div class="cart-quantity" aria-label="Product quantity">
                <button type="button" data-detail-quantity="decrease" aria-label="Decrease quantity">-</button>
                <output data-detail-quantity-value aria-live="polite">1</output>
                <button type="button" data-detail-quantity="increase" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="btn-primary ripple-button flex-1" data-detail-add="${product.id}">Add to Cart</button>
              <button type="button" class="btn-secondary ripple-button flex-1 bg-white/60" data-detail-buy="${product.id}">Buy Now</button>
            </div>

            <div class="product-accordions">
              ${accordion('Description', product.description, true)}
              ${accordion('Ingredients', 'Fresh brewed tea, milk or oat milk, house syrup, premium toppings, and filtered ice. Ingredients may vary by selected options.')}
              ${accordion('Nutrition', 'Estimated 180-420 calories depending on size, sugar level, milk choice, and toppings. Ask our team for allergen guidance.')}
              ${accordion('Reviews', `Customers rate this ${product.rating}/5 for balanced sweetness, texture, and premium presentation.`)}
            </div>
          </aside>
        </div>
      </div>

      <div class="mobile-product-bar" data-mobile-product-bar>
        <div>
          <span>${title}</span>
          <strong>${formatCurrency(product.price)}</strong>
        </div>
        <button type="button" class="btn-primary ripple-button" data-detail-add="${product.id}">Add</button>
      </div>
    </section>
  `;
}
