# Architecture Guide

MilkTea Premium is a Vite-powered vanilla JavaScript SPA. The architecture is intentionally modular without introducing a frontend framework.

## High-Level Layers

```text
index.html
  -> src/main.js
    -> src/App.js
      -> layouts
      -> pages
      -> components
      -> stores
      -> services
      -> repositories
      -> config
      -> utilities
```

## Entry Points

### `index.html`

Provides the HTML shell, metadata, font loading, PWA links, and no-flash theme bootstrap.

### `src/main.js`

Owns application startup:

- CSS imports
- SPA link interception
- route rendering
- language application
- SEO metadata updates
- interaction initialization
- service worker registration
- route prefetching

### `src/App.js`

Maps routes to page modules and lazy-loads page code. It also exposes `preloadRoute()` for route prefetching.

## Routing

Routing is handled by the browser History API.

Known routes are defined in:

```text
src/constants/routes.js
```

Router helpers live in:

```text
src/utils/router.js
```

Route content is rendered through:

```text
src/App.js
```

## Components

Components return HTML strings. They should stay focused on markup and avoid owning business persistence.

Main component groups:

- `components/ui/`: design-system primitives.
- `components/menu/`: menu toolbar, filter panel, product cards, pagination.
- `components/cart/`: cart content.
- `components/wishlist/`: wishlist content.
- `components/checkout/`: checkout and order success.
- top-level components: navbar, footer, hero, categories, product sections, newsletter, search.

## Design System

Design tokens live in:

```text
src/design/
```

Reusable UI primitives live in:

```text
src/components/ui/
```

Use these primitives when adding new controls, panels, badges, cards, inputs, modals, drawers, and empty states.

## State and Persistence

Stores own application state:

- `cartStore.js`
- `wishlistStore.js`
- `searchStore.js`
- `languageStore.js`
- `themeStore.js`
- `settingsStore.js`

Services wrap persistence and browser APIs:

- `StorageService.js`
- `CartService.js`
- `WishlistService.js`
- `ThemeService.js`
- `LanguageService.js`
- `SettingsService.js`
- `ImageService.js`

Components should not access `localStorage` directly.

## Data Access

Static data lives in:

```text
src/data/
```

Components and pages should read product, category, and review data through repositories:

```text
src/repositories/
```

This makes future API or CMS replacement safer.

## CMS-Ready Configuration

Editable business content lives in:

```text
src/config/siteConfig.js
```

Use:

```js
getSiteConfig()
getSiteContent(language)
siteText(path, language, params)
```

## Utilities

Focused utilities live in:

- `animation.js`
- `accessibility.js`
- `dom.js`
- `format.js`
- `image.js`
- `i18n.js`
- `prefetch.js`
- `productFilter.js`
- `router.js`
- `scroll.js`
- `seo.js`
- `storage.js`
- `validation.js`

Avoid duplicating helpers in components or stores.

## Testing

Tests are organized by intent:

- `tests/unit/`
- `tests/component/`
- `tests/integration/`
- `tests/setup/`

Run:

```bash
npm run test:run
```

