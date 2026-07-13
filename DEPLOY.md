# Deployment Guide

MilkTea Premium is a static Vite single-page application. It can be deployed to any static hosting platform that supports serving `dist/` and falling back application routes to `index.html`.

## Deployment Overview

Recommended deployment flow:

1. Install dependencies.
2. Run a production build.
3. Deploy the generated `dist/` folder.
4. Configure SPA route fallback.
5. Verify SEO, PWA, and direct route refreshes.

```bash
npm install
npm run build
```

Production output:

```text
dist/
```

## Production Build

Create an optimized production bundle:

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

Before publishing, verify:

- Home page loads.
- Direct routes refresh correctly.
- Product images load.
- Language and theme preferences persist.
- Cart and wishlist persist.
- `/manifest.json`, `/sw.js`, `/robots.txt`, and `/sitemap.xml` are reachable.

## Vercel

MilkTea Premium includes:

```text
vercel.json
```

### Recommended Settings

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Deployment Steps

1. Push the project to GitHub, GitLab, or Bitbucket.
2. Import the repository in Vercel.
3. Select the Vite framework preset.
4. Confirm the build command is `npm run build`.
5. Confirm the output directory is `dist`.
6. Deploy.

### SPA Routing on Vercel

The included `vercel.json` rewrites application routes to:

```text
/index.html
```

Static files such as `/assets/*`, `/icons/*`, `/sw.js`, `/robots.txt`, and `/sitemap.xml` remain directly accessible.

## Netlify

MilkTea Premium includes:

```text
netlify.toml
public/_redirects
```

### Recommended Settings

```text
Build Command: npm run build
Publish Directory: dist
Install Command: npm install
```

### Deployment Steps

1. Push the project to a Git provider.
2. Create a new Netlify site from the repository.
3. Use `npm run build` as the build command.
4. Use `dist` as the publish directory.
5. Deploy.

### SPA Routing on Netlify

The included fallback rule is:

```text
/* /index.html 200
```

This allows routes such as `/menu`, `/product`, `/cart`, and `/admin` to work after refresh.

## GitHub Pages

GitHub Pages does not support custom rewrite rules in the same way as Vercel or Netlify. MilkTea Premium includes a build helper that creates a `404.html` fallback from `index.html`.

### Build for GitHub Pages

```bash
npm run build:github-pages
```

This creates:

```text
dist/index.html
dist/404.html
```

### Deployment Steps

1. Run `npm run build:github-pages`.
2. Deploy the `dist/` folder to GitHub Pages.
3. Ensure `public/.nojekyll` is included in the build output.
4. Test direct routes after deployment.

### GitHub Pages Notes

The project uses `base: './'` in `vite.config.js`, which supports project-page hosting paths more safely.

If your site is deployed at:

```text
https://username.github.io/repository-name/
```

verify all assets load correctly from that base path.

## SPA Routing

Because MilkTea Premium uses a browser-side router, the server must return `index.html` for application routes.

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

Static files should not be rewritten:

- `/assets/*`
- `/icons/*`
- `/favicon.svg`
- `/manifest.json`
- `/manifest.webmanifest`
- `/offline.html`
- `/robots.txt`
- `/sitemap.xml`
- `/sw.js`

## Environment Variables

MilkTea Premium does not require environment variables for the default frontend-only demo.

Before a real production launch, update public configuration values directly in the project:

| Purpose | Location |
| --- | --- |
| Production site URL | `src/config/siteConfig.js` |
| Sitemap domain | `public/sitemap.xml` |
| Robots sitemap URL | `public/robots.txt` |
| OpenGraph image URL | `index.html`, runtime SEO helper |
| Business information | `src/config/siteConfig.js` |

If future backend or CMS integrations are added, use Vite-compatible variables prefixed with:

```text
VITE_
```

Example:

```text
VITE_API_BASE_URL=https://api.example.com
```

Then access them with:

```js
import.meta.env.VITE_API_BASE_URL
```

Do not expose private secrets in Vite environment variables. Vite frontend variables are bundled into client-side code.

## Deployment Checklist

- Run `npm run build`.
- Run `npm run preview`.
- Refresh `/menu`, `/product?id=royal-brown-sugar`, `/cart`, `/wishlist`, and `/admin`.
- Verify product images, icons, and OpenGraph image load.
- Verify language switching.
- Verify theme switching.
- Verify cart and wishlist persistence.
- Verify checkout flow.
- Verify `/manifest.json`.
- Verify `/sw.js`.
- Verify `/offline.html`.
- Verify `/robots.txt`.
- Verify `/sitemap.xml`.
- Run Lighthouse on the deployed URL.

## Troubleshooting

### Direct route refresh shows a 404

SPA fallback is missing.

Use the included provider config:

- Vercel: `vercel.json`
- Netlify: `netlify.toml` and `public/_redirects`
- GitHub Pages: `npm run build:github-pages`

### Assets do not load after deployment

Check:

- The deployed output is `dist/`, not the repository root.
- `vite.config.js` has the correct `base` value for your host.
- Static files exist in the deployed output.
- Browser cache or service worker cache is not serving old files.

### Service worker shows outdated content

Try:

- Hard refresh the browser.
- Clear site data in devtools.
- Confirm the latest `/sw.js` is deployed.
- Wait one reload cycle for the new service worker to activate.

### OpenGraph preview still shows an old image

Social platforms cache preview images aggressively.

Verify:

- The final URL points to the new image.
- The image is reachable publicly.
- The page has the correct `og:image`.
- The platform cache has been refreshed with its sharing debugger.

### GitHub Pages displays a blank screen

Check:

- You deployed `dist/`, not source files.
- You ran `npm run build:github-pages`.
- `dist/404.html` exists.
- `public/.nojekyll` was included.
- The browser console has no missing asset paths.

### Build fails on the hosting provider

Check:

- Node.js version is 20 LTS or newer.
- Install command is `npm install` or `npm ci`.
- Build command is `npm run build`.
- Output directory is `dist`.
- The lockfile is committed.

## Recommended Production Settings

| Setting | Value |
| --- | --- |
| Node.js | 20 LTS |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |
| SPA fallback | `index.html` |
| HTTPS | Required for PWA features |
