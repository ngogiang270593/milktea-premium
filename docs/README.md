# MilkTea Premium Documentation

This documentation set is written for buyers, implementers, and maintainers of the MilkTea Premium storefront template.

MilkTea Premium is a Vite, Tailwind CSS, and vanilla JavaScript SPA for a premium milk tea eCommerce experience. It includes a homepage, menu, product detail page, cart, wishlist, checkout, multilingual support, theme engine, CMS-ready configuration, PWA assets, CI workflows, and a lightweight admin panel.

## Documentation Index

| Guide | Purpose |
| --- | --- |
| [INSTALL.md](INSTALL.md) | Local setup, development, build, preview, and testing commands. |
| [DEPLOY.md](DEPLOY.md) | Static hosting, SPA fallback, PWA, SEO, and release checklist. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Application layers, routing, state, services, repositories, and rendering flow. |
| [CMS.md](CMS.md) | CMS-ready content model and future API integration strategy. |
| [I18N.md](I18N.md) | Language store, translation files, `t()` usage, and adding languages. |
| [THEME.md](THEME.md) | Theme engine, CSS variables, available themes, and adding a new theme. |
| [CUSTOMIZATION.md](CUSTOMIZATION.md) | Brand, products, images, content, admin panel, and buyer customization. |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Folder-by-folder project structure reference. |

## Recommended Reading Order

1. Start with [INSTALL.md](INSTALL.md) to run the project locally.
2. Read [ARCHITECTURE.md](ARCHITECTURE.md) before making structural changes.
3. Use [CUSTOMIZATION.md](CUSTOMIZATION.md) for brand and catalog edits.
4. Use [CMS.md](CMS.md), [I18N.md](I18N.md), and [THEME.md](THEME.md) for advanced customization.
5. Follow [DEPLOY.md](DEPLOY.md) before shipping to production.

## Project Principles

- Keep Vite, Tailwind CSS, and vanilla JavaScript.
- Keep components focused on rendering and user interaction.
- Keep editable business content in configuration.
- Keep data access behind repositories.
- Keep persistence behind services and stores.
- Prefer reusable design-system components for new UI.
- Preserve accessibility, responsive behavior, and performance when extending the template.

