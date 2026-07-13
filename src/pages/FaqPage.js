import { escapeAttribute, escapeHtml } from '../utils/html.js';
import { t } from '../utils/i18n.js';
import { Badge } from '../components/ui/Badge.js';
import { Button } from '../components/ui/Button.js';

function categoryButton(category, index) {
  return `
    <button
      type="button"
      class="faq-category${index === 0 ? ' is-active' : ''}"
      data-faq-category="${escapeAttribute(category.value)}"
      aria-pressed="${index === 0 ? 'true' : 'false'}"
    >
      <span aria-hidden="true">${escapeHtml(category.icon)}</span>
      ${escapeHtml(category.label)}
    </button>
  `;
}

function faqItem(item, category, index) {
  return `
    <details class="faq-item" data-faq-item data-faq-panel="${escapeAttribute(category)}" ${index === 0 ? 'open' : ''}>
      <summary>
        <span>${escapeHtml(item.question)}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </summary>
      <p>${escapeHtml(item.answer)}</p>
    </details>
  `;
}

export function FaqPage() {
  const faq = t('faq');
  const categories = faq.categories;
  const allItems = categories.flatMap((category) => category.items.map((item) => ({
    ...item,
    category: category.value
  })));

  return `
    <article class="faq-page" aria-labelledby="faq-title">
      <section class="faq-hero" data-reveal>
        <div class="faq-container faq-hero-grid">
          <div>
            ${Badge({ children: faq.hero.badge, tone: 'gold', className: 'mb-6' })}
            <p class="about-eyebrow">${escapeHtml(faq.hero.eyebrow)}</p>
            <h1 id="faq-title">${escapeHtml(faq.hero.title)}</h1>
            <p class="faq-lead">${escapeHtml(faq.hero.subtitle)}</p>
          </div>
          <aside class="faq-support-card glass-panel" aria-label="${escapeAttribute(faq.support.aria)}">
            <span aria-hidden="true">?</span>
            <h2>${escapeHtml(faq.support.title)}</h2>
            <p>${escapeHtml(faq.support.copy)}</p>
            ${Button({ href: '/contact', children: faq.support.cta, className: 'mt-6 min-h-12 px-8' })}
          </aside>
        </div>
      </section>

      <section class="faq-section" aria-labelledby="faq-accordion-title">
        <div class="faq-container faq-layout">
          <aside class="faq-sidebar" aria-label="${escapeAttribute(faq.categoryAria)}">
            <h2>${escapeHtml(faq.categoryTitle)}</h2>
            <div class="faq-category-list" role="list">
              ${categories.map(categoryButton).join('')}
            </div>
          </aside>

          <div class="faq-content">
            <div class="faq-content-heading" data-reveal>
              <p class="about-eyebrow">${escapeHtml(faq.eyebrow)}</p>
              <h2 id="faq-accordion-title">${escapeHtml(faq.title)}</h2>
              <p>${escapeHtml(faq.copy)}</p>
            </div>

            <div class="faq-accordion" data-faq-accordion>
              ${allItems.map((item, index) => faqItem(item, item.category, index)).join('')}
            </div>
          </div>
        </div>
      </section>
    </article>
  `;
}
