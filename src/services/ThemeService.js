import { getSetting, setSetting } from '../store/settingsStore.js';

export function getStoredTheme(fallback) {
  return getSetting('theme') || fallback;
}

export function setStoredTheme(theme) {
  return Boolean(setSetting('theme', theme, { persist: true, notify: false }));
}
