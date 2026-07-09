# Deployment Guide

MilkTea Premium builds to static files and can be deployed to any static hosting platform.

## Production Build

```bash
npm run build
```

Deploy the contents of:

```text
dist/
```

## SPA Route Fallback

The project uses client-side routing. Your hosting provider must serve `index.html` for unknown routes.

Routes that require fallback:

- `/`
- `/menu`
- `/product`
- `/cart`
- `/wishlist`
- `/admin`

## Netlify

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

Add a SPA fallback rule if needed:

```text
/* /index.html 200
```

Place it in `public/_redirects` if your project deployment requires it.

## Vercel

Vercel detects Vite projects automatically.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

If direct route refreshes fail, configure rewrites so all application routes resolve to `/index.html`.

## Static Hosting

Any static host can serve this project:

1. Run `npm run build`.
2. Upload `dist/`.
3. Configure SPA fallback to `index.html`.
4. Confirm static files under `assets/`, `manifest.webmanifest`, `robots.txt`, and `sitemap.xml` are reachable.

## PWA Checklist

Verify these files after deployment:

- `/manifest.webmanifest`
- `/sw.js`
- `/offline.html`
- `/icons/icon.svg`

After a release, test:

- Initial load
- Refresh on `/menu`, `/product`, `/cart`, `/wishlist`, and `/admin`
- Offline fallback
- Add to cart and wishlist persistence
- Language persistence
- Theme persistence

## SEO Checklist

Before launch:

- Update canonical URLs to the production domain.
- Update `public/sitemap.xml`.
- Update `public/robots.txt`.
- Verify Open Graph image URL.
- Verify `document.title` and meta description per route.
- Test social previews with platform preview tools.

## CI/CD

GitHub Actions workflows are located in:

```text
.github/workflows/
```

Pipelines:

- `build.yml`: install, lint, test, build, upload artifact.
- `quality.yml`: lint and test matrix.
- `release.yml`: tag/manual release build and artifact package.

