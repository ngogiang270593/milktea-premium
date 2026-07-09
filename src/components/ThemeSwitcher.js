import {
  getResolvedTheme,
  getSelectableThemes,
  getThemeLabel,
  getThemePreference
} from '../store/themeStore.js';

function paletteIcon() {
  return `
    <span class="theme-switcher-icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  `;
}

export function ThemeSwitcher({ mobile = false } = {}) {
  const preference = getThemePreference();
  const resolvedTheme = getResolvedTheme(preference);
  const label = getThemeLabel(preference);
  const options = getSelectableThemes();
  const className = mobile
    ? 'theme-switcher-mobile'
    : 'theme-switcher';

  return `
    <label class="${className}">
      <span class="sr-only">Theme</span>
      ${paletteIcon()}
      <select data-theme-switcher data-theme-preference="${preference}" data-theme-resolved="${resolvedTheme}" aria-label="Current theme: ${label}. Change theme">
        ${options.map((theme) => `<option value="${theme.value}" ${theme.value === resolvedTheme ? 'selected' : ''}>${mobile ? theme.label : theme.shortLabel}</option>`).join('')}
      </select>
    </label>
  `;
}

export function updateThemeSwitchers(scope = document) {
  const preference = getThemePreference();
  const resolvedTheme = getResolvedTheme(preference);
  const label = getThemeLabel(preference);

  scope.querySelectorAll('[data-theme-switcher]').forEach((select) => {
    select.dataset.themePreference = preference;
    select.dataset.themeResolved = resolvedTheme;
    select.value = resolvedTheme;
    select.setAttribute('aria-label', `Current theme: ${label}. Change theme`);
  });
}
