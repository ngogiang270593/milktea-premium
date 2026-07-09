import { escapeAttribute } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Input({
  id,
  name,
  type = 'text',
  value,
  placeholder = '',
  autocomplete,
  required = false,
  className = '',
  attributes = {}
} = {}) {
  return `
    <input
      id="${escapeAttribute(id || name || '')}"
      name="${escapeAttribute(name || id || '')}"
      type="${escapeAttribute(type)}"
      ${value !== undefined ? `value="${escapeAttribute(value)}"` : ''}
      placeholder="${escapeAttribute(placeholder)}"
      ${autocomplete ? `autocomplete="${escapeAttribute(autocomplete)}"` : ''}
      ${required ? 'required aria-required="true"' : ''}
      class="${classNames('w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-medium text-gray-800 outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-mint/50', className)}"
      ${attrs(attributes)}
    />
  `;
}

