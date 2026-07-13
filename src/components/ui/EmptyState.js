import { escapeHtml } from '../../utils/html.js';
import { Button } from './Button.js';
import { Card } from './Card.js';
import { classNames } from './utils.js';

const illustrations = {
  cart: `
    <span class="empty-state-bag">
      <span></span>
    </span>
  `,
  wishlist: `
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 53 13.5 34.5a12 12 0 0 1 17-17L32 19l1.5-1.5a12 12 0 0 1 17 17L32 53Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path>
      <path d="M24 27h16" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>
    </svg>
  `,
  favorites: `
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="m32 8 6.5 13.2 14.5 2.1-10.5 10.2L45 48 32 41.2 19 48l2.5-14.5L11 23.3l14.5-2.1L32 8Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path>
    </svg>
  `,
  search: `
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="28" cy="28" r="16" stroke="currentColor" stroke-width="4"></circle>
      <path d="m40 40 12 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path>
      <path d="M22 28h12" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
    </svg>
  `,
  menu: `
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M18 12h28l-3 40H21L18 12Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path>
      <path d="M24 22h16M25 32h14M27 42h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
    </svg>
  `
};

export function EmptyState({
  title = '',
  description = '',
  action,
  actionHref,
  actionLabel = '',
  illustration = 'menu',
  className = '',
  body = '',
  attributes = {}
} = {}) {
  const actionMarkup = action || (actionHref && actionLabel
    ? Button({ href: actionHref, children: escapeHtml(actionLabel), className: 'empty-state-action' })
    : '');

  return Card({
    as: 'section',
    className: classNames('empty-state', `empty-state-${illustration}`, className),
    attributes,
    children: `
      <div class="empty-state-illustration" aria-hidden="true">
        <span class="empty-state-orb empty-state-orb-one"></span>
        <span class="empty-state-orb empty-state-orb-two"></span>
        ${illustrations[illustration] || illustrations.menu}
      </div>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(description)}</p>
      ${body ? `<div class="empty-state-body">${body}</div>` : ''}
      ${actionMarkup ? `<div class="empty-state-actions">${actionMarkup}</div>` : ''}
    `
  });
}
