import { escapeAttribute } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Modal({
  id,
  titleId,
  children = '',
  open = false,
  className = '',
  attributes = {}
} = {}) {
  return `
    <div id="${escapeAttribute(id || '')}" class="${classNames('fixed inset-0 z-[90] grid place-items-center bg-[#1f1710]/30 p-4 backdrop-blur-sm', open ? '' : 'hidden', className)}" role="dialog" aria-modal="true" ${titleId ? `aria-labelledby="${escapeAttribute(titleId)}"` : ''} ${attrs(attributes)}>
      <div class="w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_30px_90px_rgba(31,23,16,0.22)] backdrop-blur-2xl">
        ${children}
      </div>
    </div>
  `;
}

