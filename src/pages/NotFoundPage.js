import { getSiteConfig } from '../config/siteConfig.js';
import { escapeHtml } from '../utils/html.js';
import { t } from '../utils/i18n.js';
import { Badge, Button } from '../components/ui/index.js';

export function NotFoundPage() {
  const siteConfig = getSiteConfig();

  return `
    <section class="not-found-page" aria-labelledby="not-found-title">
      <div class="not-found-container">
        <div class="not-found-content" data-reveal>
          ${Badge({ children: t('notFound.badge'), tone: 'gold', className: 'mb-6' })}
          <p class="about-eyebrow">${escapeHtml(siteConfig.brand.name)}</p>
          <h1 id="not-found-title">${t('notFound.title')}</h1>
          <p>${t('notFound.copy')}</p>
          <div class="not-found-actions">
            ${Button({ href: '/', children: t('notFound.backHome'), className: 'min-h-12 px-8' })}
            ${Button({ href: '/menu', variant: 'secondary', children: t('notFound.browseMenu'), className: 'min-h-12 px-8' })}
          </div>
        </div>

        <div class="not-found-illustration" aria-hidden="true">
          <span class="not-found-orb not-found-orb-one"></span>
          <span class="not-found-orb not-found-orb-two"></span>
          <div class="not-found-cup">
            <span class="not-found-straw"></span>
            <span class="not-found-lid"></span>
            <span class="not-found-tea"></span>
            <span class="not-found-pearl not-found-pearl-one"></span>
            <span class="not-found-pearl not-found-pearl-two"></span>
            <span class="not-found-pearl not-found-pearl-three"></span>
          </div>
          <strong>404</strong>
        </div>
      </div>
    </section>
  `;
}
