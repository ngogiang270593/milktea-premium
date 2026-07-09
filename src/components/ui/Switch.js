import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Switch({
  id,
  name,
  label = '',
  checked = false,
  className = '',
  attributes = {}
} = {}) {
  return `
    <label class="${classNames('inline-flex items-center gap-3 text-sm font-semibold text-[#4d4035]', className)}">
      <input id="${escapeAttribute(id || name || '')}" name="${escapeAttribute(name || id || '')}" type="checkbox" class="peer sr-only" role="switch" ${checked ? 'checked' : ''} ${attrs(attributes)} />
      <span class="relative h-7 w-12 rounded-full bg-[#d8c8b8]/80 transition after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition peer-checked:bg-brand-green peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-gold/70"></span>
      ${label ? `<span>${escapeHtml(label)}</span>` : ''}
    </label>
  `;
}
