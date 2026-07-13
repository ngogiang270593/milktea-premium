import { Modal } from './ui/Modal.js';
import { t } from '../utils/i18n.js';

export function QuickViewModal() {
  return Modal({
    id: 'quick-view-modal',
    titleId: 'quick-view-title',
    className: 'quick-view-modal hidden',
    attributes: {
      'data-quick-view-modal': '',
      'aria-hidden': 'true'
    },
    children: `
      <div class="quick-view-header">
        <p>${t('products.quickView')}</p>
        <button type="button" class="nav-icon-button ripple-button" data-quick-view-close aria-label="${t('products.closeQuickView')}">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      <div data-quick-view-content></div>
    `
  });
}
