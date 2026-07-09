import { getSiteContent } from '../../config/siteConfig.js';
import { getLanguage } from '../../store/languageStore.js';
import { t } from '../../utils/i18n.js';

export function OrderSuccess() {
  const orderSuccess = getSiteContent(getLanguage()).orderSuccess;

  return `
    <section id="order-success" class="order-success" aria-labelledby="order-success-title" data-reveal>
      <div class="order-success-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
      </div>
      <p>${t('orderSuccess.eyebrow')}</p>
      <h2 id="order-success-title">${orderSuccess.title}</h2>
      <span>${orderSuccess.orderNumber}</span>
      <p>${orderSuccess.copy}</p>
      <div class="order-success-actions">
        <a href="/menu" class="btn-primary ripple-button">${t('orderSuccess.continueShopping')}</a>
        <a href="/cart" class="btn-secondary">${t('orderSuccess.backToCart')}</a>
      </div>
    </section>
  `;
}
