import { t } from '../utils/i18n.js';

export function Newsletter() {
  return `
    <section id="newsletter" class="mx-auto max-w-7xl px-6 py-20 lg:px-8" aria-labelledby="newsletter-title" data-reveal>
      <div class="glass-panel rounded-[2rem] border border-brand-green/15 p-8 sm:p-14">
        <div class="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('home.newsletter.eyebrow')}</p>
            <h2 id="newsletter-title" class="section-heading mt-4">${t('home.newsletter.title')}</h2>
            <p class="section-copy mt-4 text-gray-600">${t('home.newsletter.copy')}</p>
          </div>
          <form class="space-y-4 rounded-3xl bg-white p-6 shadow-sm" aria-label="${t('home.newsletter.formAria')}">
            <label for="newsletter-email" class="block text-sm font-semibold text-gray-700">${t('home.newsletter.emailLabel')}</label>
            <input id="newsletter-email" name="email" type="email" autocomplete="email" placeholder="${t('home.newsletter.placeholder')}" required class="w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-mint/50" />
            <button type="submit" class="btn-primary w-full">${t('home.newsletter.submit')}</button>
          </form>
        </div>
      </div>
    </section>
  `;
}
