import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Textarea({
  id,
  name,
  value,
  placeholder = '',
  rows = 4,
  className = '',
  attributes = {}
} = {}) {
  return `
    <textarea
      id="${escapeAttribute(id || name || '')}"
      name="${escapeAttribute(name || id || '')}"
      rows="${escapeAttribute(rows)}"
      placeholder="${escapeAttribute(placeholder)}"
      class="${classNames('w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-medium text-gray-800 outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-mint/50', className)}"
      ${attrs(attributes)}
    >${value !== undefined ? escapeHtml(value) : ''}</textarea>
  `;
}

