import { escapeAttribute, escapeHtml } from '../../utils/html.js';

function attrs(attributes = {}) {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => (value === true ? key : `${key}="${escapeAttribute(value)}"`))
    .join(' ');
}

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

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
    primary: 'btn-primary shadow-[0_18px_44px_rgba(13,59,46,0.22)]',
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

export function Input({
  id,
  name,
  type = 'text',
  value,
  placeholder = '',
  autocomplete,
  required = false,
  className = '',
  attributes = {}
} = {}) {
  return `
    <input
      id="${escapeAttribute(id || name || '')}"
      name="${escapeAttribute(name || id || '')}"
      type="${escapeAttribute(type)}"
      ${value !== undefined ? `value="${escapeAttribute(value)}"` : ''}
      placeholder="${escapeAttribute(placeholder)}"
      ${autocomplete ? `autocomplete="${escapeAttribute(autocomplete)}"` : ''}
      ${required ? 'required aria-required="true"' : ''}
      class="${classNames('w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-medium text-gray-800 outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-mint/50', className)}"
      ${attrs(attributes)}
    />
  `;
}

export function Textarea({
  id,
  name,
  value,
  placeholder = '',
  rows = 4,
  className = '',
  attributes = {}
} = {}) {
  return `
    <textarea
      id="${escapeAttribute(id || name || '')}"
      name="${escapeAttribute(name || id || '')}"
      rows="${escapeAttribute(rows)}"
      placeholder="${escapeAttribute(placeholder)}"
      class="${classNames('w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-medium text-gray-800 outline-none transition focus:border-brand-green focus:bg-white focus:ring-2 focus:ring-brand-mint/50', className)}"
      ${attrs(attributes)}
    >${value !== undefined ? escapeHtml(value) : ''}</textarea>
  `;
}

export function Select({
  id,
  name,
  options = [],
  value,
  className = '',
  attributes = {}
} = {}) {
  return `
    <select
      id="${escapeAttribute(id || name || '')}"
      name="${escapeAttribute(name || id || '')}"
      class="${classNames('w-full rounded-full border border-[#d8c8b8]/80 bg-white/80 px-4 py-3 text-sm font-medium text-[#1f1710] outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30', className)}"
      ${attrs(attributes)}
    >
      ${options.map((option) => `<option value="${escapeAttribute(option.value)}" ${option.value === value ? 'selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
    </select>
  `;
}

export function Badge({ children = '', tone = 'brand', className = '', attributes = {} } = {}) {
  const tones = {
    brand: 'bg-brand-mint/60 text-brand-green',
    gold: 'bg-brand-gold/20 text-[#6f4329]',
    peach: 'bg-brand-peach/35 text-[#b25449]',
    dark: 'bg-[#0d3b2e] text-white'
  };

  return `<span class="${classNames('inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]', tones[tone] || tones.brand, className)}" ${attrs(attributes)}>${children}</span>`;
}

export function Chip({ children = '', active = false, className = '', attributes = {} } = {}) {
  return `<button type="button" class="${classNames('min-h-10 rounded-full border px-4 text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-brand-gold/70', active ? 'border-brand-green bg-brand-green text-white' : 'border-[#d8c8b8] bg-white text-[#4d4035] hover:border-brand-green hover:text-brand-green', className)}" ${attrs(attributes)}>${children}</button>`;
}

export function Card({ children = '', as = 'div', className = '', attributes = {} } = {}) {
  return `<${as} class="${classNames('rounded-[2rem] border border-white/80 bg-white/70 shadow-[0_18px_50px_rgba(48,35,24,0.08)] backdrop-blur-xl', className)}" ${attrs(attributes)}>${children}</${as}>`;
}

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

export function Divider({ className = '', attributes = {} } = {}) {
  return `<hr class="${classNames('border-0 border-t border-gray-200', className)}" ${attrs(attributes)} />`;
}

export function Tag({ children = '', className = '', attributes = {} } = {}) {
  return `<span class="${classNames('inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#4d4035] ring-1 ring-[#d8c8b8]/70', className)}" ${attrs(attributes)}>${children}</span>`;
}

export function Rating({ value = 5, label, className = '' } = {}) {
  return `
    <span class="${classNames('inline-flex items-center gap-1 text-sm font-bold text-[#6f4329]', className)}" ${label ? `aria-label="${escapeAttribute(label)}"` : ''}>
      <span aria-hidden="true" class="text-brand-gold">★</span>
      ${escapeHtml(value)}
    </span>
  `;
}

export function Spinner({ label = 'Loading', className = '' } = {}) {
  return `
    <span class="${classNames('inline-grid h-6 w-6 animate-spin rounded-full border-2 border-brand-mint border-t-brand-green', className)}" role="status" aria-label="${escapeAttribute(label)}">
      <span class="sr-only">${escapeHtml(label)}</span>
    </span>
  `;
}

export function Skeleton({ className = '', attributes = {} } = {}) {
  return `<span class="${classNames('block animate-pulse rounded-2xl bg-gray-200/80', className)}" aria-hidden="true" ${attrs(attributes)}></span>`;
}

export function EmptyState({
  title = '',
  description = '',
  action,
  icon = '',
  className = '',
  attributes = {}
} = {}) {
  return Card({
    as: 'section',
    className: classNames('grid justify-items-center p-10 text-center', className),
    attributes,
    children: `
      ${icon ? `<div class="mb-6" aria-hidden="true">${icon}</div>` : ''}
      <h2 class="text-2xl font-bold text-[#1f1710]">${escapeHtml(title)}</h2>
      <p class="mt-3 max-w-md text-sm leading-7 text-[#7b6a5a]">${escapeHtml(description)}</p>
      ${action ? `<div class="mt-6">${action}</div>` : ''}
    `
  });
}
