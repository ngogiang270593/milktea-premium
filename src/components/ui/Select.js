import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Select({
  id,
  name,
  options = [],
  value,
  className = '',
  attributes = {}
} = {}) {
  return `
    <select
      id="${escapeAttribute(id || name || '')}"
      name="${escapeAttribute(name || id || '')}"
      class="${classNames('w-full rounded-full border border-[#d8c8b8]/80 bg-white/80 px-4 py-3 text-sm font-medium text-[#1f1710] outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30', className)}"
      ${attrs(attributes)}
    >
      ${options.map((option) => `<option value="${escapeAttribute(option.value)}" ${option.value === value ? 'selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
    </select>
  `;
}

