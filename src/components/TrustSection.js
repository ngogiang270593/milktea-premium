import { t } from '../utils/i18n.js';

const icons = {
  fresh: '<path d="M12 21c5-3 8-7 8-12a5 5 0 0 0-8-4 5 5 0 0 0-8 4c0 5 3 9 8 12Z"></path>',
  tea: '<path d="M6 7h12l-1 9a4 4 0 0 1-4 3h-2a4 4 0 0 1-4-3L6 7Z"></path><path d="M8 3h8M9 11h6"></path>',
  delivery: '<path d="M4 7h10v8H4z"></path><path d="M14 10h3l3 3v2h-6z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>',
  craft: '<path d="M12 3v18M6 8h12M7 15h10"></path><path d="M8 3h8l1 5H7z"></path>'
};

function trustCard(item) {
  return `
    <article class="trust-card" tabindex="0">
      <span class="trust-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${icons[item.icon]}</svg>
      </span>
      <h3>${item.title}</h3>
      <p>${item.copy}</p>
    </article>
  `;
}

export function TrustSection() {
  const items = t('home.trust.items');

  return `
    <section class="trust-section" aria-labelledby="trust-title" data-reveal>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('home.trust.eyebrow')}</p>
          <h2 id="trust-title" class="section-heading mt-4">${t('home.trust.title')}</h2>
          <p class="section-copy mt-4 leading-7">${t('home.trust.copy')}</p>
        </div>
        <div class="trust-grid">
          ${items.map(trustCard).join('')}
        </div>
      </div>
    </section>
  `;
}
