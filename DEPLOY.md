# Deployment

MilkTea Premium deploys as a static Vite SPA. Build the project, upload `dist/`, and configure SPA fallback to `index.html`.

## Build

```bash
npm install
npm run build
```

Output:

```text
dist/
```

## Netlify

Files included:

- `netlify.toml`
- `public/_redirects`

Settings:

```text
Build command: npm run build
Publish directory: dist
```

## Vercel

File included:

- `vercel.json`

Settings:

```text
Framework preset: Vite
Build command: npm run build
Output directory: dist
```

## GitHub Pages

Build with the GitHub Pages fallback helper:

```bash
npm run build:github-pages
```

This creates:

```text
dist/404.html
```

Deploy the `dist/` folder. The project includes `public/.nojekyll` for Vite asset compatibility.

## SPA Fallback

These routes must load after refresh:

- `/menu`
- `/product`
- `/cart`
- `/wishlist`
- `/checkout`
- `/about`
- `/contact`
- `/faq`
- `/admin`

## Production Checklist

- Update `siteUrl` in `src/config/siteConfig.js`.
- Verify `public/sitemap.xml`.
- Verify `public/robots.txt`.
- Verify OpenGraph image and favicon.
- Confirm `/manifest.json`, `/sw.js`, and `/offline.html` are reachable.
- Run Lighthouse on the deployed URL.
