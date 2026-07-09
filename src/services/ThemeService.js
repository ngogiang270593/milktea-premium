import { THEME_STORAGE_KEY } from '../constants/theme.js';
import { getItem, setItem } from './StorageService.js';

export function getStoredTheme(fallback) {
  return getItem(THEME_STORAGE_KEY, fallback);
}

export function setStoredTheme(theme) {
  return setItem(THEME_STORAGE_KEY, theme);
}
