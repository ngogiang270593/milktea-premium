import { DEFAULT_LANGUAGE, LANGUAGES } from '../locales/index.js';
import { THEME_STORAGE_KEY, THEMES } from '../constants/theme.js';
import { getItem, readJson, setItem, writeJson } from '../services/StorageService.js';

export const SETTINGS_STORAGE_KEY = 'milktea-preferences';
export const LANGUAGE_STORAGE_KEY = 'milktea-language';

export const CURRENCIES = {
  USD: 'USD',
  VND: 'VND'
};

export const DENSITIES = {
  COMFORTABLE: 'comfortable',
  COMPACT: 'compact'
};

export const LAYOUTS = {
  GRID: 'grid',
  LIST: 'list'
};

export const ANIMATION_MODES = {
  ENABLED: 'enabled',
  REDUCED: 'reduced'
};

const DEFAULT_SETTINGS = {
  theme: THEMES.GREEN_TEA,
  language: DEFAULT_LANGUAGE,
  currency: CURRENCIES.USD,
  density: DENSITIES.COMFORTABLE,
  layout: LAYOUTS.GRID,
  animation: ANIMATION_MODES.ENABLED
};

const validators = {
  theme: (value) => Object.values(THEMES).includes(value),
  language: (value) => LANGUAGES.some((language) => language.code === value),
  currency: (value) => Object.values(CURRENCIES).includes(value),
  density: (value) => Object.values(DENSITIES).includes(value),
  layout: (value) => Object.values(LAYOUTS).includes(value),
  animation: (value) => Object.values(ANIMATION_MODES).includes(value)
};

const subscribers = new Set();
let currentSettings = loadSettings();

function canUseBrowserApis() {
  return typeof window !== 'undefined';
}

function normalizeSettings(settings = {}) {
  return Object.entries(DEFAULT_SETTINGS).reduce((normalized, [key, fallback]) => {
    const value = settings[key];
    normalized[key] = validators[key]?.(value) ? value : fallback;
    return normalized;
  }, {});
}

function readLegacySettings() {
  return {
    theme: getItem(THEME_STORAGE_KEY),
    language: getItem(LANGUAGE_STORAGE_KEY)
  };
}

function loadSettings() {
  const storedSettings = readJson(SETTINGS_STORAGE_KEY, {});
  const legacySettings = readLegacySettings();

  return normalizeSettings({
    ...storedSettings,
    theme: storedSettings?.theme ?? legacySettings.theme,
    language: storedSettings?.language ?? legacySettings.language
  });
}

function persistSettings(settings) {
  writeJson(SETTINGS_STORAGE_KEY, settings);
  setItem(THEME_STORAGE_KEY, settings.theme);
  setItem(LANGUAGE_STORAGE_KEY, settings.language);
}

/**
 * Notifies settings subscribers and emits a browser event for integration points.
 *
 * @param {Record<string, string>} [settings] Current settings.
 */
export function notify(settings = currentSettings) {
  const snapshot = { ...settings };

  subscribers.forEach((callback) => callback(snapshot));

  if (canUseBrowserApis()) {
    window.dispatchEvent(new CustomEvent('settings:updated', {
      detail: {
        settings: snapshot
      }
    }));
  }
}

/**
 * Returns every persisted display preference.
 *
 * @returns {{theme: string, language: string, currency: string, density: string, layout: string, animation: string}} Settings.
 */
export function getSettings() {
  return { ...currentSettings };
}

/**
 * Reads a single preference value.
 *
 * @param {keyof DEFAULT_SETTINGS} key Settings key.
 * @returns {string} Setting value.
 */
export function getSetting(key) {
  return currentSettings[key] ?? DEFAULT_SETTINGS[key];
}

/**
 * Updates one preference value.
 *
 * @param {string} key Settings key.
 * @param {string} value Requested value.
 * @param {{persist?: boolean, notify?: boolean}} [options] Update options.
 * @returns {string} Stored value.
 */
export function setSetting(key, value, options = { persist: true, notify: true }) {
  if (!Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, key)) {
    return value;
  }

  const safeValue = validators[key]?.(value) ? value : DEFAULT_SETTINGS[key];

  if (currentSettings[key] === safeValue) {
    return currentSettings[key];
  }

  currentSettings = {
    ...currentSettings,
    [key]: safeValue
  };

  if (options.persist !== false) {
    persistSettings(currentSettings);
  }

  if (options.notify !== false) {
    notify();
  }

  return safeValue;
}

/**
 * Updates multiple preferences at once.
 *
 * @param {Partial<typeof DEFAULT_SETTINGS>} settings Requested settings.
 * @param {{persist?: boolean, notify?: boolean}} [options] Update options.
 * @returns {Record<string, string>} Updated settings.
 */
export function updateSettings(settings, options = { persist: true, notify: true }) {
  const nextSettings = normalizeSettings({
    ...currentSettings,
    ...settings
  });

  const changed = Object.entries(nextSettings).some(([key, value]) => currentSettings[key] !== value);

  if (!changed) {
    return getSettings();
  }

  currentSettings = nextSettings;

  if (options.persist !== false) {
    persistSettings(currentSettings);
  }

  if (options.notify !== false) {
    notify();
  }

  return getSettings();
}

/**
 * Restores default preferences.
 *
 * @returns {Record<string, string>} Default settings.
 */
export function resetSettings() {
  currentSettings = { ...DEFAULT_SETTINGS };
  persistSettings(currentSettings);
  notify();

  return getSettings();
}

/**
 * Subscribes to settings updates.
 *
 * @param {(settings: Record<string, string>) => void} callback Listener invoked after changes.
 * @returns {() => void} Unsubscribe function.
 */
export function subscribe(callback) {
  subscribers.add(callback);

  return () => {
    subscribers.delete(callback);
  };
}
