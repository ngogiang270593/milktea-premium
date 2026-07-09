import { DEFAULT_LANGUAGE, LANGUAGES, locales } from '../locales/index.js';
import {
  getStoredLanguage,
  LANGUAGE_STORAGE_KEY,
  setStoredLanguage
} from '../services/LanguageService.js';
import { canUseDOM } from '../utils/dom.js';

export { LANGUAGE_STORAGE_KEY };

const languageCodes = LANGUAGES.map((language) => language.code);
const subscribers = new Set();
let currentLanguage = loadLanguage();

function isValidLanguage(language) {
  return languageCodes.includes(language);
}

function loadLanguage() {
  if (!canUseDOM()) {
    return DEFAULT_LANGUAGE;
  }

  try {
    const storedLanguage = getStoredLanguage();
    return isValidLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function updateDocumentLanguage(language) {
  if (!canUseDOM()) {
    return;
  }

  const locale = locales[language] || locales[DEFAULT_LANGUAGE];

  document.documentElement.lang = language;

  if (locale.seo?.title) {
    document.title = locale.seo.title;
  }

  if (locale.seo?.description) {
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', locale.seo.description);
  }
}

/**
 * Notifies all language subscribers without changing the current language.
 *
 * @param {string} [language] Language code sent to subscribers.
 */
export function notify(language = currentLanguage) {
  subscribers.forEach((callback) => callback(language));
}

/**
 * Returns the active language code.
 *
 * @returns {string} Active language code.
 */
export function getLanguage() {
  return currentLanguage;
}

/**
 * Returns configured languages for selectors and admin controls.
 *
 * @returns {{code: string, labelKey: string}[]} Available language metadata.
 */
export function getAvailableLanguages() {
  return [...LANGUAGES];
}

/**
 * Applies a language to document metadata without persisting it.
 *
 * @param {string} [language] Language code.
 * @returns {string} Applied language code.
 */
export function applyLanguage(language = currentLanguage) {
  const safeLanguage = isValidLanguage(language) ? language : DEFAULT_LANGUAGE;

  currentLanguage = safeLanguage;
  updateDocumentLanguage(safeLanguage);

  return safeLanguage;
}

/**
 * Updates the active language, persists it by default, and notifies subscribers.
 *
 * @param {string} language Requested language code.
 * @param {{persist?: boolean}} [options] Persistence options.
 * @returns {string} Active language code.
 */
export function setLanguage(language, options = { persist: true }) {
  const safeLanguage = isValidLanguage(language) ? language : DEFAULT_LANGUAGE;

  if (safeLanguage === currentLanguage) {
    return currentLanguage;
  }

  currentLanguage = safeLanguage;

  if (canUseDOM() && options.persist !== false) {
    try {
      setStoredLanguage(safeLanguage);
    } catch {
      // Storage can be blocked; language still updates for the current session.
    }
  }

  updateDocumentLanguage(safeLanguage);
  notify(safeLanguage);

  if (canUseDOM()) {
    window.dispatchEvent(new CustomEvent('language:updated', {
      detail: {
        language: safeLanguage
      }
    }));
  }

  return safeLanguage;
}

/**
 * Subscribes to language changes.
 *
 * @param {(language: string) => void} callback Listener invoked after language changes.
 * @returns {() => void} Unsubscribe function.
 */
export function subscribe(callback) {
  subscribers.add(callback);

  return () => {
    subscribers.delete(callback);
  };
}
