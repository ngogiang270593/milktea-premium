import { CATEGORIES } from '../utils/constants.js';

const icons = {
  MilkTea: `<svg viewBox="0 0 24 24" class="category-icon h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M7 7h10l-1 12a2 2 0 0 1-2 1.8h-4A2 2 0 0 1 8 19L7 7Z"></path><path d="M6 7h12"></path><path d="M9 3h6"></path><path d="M10 15h.01M13 17h.01M15 14h.01"></path></svg>`,
  FruitTea: `<svg viewBox="0 0 24 24" class="category-icon h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 8c4 0 7 3 7 7a7 7 0 0 1-14 0c0-4 3-7 7-7Z"></path><path d="M12 8c0-2 1-4 4-5"></path><path d="M8 6c2 0 4 .6 4 2"></path><path d="M10 13h.01M14 16h.01M9 17h.01"></path></svg>`,
  Coffee: `<svg viewBox="0 0 24 24" class="category-icon h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z"></path><path d="M16 10h1a3 3 0 0 1 0 6h-1"></path><path d="M8 4v2M12 4v2"></path></svg>`,
  Smoothie: `<svg viewBox="0 0 24 24" class="category-icon h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m9 3 2 5"></path><path d="M7 8h10l-1.2 11a2 2 0 0 1-2 1.8H10.2a2 2 0 0 1-2-1.8L7 8Z"></path><path d="M8 12h8"></path><path d="M10 16h.01M14 18h.01"></path></svg>`,
  Cake: `<svg viewBox="0 0 24 24" class="category-icon h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 11h16v8H4v-8Z"></path><path d="M4 15h16"></path><path d="M8 11V8a2 2 0 1 1 4 0v3"></path><path d="M15 11V7"></path><path d="M14 7h2"></path></svg>`,
  Topping: `<svg viewBox="0 0 24 24" class="category-icon h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="8" cy="9" r="3"></circle><circle cx="15" cy="14" r="4"></circle><path d="M7 18h.01M18 7h.01M12 4h.01"></path></svg>`
};

function categoryCard(category, index) {
  const activeClass = index === 0 ? ' is-active' : '';
  return `
    <button type="button" data-category="${category.value}" class="category-card ripple-button${activeClass}" aria-pressed="${index === 0}">
      <span class="category-card-glow bg-gradient-to-br ${category.toneClass}" aria-hidden="true"></span>
      <span class="category-icon-wrap bg-gradient-to-br ${category.toneClass}" aria-hidden="true">
        ${icons[category.icon]}
      </span>
      <span class="mt-7 flex items-start justify-between gap-4">
        <span class="text-left">
          <span class="block text-xl font-semibold text-[#1f1710]">${category.label}</span>
          <span class="mt-2 block text-sm leading-6 text-[#7b6a5a]">${category.description}</span>
        </span>
        <span class="category-count">${category.count}</span>
      </span>
      <span class="mt-7 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">
        <span>${category.count} products</span>
        <span class="category-arrow" aria-hidden="true">-&gt;</span>
      </span>
    </button>
  `;
}

export function Categories() {
  return `
    <section id="categories" class="category-section relative overflow-hidden py-20 lg:py-24">
      <div class="pointer-events-none absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-brand-mint/50 blur-3xl" aria-hidden="true"></div>
      <div class="pointer-events-none absolute right-[-8rem] bottom-10 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div class="md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Shop by category</p>
            <h2 class="section-heading mt-4">Choose your next premium treat.</h2>
            <p class="section-copy mt-4">Swipe, tap, or browse our signature families crafted for milk tea lovers, coffee guests, and dessert pairings.</p>
          </div>
          <p class="mt-8 max-w-sm text-sm leading-6 text-[#7b6a5a] md:mt-0">Interactive category cards highlight product depth and make mobile discovery feel as smooth as the first sip.</p>
        </div>

        <div class="category-scroll mt-12" aria-label="Product categories">
          ${CATEGORIES.map(categoryCard).join('')}
        </div>

        <div class="mt-6 flex justify-center gap-2 md:hidden" aria-hidden="true">
          ${CATEGORIES.map((_, index) => `<span class="category-scroll-dot${index === 0 ? ' is-active' : ''}"></span>`).join('')}
        </div>
      </div>
    </section>
  `;
}
