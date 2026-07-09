import { getItem, setItem } from './StorageService.js';

export const LANGUAGE_STORAGE_KEY = 'milktea-language';

export function getStoredLanguage(fallback) {
  return getItem(LANGUAGE_STORAGE_KEY, fallback);
}

export function setStoredLanguage(language) {
  return setItem(LANGUAGE_STORAGE_KEY, language);
}
