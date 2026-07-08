import { INSTAGRAM_POSTS, TESTIMONIALS } from '../utils/constants.js';
import { imageAttributes } from '../utils/images.js';
import { t } from '../utils/i18n.js';

function testimonialCard({ name, rating }, index) {
  return `
    <article class="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div class="mb-6 text-4xl" aria-hidden="true">&ldquo;</div>
      <p class="text-gray-700">${t(`home.testimonials.items.${index}.quote`)}</p>
      <div class="mt-8 flex items-center justify-between text-sm text-gray-500">
        <span>${name}</span>
        <span class="font-semibold text-brand-green" aria-label="${t('home.testimonials.ratingAria', { rating })}">${rating} / 5</span>
      </div>
    </article>
  `;
}

function instagramImage({ src }, index) {
  const label = t(`home.instagram.items.${index}.label`);

  return `
    <figure class="group overflow-hidden rounded-[2rem] bg-gray-100 shadow-sm">
      <img ${imageAttributes(src, {
        alt: label,
        width: 800,
        height: 800,
        sizes: '(min-width: 1024px) 288px, (min-width: 640px) 45vw, 92vw',
        className: 'h-72 w-full object-cover transition duration-700 group-hover:scale-105'
      })} />
      <figcaption class="p-4 text-sm font-medium text-gray-700">${label}</figcaption>
    </figure>
  `;
}

export function Testimonials() {
  return `
    <section id="testimonials" class="mx-auto max-w-7xl px-6 py-20 lg:px-8" aria-labelledby="testimonials-title" data-reveal>
      <div class="text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('home.testimonials.eyebrow')}</p>
        <h2 id="testimonials-title" class="section-heading mt-4">${t('home.testimonials.title')}</h2>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        ${TESTIMONIALS.map(testimonialCard).join('')}
      </div>
    </section>
    <section id="instagram" class="mx-auto max-w-7xl px-6 py-20 lg:px-8" aria-labelledby="instagram-title" data-reveal>
      <div class="md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('home.instagram.eyebrow')}</p>
          <h2 id="instagram-title" class="section-heading mt-4">${t('home.instagram.title')}</h2>
        </div>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer" class="btn-secondary" aria-label="${t('home.instagram.followAria')}">${t('home.instagram.follow')}</a>
      </div>
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        ${INSTAGRAM_POSTS.map(instagramImage).join('')}
      </div>
    </section>
  `;
}
