# Deployment Guide

MilkTea Premium builds to static files and can be deployed to any static hosting provider.

## Build

```bash
npm run build
```

The production output is generated in:

```text
dist/
```

Deploy the contents of `dist/`, not the project source folder.

## Preview Before Deployment

```bash
npm run preview
```

Use this command to test the production build locally.

## SPA Routing Requirement

The app uses client-side routing. Configure your host to serve `index.html` for unknown routes.

Required fallback examples:

- `/menu` should serve `index.html`
- `/product?id=royal-brown-sugar` should serve `index.html`
- `/cart` should serve `index.html`
- `/wishlist` should serve `index.html`
- `/admin` should serve `index.html`

## Netlify

Create a `_redirects` file in `public/` if your deployment needs SPA fallback:

```text
/* /index.html 200
```

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

## Vercel

Vercel detects Vite automatically.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

If route fallback is needed, configure rewrites to send all routes to `/index.html`.

## Static Server

Any static server can host the output:

```bash
npm run build
npm run preview
```

For production, upload the `dist/` directory to your hosting provider.

## PWA Files

The project includes:

- `public/manifest.webmanifest`
- `public/sw.js`
- `public/offline.html`
- `public/icons/`

After deployment, verify:

- Manifest is reachable at `/manifest.webmanifest`
- Service worker is reachable at `/sw.js`
- Offline fallback is reachable at `/offline.html`

## SEO Files

The project includes:

- `public/sitemap.xml`
- `public/robots.txt`
- Dynamic document metadata in `src/utils/seo.js`

Before going live, update production domain values in SEO files if the final domain is different.

## Deployment Checklist

- Run `npm run build`.
- Preview the build locally.
- Confirm all routes load after refresh.
- Confirm images load from production URLs.
- Confirm language and theme preferences persist.
- Confirm cart and wishlist work in the deployed browser.
- Confirm `robots.txt`, `sitemap.xml`, and manifest are reachable.
- Confirm service worker does not cache stale files during final QA.
