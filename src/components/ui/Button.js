import { escapeAttribute } from '../../utils/html.js';
import { shadowClass } from '../../design/shadow.js';
import { attrs, classNames } from './utils.js';

export function Button({
  children = '',
  variant = 'primary',
  type = 'button',
  href,
  className = '',
  disabled = false,
  ariaLabel,
  attributes = {}
} = {}) {
  const variants = {
    primary: `btn-primary ${shadowClass.brand}`,
    secondary: 'btn-secondary',
    ghost: 'inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-[#4d4035] transition hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2',
    danger: 'inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-[#b25449] transition hover:bg-[#b25449]/10 focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2'
  };
  const shared = classNames('ripple-button outline-none', variants[variant] || variants.primary, className);
  const extraAttrs = attrs({
    ...attributes,
    'aria-label': ariaLabel,
    'aria-disabled': disabled || undefined
  });

  if (href) {
    return `<a href="${escapeAttribute(href)}" class="${shared}" ${extraAttrs}>${children}</a>`;
  }

  return `<button type="${escapeAttribute(type)}" class="${shared}" ${disabled ? 'disabled' : ''} ${extraAttrs}>${children}</button>`;
}

