# Theme System Guide

MilkTea Premium includes a dynamic theme engine powered by CSS variables.

## Theme Files

Theme constants:

```text
src/constants/theme.js
```

Theme behavior:

```text
src/store/themeStore.js
src/components/ThemeProvider.js
src/components/ThemeSwitcher.js
src/components/ThemeToggle.js
```

Global CSS variables:

```text
src/assets/css/base.css
src/assets/css/components.css
```

## Available Themes

- Green Tea
- Coffee
- Luxury Gold
- Ocean
- Sakura
- Dark
- System preference support

## Persistence

Theme preference is saved through:

```text
src/store/settingsStore.js
src/services/ThemeService.js
```

The selected theme persists across reloads.

## No-Flash Theme Loading

`index.html` includes an early theme bootstrap script. It reads persisted theme settings before the app renders and applies key CSS variables immediately.

This prevents a visible flash of the wrong theme.

## Adding a Theme

1. Add a new key in `THEMES`.
2. Add a full definition in `THEME_DEFINITIONS`.
3. Include:
   - `label`
   - `shortLabel`
   - `colorScheme`
   - `metaColor`
   - `variables`
4. Add the theme to `SELECTABLE_THEMES`.

Example:

```js
export const THEMES = {
  ...,
  LEMON: 'lemon'
};
```

```js
[THEMES.LEMON]: {
  label: 'Lemon',
  shortLabel: 'Lemon',
  colorScheme: 'light',
  metaColor: '#A17800',
  variables: {
    '--color-bg': '#fffdf2',
    '--color-text': '#1f1710',
    '--color-brand': '#8a6500'
  }
}
```

## Theme Best Practices

- Keep contrast WCAG-friendly.
- Define every CSS variable used by existing themes.
- Avoid relying on Tailwind utility colors for theme-specific surfaces.
- Update `metaColor` to match the theme identity.
- Test light and dark modes on desktop and mobile.

