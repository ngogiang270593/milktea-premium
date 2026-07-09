import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { classNames } from './utils.js';

export function Rating({ value = 5, label, className = '' } = {}) {
  return `
    <span class="${classNames('inline-flex items-center gap-1 text-sm font-bold text-[#6f4329]', className)}" ${label ? `aria-label="${escapeAttribute(label)}"` : ''}>
      <span aria-hidden="true" class="text-brand-gold">&#9733;</span>
      ${escapeHtml(value)}
    </span>
  `;
}

