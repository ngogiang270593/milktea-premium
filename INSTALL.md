# Installation Guide

This guide explains how to install, run, build, and troubleshoot MilkTea Premium on Windows, macOS, and Linux.

## Requirements

| Tool | Recommended Version | Notes |
| --- | --- | --- |
| Node.js | 20 LTS or newer | Node 18+ is supported, Node 20 LTS is recommended for production work. |
| npm | 10 or newer | Included with current Node.js installers. |
| Browser | Latest stable Chrome, Edge, Firefox, or Safari | Required for local preview and QA. |
| Git | Latest stable | Optional, but recommended for version control. |

Check your installed versions:

```bash
node --version
npm --version
git --version
```

## Windows

### 1. Install Node.js

Install the latest LTS version from:

```text
https://nodejs.org/
```

Restart your terminal after installation.

### 2. Open the Project

Use PowerShell, Windows Terminal, or Command Prompt:

```powershell
cd path\to\milktea-premium
```

### 3. Install Dependencies

```powershell
npm install
```

### 4. Start Development

```powershell
npm run dev
```

If PowerShell cannot resolve the npm shim, use:

```powershell
npm.cmd run dev
```

### 5. Build for Production

```powershell
npm run build
```

Or:

```powershell
npm.cmd run build
```

## macOS

### 1. Install Node.js

Install Node.js LTS from:

```text
https://nodejs.org/
```

If you use Homebrew:

```bash
brew install node
```

### 2. Open the Project

```bash
cd /path/to/milktea-premium
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## Linux

### 1. Install Node.js

Use Node.js LTS from your preferred package manager or from:

```text
https://nodejs.org/
```

For Ubuntu or Debian, using NodeSource is recommended for current LTS versions.

### 2. Open the Project

```bash
cd /path/to/milktea-premium
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## Development Server

Start the Vite development server:

```bash
npm run dev
```

Vite will print a local URL similar to:

```text
http://localhost:5173/
```

Open that URL in your browser.

## Production Build

Create an optimized production bundle:

```bash
npm run build
```

The output is generated in:

```text
dist/
```

Do not edit files inside `dist/` manually. They are generated and will be replaced on the next build.

## Preview Production Build

Preview the generated production bundle locally:

```bash
npm run preview
```

Use preview mode before deployment to verify:

- SPA routing
- Static assets
- Product images
- PWA manifest
- Service worker
- SEO metadata
- Theme and language persistence
- Cart and wishlist persistence

## GitHub Pages Build

For GitHub Pages, use:

```bash
npm run build:github-pages
```

This creates:

```text
dist/404.html
```

The fallback file allows GitHub Pages to recover SPA routes after refresh.

## Useful Scripts

| Command | Description |
| --- | --- |
| `npm install` | Install project dependencies. |
| `npm run dev` | Start the local Vite development server. |
| `npm run build` | Build optimized production files into `dist/`. |
| `npm run build:github-pages` | Build production files and create `dist/404.html`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run the project lint checks. |
| `npm run test:run` | Run the configured Vitest test suite. |

## Troubleshooting

### `npm install` fails

Try clearing the install state:

```bash
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell:

```powershell
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install
```

Only remove `package-lock.json` if dependency resolution is broken or you intentionally want npm to regenerate it.

### `npm run dev` starts but the browser is blank

Check the terminal for Vite errors, then verify:

- Node.js version is compatible.
- Dependencies installed successfully.
- The browser console has no module import errors.
- The project is opened from the repository root.

### PowerShell blocks npm commands

Use the npm command shim directly:

```powershell
npm.cmd run dev
npm.cmd run build
```

### Port `5173` is already in use

Start Vite on another port:

```bash
npm run dev -- --port 5174
```

### Production refresh returns 404

Your host needs SPA fallback routing.

Use the included deployment files:

- Netlify: `netlify.toml` and `public/_redirects`
- Vercel: `vercel.json`
- GitHub Pages: `npm run build:github-pages`

### Images or PWA files do not load after deployment

Verify these files are reachable from the deployed site root:

- `/manifest.json`
- `/sw.js`
- `/offline.html`
- `/icons/icon.svg`
- `/assets/og-image.png`

### Old assets appear after deployment

The service worker or browser cache may still have old files. Try:

- Hard refresh the page.
- Clear site data in browser devtools.
- Confirm `sw.js` is deployed with the latest version.

## FAQ

### Does MilkTea Premium require a backend?

No. It is a frontend-only SPA. Cart, wishlist, language, theme, recent searches, and admin overrides use localStorage.

### Can I use Yarn or pnpm?

The project is documented for npm. Yarn and pnpm may work, but npm is the supported package manager for the included lockfile and scripts.

### Which Node.js version should I use?

Use Node.js 20 LTS or newer for the smoothest development and deployment experience.

### Where is the production output?

The production build is generated in:

```text
dist/
```

Deploy the contents of `dist/`, not the source folder.

### Why do direct links such as `/menu` need special configuration?

MilkTea Premium uses client-side SPA routing. The server must return `index.html` for app routes so the JavaScript router can render the correct page.

### Can I change the brand, products, and languages?

Yes. Start with:

- Brand and business data: `src/config/siteConfig.js`
- Products: `src/data/products.js`
- Translations: `src/locales/vi.js`, `src/locales/en.js`
- Themes: `src/store/themeStore.js`

### Should I commit `dist/`?

Usually no. `dist/` is generated output and is ignored by default. Commit source files and let your hosting provider build the project.
