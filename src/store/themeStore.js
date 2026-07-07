export const THEME_STORAGE_KEY = 'milktea-premium-theme';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

const THEME_VALUES = Object.values(THEMES);
let systemThemeQuery = null;

function canUseBrowserApis() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function getThemeQuery() {
  if (!canUseBrowserApis() || typeof window.matchMedia !== 'function') {
    return null;
  }

  systemThemeQuery ||= window.matchMedia('(prefers-color-scheme: dark)');
  return systemThemeQuery;
}

export function isValidTheme(theme) {
  return THEME_VALUES.includes(theme);
}

export function getSystemTheme() {
  return getThemeQuery()?.matches ? THEMES.DARK : THEMES.LIGHT;
}

export function getThemePreference() {
  if (!canUseBrowserApis()) {
    return THEMES.SYSTEM;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(storedTheme) ? storedTheme : THEMES.SYSTEM;
  } catch {
    return THEMES.SYSTEM;
  }
}

export function getResolvedTheme(preference = getThemePreference()) {
  return preference === THEMES.SYSTEM ? getSystemTheme() : preference;
}

export function getThemeLabel(preference = getThemePreference()) {
  if (preference === THEMES.SYSTEM) {
    return `System (${getResolvedTheme(preference)})`;
  }

  return preference === THEMES.DARK ? 'Dark' : 'Light';
}

export function applyTheme(preference = getThemePreference(), options = {}) {
  if (!canUseBrowserApis()) {
    return {
      preference,
      resolvedTheme: getResolvedTheme(preference)
    };
  }

  const safePreference = isValidTheme(preference) ? preference : THEMES.SYSTEM;
  const resolvedTheme = getResolvedTheme(safePreference);
  const root = document.documentElement;

  if (options.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('theme-transitioning');
    window.setTimeout(() => root.classList.remove('theme-transitioning'), 320);
  }

  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = safePreference;
  root.style.colorScheme = resolvedTheme;

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', resolvedTheme === THEMES.DARK ? '#101512' : '#0D3B2E');

  window.dispatchEvent(new CustomEvent('theme:updated', {
    detail: {
      preference: safePreference,
      resolvedTheme
    }
  }));

  return {
    preference: safePreference,
    resolvedTheme
  };
}

export function setThemePreference(preference, options = { persist: true, animate: true }) {
  const safePreference = isValidTheme(preference) ? preference : THEMES.SYSTEM;

  if (canUseBrowserApis() && options.persist !== false) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, safePreference);
    } catch {
      // Storage can be blocked in private contexts; the UI still updates for the session.
    }
  }

  return applyTheme(safePreference, { animate: options.animate !== false });
}

export function cycleThemePreference() {
  const order = [THEMES.LIGHT, THEMES.DARK, THEMES.SYSTEM];
  const currentTheme = getThemePreference();
  const currentIndex = Math.max(0, order.indexOf(currentTheme));
  const nextTheme = order[(currentIndex + 1) % order.length];

  return setThemePreference(nextTheme);
}

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
