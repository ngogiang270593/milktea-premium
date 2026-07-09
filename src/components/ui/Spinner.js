import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { classNames } from './utils.js';

export function Spinner({ label = 'Loading', className = '' } = {}) {
  return `
    <span class="${classNames('inline-grid h-6 w-6 animate-spin rounded-full border-2 border-brand-mint border-t-brand-green', className)}" role="status" aria-label="${escapeAttribute(label)}">
      <span class="sr-only">${escapeHtml(label)}</span>
    </span>
  `;
}

