import { getSiteContent } from '../config/siteConfig.js';
import { getLanguage } from '../store/languageStore.js';
import { t } from '../utils/i18n.js';

export function Hero() {
  const hero = getSiteContent(getLanguage()).home.hero;

  return `
    <section id="home" class="premium-hero relative isolate overflow-hidden hero-gradient" aria-labelledby="hero-title">
      <div class="hero-orb hero-orb-mint" aria-hidden="true"></div>
      <div class="hero-orb hero-orb-gold" aria-hidden="true"></div>
      <div class="hero-orb hero-orb-peach" aria-hidden="true"></div>

      <div class="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-6 pb-20 pt-24 sm:pt-28 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div class="hero-copy max-w-2xl">
          <div class="fade-up flex flex-wrap items-center gap-3">
            <p class="inline-flex items-center rounded-full border border-white/75 bg-white/60 px-4 py-2 text-sm font-bold text-brand-green shadow-[0_16px_38px_rgba(48,35,24,0.08)] backdrop-blur-xl">
              ${hero.eyebrow}
            </p>
            <span class="hero-premium-badge">${hero.premiumBadge}</span>
          </div>

          <h1 id="hero-title" class="fade-up mt-8 max-w-3xl text-5xl font-extrabold leading-[0.92] tracking-tight text-[#1f1710] sm:text-6xl lg:text-7xl">
            ${hero.title}
          </h1>

          <p class="fade-up mt-6 max-w-xl text-base font-medium leading-8 text-[#5f5044] sm:text-lg sm:leading-9">
            ${hero.subtitle}
          </p>

          <div class="fade-up mt-5 grid gap-3 text-sm font-semibold text-[#4d4035] sm:grid-cols-2">
            <span class="hero-trust-line">${hero.trustMessage}</span>
            <span class="hero-trust-line">${hero.deliveryInfo}</span>
          </div>

          <div class="fade-up mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#order" class="ripple-button btn-primary min-h-12 px-8 shadow-[0_18px_44px_rgba(13,59,46,0.28)] focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2">${hero.primaryCta}</a>
            <a href="/menu" class="ripple-button btn-secondary min-h-12 bg-white/55 px-8 backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2">${hero.secondaryCta}</a>
          </div>

          <div class="fade-up mt-12 grid gap-4 sm:grid-cols-4" aria-label="${t('home.hero.statsAria')}">
            ${hero.stats.items.map((stat) => `
              <article class="hero-stat-card h-full">
                <strong>${stat.value}</strong>
                <span>${stat.label}</span>
              </article>
            `).join('')}
          </div>

          <div class="fade-up mt-6 flex flex-wrap items-center gap-4 rounded-[2rem] border border-white/75 bg-white/60 px-4 py-3 shadow-[0_18px_42px_rgba(48,35,24,0.08)] backdrop-blur-xl sm:inline-flex sm:rounded-full" aria-label="${t('home.hero.ratingAria')}">
            <div class="flex -space-x-2" aria-hidden="true">
              <span class="hero-avatar bg-[#0d3b2e]">A</span>
              <span class="hero-avatar bg-[#d3a86a]">M</span>
              <span class="hero-avatar bg-[#f8c3b6] text-[#4d4035]">J</span>
            </div>
            <div>
              <div class="text-sm font-semibold text-[#1f1710]">${hero.ratingTitle}</div>
              <div class="text-xs text-[#7b6a5a]">${hero.ratingMeta}</div>
            </div>
            <div class="text-brand-gold" aria-hidden="true">★★★★★</div>
          </div>
        </div>

        <div class="hero-visual relative mx-auto h-[34rem] w-full max-w-[34rem] sm:h-[40rem]" data-parallax-scene role="img" aria-label="${hero.visualAria}">
          <div class="hero-bubble hero-bubble-one" data-parallax-item data-depth="18" aria-hidden="true"></div>
          <div class="hero-bubble hero-bubble-two" data-parallax-item data-depth="-14" aria-hidden="true"></div>
          <div class="hero-bubble hero-bubble-three" data-parallax-item data-depth="10" aria-hidden="true"></div>

          <div class="floating-card topping-card topping-card-left" data-parallax-item data-depth="-10">
            <span class="topping-dot bg-[#0d3b2e]"></span>
            <div>
              <p>${hero.toppings.pearls.title}</p>
              <small>${hero.toppings.pearls.description}</small>
            </div>
          </div>

          <div class="floating-card topping-card topping-card-right" data-parallax-item data-depth="12">
            <span class="topping-dot bg-brand-gold"></span>
            <div>
              <p>${hero.toppings.cream.title}</p>
              <small>${hero.toppings.cream.description}</small>
            </div>
          </div>

          <div class="glass-panel hero-quality-card" data-parallax-item data-depth="8">
            <span>${hero.freshBatch}</span>
            <strong>${hero.freshBatchTime}</strong>
          </div>

          <div class="tea-illustration" data-parallax-item data-depth="5" aria-hidden="true">
            <div class="tea-straw"></div>
            <div class="tea-cup">
              <div class="tea-lid"></div>
              <div class="tea-cream"></div>
              <div class="tea-liquid"></div>
              <span class="pearl pearl-one"></span>
              <span class="pearl pearl-two"></span>
              <span class="pearl pearl-three"></span>
              <span class="pearl pearl-four"></span>
              <span class="pearl pearl-five"></span>
            </div>
            <div class="tea-shadow"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}
