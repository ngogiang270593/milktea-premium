# Changelog

All notable changes to MilkTea Premium are documented here.

## 1.0.0-rc.1 - 2026-07-13

### Added

- Premium bubble tea storefront built with Vite, Tailwind CSS, and vanilla JavaScript.
- SPA routing for Home, Menu, Product, Cart, Wishlist, About, Contact, FAQ, Admin, and fallback pages.
- Fully responsive homepage with hero, category navigation, trust section, featured products, promotion, testimonials, Instagram gallery, and newsletter.
- Menu page with filters, search, sorting, grid/list view, mobile filter drawer, pagination, and category URL support.
- Product detail experience with gallery, thumbnails, localized product information, options, toppings, quantity selector, related products, wishlist, and cart actions.
- Quick View modal with product preview, quantity, wishlist, and add-to-cart.
- Shopping cart, wishlist, checkout, and order success frontend flow.
- Vietnamese and English i18n architecture with instant language switching.
- Locale-aware currency formatting.
- Dynamic theme engine with persistent preferences.
- CMS-ready `siteConfig` layer and local `/admin` configuration panel.
- Reusable design system primitives and design tokens.
- SEO metadata, canonical URLs, Open Graph, Twitter Cards, structured data, sitemap, and robots file.
- PWA manifest, icons, service worker, install prompt, splash screen, and offline fallback.
- Documentation for installation, deployment, customization, contribution, licensing, and release history.

### Changed

- Split constants, services, repositories, stores, and utilities into clearer production layers.
- Improved responsive behavior across desktop, tablet, and mobile.
- Optimized lazy image handling, route prefetching, and bundle chunking.
- Replaced runtime UI barrel imports with direct imports for cleaner tree shaking.
- Removed unused duplicate image helper wrapper.
- Standardized commerce price formatting through the shared currency helper.

### Validation

- `npm run lint` passes.
- `npm run build` passes.

## 0.1.0 - Initial Development

### Added

- Initial Vite project.
- Tailwind CSS setup.
- First vanilla JavaScript component structure.
- Early homepage prototype.
