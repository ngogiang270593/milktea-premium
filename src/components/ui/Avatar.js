import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Avatar({ label = '', src, className = '', attributes = {} } = {}) {
  const initials = label
    .split(' ')
    .map((part) => part.at(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(label)}" loading="lazy" decoding="async" class="${classNames('h-10 w-10 rounded-full object-cover', className)}" ${attrs(attributes)} />`;
  }

  return `<span class="${classNames('grid h-10 w-10 place-items-center rounded-full bg-brand-mint/70 text-sm font-extrabold text-brand-green', className)}" aria-hidden="true" ${attrs(attributes)}>${escapeHtml(initials)}</span>`;
}

