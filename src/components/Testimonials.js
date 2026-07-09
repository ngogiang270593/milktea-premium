import { getSiteConfig, getSiteContent } from '../config/siteConfig.js';
import { getLanguage } from '../store/languageStore.js';
import { imageAttributes } from '../utils/image.js';
import { t } from '../utils/i18n.js';

function testimonialCard({ name, quote, rating }) {
  const initials = name
    .split(' ')
    .map((part) => part.at(0))
    .join('')
    .slice(0, 2);

  return `
    <article class="testimonial-card rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div class="mb-6 text-5xl leading-none text-brand-gold" aria-hidden="true">&ldquo;</div>
      <p class="text-base leading-8 text-gray-700">${quote}</p>
      <div class="mt-8 flex items-center justify-between gap-4 text-sm text-gray-500">
        <span class="flex min-w-0 items-center gap-3">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-mint/70 text-sm font-extrabold text-brand-green" aria-hidden="true">${initials}</span>
          <span class="truncate font-semibold text-gray-700">${name}</span>
        </span>
        <span class="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-mint/60 px-3 py-1 font-bold text-brand-green" aria-label="${t('home.testimonials.ratingAria', { rating })}">
          <span aria-hidden="true">★</span>
          ${rating}
        </span>
      </div>
    </article>
  `;
}

function instagramImage({ label, src }) {
  return `
    <figure class="group overflow-hidden rounded-[2rem] bg-gray-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <img ${imageAttributes(src, {
        alt: label,
        width: 800,
        height: 800,
        sizes: '(min-width: 1024px) 288px, (min-width: 640px) 45vw, 92vw',
        className: 'h-72 w-full object-cover transition duration-700 group-hover:scale-105'
      })} />
      <figcaption class="p-4 text-sm font-semibold leading-6 text-gray-700">${label}</figcaption>
    </figure>
  `;
}

export function Testimonials() {
  const siteConfig = getSiteConfig();
  const { testimonials, instagram } = getSiteContent(getLanguage()).home;

  return `
    <section id="testimonials" class="mx-auto max-w-7xl px-6 py-20 lg:px-8" aria-labelledby="testimonials-title" data-reveal>
      <div class="text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${testimonials.eyebrow}</p>
        <h2 id="testimonials-title" class="section-heading mt-4">${testimonials.title}</h2>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        ${testimonials.items.map(testimonialCard).join('')}
      </div>
    </section>
    <section id="instagram" class="mx-auto max-w-7xl px-6 py-20 lg:px-8" aria-labelledby="instagram-title" data-reveal>
      <div class="md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${instagram.eyebrow}</p>
          <h2 id="instagram-title" class="section-heading mt-4">${instagram.title}</h2>
        </div>
        <a href="${siteConfig.social.instagram}" target="_blank" rel="noreferrer" class="btn-secondary mt-6 min-h-12 px-8 focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2 md:mt-0" aria-label="${instagram.followAria}">${instagram.follow}</a>
      </div>
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        ${instagram.items.map(instagramImage).join('')}
      </div>
    </section>
  `;
}
