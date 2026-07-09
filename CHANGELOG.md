# Changelog

All notable changes to MilkTea Premium are documented here.

## 1.0.0-rc.1 - 2026-07-09

### Added

- Commercial storefront experience for a premium milk tea brand.
- Vite-powered vanilla JavaScript SPA architecture.
- Responsive homepage with hero, categories, featured products, promotion, testimonials, Instagram, and newsletter sections.
- Production menu page with filters, search, sorting, grid/list view, mobile drawer, and pagination.
- Product detail page with gallery, thumbnail navigation, product options, toppings, quantity controls, related products, and sticky mobile add-to-cart.
- Cart, wishlist, checkout, and order success flows.
- Vietnamese and English localization architecture.
- Persistent language, theme, cart, wishlist, search, and admin configuration storage.
- Dynamic theme engine with Green Tea, Coffee, Luxury Gold, Ocean, Sakura, and Dark themes.
- CMS-ready `siteConfig` content layer.
- Lightweight `/admin` configuration panel for local content editing.
- SEO metadata, Open Graph tags, Twitter cards, sitemap, robots file, PWA manifest, icons, and offline fallback.
- Reusable design system primitives and design tokens.
- Commercial distribution documentation.

### Changed

- Removed unused runtime dependencies to keep the package lean.
- Improved public utility documentation with JSDoc comments.
- Updated README for marketplace and production handoff use.

### Validation

- Production build verified with `npm run build`.

## 0.1.0 - Initial Development

- Established base Vite, Tailwind CSS, and vanilla JavaScript project.
- Built the first homepage layout and core component structure.
