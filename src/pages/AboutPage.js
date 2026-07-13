import { getSiteConfig } from '../config/siteConfig.js';
import { getLanguage } from '../store/languageStore.js';
import { escapeAttribute, escapeHtml } from '../utils/html.js';
import { t } from '../utils/i18n.js';
import { Badge, Button, Card } from '../components/ui/index.js';

function iconPath(icon) {
  const icons = {
    leaf: '<path d="M5 19c9 0 14-5 14-14-9 0-14 5-14 14Z"></path><path d="M5 19c3-5 7-8 12-10"></path>',
    cup: '<path d="M6 8h10v7a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V8Z"></path><path d="M16 10h1a3 3 0 0 1 0 6h-1"></path><path d="M8 5h6"></path>',
    heart: '<path d="M20.8 8.6a5.2 5.2 0 0 0-8.1-2.1l-.7.7-.7-.7a5.2 5.2 0 0 0-8.1 6.5L12 21l8.8-8a5.2 5.2 0 0 0 0-4.4Z"></path>',
    sparkle: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"></path><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"></path>'
  };

  return icons[icon] || icons.sparkle;
}

function aboutIcon(icon) {
  return `
    <span class="about-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        ${iconPath(icon)}
      </svg>
    </span>
  `;
}

function cardGrid(items, className = '') {
  return items.map((item) => Card({
    className: `about-card ${className}`,
    attributes: { tabindex: '0' },
    children: `
      ${aboutIcon(item.icon)}
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.copy)}</p>
    `
  })).join('');
}

function statCard(stat) {
  return `
    <div class="about-stat" tabindex="0">
      <strong>${escapeHtml(stat.value)}</strong>
      <span>${escapeHtml(stat.label)}</span>
    </div>
  `;
}

function timelineItem(item, index) {
  return `
    <li class="about-timeline-item">
      <span>${escapeHtml(item.year)}</span>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.copy)}</p>
      </div>
      <small aria-hidden="true">${String(index + 1).padStart(2, '0')}</small>
    </li>
  `;
}

function teamCard(member) {
  return Card({
    className: 'about-team-card',
    children: `
      <div class="about-team-avatar" aria-hidden="true">${escapeHtml(member.initials)}</div>
      <div>
        <h3>${escapeHtml(member.name)}</h3>
        <p>${escapeHtml(member.role)}</p>
        <span>${escapeHtml(member.copy)}</span>
      </div>
    `
  });
}

export function AboutPage() {
  const language = getLanguage();
  const siteConfig = getSiteConfig();
  const about = t('about');
  const address = siteConfig.business.address[language];
  const hours = siteConfig.business.openingHours[language];

  return `
    <article class="about-page" aria-labelledby="about-title">
      <section class="about-hero" data-reveal>
        <div class="about-container about-hero-grid">
          <div>
            ${Badge({ children: about.hero.badge, tone: 'gold', className: 'mb-6' })}
            <p class="about-eyebrow">${escapeHtml(siteConfig.brand.name)}</p>
            <h1 id="about-title">${escapeHtml(about.hero.title)}</h1>
            <p class="about-lead">${escapeHtml(about.hero.subtitle)}</p>
            <div class="about-hero-actions">
              ${Button({ href: '/menu', children: about.cta.primary, className: 'min-h-12 px-8' })}
              ${Button({ href: `mailto:${escapeAttribute(siteConfig.business.email)}`, variant: 'secondary', children: about.cta.secondary, className: 'min-h-12 px-8' })}
            </div>
          </div>

          <aside class="about-hero-card glass-panel" aria-label="${escapeAttribute(about.hero.businessCardAria)}">
            <span>${escapeHtml(siteConfig.brand.logoText)}</span>
            <h2>${escapeHtml(siteConfig.brand.name)}</h2>
            <p>${escapeHtml(address)}</p>
            <p>${escapeHtml(hours)}</p>
            <a href="${escapeAttribute(siteConfig.business.mapUrl)}" target="_blank" rel="noreferrer">${t('footer.googleMaps')}</a>
          </aside>
        </div>
      </section>

      <section class="about-section" aria-labelledby="about-story-title" data-reveal>
        <div class="about-container about-story-grid">
          <div>
            <p class="about-eyebrow">${escapeHtml(about.story.eyebrow)}</p>
            <h2 id="about-story-title" class="section-heading">${escapeHtml(about.story.title)}</h2>
          </div>
          <div class="about-story-copy">
            ${about.story.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          </div>
        </div>
      </section>

      <section class="about-section" aria-labelledby="about-purpose-title">
        <div class="about-container about-purpose-grid">
          ${Card({
            className: 'about-purpose-card',
            attributes: { 'data-reveal': '' },
            children: `
              ${aboutIcon('heart')}
              <p class="about-eyebrow">${escapeHtml(about.mission.eyebrow)}</p>
              <h2 id="about-purpose-title">${escapeHtml(about.mission.title)}</h2>
              <p>${escapeHtml(about.mission.copy)}</p>
            `
          })}
          ${Card({
            className: 'about-purpose-card',
            attributes: { 'data-reveal': '' },
            children: `
              ${aboutIcon('sparkle')}
              <p class="about-eyebrow">${escapeHtml(about.vision.eyebrow)}</p>
              <h2>${escapeHtml(about.vision.title)}</h2>
              <p>${escapeHtml(about.vision.copy)}</p>
            `
          })}
        </div>
      </section>

      <section class="about-section" aria-labelledby="about-values-title" data-reveal>
        <div class="about-container">
          <div class="about-section-heading">
            <p class="about-eyebrow">${escapeHtml(about.values.eyebrow)}</p>
            <h2 id="about-values-title" class="section-heading">${escapeHtml(about.values.title)}</h2>
            <p class="section-copy">${escapeHtml(about.values.copy)}</p>
          </div>
          <div class="about-card-grid">
            ${cardGrid(about.values.items)}
          </div>
        </div>
      </section>

      <section class="about-section" aria-labelledby="about-why-title" data-reveal>
        <div class="about-container about-why-grid">
          <div>
            <p class="about-eyebrow">${escapeHtml(about.why.eyebrow)}</p>
            <h2 id="about-why-title" class="section-heading">${escapeHtml(about.why.title)}</h2>
            <p class="section-copy mt-4">${escapeHtml(about.why.copy)}</p>
          </div>
          <div class="about-card-grid about-card-grid-compact">
            ${cardGrid(about.why.items, 'about-card-compact')}
          </div>
        </div>
      </section>

      <section class="about-section" aria-labelledby="about-stats-title" data-reveal>
        <div class="about-container">
          <h2 id="about-stats-title" class="sr-only">${escapeHtml(about.stats.title)}</h2>
          <div class="about-stats-grid">
            ${about.stats.items.map(statCard).join('')}
          </div>
        </div>
      </section>

      <section class="about-section" aria-labelledby="about-timeline-title" data-reveal>
        <div class="about-container about-timeline-grid">
          <div>
            <p class="about-eyebrow">${escapeHtml(about.timeline.eyebrow)}</p>
            <h2 id="about-timeline-title" class="section-heading">${escapeHtml(about.timeline.title)}</h2>
            <p class="section-copy mt-4">${escapeHtml(about.timeline.copy)}</p>
          </div>
          <ol class="about-timeline">
            ${about.timeline.items.map(timelineItem).join('')}
          </ol>
        </div>
      </section>

      <section class="about-section" aria-labelledby="about-team-title" data-reveal>
        <div class="about-container">
          <div class="about-section-heading">
            <p class="about-eyebrow">${escapeHtml(about.team.eyebrow)}</p>
            <h2 id="about-team-title" class="section-heading">${escapeHtml(about.team.title)}</h2>
            <p class="section-copy">${escapeHtml(about.team.copy)}</p>
          </div>
          <div class="about-team-grid">
            ${about.team.items.map(teamCard).join('')}
          </div>
        </div>
      </section>

      <section class="about-cta" aria-labelledby="about-cta-title" data-reveal>
        <div class="about-container">
          <div class="about-cta-panel">
            <div>
              <p class="about-eyebrow">${escapeHtml(about.cta.eyebrow)}</p>
              <h2 id="about-cta-title">${escapeHtml(about.cta.title)}</h2>
              <p>${escapeHtml(about.cta.copy)}</p>
            </div>
            ${Button({ href: '/menu', children: about.cta.primary, className: 'min-h-12 px-8' })}
          </div>
        </div>
      </section>
    </article>
  `;
}
