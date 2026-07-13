# Contributing

Thank you for improving MilkTea Premium. Keep contributions focused, production-minded, and consistent with the existing vanilla JavaScript architecture.

## Local Setup

```bash
npm install
npm run dev
```

Before submitting changes:

```bash
npm run lint
npm run build
```

## Development Principles

- Keep Vite, Tailwind CSS, and vanilla JavaScript.
- Do not introduce framework rewrites.
- Preserve SPA routing and existing user flows.
- Prefer existing services, stores, repositories, utilities, and design-system components.
- Keep business content in `src/config/siteConfig.js`.
- Keep fixed UI labels in locale files.
- Use local optimized images.
- Preserve accessibility: semantic HTML, labels, keyboard support, focus states, and meaningful alt text.
- Avoid adding dependencies unless they remove meaningful complexity.

## Code Style

- Use ES modules.
- Keep functions small and reusable.
- Escape dynamic HTML with existing helpers.
- Use structured data access through repositories and services.
- Add comments only when they explain non-obvious logic.

## i18n Guidelines

- Add new visible labels to both `src/locales/vi.js` and `src/locales/en.js`.
- Use `t('path.to.key')` in components.
- Do not hardcode user-visible English text in components unless it is a brand, SKU, or proper noun.

## Accessibility Checklist

- Page has a clear heading hierarchy.
- Interactive controls are keyboard reachable.
- Icon-only buttons have `aria-label`.
- Dialogs trap focus and close with Escape.
- Forms have labels and validation messages.
- Images have useful alt text or empty alt when decorative.

## Pull Request Checklist

- Lint passes.
- Build passes.
- No unrelated redesigns.
- No unrelated routing or business logic changes.
- New text is localized.
- New assets are local and optimized.
- Documentation is updated when setup, architecture, or customization changes.
