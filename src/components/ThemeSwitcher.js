import {
  getResolvedTheme,
  getSelectableThemes,
  getThemeLabel,
  getThemePreference
} from '../store/themeStore.js';
import { t } from '../utils/i18n.js';

function paletteIcon() {
  return `
    <span class="theme-switcher-icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  `;
}

function themeLabel(value, fallback) {
  const key = `theme.names.${value}`;
  const label = t(key);

  return label === key ? fallback : label;
}

export function ThemeSwitcher({ mobile = false } = {}) {
  const preference = getThemePreference();
  const resolvedTheme = getResolvedTheme(preference);
  const label = themeLabel(resolvedTheme, getThemeLabel(preference));
  const options = getSelectableThemes();
  const className = mobile
    ? 'theme-switcher-mobile'
    : 'theme-switcher';

  return `
    <label class="${className}">
      <span class="sr-only">${t('theme.label')}</span>
      ${paletteIcon()}
      <select data-theme-switcher data-theme-preference="${preference}" data-theme-resolved="${resolvedTheme}" aria-label="${t('theme.currentAria', { label })}">
        ${options.map((theme) => `<option value="${theme.value}" ${theme.value === resolvedTheme ? 'selected' : ''}>${themeLabel(theme.value, mobile ? theme.label : theme.shortLabel)}</option>`).join('')}
      </select>
    </label>
  `;
}

export function updateThemeSwitchers(scope = document) {
  const preference = getThemePreference();
  const resolvedTheme = getResolvedTheme(preference);
  const label = themeLabel(resolvedTheme, getThemeLabel(preference));

  scope.querySelectorAll('[data-theme-switcher]').forEach((select) => {
    select.dataset.themePreference = preference;
    select.dataset.themeResolved = resolvedTheme;
    select.value = resolvedTheme;
    select.setAttribute('aria-label', t('theme.currentAria', { label }));
  });
}
