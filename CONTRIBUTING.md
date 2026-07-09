# Contributing

Thanks for improving MilkTea Premium. Keep changes focused, production-minded, and consistent with the existing vanilla JavaScript architecture.

## Local Setup

```bash
npm install
npm run dev
```

Before opening a pull request, run:

```bash
npm run build
```

## Code Guidelines

- Keep Vite, Tailwind CSS, and vanilla JavaScript.
- Preserve existing routing and component boundaries unless a task explicitly requires structural work.
- Prefer reusable helpers and existing design system primitives.
- Keep business content in `src/config/siteConfig.js` or localization files, not scattered through UI components.
- Use local image assets and preserve image dimensions to avoid layout shift.
- Respect accessibility basics: semantic elements, labels, keyboard support, and visible focus states.
- Avoid adding dependencies unless they remove meaningful complexity.

## i18n

- Add visible UI labels to `src/locales/vi.js` and `src/locales/en.js`.
- Use `t("path.to.key")` for reusable interface text.
- Keep editable marketing/business content in `siteConfig` unless it is a fixed UI label.

## CMS-Ready Content

`src/config/siteConfig.js` is the source of editable business content. Future CMS integration should map the API response to the same shape and pass it through the existing config merge path.

## Pull Request Checklist

- Build passes.
- No unrelated redesigns or behavior changes.
- New visible text is localized when appropriate.
- Images are local, optimized, and include useful alt text.
- Documentation is updated when architecture or setup changes.
