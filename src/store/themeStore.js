export const THEME_STORAGE_KEY = 'milktea-premium-theme';

export const THEMES = {
  GREEN_TEA: 'green-tea',
  COFFEE: 'coffee',
  LUXURY_GOLD: 'luxury-gold',
  OCEAN: 'ocean',
  SAKURA: 'sakura',
  DARK: 'dark',
  SYSTEM: 'system'
};

export const THEME_DEFINITIONS = {
  [THEMES.GREEN_TEA]: {
    label: 'Green Tea',
    shortLabel: 'Tea',
    colorScheme: 'light',
    metaColor: '#0D3B2E',
    variables: {
      '--color-bg': '#fffdf8',
      '--color-bg-soft': '#f8f5ee',
      '--color-surface': 'rgba(255, 255, 255, 0.72)',
      '--color-surface-strong': 'rgba(255, 255, 255, 0.92)',
      '--color-border': 'rgba(216, 200, 184, 0.78)',
      '--color-text': '#1f1710',
      '--color-text-soft': '#4d4035',
      '--color-muted': '#7b6a5a',
      '--color-brand': '#0d3b2e',
      '--color-brand-hover': '#143f31',
      '--color-gold': '#d3a86a',
      '--color-mint': '#cdebf6',
      '--color-peach': '#f8c3b6',
      '--shadow-soft': '0 18px 50px rgba(48, 35, 24, 0.1)',
      '--shadow-strong': '0 30px 90px rgba(48, 35, 24, 0.16)',
      '--page-gradient': 'radial-gradient(circle at 14% 10%, rgba(205, 237, 246, 0.42), transparent 24rem), radial-gradient(circle at 88% 18%, rgba(211, 168, 106, 0.2), transparent 24rem), linear-gradient(180deg, #fffdf8 0%, #f8f5ee 100%)'
    }
  },
  [THEMES.COFFEE]: {
    label: 'Coffee',
    shortLabel: 'Coffee',
    colorScheme: 'light',
    metaColor: '#6F4329',
    variables: {
      '--color-bg': '#fffaf3',
      '--color-bg-soft': '#f4ebe0',
      '--color-surface': 'rgba(255, 250, 243, 0.76)',
      '--color-surface-strong': 'rgba(255, 250, 243, 0.94)',
      '--color-border': 'rgba(166, 132, 99, 0.38)',
      '--color-text': '#21160f',
      '--color-text-soft': '#4d382a',
      '--color-muted': '#806957',
      '--color-brand': '#6f4329',
      '--color-brand-hover': '#4f2f1d',
      '--color-gold': '#c78f52',
      '--color-mint': '#ead9c7',
      '--color-peach': '#d9a58b',
      '--shadow-soft': '0 18px 50px rgba(74, 47, 30, 0.12)',
      '--shadow-strong': '0 30px 90px rgba(74, 47, 30, 0.2)',
      '--page-gradient': 'radial-gradient(circle at 12% 12%, rgba(234, 217, 199, 0.62), transparent 24rem), radial-gradient(circle at 88% 18%, rgba(199, 143, 82, 0.22), transparent 24rem), linear-gradient(180deg, #fffaf3 0%, #f4ebe0 100%)'
    }
  },
  [THEMES.LUXURY_GOLD]: {
    label: 'Luxury Gold',
    shortLabel: 'Gold',
    colorScheme: 'light',
    metaColor: '#8A5A18',
    variables: {
      '--color-bg': '#fffdf6',
      '--color-bg-soft': '#f8f0d8',
      '--color-surface': 'rgba(255, 253, 246, 0.78)',
      '--color-surface-strong': 'rgba(255, 253, 246, 0.94)',
      '--color-border': 'rgba(190, 148, 63, 0.34)',
      '--color-text': '#1f1710',
      '--color-text-soft': '#52412a',
      '--color-muted': '#827052',
      '--color-brand': '#8a5a18',
      '--color-brand-hover': '#6f4610',
      '--color-gold': '#d9aa45',
      '--color-mint': '#f3e7bd',
      '--color-peach': '#eac19f',
      '--shadow-soft': '0 18px 50px rgba(138, 90, 24, 0.12)',
      '--shadow-strong': '0 30px 90px rgba(138, 90, 24, 0.2)',
      '--page-gradient': 'radial-gradient(circle at 14% 10%, rgba(243, 231, 189, 0.68), transparent 24rem), radial-gradient(circle at 88% 18%, rgba(217, 170, 69, 0.28), transparent 24rem), linear-gradient(180deg, #fffdf6 0%, #f8f0d8 100%)'
    }
  },
  [THEMES.OCEAN]: {
    label: 'Ocean',
    shortLabel: 'Ocean',
    colorScheme: 'light',
    metaColor: '#0E5D6B',
    variables: {
      '--color-bg': '#f7fdff',
      '--color-bg-soft': '#eaf7fa',
      '--color-surface': 'rgba(247, 253, 255, 0.78)',
      '--color-surface-strong': 'rgba(247, 253, 255, 0.94)',
      '--color-border': 'rgba(96, 163, 180, 0.34)',
      '--color-text': '#102027',
      '--color-text-soft': '#2e4b54',
      '--color-muted': '#627b84',
      '--color-brand': '#0e5d6b',
      '--color-brand-hover': '#0a4650',
      '--color-gold': '#6fb7c7',
      '--color-mint': '#d7f0f5',
      '--color-peach': '#b7dce6',
      '--shadow-soft': '0 18px 50px rgba(14, 93, 107, 0.12)',
      '--shadow-strong': '0 30px 90px rgba(14, 93, 107, 0.18)',
      '--page-gradient': 'radial-gradient(circle at 14% 10%, rgba(215, 240, 245, 0.76), transparent 24rem), radial-gradient(circle at 88% 18%, rgba(111, 183, 199, 0.24), transparent 24rem), linear-gradient(180deg, #f7fdff 0%, #eaf7fa 100%)'
    }
  },
  [THEMES.SAKURA]: {
    label: 'Sakura',
    shortLabel: 'Sakura',
    colorScheme: 'light',
    metaColor: '#A94F68',
    variables: {
      '--color-bg': '#fff9fa',
      '--color-bg-soft': '#faeef1',
      '--color-surface': 'rgba(255, 249, 250, 0.78)',
      '--color-surface-strong': 'rgba(255, 249, 250, 0.94)',
      '--color-border': 'rgba(208, 143, 159, 0.36)',
      '--color-text': '#24151a',
      '--color-text-soft': '#563540',
      '--color-muted': '#83626b',
      '--color-brand': '#a94f68',
      '--color-brand-hover': '#873b51',
      '--color-gold': '#d3a86a',
      '--color-mint': '#f7dce4',
      '--color-peach': '#f8c3d0',
      '--shadow-soft': '0 18px 50px rgba(169, 79, 104, 0.12)',
      '--shadow-strong': '0 30px 90px rgba(169, 79, 104, 0.18)',
      '--page-gradient': 'radial-gradient(circle at 14% 10%, rgba(248, 195, 208, 0.62), transparent 24rem), radial-gradient(circle at 88% 18%, rgba(211, 168, 106, 0.18), transparent 24rem), linear-gradient(180deg, #fff9fa 0%, #faeef1 100%)'
    }
  },
  [THEMES.DARK]: {
    label: 'Dark',
    shortLabel: 'Dark',
    colorScheme: 'dark',
    metaColor: '#101512',
    variables: {
      '--color-bg': '#101512',
      '--color-bg-soft': '#17201b',
      '--color-surface': 'rgba(22, 30, 26, 0.76)',
      '--color-surface-strong': 'rgba(22, 30, 26, 0.94)',
      '--color-border': 'rgba(205, 237, 246, 0.16)',
      '--color-text': '#f7f5ee',
      '--color-text-soft': '#e4d8cc',
      '--color-muted': '#c7b8aa',
      '--color-brand': '#9fe0c4',
      '--color-brand-hover': '#cdebf6',
      '--color-gold': '#e2bc7c',
      '--color-mint': '#234a43',
      '--color-peach': '#7f4c47',
      '--shadow-soft': '0 18px 54px rgba(0, 0, 0, 0.32)',
      '--shadow-strong': '0 30px 100px rgba(0, 0, 0, 0.42)',
      '--page-gradient': 'radial-gradient(circle at 12% 12%, rgba(35, 74, 67, 0.58), transparent 24rem), radial-gradient(circle at 88% 20%, rgba(226, 188, 124, 0.16), transparent 24rem), linear-gradient(180deg, #101512 0%, #17201b 100%)'
    }
  }
};

const THEME_VALUES = Object.values(THEMES);
const SELECTABLE_THEMES = [
  THEMES.GREEN_TEA,
  THEMES.COFFEE,
  THEMES.LUXURY_GOLD,
  THEMES.OCEAN,
  THEMES.SAKURA,
  THEMES.DARK
];
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

export function getSelectableThemes() {
  return SELECTABLE_THEMES.map((value) => ({
    value,
    ...THEME_DEFINITIONS[value]
  }));
}

export function isValidTheme(theme) {
  return THEME_VALUES.includes(theme);
}

export function getSystemTheme() {
  return getThemeQuery()?.matches ? THEMES.DARK : THEMES.GREEN_TEA;
}

export function getThemePreference() {
  if (!canUseBrowserApis()) {
    return THEMES.GREEN_TEA;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(storedTheme) ? storedTheme : THEMES.GREEN_TEA;
  } catch {
    return THEMES.GREEN_TEA;
  }
}

export function getResolvedTheme(preference = getThemePreference()) {
  return preference === THEMES.SYSTEM ? getSystemTheme() : preference;
}

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

export function applyTheme(preference = getThemePreference(), options = {}) {
  if (!canUseBrowserApis()) {
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

export function setThemePreference(preference, options = { persist: true, animate: true }) {
  const safePreference = isValidTheme(preference) ? preference : THEMES.GREEN_TEA;

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
  const currentTheme = getThemePreference();
  const currentIndex = Math.max(0, SELECTABLE_THEMES.indexOf(getResolvedTheme(currentTheme)));
  const nextTheme = SELECTABLE_THEMES[(currentIndex + 1) % SELECTABLE_THEMES.length];

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
