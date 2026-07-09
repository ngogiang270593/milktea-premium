import { DEFAULT_LANGUAGE, locales } from '../locales/index.js';
import { getLanguage } from '../store/languageStore.js';
import { interpolate, readPath } from './format.js';

/**
 * Resolves a localized string by dot-path and interpolates named parameters.
 *
 * @param {string} path Translation key path, for example "navbar.menu".
 * @param {Record<string, string|number>} [params] Named replacements.
 * @returns {string} Localized string or the key itself when missing.
 */
export function t(path, params = {}) {
  const language = getLanguage();
  const value = readPath(locales[language], path) ?? readPath(locales[DEFAULT_LANGUAGE], path) ?? path;

  return interpolate(value, params);
}
