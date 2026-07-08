import { t } from '../utils/i18n.js';

export function Newsletter() {
  return `
    <section id="newsletter" class="mx-auto max-w-7xl px-6 py-20 lg:px-8" aria-labelledby="newsletter-title" data-reveal>
      <div class="glass-panel rounded-[2rem] border border-brand-green/15 p-8 sm:p-14">
        <div class="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p class="text-sm font-bold uppercase tracking-[0.3em] text-brand-green">${t('home.newsletter.eyebrow')}</p>
            <h2 id="newsletter-title" class="section-heading mt-4">${t('home.newsletter.title')}</h2>
            <p class="section-copy mt-4 leading-7 text-gray-600">${t('home.newsletter.copy')}</p>
          </div>
          <form class="space-y-5 rounded-3xl bg-white p-6 shadow-[0_18px_44px_rgba(48,35,24,0.08)]" aria-label="${t('home.newsletter.formAria')}">
            <label for="newsletter-email" class="block text-sm font-semibold text-gray-700">${t('home.newsletter.emailLabel')}</label>
            <input id="newsletter-email" name="email" type="email" autocomplete="email" placeholder="${t('home.newsletter.placeholder')}" required aria-required="true" class="w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-medium text-gray-800 outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-mint/50" />
            <button type="submit" class="ripple-button btn-primary min-h-12 w-full shadow-[0_16px_36px_rgba(13,59,46,0.2)] focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2">${t('home.newsletter.submit')}</button>
          </form>
        </div>
      </div>
    </section>
  `;
}
