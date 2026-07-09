# Installation Guide

This guide explains how to install, run, test, and build MilkTea Premium locally.

## Requirements

Use a current LTS version of Node.js.

Recommended versions:

- Node.js 20 or newer
- npm 10 or newer

Check your local versions:

```bash
node --version
npm --version
```

## Install Dependencies

From the project root:

```bash
npm install
```

For CI or clean production installs:

```bash
npm ci
```

## Start Development Server

```bash
npm run dev
```

Vite prints the local development URL in the terminal, usually:

```text
http://localhost:5173/
```

On Windows PowerShell, if script execution blocks npm, use:

```bash
npm.cmd run dev
```

## Build Production Files

```bash
npm run build
```

The optimized static output is generated in:

```text
dist/
```

Do not edit files inside `dist/`; it is regenerated every build.

## Preview Production Build

```bash
npm run preview
```

Use this before deployment to verify the generated production bundle.

## Quality Commands

```bash
npm run lint
npm run test:run
npm run build
```

Test-specific commands:

```bash
npm run test:unit
npm run test:component
npm run test:integration
npm run test:coverage
```

## Troubleshooting

If dependencies become inconsistent:

```bash
rm -rf node_modules package-lock.json
npm install
```

On Windows, remove `node_modules` from File Explorer or PowerShell if `rm -rf` is unavailable.

If the development server port is already used:

```bash
npm run dev -- --port 5174
```

