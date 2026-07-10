import { getSiteContent } from '../config/siteConfig.js';
import { getLanguage } from '../store/languageStore.js';

export function Promotion() {
  const promotion = getSiteContent(getLanguage()).home.promotion;

  return `
    <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8" aria-labelledby="promotion-title" data-reveal>
      <div class="promotion-banner glass-panel relative overflow-hidden grid gap-8 rounded-[2rem] border border-brand-green/15 p-8 text-center sm:grid-cols-[1fr_auto] sm:items-center sm:p-10 sm:text-left lg:p-12">
        <div class="promotion-glow" aria-hidden="true"></div>
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.3em] text-brand-green">${promotion.eyebrow}</p>
          <h2 id="promotion-title" class="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-gray-950 md:text-4xl">${promotion.title}</h2>
          <p class="mt-4 max-w-2xl text-base leading-7 text-gray-600">${promotion.copy}</p>
          <p class="mt-5 inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-brand-green">${promotion.note}</p>
        </div>
        <div class="flex items-center justify-center">
          <a href="#order" class="ripple-button btn-primary min-h-12 px-8 shadow-[0_18px_44px_rgba(13,59,46,0.22)] focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2">${promotion.cta}</a>
        </div>
      </div>
    </section>
  `;
}
