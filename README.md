# MilkTea Premium

MilkTea Premium is a commercial-ready milk tea eCommerce storefront template built with Vite, Tailwind CSS, and vanilla JavaScript. It includes a polished homepage, menu filtering, product detail flow, cart, wishlist, checkout, multilingual support, dynamic themes, SEO/PWA setup, and a lightweight admin configuration panel.

## Features

- Premium responsive storefront for desktop, tablet, and mobile.
- Vanilla JavaScript SPA routing with Vite build tooling.
- Tailwind CSS styling with reusable design system primitives.
- Homepage sections for hero, categories, featured products, promotion, testimonials, Instagram, and newsletter.
- Menu page with search, sort, filters, grid/list view, mobile filter drawer, and pagination.
- Product detail page with gallery, thumbnails, options, toppings, quantity controls, related products, and sticky mobile add-to-cart.
- Cart, wishlist, checkout, and order success flows.
- Vietnamese and English localization with persistent language preference.
- Dynamic theme engine with multiple visual themes and localStorage persistence.
- CMS-ready `siteConfig` layer for editable brand, content, contact, and social information.
- `/admin` configuration panel for local storefront customization.
- SEO metadata, Open Graph tags, Twitter cards, sitemap, robots file, PWA manifest, and offline fallback.
- GSAP animations with reduced-motion support.

## Tech Stack

- Vite
- Vanilla JavaScript ES modules
- Tailwind CSS
- GSAP
- localStorage persistence
- PWA-ready public assets

## Screenshots

Add your final product screenshots to your marketplace listing or documentation package:

| View | Recommended Image |
| --- | --- |
| Homepage | `screenshots/homepage-desktop.jpg` |
| Mobile Homepage | `screenshots/homepage-mobile.jpg` |
| Menu Page | `screenshots/menu-page.jpg` |
| Product Detail | `screenshots/product-detail.jpg` |
| Cart and Checkout | `screenshots/checkout-flow.jpg` |
| Admin Panel | `screenshots/admin-panel.jpg` |

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Folder Structure

```text
src/
  assets/       CSS, images, icons, and visual assets
  components/   Reusable UI and feature components
  config/       CMS-ready site configuration
  data/         Products, categories, and reviews
  design/       Design tokens
  layouts/      Shared layout shell
  locales/      Translation dictionaries
  pages/        Route-level page modules
  store/        Client-side persistence stores
  utils/        Shared helpers, filters, SEO, images, and animation utilities
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for the full architecture guide.

## Customization

- Brand and editable business content: `src/config/siteConfig.js`
- Themes: `src/store/themeStore.js`
- Translations: `src/locales/vi.js` and `src/locales/en.js`
- Products: `src/data/products.js`
- Categories: `src/data/categories.js`
- Images: `src/assets/images/`
- Admin panel: `/admin`

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed instructions.

## FAQ

**Does this template require a backend?**  
No. The current version is frontend-only and stores cart, wishlist, language, theme, and admin configuration in `localStorage`.

**Can I connect it to a CMS later?**  
Yes. The `siteConfig` shape is designed so a CMS/API response can replace local configuration without changing component markup.

**Can I add more languages?**  
Yes. Add a locale file in `src/locales/`, register it in `src/locales/index.js`, and add translated keys matching the existing dictionaries.

**Can I change the color palette?**  
Yes. Add or adjust theme definitions in `src/store/themeStore.js`.

**Is this installable as a PWA?**  
Yes. The project includes a manifest, icons, service worker registration, and offline fallback page.

## Documentation

- [INSTALL.md](INSTALL.md)
- [CUSTOMIZATION.md](CUSTOMIZATION.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- [CHANGELOG.md](CHANGELOG.md)
- [LICENSE](LICENSE)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
