import { DEFAULT_LANGUAGE, LANGUAGES, locales } from '../locales/index.js';

export const LANGUAGE_STORAGE_KEY = 'milktea-language';

const languageCodes = LANGUAGES.map((language) => language.code);
const subscribers = new Set();
let currentLanguage = loadLanguage();

function canUseBrowserApis() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isValidLanguage(language) {
  return languageCodes.includes(language);
}

function loadLanguage() {
  if (!canUseBrowserApis()) {
    return DEFAULT_LANGUAGE;
  }

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isValidLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function updateDocumentLanguage(language) {
  if (!canUseBrowserApis()) {
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

export function notify(language = currentLanguage) {
  subscribers.forEach((callback) => callback(language));
}

export function getLanguage() {
  return currentLanguage;
}

export function getAvailableLanguages() {
  return [...LANGUAGES];
}

export function applyLanguage(language = currentLanguage) {
  const safeLanguage = isValidLanguage(language) ? language : DEFAULT_LANGUAGE;

  currentLanguage = safeLanguage;
  updateDocumentLanguage(safeLanguage);

  return safeLanguage;
}

export function setLanguage(language, options = { persist: true }) {
  const safeLanguage = isValidLanguage(language) ? language : DEFAULT_LANGUAGE;

  if (safeLanguage === currentLanguage) {
    return currentLanguage;
  }

  currentLanguage = safeLanguage;

  if (canUseBrowserApis() && options.persist !== false) {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, safeLanguage);
    } catch {
      // Storage can be blocked; language still updates for the current session.
    }
  }

  updateDocumentLanguage(safeLanguage);
  notify(safeLanguage);

  if (canUseBrowserApis()) {
    window.dispatchEvent(new CustomEvent('language:updated', {
      detail: {
        language: safeLanguage
      }
    }));
  }

  return safeLanguage;
}

export function subscribe(callback) {
  subscribers.add(callback);

  return () => {
    subscribers.delete(callback);
  };
}
