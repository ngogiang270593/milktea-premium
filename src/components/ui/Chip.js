import { attrs, classNames } from './utils.js';

export function Chip({ children = '', active = false, as = 'button', className = '', attributes = {} } = {}) {
  const classes = classNames(
    'min-h-10 rounded-full border px-4 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-brand-gold/70',
    active ? 'border-brand-green bg-brand-green text-white' : 'border-[#d8c8b8] bg-white text-[#4d4035] hover:border-brand-green hover:text-brand-green',
    className
  );

  if (as === 'span') {
    return `<span class="${classes}" ${attrs(attributes)}>${children}</span>`;
  }

  return `<button type="button" class="${classes}" ${attrs(attributes)}>${children}</button>`;
}

