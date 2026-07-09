import { escapeAttribute } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Drawer({
  id,
  children = '',
  side = 'right',
  open = false,
  label,
  className = '',
  attributes = {}
} = {}) {
  const placement = side === 'bottom'
    ? 'inset-x-0 bottom-0 max-h-[86vh] rounded-t-[2rem]'
    : 'right-0 top-0 h-dvh w-[min(86vw,24rem)]';
  const transform = open ? 'translate-x-0 translate-y-0' : side === 'bottom' ? 'translate-y-full' : 'translate-x-full';

  return `
    <aside id="${escapeAttribute(id || '')}" class="${classNames('fixed z-[70] overflow-y-auto bg-white/92 p-5 shadow-[-24px_0_70px_rgba(31,23,16,0.2)] backdrop-blur-2xl transition duration-300', placement, transform, className)}" role="dialog" aria-modal="true" ${label ? `aria-label="${escapeAttribute(label)}"` : ''} aria-hidden="${open ? 'false' : 'true'}" ${open ? '' : 'inert'} ${attrs(attributes)}>
      ${children}
    </aside>
  `;
}

