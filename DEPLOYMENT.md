# Deployment Guide

MilkTea Premium is a static Vite single-page application. Production deployments should serve the generated `dist/` folder and return `index.html` for client-side routes.

## Production Build

```bash
npm install
npm run build
```

Output:

```text
dist/
```

Preview the production bundle locally:

```bash
npm run preview
```

## SPA Routing

The app owns routes in the browser. Hosting providers must serve `index.html` for unknown application routes so refresh and direct links keep working.

Routes that require fallback:

- `/`
- `/menu`
- `/product`
- `/cart`
- `/wishlist`
- `/checkout`
- `/about`
- `/contact`
- `/faq`
- `/admin`

Static files should still be served normally:

- `/assets/*`
- `/icons/*`
- `/favicon.svg`
- `/manifest.json`
- `/manifest.webmanifest`
- `/offline.html`
- `/robots.txt`
- `/sitemap.xml`
- `/sw.js`

## Netlify

Configuration is included in:

```text
netlify.toml
public/_redirects
```

Netlify settings:

```text
Build command: npm run build
Publish directory: dist
```

SPA fallback:

```text
/* /index.html 200
```

## Vercel

Configuration is included in:

```text
vercel.json
```

Vercel settings:

```text
Framework preset: Vite
Build command: npm run build
Output directory: dist
```

The included rewrite sends application routes to `/index.html` while allowing static assets to resolve directly.

## GitHub Pages

GitHub Pages uses `404.html` as the closest equivalent to an SPA fallback. Build with:

```bash
npm run build:github-pages
```

This command runs the Vite production build and copies:

```text
dist/index.html -> dist/404.html
```

Deploy the `dist/` folder to GitHub Pages. The project also includes:

```text
public/.nojekyll
```

This prevents Jekyll processing from interfering with Vite assets.

## GitHub Pages Workflow Example

Use Node 20, install dependencies, build the GitHub Pages bundle, then publish `dist/`.

```yaml
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
- run: npm ci
- run: npm run build:github-pages
```

## Environment Notes

This frontend does not require runtime environment variables. Before a real launch, update:

- `siteUrl` in `src/config/siteConfig.js`
- `public/sitemap.xml`
- `public/robots.txt`
- social preview domain references if the production URL changes

## PWA Verification

After deployment, verify these URLs:

- `/manifest.json`
- `/sw.js`
- `/offline.html`
- `/icons/icon.svg`
- `/icons/icon-192.svg`
- `/icons/icon-512.svg`

Deploy over HTTPS so service workers, install prompts, and offline support work correctly.

## Release Checklist

- Run `npm run build`.
- For GitHub Pages, run `npm run build:github-pages`.
- Refresh direct routes such as `/menu`, `/product?id=royal-brown-sugar`, `/cart`, and `/admin`.
- Verify language and theme preferences persist.
- Verify cart and wishlist persistence.
- Verify `robots.txt`, `sitemap.xml`, manifest, favicon, and OpenGraph image are reachable.
- Run Lighthouse against the deployed URL.
