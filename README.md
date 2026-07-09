# MilkTea Premium

Premium milk tea eCommerce template built with Vite, Tailwind CSS, and vanilla JavaScript.

## Highlights

- Vanilla JavaScript SPA with lightweight route-based code splitting.
- Tailwind CSS design language with reusable UI primitives.
- Localized Vietnamese and English content.
- CMS-ready `siteConfig` layer with local admin overrides.
- Product listing, product detail, cart, wishlist, checkout, and order success flows.
- Dynamic theme engine, SEO metadata, PWA manifest, and service worker fallback.
- GSAP-powered motion that respects `prefers-reduced-motion`.

## Requirements

- Node.js 18 or newer.
- npm 9 or newer.

## Getting Started

```bash
npm install
npm run dev
```

The Vite development server will print the local URL.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

This project does not currently include an ESLint script. Production validation is performed with `npm run build`.

## Project Structure

```text
src/
  assets/       Static CSS and local image assets
  components/   Reusable UI and feature components
  config/       CMS-ready site configuration
  data/         Product, category, and review data
  design/       Design tokens
  layouts/      Shared page layout
  locales/      i18n dictionaries
  pages/        Route-level page modules
  store/        Local persistence and preference stores
  utils/        Shared helpers, animation, SEO, and filters
```

## Admin Configuration

Open `/admin` to edit local storefront content:

- Brand name and logo text
- Hero title and subtitle
- Contact information
- Social links
- Theme
- Language
- Homepage banner

Changes are saved to `localStorage` under `milktea-site-config` and merged with `src/config/siteConfig.js`. This keeps the app ready for a future API or CMS response without changing component code.

## Production Build

```bash
npm run build
```

The compiled application is emitted to `dist/`.
