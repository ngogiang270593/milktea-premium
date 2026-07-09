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
