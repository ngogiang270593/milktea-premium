# Project Structure

This document describes the current folder structure and ownership boundaries.

## Root

```text
.github/                 GitHub Actions workflows
dist/                    Generated production build
docs/                    Project documentation
node_modules/            Installed dependencies
public/                  Static public assets
scripts/                 Project scripts
src/                     Source code
tests/                   Vitest test suites
index.html               Vite HTML entry
package.json             npm scripts and dependencies
tailwind.config.js       Tailwind configuration
vite.config.js           Vite and Vitest configuration
```

## Source

```text
src/
  assets/
  components/
  config/
  constants/
  data/
  design/
  layouts/
  locales/
  pages/
  repositories/
  services/
  store/
  utils/
  App.js
  main.js
```

## `src/assets`

Static source assets.

```text
assets/css/              Tailwind CSS layers
assets/images/           Local optimized imagery
```

## `src/components`

Renderable UI modules.

```text
components/ui/           Design-system primitives
components/menu/         Menu-specific subcomponents
components/cart/         Cart content
components/wishlist/     Wishlist content
components/checkout/     Checkout and success content
```

Top-level storefront components include:

- `Navbar.js`
- `Footer.js`
- `Hero.js`
- `Categories.js`
- `FeaturedProducts.js`
- `Promotion.js`
- `Testimonials.js`
- `Newsletter.js`
- `SearchOverlay.js`

## `src/config`

CMS-ready business configuration.

```text
siteConfig.js
```

## `src/constants`

Stable shared constants.

```text
breakpoints.js
categories.js
common.js
icons.js
navigation.js
routes.js
theme.js
```

## `src/data`

Static internal data source.

```text
products.js
categories.js
reviews.js
```

Components should not import these files directly. Use repositories.

## `src/repositories`

Data access boundary.

```text
ProductRepository.js
CategoryRepository.js
ReviewRepository.js
```

This layer can later call an API without changing page/component imports.

## `src/services`

Browser and persistence service layer.

```text
StorageService.js
ThemeService.js
LanguageService.js
ImageService.js
SettingsService.js
CartService.js
WishlistService.js
```

Stores and utilities use services so components avoid direct browser storage calls.

## `src/store`

Client-side state and domain operations.

```text
cartStore.js
wishlistStore.js
searchStore.js
languageStore.js
themeStore.js
settingsStore.js
```

## `src/utils`

Focused helper modules.

```text
accessibility.js
animation.js
animations.js
dom.js
format.js
html.js
i18n.js
image.js
images.js
prefetch.js
productFilter.js
router.js
scroll.js
seo.js
storage.js
validation.js
```

## `tests`

Testing architecture.

```text
tests/unit/
tests/component/
tests/integration/
tests/setup/
```

## `public`

Files copied directly to production output.

```text
manifest.webmanifest
sw.js
offline.html
robots.txt
sitemap.xml
favicon.svg
icons/
assets/
```

