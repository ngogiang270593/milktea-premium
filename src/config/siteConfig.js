import TeaBar01 from '../assets/images/testimonials/tea-bar-01.jpg';
import TeaBar02 from '../assets/images/testimonials/tea-bar-02.jpg';
import TeaBar03 from '../assets/images/testimonials/tea-bar-03.jpg';
import TeaBar04 from '../assets/images/testimonials/tea-bar-04.jpg';
import { en } from '../locales/en.js';
import { vi } from '../locales/vi.js';
import {
  getSettingsOverrides,
  SETTINGS_STORAGE_KEY,
  setSettingsOverrides
} from '../services/SettingsService.js';
import { interpolate, readPath } from '../utils/format.js';
import { isPlainObject } from '../utils/validation.js';

export const DEFAULT_SITE_LANGUAGE = 'vi';
export const SITE_CONFIG_STORAGE_KEY = SETTINGS_STORAGE_KEY;

const instagramImages = [TeaBar01, TeaBar02, TeaBar03, TeaBar04];

function withSiteAssets(locale) {
  return {
    ...locale,
    home: {
      ...locale.home,
      instagram: {
        ...locale.home.instagram,
        items: locale.home.instagram.items.map((item, index) => ({
          ...item,
          src: instagramImages[index]
        }))
      }
    }
  };
}

export const siteConfig = {
  brand: {
    name: 'MilkTea Premium',
    legalName: 'MilkTea Premium LLC',
    logoText: 'MP',
    handle: '@milkteapremium'
  },
  business: {
    copyrightYear: 2026,
    email: 'support@milkteapremium.com',
    phone: '+1 (800) 555-0199',
    address: {
      en: 'New York, NY',
      vi: 'New York, NY'
    },
    openingHours: {
      en: 'Daily, 8:00 AM - 10:00 PM',
      vi: 'Hằng ngày, 8:00 - 22:00'
    }
  },
  social: {
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    tiktok: 'https://www.tiktok.com',
    youtube: 'https://www.youtube.com'
  },
  search: {
    popularTerms: {
      en: ['brown sugar', 'matcha', 'fruit tea', 'coffee', 'smoothie', 'topping'],
      vi: ['đường nâu', 'matcha', 'trà trái cây', 'cà phê', 'smoothie', 'topping']
    }
  },
  seo: {
    en: {
      title: 'MilkTea Premium | Handcrafted Bubble Tea',
      description: 'MilkTea Premium offers a modern bubble tea experience with handcrafted blends, premium ingredients, and elegant presentation.'
    },
    vi: {
      title: 'MilkTea Premium - Trà sữa cao cấp',
      description: 'MilkTea Premium - Trà sữa cao cấp, nguyên liệu tuyển chọn, giao hàng nhanh, trải nghiệm thưởng thức tuyệt hảo.'
    }
  },
  content: {
    en: withSiteAssets(en),
    vi: withSiteAssets(vi)
  }
};

function mergeConfig(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override ?? base;
  }

  return Object.keys({ ...base, ...override }).reduce((result, key) => {
    const baseValue = base[key];
    const overrideValue = override[key];

    result[key] = isPlainObject(baseValue) && isPlainObject(overrideValue)
      ? mergeConfig(baseValue, overrideValue)
      : overrideValue ?? baseValue;

    return result;
  }, {});
}

/**
 * Reads user-edited storefront configuration from localStorage.
 *
 * @returns {Record<string, *>} Stored configuration overrides.
 */
export function getSiteConfigOverrides() {
  return getSettingsOverrides();
}

/**
 * Persists user-edited storefront configuration and notifies the SPA shell.
 *
 * @param {Record<string, *>} overrides Configuration values keyed by siteConfig shape.
 * @returns {Record<string, *>} The saved overrides.
 */
export function setSiteConfigOverrides(overrides) {
  return setSettingsOverrides(overrides);
}

/**
 * Returns the effective storefront configuration by merging defaults and overrides.
 *
 * @returns {typeof siteConfig} Effective site configuration.
 */
export function getSiteConfig() {
  return mergeConfig(siteConfig, getSiteConfigOverrides());
}

/**
 * Returns localized editable content with Vietnamese as the fallback language.
 *
 * @param {string} [language] Locale code.
 * @returns {Record<string, *>} Localized content branch.
 */
export function getSiteContent(language = DEFAULT_SITE_LANGUAGE) {
  const config = getSiteConfig();

  return config.content[language] || config.content[DEFAULT_SITE_LANGUAGE];
}

/**
 * Reads a localized site content value by path and interpolates parameters.
 *
 * @param {string} path Dot-path within the localized content object.
 * @param {string} [language] Locale code.
 * @param {Record<string, string|number>} [params] Named replacements.
 * @returns {*} Resolved content value or the path when missing.
 */
export function siteText(path, language = DEFAULT_SITE_LANGUAGE, params = {}) {
  const value = readPath(getSiteContent(language), path) ?? path;

  return interpolate(value, params);
}
