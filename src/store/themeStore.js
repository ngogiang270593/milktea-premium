import {
  SELECTABLE_THEMES,
  THEME_DEFINITIONS,
  THEME_STORAGE_KEY,
  THEMES
} from '../constants/theme.js';
import { getStoredTheme, setStoredTheme } from '../services/ThemeService.js';
import { canUseDOM } from '../utils/dom.js';

export {
  THEME_DEFINITIONS,
  THEME_STORAGE_KEY,
  THEMES
};

const THEME_VALUES = Object.values(THEMES);
let systemThemeQuery = null;

function getThemeQuery() {
  if (!canUseDOM() || typeof window.matchMedia !== 'function') {
    return null;
  }

  systemThemeQuery ||= window.matchMedia('(prefers-color-scheme: dark)');
  return systemThemeQuery;
}

/**
 * Returns themes that can be selected directly in UI controls.
 *
 * @returns {Array<{value: string, label: string, shortLabel: string}>} Theme metadata.
 */
export function getSelectableThemes() {
  return SELECTABLE_THEMES.map((value) => ({
    value,
    ...THEME_DEFINITIONS[value]
  }));
}

/**
 * Checks whether a theme value is supported.
 *
 * @param {string} theme Theme preference.
 * @returns {boolean} True when supported.
 */
export function isValidTheme(theme) {
  return THEME_VALUES.includes(theme);
}

/**
 * Resolves the operating system color preference to an app theme.
 *
 * @returns {string} Resolved system theme.
 */
export function getSystemTheme() {
  return getThemeQuery()?.matches ? THEMES.DARK : THEMES.GREEN_TEA;
}

/**
 * Reads the persisted theme preference.
 *
 * @returns {string} Stored theme preference.
 */
export function getThemePreference() {
  if (!canUseDOM()) {
    return THEMES.GREEN_TEA;
  }

  try {
    const storedTheme = getStoredTheme();
    return isValidTheme(storedTheme) ? storedTheme : THEMES.GREEN_TEA;
  } catch {
    return THEMES.GREEN_TEA;
  }
}

/**
 * Converts a preference into the concrete theme used by the UI.
 *
 * @param {string} [preference] Theme preference.
 * @returns {string} Resolved theme.
 */
export function getResolvedTheme(preference = getThemePreference()) {
  return preference === THEMES.SYSTEM ? getSystemTheme() : preference;
}

/**
 * Returns a human-readable theme label.
 *
 * @param {string} [preference] Theme preference.
 * @returns {string} Theme label.
 */
export function getThemeLabel(preference = getThemePreference()) {
  if (preference === THEMES.SYSTEM) {
    return `System (${getThemeLabel(getResolvedTheme(preference))})`;
  }

  return THEME_DEFINITIONS[preference]?.label || THEME_DEFINITIONS[THEMES.GREEN_TEA].label;
}

function applyThemeVariables(root, theme) {
  Object.entries(theme.variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

/**
 * Applies theme CSS variables to the document root.
 *
 * @param {string} [preference] Theme preference.
 * @param {{animate?: boolean}} [options] Application options.
 * @returns {{preference: string, resolvedTheme: string, theme?: Record<string, *>}} Applied theme details.
 */
export function applyTheme(preference = getThemePreference(), options = {}) {
  if (!canUseDOM()) {
    return {
      preference,
      resolvedTheme: getResolvedTheme(preference)
    };
  }

  const safePreference = isValidTheme(preference) ? preference : THEMES.GREEN_TEA;
  const resolvedTheme = getResolvedTheme(safePreference);
  const theme = THEME_DEFINITIONS[resolvedTheme] || THEME_DEFINITIONS[THEMES.GREEN_TEA];
  const root = document.documentElement;

  if (options.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('theme-transitioning');
    window.setTimeout(() => root.classList.remove('theme-transitioning'), 320);
  }

  applyThemeVariables(root, theme);

  root.dataset.theme = theme.colorScheme === 'dark' ? THEMES.DARK : 'light';
  root.dataset.themeName = resolvedTheme;
  root.dataset.themePreference = safePreference;
  root.style.colorScheme = theme.colorScheme;

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme.metaColor);

  window.dispatchEvent(new CustomEvent('theme:updated', {
    detail: {
      preference: safePreference,
      resolvedTheme,
      theme
    }
  }));

  return {
    preference: safePreference,
    resolvedTheme,
    theme
  };
}

/**
 * Persists and applies a theme preference.
 *
 * @param {string} preference Requested theme preference.
 * @param {{persist?: boolean, animate?: boolean}} [options] Persistence and animation options.
 * @returns {{preference: string, resolvedTheme: string, theme?: Record<string, *>}} Applied theme details.
 */
export function setThemePreference(preference, options = { persist: true, animate: true }) {
  const safePreference = isValidTheme(preference) ? preference : THEMES.GREEN_TEA;

  if (canUseDOM() && options.persist !== false) {
    try {
      setStoredTheme(safePreference);
    } catch {
      // Storage can be blocked in private contexts; the UI still updates for the session.
    }
  }

  return applyTheme(safePreference, { animate: options.animate !== false });
}

/**
 * Advances to the next selectable theme.
 *
 * @returns {{preference: string, resolvedTheme: string, theme?: Record<string, *>}} Applied theme details.
 */
export function cycleThemePreference() {
  const currentTheme = getThemePreference();
  const currentIndex = Math.max(0, SELECTABLE_THEMES.indexOf(getResolvedTheme(currentTheme)));
  const nextTheme = SELECTABLE_THEMES[(currentIndex + 1) % SELECTABLE_THEMES.length];

  return setThemePreference(nextTheme);
}

/**
 * Subscribes to system theme changes when system preference is active.
 *
 * @param {(detail: Record<string, *>) => void} callback Theme change listener.
 * @returns {() => void} Unsubscribe function.
 */
export function subscribeToSystemTheme(callback) {
  const query = getThemeQuery();

  if (!query) {
    return () => {};
  }

  const handleChange = () => {
    if (getThemePreference() === THEMES.SYSTEM) {
      const detail = applyTheme(THEMES.SYSTEM, { animate: true });
      callback?.(detail);
    }
  };

  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', handleChange);
  } else {
    query.addListener?.(handleChange);
  }

  return () => {
    if (typeof query.removeEventListener === 'function') {
      query.removeEventListener('change', handleChange);
    } else {
      query.removeListener?.(handleChange);
    }
  };
}
