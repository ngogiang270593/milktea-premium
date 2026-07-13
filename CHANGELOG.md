# Changelog

All notable changes to MilkTea Premium are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- No unreleased changes yet.

## [1.0.0] - 2026-07-13

### Added

- Production-ready Vite, Vanilla JavaScript, and Tailwind CSS storefront architecture.
- SPA routing for Home, Menu, Product Detail, Cart, Wishlist, Checkout, About, Contact, FAQ, Admin, and 404 pages.
- Premium homepage with hero, categories, trust section, featured products, promotion banner, testimonials, Instagram gallery, and newsletter.
- Menu experience with category filters, price filters, search, sorting, grid/list view, pagination, desktop sidebar, and mobile drawer.
- Product detail experience with image gallery, thumbnails, localized product data, options, toppings, quantity selector, related products, wishlist, and cart actions.
- Quick View modal for product previews without leaving the current page.
- Shopping cart, wishlist, checkout, coupon UI, order summary, and order success flow.
- Vietnamese and English i18n system with instant language switching.
- Locale-aware currency formatting.
- Dynamic theme engine with persistent user preference.
- CMS-ready `siteConfig` layer for brand, business, SEO, social, and editable marketing content.
- Local admin configuration panel for brand, hero, contact, social, theme, language, and banner settings.
- Reusable design system primitives, tokens, services, stores, repositories, and utility modules.
- Commercial demo assets, responsive screenshots, preview banner, OpenGraph image, favicon, and animated preview GIF.
- Deployment configuration for Netlify, Vercel, and GitHub Pages.
- Professional documentation for installation, customization, deployment, project structure, contribution, and licensing.

### Changed

- Refactored constants into dedicated modules for routes, navigation, theme, icons, breakpoints, categories, and common values.
- Introduced service and repository layers to reduce direct storage and data access coupling.
- Centralized editable business content in `siteConfig` for future CMS integration.
- Improved homepage, product, cart, wishlist, checkout, footer, about, contact, FAQ, and 404 page polish while preserving SPA behavior.
- Standardized UI controls through reusable components and shared design tokens.
- Updated documentation to be suitable for GitHub, commercial distribution, and marketplace review.

### Fixed

- Resolved circular i18n imports between locale files and site configuration.
- Fixed language switching so UI updates immediately without browser refresh.
- Fixed anchor navigation across home and non-home routes.
- Fixed duplicate menu category query parameters.
- Fixed navbar layout clipping and GSAP header animation visibility issues.
- Fixed missing or undefined search translation keys.
- Fixed browser project warnings related to preload and metadata configuration.
- Fixed SPA fallback behavior for direct route refreshes on supported deployment platforms.

### Performance

- Added route-level code splitting for page modules.
- Split GSAP and UI modules into dedicated chunks.
- Optimized image loading with lazy loading, dimensions, and route-aware rendering.
- Added important route prefetching and production cache headers for static assets.
- Reduced unnecessary DOM updates and duplicate event binding patterns.
- Added GitHub Pages build helper without changing the normal production build path.

### Accessibility

- Added semantic landmarks for header, navigation, main content, sections, forms, and footer.
- Improved ARIA labels for navigation, search, filters, product actions, drawers, modals, and commerce controls.
- Added keyboard support for menus, drawers, modals, accordions, search, product gallery, and quantity controls.
- Improved focus-visible states and reduced-motion behavior.
- Added accessible empty states, labels, validation messages, and live regions where appropriate.

### SEO

- Added dynamic route-aware document titles and meta descriptions.
- Added canonical URLs, OpenGraph tags, Twitter Card tags, and localized metadata.
- Added structured data for Organization, LocalBusiness, Product, Breadcrumb, WebSite, and FAQ content.
- Added `robots.txt`, `sitemap.xml`, and deployment-ready social preview image.
- Added route-specific `noindex` metadata for private utility pages where appropriate.

### PWA

- Added installable manifest, app icons, theme color, splash screen, service worker, and offline fallback page.
- Added service worker caching for app shell and static assets.
- Added cache-control guidance for Netlify and Vercel deployments.
- Added `.nojekyll` and `404.html` fallback generation for GitHub Pages.

### Commercial Features

- Added marketplace-ready demo package with desktop, tablet, and mobile screenshots.
- Added commercial preview banner, animated preview GIF, and OpenGraph image.
- Added ThemeForest-style production documentation and release preparation material.
- Added CMS-ready configuration model for future API integration.
- Added frontend-only admin configuration workflow for buyer customization demos.

[Unreleased]: https://github.com/your-username/milktea-premium/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-username/milktea-premium/releases/tag/v1.0.0
