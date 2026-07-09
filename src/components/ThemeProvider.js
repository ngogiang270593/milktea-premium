import { applyTheme, subscribeToSystemTheme } from '../store/themeStore.js';

let providerReady = false;

export function ThemeProvider() {
  applyTheme();

  if (providerReady) {
    return;
  }

  providerReady = true;
  subscribeToSystemTheme(() => updateThemeProvider());
}

export function updateThemeProvider(preference) {
  return applyTheme(preference);
}
