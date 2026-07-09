import {
  getSetting,
  LANGUAGE_STORAGE_KEY,
  setSetting
} from '../store/settingsStore.js';

export { LANGUAGE_STORAGE_KEY };

export function getStoredLanguage(fallback) {
  return getSetting('language') || fallback;
}

export function setStoredLanguage(language) {
  return Boolean(setSetting('language', language, { persist: true, notify: false }));
}
