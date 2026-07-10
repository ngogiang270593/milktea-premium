import { getSiteContent } from '../config/siteConfig.js';
import { CATEGORY_ICONS } from '../constants/icons.js';
import { getLanguage } from '../store/languageStore.js';
import { t } from '../utils/i18n.js';

function categoryCard(category, index) {
  const activeClass = index === 0 ? ' is-active' : '';
  const productCount = t('home.categories.productCount', { count: category.count });

  return `
    <a href="/menu?category=${category.value}" data-category="${category.value}" class="category-card ripple-button${activeClass}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="${t('home.categories.cardAria', { name: category.title, count: category.count })}">
      <span class="category-card-glow bg-gradient-to-br ${category.toneClass}" aria-hidden="true"></span>
      <span class="category-icon-wrap bg-gradient-to-br ${category.toneClass}" aria-hidden="true">
        ${CATEGORY_ICONS[category.icon]}
      </span>
      <span class="mt-7 flex flex-1 items-start justify-between gap-4">
        <span class="text-left">
          <span class="block text-xl font-bold text-[#1f1710]">${category.title}</span>
          <span class="mt-3 block text-sm leading-6 text-[#6f5f51]">${category.description}</span>
        </span>
        <span class="category-count">${category.count}</span>
      </span>
      <span class="mt-7 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">
        <span aria-hidden="true">${productCount}</span>
        <span class="category-arrow" aria-hidden="true">-&gt;</span>
      </span>
    </a>
  `;
}

export function Categories() {
  const categories = getSiteContent(getLanguage()).home.categories;

  return `
    <section id="categories" class="category-section relative overflow-hidden py-20 lg:py-24" aria-labelledby="categories-title" data-reveal>
      <div class="pointer-events-none absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-brand-mint/50 blur-3xl" aria-hidden="true"></div>
      <div class="pointer-events-none absolute right-[-8rem] bottom-10 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div class="md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${categories.eyebrow}</p>
            <h2 id="categories-title" class="section-heading mt-4">${categories.title}</h2>
            <p class="section-copy mt-4 leading-7">${categories.copy}</p>
          </div>
          <p class="mt-8 max-w-sm text-sm leading-6 text-[#7b6a5a] md:mt-0">${categories.sideCopy}</p>
        </div>

        <div class="category-scroll mt-12" role="group" aria-label="${t('home.categories.groupAria')}">
          ${categories.items.map(categoryCard).join('')}
        </div>

        <div class="mt-6 flex justify-center gap-2 md:hidden" aria-hidden="true">
          ${categories.items.map((_, index) => `<span class="category-scroll-dot${index === 0 ? ' is-active' : ''}"></span>`).join('')}
        </div>
      </div>
    </section>
  `;
}
