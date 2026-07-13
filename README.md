# MilkTea Premium

MilkTea Premium is a production-ready bubble tea commerce template built with Vite, Tailwind CSS, and vanilla JavaScript. It is designed for commercial storefronts, theme marketplaces, and teams that want a polished frontend foundation without a backend dependency.

## Features

- Premium responsive storefront for desktop, tablet, and mobile.
- Vanilla JavaScript SPA routing with route-level code splitting.
- Tailwind CSS styling with reusable design system components.
- Homepage with hero, categories, trust cards, featured products, promotion, testimonials, Instagram gallery, and newsletter.
- Menu page with category filtering, search, sorting, grid/list view, mobile filter drawer, and pagination.
- Product detail page with gallery, thumbnails, product options, toppings, quantity selector, related products, wishlist, and add-to-cart.
- Quick View modal for product previews.
- Cart, wishlist, checkout, and order success flow.
- Vietnamese and English localization with instant language switching.
- Dynamic theme engine with persistent user preference.
- CMS-ready `siteConfig` layer for brand, content, SEO, contact, social, and business data.
- Lightweight `/admin` configuration panel using localStorage.
- SEO metadata, canonical URLs, Open Graph, Twitter Cards, structured data, sitemap, and robots file.
- PWA manifest, service worker, app icons, install prompt, splash screen, and offline fallback.
- GSAP-powered animations with reduced-motion support.

## Tech Stack

- Vite
- Vanilla JavaScript ES modules
- Tailwind CSS
- GSAP
- localStorage persistence
- Vitest-ready test architecture
- PWA-ready public assets

## Screenshots

Add final screenshots to a `screenshots/` folder before publishing or listing the template.

| Screen | Placeholder |
| --- | --- |
| Homepage desktop | `screenshots/home-desktop.jpg` |
| Homepage mobile | `screenshots/home-mobile.jpg` |
| Menu page | `screenshots/menu.jpg` |
| Product detail | `screenshots/product-detail.jpg` |
| Cart and checkout | `screenshots/checkout.jpg` |
| Admin panel | `screenshots/admin.jpg` |

## Quick Start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production output:

```bash
npm run preview
```

## Folder Structure

```text
src/
  assets/        CSS, images, icons, and fonts
  components/    Reusable layout, commerce, and UI components
  config/        CMS-ready site configuration
  constants/     Navigation, routes, breakpoints, icons, and common constants
  data/          Static product, category, and review seed data
  design/        Design tokens
  layouts/       Shared application shell
  locales/       Translation dictionaries
  pages/         Route-level page modules
  repositories/  Data access layer
  services/      Storage, image, settings, cart, wishlist, language, and theme services
  store/         Client-side application stores
  utils/         Shared utilities for routing, SEO, images, animation, validation, and formatting
```

## Documentation

- [INSTALL.md](INSTALL.md)
- [DEPLOY.md](DEPLOY.md)
- [CUSTOMIZATION.md](CUSTOMIZATION.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CHANGELOG.md](CHANGELOG.md)
- [LICENSE](LICENSE)

## Customization

Common customization points:

- Brand and business content: `src/config/siteConfig.js`
- Products: `src/data/products.js`
- Categories: `src/data/categories.js`
- Translations: `src/locales/vi.js`, `src/locales/en.js`
- Themes: `src/store/themeStore.js`
- Images: `src/assets/images/`
- Local admin panel: `/admin`

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for a complete guide.

## FAQ

**Does this template require a backend?**  
No. It is frontend-only. Cart, wishlist, theme, language, recent searches, and admin overrides are stored in `localStorage`.

**Can it connect to a CMS later?**  
Yes. Editable business content is centralized in `siteConfig`, so a future API response can replace or merge with the same shape.

**Can I add more languages?**  
Yes. Add a locale file in `src/locales/`, register it, and match the existing translation key structure.

**Can I change the theme palette?**  
Yes. Add or edit theme definitions in `src/store/themeStore.js`.

**Is it PWA-ready?**  
Yes. The template includes manifest, service worker, icons, install prompt, splash screen, and offline fallback.

## License

Released under the MIT License. See [LICENSE](LICENSE).
