import { getLanguage } from '../store/languageStore.js';

const currencyByLanguage = {
  en: {
    locale: 'en-US',
    currency: 'USD',
    scale: 1,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  },
  vi: {
    locale: 'vi-VN',
    currency: 'VND',
    scale: 1000,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }
};

export function formatCurrency(price) {
  const config = currencyByLanguage[getLanguage()] || currencyByLanguage.vi;

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: config.minimumFractionDigits,
    maximumFractionDigits: config.maximumFractionDigits
  }).format(Number(price || 0) * config.scale);
}
