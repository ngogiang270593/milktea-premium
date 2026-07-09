import { escapeHtml } from '../../utils/html.js';
import { Button } from './Button.js';
import { Card } from './Card.js';
import { classNames } from './utils.js';

export function EmptyState({
  title = '',
  description = '',
  action,
  actionHref,
  actionLabel = '',
  icon = '',
  className = '',
  attributes = {}
} = {}) {
  const actionMarkup = action || (actionHref && actionLabel
    ? Button({ href: actionHref, children: escapeHtml(actionLabel) })
    : '');

  return Card({
    as: 'section',
    className: classNames('grid justify-items-center p-10 text-center', className),
    attributes,
    children: `
      ${icon ? `<div class="mb-6" aria-hidden="true">${icon}</div>` : ''}
      <h2 class="text-2xl font-bold text-[#1f1710]">${escapeHtml(title)}</h2>
      <p class="mt-3 max-w-md text-sm leading-7 text-[#7b6a5a]">${escapeHtml(description)}</p>
      ${actionMarkup ? `<div class="mt-6">${actionMarkup}</div>` : ''}
    `
  });
}

