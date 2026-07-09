import { readJson, writeJson } from './StorageService.js';

export const SETTINGS_STORAGE_KEY = 'milktea-site-config';

export function getSettingsOverrides() {
  const overrides = readJson(SETTINGS_STORAGE_KEY, {});

  return overrides && typeof overrides === 'object' && !Array.isArray(overrides)
    ? overrides
    : {};
}

export function setSettingsOverrides(overrides) {
  writeJson(SETTINGS_STORAGE_KEY, overrides);
  window.dispatchEvent(new CustomEvent('site-config:updated', {
    detail: {
      overrides
    }
  }));

  return overrides;
}
