# Installation

This guide explains how to install and run MilkTea Premium locally.

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- A modern browser such as Chrome, Edge, Firefox, or Safari

Check your versions:

```bash
node --version
npm --version
```

## Install Dependencies

From the project root:

```bash
npm install
```

This installs Vite, Tailwind CSS, GSAP, Vitest, and the build toolchain.

## Start Development

```bash
npm run dev
```

Vite prints the local development URL, usually:

```text
http://localhost:5173/
```

## Build

```bash
npm run build
```

The optimized production output is generated in:

```text
dist/
```

## Preview Production Build

```bash
npm run preview
```

Use preview mode to verify routing, assets, PWA behavior, and production chunks before deployment.

## Quality Checks

```bash
npm run lint
npm run test:run
```

Tests are scaffolded for future expansion. Build should always pass before release.

## Windows PowerShell Note

If PowerShell blocks the npm shim, use:

```bash
npm.cmd run dev
npm.cmd run build
```

## Troubleshooting

- Delete `node_modules/` and reinstall if dependency resolution becomes inconsistent.
- Do not edit `dist/`; it is generated output.
- Ensure the app is deployed with SPA fallback routing so direct URLs such as `/menu` and `/product?id=...` work.
