import { getSiteContent } from '../config/siteConfig.js';
import { Button } from './ui/Button.js';
import { Card } from './ui/Card.js';
import { Input } from './ui/Input.js';
import { getLanguage } from '../store/languageStore.js';
import { t } from '../utils/i18n.js';

export function Newsletter() {
  const newsletter = getSiteContent(getLanguage()).home.newsletter;

  return `
    <section id="newsletter" class="mx-auto max-w-7xl px-6 py-20 lg:px-8" aria-labelledby="newsletter-title" data-reveal>
      <div class="glass-panel rounded-[2rem] border border-brand-green/15 p-8 sm:p-14">
        <div class="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p class="text-sm font-bold uppercase tracking-[0.3em] text-brand-green">${newsletter.eyebrow}</p>
            <h2 id="newsletter-title" class="section-heading mt-4">${newsletter.title}</h2>
            <p class="section-copy mt-4 leading-7 text-gray-600">${newsletter.copy}</p>
            <ul class="newsletter-benefits" aria-label="${t('home.newsletter.benefitsAria')}">
              ${newsletter.benefits.map((benefit) => `<li>${benefit}</li>`).join('')}
            </ul>
          </div>
          ${Card({
            as: 'form',
            className: 'space-y-5 rounded-3xl border-0 bg-white p-6 shadow-[0_18px_44px_rgba(48,35,24,0.08)]',
            attributes: {
              'aria-label': t('home.newsletter.formAria'),
              'data-newsletter-form': ''
            },
            children: `
              <label for="newsletter-email" class="block text-sm font-semibold text-gray-700">${t('home.newsletter.emailLabel')}</label>
              ${Input({
                id: 'newsletter-email',
                name: 'email',
                type: 'email',
                autocomplete: 'email',
                placeholder: newsletter.placeholder,
                required: true,
                attributes: {
                  'data-newsletter-email': '',
                  'aria-describedby': 'newsletter-message'
                }
              })}
              <p id="newsletter-message" class="newsletter-message" data-newsletter-message aria-live="polite"></p>
              ${Button({
                type: 'submit',
                className: 'min-h-12 w-full shadow-[0_16px_36px_rgba(13,59,46,0.2)] focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2',
                children: t('home.newsletter.submit')
              })}
            `
          })}
        </div>
      </div>
    </section>
  `;
}
