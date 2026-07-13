# Deployment

MilkTea Premium is a static Vite SPA. Any host that can serve static files and fallback unknown routes to `index.html` can run it.

## Production Build

```bash
npm install
npm run build
```

Deploy the generated folder:

```text
dist/
```

## Required Server Behavior

Because the project uses SPA routing, configure the server to return `index.html` for application routes:

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

Static files such as `/assets/*`, `/manifest.json`, `/sw.js`, `/robots.txt`, and `/sitemap.xml` should be served normally.

## Netlify

Create `public/_redirects` if your deployment needs explicit routing:

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

Use the default Vite preset.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Add `vercel.json` if route fallback is needed:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Apache

Use `.htaccess` in the deployed root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## PWA Notes

- Deploy over HTTPS.
- Ensure `/manifest.json`, `/sw.js`, `/offline.html`, and `/icons/*` are accessible from the site root.
- After changing service worker behavior, users may need one reload cycle to receive the updated worker.

## SEO Checklist

- Update `siteUrl` in `src/config/siteConfig.js`.
- Replace placeholder Open Graph image if needed.
- Verify `public/sitemap.xml`.
- Verify `public/robots.txt`.
- Run Lighthouse against the deployed URL.
