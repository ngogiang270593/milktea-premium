import { attrs, classNames } from './utils.js';

export function Tag({ children = '', className = '', attributes = {} } = {}) {
  return `<span class="${classNames('inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#4d4035] ring-1 ring-[#d8c8b8]/70', className)}" ${attrs(attributes)}>${children}</span>`;
}

