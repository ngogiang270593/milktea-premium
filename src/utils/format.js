import { CURRENCIES, getSetting } from '../store/settingsStore.js';

export function formatCurrency(value) {
  const currency = getSetting('currency');

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === CURRENCIES.VND ? 0 : 2
  }).format(value);
}

export function formatCategoryName(value) {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function readPath(source, path) {
  return path
    .split('.')
    .reduce((value, key) => (value && Object.prototype.hasOwnProperty.call(value, key) ? value[key] : undefined), source);
}

export function interpolate(value, params = {}) {
  if (typeof value !== 'string') {
    return value;
  }

  return Object.entries(params).reduce(
    (text, [key, replacement]) => text.replaceAll(`{${key}}`, String(replacement)),
    value
  );
}
