import { t } from '../utils/i18n.js';

export function Promotion() {
  return `
    <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8" aria-labelledby="promotion-title" data-reveal>
      <div class="glass-panel grid gap-8 rounded-[2rem] border border-brand-green/15 p-8 text-center sm:grid-cols-[1fr_auto] sm:p-10 sm:text-left">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('home.promotion.eyebrow')}</p>
          <h2 id="promotion-title" class="mt-4 text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">${t('home.promotion.title')}</h2>
          <p class="mt-4 max-w-2xl text-gray-600">${t('home.promotion.copy')}</p>
        </div>
        <div class="flex items-center justify-center">
          <a href="#order" class="btn-primary">${t('home.promotion.cta')}</a>
        </div>
      </div>
    </section>
  `;
}
