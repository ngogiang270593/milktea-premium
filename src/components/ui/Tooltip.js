import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Tooltip({ id, label = '', children = '', className = '', attributes = {} } = {}) {
  const tooltipId = id || `tooltip-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return `
    <span class="${classNames('group relative inline-flex', className)}" ${attrs(attributes)}>
      <span aria-describedby="${escapeAttribute(tooltipId)}">${children}</span>
      <span id="${escapeAttribute(tooltipId)}" role="tooltip" class="pointer-events-none absolute bottom-full left-1/2 z-[100] mb-2 -translate-x-1/2 rounded-full bg-[#1f1710] px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-within:opacity-100">
        ${escapeHtml(label)}
      </span>
    </span>
  `;
}

