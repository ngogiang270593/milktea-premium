import { getThemeLabel, getThemePreference, getResolvedTheme } from '../store/themeStore.js';

function themeIcon() {
  return `
    <span class="theme-toggle-track" aria-hidden="true">
      <svg class="theme-toggle-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <circle cx="12" cy="12" r="3.5"></circle>
        <path d="M12 2.5v2M12 19.5v2M4.55 4.55l1.42 1.42M18.03 18.03l1.42 1.42M2.5 12h2M19.5 12h2M4.55 19.45l1.42-1.42M18.03 5.97l1.42-1.42"></path>
      </svg>
      <svg class="theme-toggle-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="M20.4 14.1A7.8 7.8 0 0 1 9.9 3.6 8.4 8.4 0 1 0 20.4 14.1Z"></path>
      </svg>
    </span>
  `;
}

export function ThemeToggle({ mobile = false } = {}) {
  const preference = getThemePreference();
  const resolvedTheme = getResolvedTheme(preference);
  const label = getThemeLabel(preference);
  const className = mobile
    ? 'theme-toggle-mobile ripple-button'
    : 'theme-toggle nav-icon-button ripple-button';

  return `
    <button
      type="button"
      class="${className}"
      data-theme-toggle
      data-theme-preference="${preference}"
      data-theme-resolved="${resolvedTheme}"
      aria-label="Current theme: ${label}. Change theme"
      aria-live="polite"
    >
      ${themeIcon()}
      ${mobile ? `<span data-theme-label>${label}</span>` : '<span class="sr-only" data-theme-label>Change theme</span>'}
    </button>
  `;
}
