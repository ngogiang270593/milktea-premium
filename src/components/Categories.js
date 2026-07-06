import { CATEGORY_PRODUCTS } from '../data/products.js';
import { CATEGORIES } from '../utils/constants.js';

const icons = {
  Cup: `<svg viewBox="0 0 24 24" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h10v7a5 5 0 0 1-10 0V7Z"></path><path d="M16 9h1a3 3 0 0 1 0 6h-1"></path><path d="M5 20h12"></path><path d="M8 4h6"></path></svg>`,
  Berry: `<svg viewBox="0 0 24 24" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 8c4 0 7 3 7 7a7 7 0 0 1-14 0c0-4 3-7 7-7Z"></path><path d="M12 8c0-2 1-4 4-5"></path><path d="M8 6c2 0 4 .6 4 2"></path><path d="M10 13h.01M14 16h.01M9 17h.01"></path></svg>`,
  Leaf: `<svg viewBox="0 0 24 24" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19c9 0 14-5 14-14-9 0-14 5-14 14Z"></path><path d="M5 19 19 5"></path></svg>`,
  Sparkle: `<svg viewBox="0 0 24 24" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l1.7 5.1L19 10l-5.3 1.9L12 17l-1.7-5.1L5 10l5.3-1.9L12 3Z"></path><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"></path></svg>`
};

function categoryButton({ label, value }) {
  const activeClass = value === 'all' ? ' bg-brand-green text-white' : '';
  return `<button data-category="${value}" class="category-btn btn-secondary${activeClass}">${label}</button>`;
}

function categoryCard(product) {
  return `
    <article data-product-category="${product.category}" class="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div class="inline-flex h-20 w-20 items-center justify-center rounded-3xl ${product.swatchClass}">${icons[product.icon]}</div>
      <h3 class="mt-6 text-xl font-semibold text-gray-950">${product.title}</h3>
      <p class="mt-3 text-sm text-gray-600">${product.description}</p>
    </article>
  `;
}

export function Categories() {
  return `
    <section id="categories" class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div class="md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Shop by category</p>
          <h2 class="section-heading mt-4">Find your next favorite bubble tea.</h2>
          <p class="section-copy mt-4">Explore crisp matcha, rich chocolate, floral teas, and indulgent milk blends made to elevate every sip.</p>
        </div>
        <div class="mt-8 flex flex-wrap gap-3 md:mt-0">
          ${CATEGORIES.map(categoryButton).join('')}
        </div>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        ${CATEGORY_PRODUCTS.map(categoryCard).join('')}
      </div>
    </section>
  `;
}
