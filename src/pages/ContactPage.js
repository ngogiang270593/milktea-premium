import { getSiteConfig } from '../config/siteConfig.js';
import { getLanguage } from '../store/languageStore.js';
import { escapeAttribute, escapeHtml } from '../utils/html.js';
import { t } from '../utils/i18n.js';
import { Badge } from '../components/ui/Badge.js';
import { Button } from '../components/ui/Button.js';
import { Card } from '../components/ui/Card.js';
import { Input } from '../components/ui/Input.js';
import { Textarea } from '../components/ui/Textarea.js';

const socialIcons = {
  facebook: '<path d="M14 8h2V4h-3a5 5 0 0 0-5 5v2H6v4h2v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1h1Z"></path>',
  instagram: '<rect width="14" height="14" x="5" y="5" rx="4"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"></path><path d="M17.5 6.5h.01"></path>',
  tiktok: '<path d="M14 4c.35 2.35 1.78 3.83 4 4v3c-1.5 0-2.85-.45-4-1.35V15a5 5 0 1 1-5-5c.35 0 .68.03 1 .1v3.15A2 2 0 1 0 12 15V4h2Z"></path>',
  youtube: '<path d="M22 12s0-3-1-4c-.8-.9-1.7-.9-2.1-1C16 6.8 12 6.8 12 6.8s-4 0-6.9.2c-.4.1-1.3.1-2.1 1-1 1-1 4-1 4s0 3 1 4c.8.9 1.8.9 2.2 1 1.6.2 6.8.2 6.8.2s4 0 6.9-.2c.4-.1 1.3-.1 2.1-1 1-1 1-4 1-4Z"></path><path d="m10 9.75 5 2.25-5 2.25v-4.5Z"></path>'
};

function field({ id, label, type = 'text', placeholder, autocomplete, validate, required = true }) {
  return `
    <label class="contact-field" for="${id}">
      <span>${label}</span>
      ${Input({
        id,
        name: id,
        type,
        placeholder,
        autocomplete,
        required,
        attributes: {
          'data-contact-field': validate,
          'data-required': String(required),
          'aria-describedby': `${id}-error`
        }
      })}
      <small id="${id}-error" data-field-error hidden></small>
    </label>
  `;
}

function contactMethod({ title, value, href, icon }) {
  return Card({
    as: 'li',
    className: 'contact-method-card',
    children: `
      <span class="contact-method-icon" aria-hidden="true">${icon}</span>
      <div>
        <h3>${escapeHtml(title)}</h3>
        ${href ? `<a href="${escapeAttribute(href)}">${escapeHtml(value)}</a>` : `<p>${escapeHtml(value)}</p>`}
      </div>
    `
  });
}

function socialLink([name, href]) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return `
    <a href="${escapeAttribute(href)}" class="contact-social-link" target="_blank" rel="noreferrer" aria-label="${t('footer.socialAria', { name: label })}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        ${socialIcons[name] || ''}
      </svg>
    </a>
  `;
}

function faqShortcut(item) {
  return `
    <a href="${escapeAttribute(item.href)}" class="contact-faq-link">
      <span>${escapeHtml(item.title)}</span>
      <small>${escapeHtml(item.copy)}</small>
    </a>
  `;
}

export function ContactPage() {
  const siteConfig = getSiteConfig();
  const language = getLanguage();
  const contact = t('contact');
  const phoneHref = siteConfig.business.phone.replace(/[^\d+]/g, '');
  const mapQuery = encodeURIComponent(siteConfig.business.address[language]);
  const methods = [
    {
      title: contact.details.hotline,
      value: siteConfig.business.phone,
      href: `tel:${phoneHref}`,
      icon: '☎'
    },
    {
      title: contact.details.email,
      value: siteConfig.business.email,
      href: `mailto:${siteConfig.business.email}`,
      icon: '@'
    },
    {
      title: contact.details.address,
      value: siteConfig.business.address[language],
      href: siteConfig.business.mapUrl,
      icon: '⌖'
    },
    {
      title: contact.details.hours,
      value: siteConfig.business.openingHours[language],
      icon: '◷'
    }
  ];

  return `
    <article class="contact-page" aria-labelledby="contact-title">
      <section class="contact-hero" data-reveal>
        <div class="contact-container contact-hero-grid">
          <div>
            ${Badge({ children: contact.hero.badge, tone: 'gold', className: 'mb-6' })}
            <p class="about-eyebrow">${escapeHtml(siteConfig.brand.name)}</p>
            <h1 id="contact-title">${escapeHtml(contact.hero.title)}</h1>
            <p class="contact-lead">${escapeHtml(contact.hero.subtitle)}</p>
          </div>
          <div class="contact-hero-card glass-panel" aria-label="${escapeAttribute(contact.details.title)}">
            <span>${escapeHtml(siteConfig.brand.logoText)}</span>
            <h2>${escapeHtml(contact.hero.cardTitle)}</h2>
            <p>${escapeHtml(contact.hero.cardCopy)}</p>
            ${Button({ href: '/menu', children: contact.hero.cta, className: 'mt-6 min-h-12 px-8' })}
          </div>
        </div>
      </section>

      <section class="contact-section" aria-labelledby="contact-form-title">
        <div class="contact-container contact-layout">
          <form class="contact-form-panel" data-contact-form novalidate aria-labelledby="contact-form-title">
            <div>
              <p class="about-eyebrow">${escapeHtml(contact.form.eyebrow)}</p>
              <h2 id="contact-form-title">${escapeHtml(contact.form.title)}</h2>
              <p>${escapeHtml(contact.form.copy)}</p>
            </div>

            <div class="contact-form-grid">
              ${field({ id: 'contact-name', label: contact.form.name, placeholder: contact.form.namePlaceholder, autocomplete: 'name', validate: 'name' })}
              ${field({ id: 'contact-email', label: contact.form.email, type: 'email', placeholder: contact.form.emailPlaceholder, autocomplete: 'email', validate: 'email' })}
              ${field({ id: 'contact-phone', label: contact.form.phone, type: 'tel', placeholder: contact.form.phonePlaceholder, autocomplete: 'tel', validate: 'phone' })}
              ${field({ id: 'contact-subject', label: contact.form.subject, placeholder: contact.form.subjectPlaceholder, validate: 'subject' })}
            </div>

            <label class="contact-field" for="contact-message">
              <span>${escapeHtml(contact.form.message)}</span>
              ${Textarea({
                id: 'contact-message',
                name: 'contact-message',
                rows: 5,
                placeholder: contact.form.messagePlaceholder,
                attributes: {
                  'data-contact-field': 'message',
                  'data-required': 'true',
                  'aria-describedby': 'contact-message-error'
                }
              })}
              <small id="contact-message-error" data-field-error hidden></small>
            </label>

            <div class="contact-submit-row">
              ${Button({
                type: 'submit',
                children: contact.form.submit,
                className: 'min-h-12 px-8',
                attributes: { 'data-contact-submit': '' }
              })}
              <p data-contact-message class="contact-form-message" aria-live="polite"></p>
            </div>
          </form>

          <aside class="contact-info-panel" aria-labelledby="contact-info-title">
            <p class="about-eyebrow">${escapeHtml(contact.details.eyebrow)}</p>
            <h2 id="contact-info-title">${escapeHtml(contact.details.title)}</h2>
            <ul class="contact-method-list">
              ${methods.map(contactMethod).join('')}
            </ul>
            <div class="contact-socials" aria-label="${t('footer.social')}">
              ${Object.entries(siteConfig.social).map(socialLink).join('')}
            </div>
          </aside>
        </div>
      </section>

      <section class="contact-section" aria-labelledby="contact-map-title" data-reveal>
        <div class="contact-container contact-map-grid">
          <div>
            <p class="about-eyebrow">${escapeHtml(contact.map.eyebrow)}</p>
            <h2 id="contact-map-title" class="section-heading">${escapeHtml(contact.map.title)}</h2>
            <p class="section-copy mt-4">${escapeHtml(contact.map.copy)}</p>
            <a href="${escapeAttribute(siteConfig.business.mapUrl)}" target="_blank" rel="noreferrer" class="btn-secondary mt-6 min-h-12 px-8">${t('footer.googleMaps')}</a>
          </div>
          <div class="contact-map-frame">
            <iframe
              title="${escapeAttribute(contact.map.title)}"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=${mapQuery}&output=embed"
            ></iframe>
          </div>
        </div>
      </section>

      <section class="contact-section contact-faq-section" aria-labelledby="contact-faq-title" data-reveal>
        <div class="contact-container">
          <div class="about-section-heading">
            <p class="about-eyebrow">${escapeHtml(contact.faq.eyebrow)}</p>
            <h2 id="contact-faq-title" class="section-heading">${escapeHtml(contact.faq.title)}</h2>
            <p class="section-copy">${escapeHtml(contact.faq.copy)}</p>
          </div>
          <div class="contact-faq-grid">
            ${contact.faq.items.map(faqShortcut).join('')}
          </div>
        </div>
      </section>
    </article>
  `;
}
