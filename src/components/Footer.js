import { getSiteConfig, getSiteContent } from '../config/siteConfig.js';
import { getLanguage } from '../store/languageStore.js';
import { escapeAttribute, escapeHtml } from '../utils/html.js';
import { t } from '../utils/i18n.js';
import { Button, Input } from './ui/index.js';
import { LanguageSwitcher } from './LanguageSwitcher.js';
import { ThemeSwitcher } from './ThemeSwitcher.js';

const socialIcons = {
  facebook: '<path d="M14 8h2V4h-3a5 5 0 0 0-5 5v2H6v4h2v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1h1Z"></path>',
  instagram: '<rect width="14" height="14" x="5" y="5" rx="4"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"></path><path d="M17.5 6.5h.01"></path>',
  tiktok: '<path d="M14 4c.35 2.35 1.78 3.83 4 4v3c-1.5 0-2.85-.45-4-1.35V15a5 5 0 1 1-5-5c.35 0 .68.03 1 .1v3.15A2 2 0 1 0 12 15V4h2Z"></path>',
  youtube: '<path d="M22 12s0-3-1-4c-.8-.9-1.7-.9-2.1-1C16 6.8 12 6.8 12 6.8s-4 0-6.9.2c-.4.1-1.3.1-2.1 1-1 1-1 4-1 4s0 3 1 4c.8.9 1.8.9 2.2 1 1.6.2 6.8.2 6.8.2s4 0 6.9-.2c.4-.1 1.3-.1 2.1-1 1-1 1-4 1-4Z"></path><path d="m10 9.75 5 2.25-5 2.25v-4.5Z"></path>'
};

function homeHash(hash) {
  return window.location.pathname === '/' ? hash : `/${hash}`;
}

function footerLink({ label, href }) {
  return `<li><a href="${escapeAttribute(href)}" class="footer-link">${escapeHtml(label)}</a></li>`;
}

function footerSection(title, items, ariaLabel) {
  return `
    <div>
      <h2 class="footer-heading">${title}</h2>
      <nav class="mt-5" aria-label="${ariaLabel}">
        <ul class="footer-list">
          ${items.map(footerLink).join('')}
        </ul>
      </nav>
    </div>
  `;
}

function socialLink([name, href]) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return `
    <a
      href="${escapeAttribute(href)}"
      class="footer-social-link"
      target="_blank"
      rel="noreferrer"
      aria-label="${t('footer.socialAria', { name: label })}"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        ${socialIcons[name] || ''}
      </svg>
    </a>
  `;
}

function paymentBadge(payment) {
  return `
    <li class="footer-payment" aria-label="${t('footer.paymentAria', { name: payment.label })}">
      ${escapeHtml(payment.label)}
    </li>
  `;
}

export function Footer() {
  const language = getLanguage();
  const siteConfig = getSiteConfig();
  const footer = getSiteContent(language).footer;
  const phoneHref = siteConfig.business.phone.replace(/[^\d+]/g, '');
  const quickLinks = [
    { label: t('footer.links.home'), href: '/' },
    { label: t('footer.links.menu'), href: '/menu' },
    { label: t('footer.links.categories'), href: homeHash('#categories') },
    { label: t('footer.links.featured'), href: homeHash('#featured') },
    { label: t('footer.links.testimonials'), href: homeHash('#testimonials') },
    { label: t('footer.links.newsletter'), href: homeHash('#newsletter') },
    { label: t('footer.links.about'), href: '/about' },
    { label: t('footer.links.contact'), href: '/contact' },
    { label: t('footer.links.faq'), href: homeHash('#testimonials') }
  ];
  const serviceLinks = [
    { label: t('footer.service.shipping'), href: '/checkout' },
    { label: t('footer.service.returns'), href: '/cart' },
    { label: t('footer.service.privacy'), href: '#' },
    { label: t('footer.service.terms'), href: '#' },
    { label: t('footer.service.help'), href: 'mailto:' + siteConfig.business.email }
  ];

  return `
    <footer class="site-footer" aria-label="${t('footer.label')}">
      <div class="footer-container">
        <div class="footer-main">
          <section class="footer-brand" aria-labelledby="footer-brand-title">
            <a href="/" class="footer-logo" aria-label="${escapeAttribute(siteConfig.brand.name)}">
              <span>${escapeHtml(siteConfig.brand.logoText)}</span>
              <strong id="footer-brand-title">${escapeHtml(siteConfig.brand.name)}</strong>
            </a>
            <p>${footer.description}</p>
            <p class="footer-mission">${footer.mission}</p>
            <div class="footer-socials" aria-label="${t('footer.social')}">
              ${Object.entries(siteConfig.social).map(socialLink).join('')}
            </div>
          </section>

          ${footerSection(t('footer.quickLinks'), quickLinks, t('footer.navigation'))}
          ${footerSection(t('footer.customerService'), serviceLinks, t('footer.customerService'))}

          <section class="footer-contact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" class="footer-heading">${t('footer.contact')}</h2>
            <address class="footer-address">
              <span>${escapeHtml(siteConfig.business.address[language])}</span>
              <a href="tel:${escapeAttribute(phoneHref)}">${escapeHtml(siteConfig.business.phone)}</a>
              <a href="mailto:${escapeAttribute(siteConfig.business.email)}">${escapeHtml(siteConfig.business.email)}</a>
              <span>${escapeHtml(siteConfig.business.openingHours[language])}</span>
              <a href="${escapeAttribute(siteConfig.business.mapUrl)}" target="_blank" rel="noreferrer">${t('footer.googleMaps')}</a>
            </address>
          </section>
        </div>

        <div class="footer-commerce">
          <section class="footer-newsletter" aria-labelledby="footer-newsletter-title">
            <div>
              <h2 id="footer-newsletter-title" class="footer-heading">${t('footer.newsletter')}</h2>
              <p>${t('footer.newsletterCopy')}</p>
            </div>
            <form class="footer-newsletter-form" data-newsletter-form novalidate aria-label="${t('footer.newsletter')}">
              <label class="sr-only" for="footer-newsletter-email">${t('footer.emailLabel')}</label>
              ${Input({
                id: 'footer-newsletter-email',
                name: 'footer-newsletter-email',
                type: 'email',
                placeholder: t('footer.emailPlaceholder'),
                autocomplete: 'email',
                required: true,
                className: 'footer-newsletter-input',
                attributes: {
                  'data-newsletter-email': '',
                  'aria-describedby': 'footer-newsletter-message'
                }
              })}
              ${Button({
                type: 'submit',
                className: 'footer-newsletter-button',
                children: t('footer.subscribe')
              })}
              <p id="footer-newsletter-message" class="newsletter-message footer-newsletter-message" data-newsletter-message aria-live="polite"></p>
            </form>
          </section>

          <section class="footer-payments" aria-labelledby="footer-payment-title">
            <h2 id="footer-payment-title" class="footer-heading">${t('footer.payment')}</h2>
            <ul>
              ${siteConfig.payments.map(paymentBadge).join('')}
            </ul>
          </section>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ${escapeHtml(siteConfig.brand.name)}. ${footer.copyright}</p>
          <div class="footer-controls" aria-label="${t('footer.languageTheme')}">
            ${LanguageSwitcher()}
            ${ThemeSwitcher()}
            <a href="#" class="footer-back-top ripple-button">${t('footer.backToTop')}</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
