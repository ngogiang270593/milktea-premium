# Deploy

MilkTea Premium is a static Vite SPA. Production hosting must serve static files normally and route unknown application URLs to `index.html`.

## Production

```bash
npm install
npm run build
```

Deploy:

```text
dist/
```

## Netlify

Included files:

- `netlify.toml`
- `public/_redirects`

Use:

```text
Build command: npm run build
Publish directory: dist
```

The redirect rule keeps SPA routes working after refresh:

```text
/* /index.html 200
```

## Vercel

Included file:

- `vercel.json`

Use:

```text
Framework preset: Vite
Build command: npm run build
Output directory: dist
```

The rewrite preserves direct access to static assets and falls application routes back to `/index.html`.

## GitHub Pages

Use:

```bash
npm run build:github-pages
```

The helper creates `dist/404.html` from `dist/index.html` so GitHub Pages can recover SPA routes. The project includes `public/.nojekyll` to prevent Jekyll processing.

## Validate

- Refresh `/menu`.
- Refresh `/product?id=royal-brown-sugar`.
- Refresh `/cart`.
- Refresh `/wishlist`.
- Refresh `/admin`.
- Confirm `/manifest.json`, `/sw.js`, `/robots.txt`, and `/sitemap.xml` are reachable.
- Run Lighthouse on the final deployed URL.
