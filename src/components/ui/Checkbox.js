import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Checkbox({
  id,
  name,
  value = 'on',
  label = '',
  checked = false,
  count = null,
  className = '',
  inputClassName = '',
  attributes = {},
  inputAttributes = {}
} = {}) {
  return `
    <label class="${classNames('flex items-center justify-between gap-4 text-sm text-[#5f5044]', className)}" ${attrs(attributes)}>
      <input
        id="${escapeAttribute(id || '')}"
        type="checkbox"
        name="${escapeAttribute(name || '')}"
        value="${escapeAttribute(value)}"
        class="${classNames('h-4 w-4 accent-brand-green', inputClassName)}"
        ${checked ? 'checked' : ''}
        ${attrs(inputAttributes)}
      />
      <span class="mr-auto">${escapeHtml(label)}</span>
      ${count === null ? '' : `<small class="text-[#9a8675]">${escapeHtml(count)}</small>`}
    </label>
  `;
}

