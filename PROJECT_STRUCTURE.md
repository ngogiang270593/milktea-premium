# Project Structure

This document explains how MilkTea Premium is organized for commercial maintenance and future CMS integration.

## Root Files

```text
index.html              Vite HTML entry
package.json            npm scripts and dependencies
package-lock.json       Locked dependency versions
tailwind.config.js      Tailwind configuration
postcss.config.js       PostCSS configuration
vite.config.js          Vite configuration
README.md               Main product documentation
INSTALL.md              Local setup guide
CUSTOMIZATION.md        Buyer customization guide
DEPLOYMENT.md           Production deployment guide
CHANGELOG.md            Release history
LICENSE                 MIT license
```

## Public Directory

```text
public/
  assets/               Static social/SEO assets
  icons/                PWA icons
  favicon.svg           Browser favicon
  manifest.webmanifest  PWA manifest
  offline.html          Offline fallback page
  robots.txt            Search crawler rules
  sitemap.xml           Search sitemap
  sw.js                 Service worker
```

Files in `public/` are copied directly to the build output.

## Source Directory

```text
src/
  assets/
  components/
  config/
  data/
  design/
  layouts/
  locales/
  pages/
  store/
  utils/
  App.js
  main.js
```

## `src/assets`

Contains static project assets.

```text
src/assets/css/         Base, component, and utility CSS layers
src/assets/images/      Local image assets
```

Use this folder for product images, testimonial images, hero visuals, category images, and other bundled assets.

## `src/components`

Reusable UI and feature components.

Important groups:

```text
components/ui/          Design system primitives
components/cart/        Cart content renderer
components/wishlist/    Wishlist content renderer
components/menu/        Menu page subcomponents
components/checkout/    Checkout and success content
```

Top-level components such as `Navbar.js`, `Footer.js`, `Hero.js`, `Categories.js`, and `Newsletter.js` render shared site sections.

## `src/config`

```text
siteConfig.js
```

Stores editable business content:

- Brand
- Contact details
- Social links
- SEO text
- Homepage content
- Footer content

Components should read editable content through `getSiteConfig()` and `getSiteContent(language)`.

## `src/data`

Static storefront data.

```text
products.js             Product catalog and product lookup
categories.js           Menu categories and filters
reviews.js              Review data
```

This folder can later be replaced or hydrated by an API.

## `src/design`

Design tokens and reusable design constants.

```text
tokens.js
spacing.js
radius.js
shadow.js
typography.js
index.js
```

Use these files when extending the design system.

## `src/layouts`

```text
DefaultLayout.js
```

Provides the shared page shell with navbar, main content region, footer, and search overlay.

## `src/locales`

Translation dictionaries and language registration.

```text
vi.js
en.js
index.js
```

Fixed UI labels should live here and be read with `t("key.path")`.

## `src/pages`

Route-level modules.

```text
AdminPage.js
CartPage.js
MenuPage.js
ProductPage.js
WishlistPage.js
```

Routes are registered in `src/App.js` and handled by the SPA router in `src/main.js`.

## `src/store`

Client-side state and persistence modules.

```text
cartStore.js            Cart operations and totals
wishlistStore.js        Wishlist operations
searchStore.js          Search helpers and recent searches
languageStore.js        Language preference
themeStore.js           Theme definitions and preference
```

State is persisted with `localStorage` where appropriate.

## `src/utils`

Shared utility functions.

```text
animations.js           Interaction initialization
format.js               Formatting helpers
html.js                 HTML escaping helpers
i18n.js                 Translation lookup
images.js               Image attribute helpers
motion.js               GSAP and smooth-scroll setup
productFilter.js        Product filtering and sorting
scroll.js               Scroll utilities
seo.js                  Document metadata and service worker registration
storage.js              Safe localStorage JSON helpers
constants.js            Navigation and legacy constants
```

Keep reusable logic here instead of duplicating it in components.

## Application Entry

```text
src/main.js
```

Initializes CSS, routing, metadata, language setup, service worker registration, and page interactions.

```text
src/App.js
```

Loads route modules and renders the correct page content.
