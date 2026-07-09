# Customization Guide

MilkTea Premium is designed so common buyer changes can be made without rewriting components.

## Theme

Theme definitions live in:

```text
src/store/themeStore.js
```

Each theme defines CSS variables such as:

- Background colors
- Surface colors
- Border colors
- Text colors
- Brand color
- Accent colors
- Shadows
- Page gradient

To add a theme:

1. Add a new value to `THEMES`.
2. Add a matching entry in `THEME_DEFINITIONS`.
3. Add the theme to `SELECTABLE_THEMES`.

The theme switcher will pick it up automatically.

## Brand

Editable brand content is centralized in:

```text
src/config/siteConfig.js
```

Common fields:

- `brand.name`
- `brand.legalName`
- `brand.logoText`
- `brand.handle`
- `business.email`
- `business.phone`
- `business.address`
- `business.openingHours`
- `social.facebook`
- `social.instagram`
- `social.tiktok`
- `social.youtube`

You can also open `/admin` in the browser and edit key brand values locally. Admin changes are stored in `localStorage` and merged over the default config.

## CMS Config

The storefront reads editable business content through:

```js
getSiteConfig()
getSiteContent(language)
```

This makes future CMS integration straightforward. A backend response should match the `siteConfig` object shape and be merged as overrides.

Recommended CMS mapping:

| CMS Area | Config Path |
| --- | --- |
| Brand settings | `brand` |
| Store contact | `business` |
| Social links | `social` |
| SEO metadata | `seo` |
| Homepage copy | `content.{language}.home` |
| Footer copy | `content.{language}.footer` |

## Language

Locales are stored in:

```text
src/locales/vi.js
src/locales/en.js
```

Language registration lives in:

```text
src/locales/index.js
```

To add a language:

1. Create a new locale file, for example `ja.js`.
2. Match the key structure used by `vi.js` and `en.js`.
3. Import and register the locale in `src/locales/index.js`.
4. Add the language metadata to `LANGUAGES`.

Use `t("path.to.key")` for fixed UI labels.

## Images

Local images are stored in:

```text
src/assets/images/
```

Recommended organization:

- `products/` for product images
- `testimonials/` for social and testimonial imagery
- `hero/` for hero visuals
- `categories/` for category artwork
- `backgrounds/` for decorative or page backgrounds

Guidelines:

- Use optimized JPG or WebP where possible.
- Preserve image aspect ratios to avoid layout shift.
- Keep product images square when possible.
- Use meaningful alt text for content images.

## Products

Product data lives in:

```text
src/data/products.js
```

Each product should include:

- `id`
- `name`
- `category`
- `price`
- `oldPrice`
- `discount`
- `rating`
- `reviews`
- `image`
- `gallery`
- `tags`
- `availability`
- Product option defaults such as size, sugar, and ice

When adding a product:

1. Add or import its image asset.
2. Add the product object to the relevant product array.
3. Add localized product text in locale files if the product appears in translated UI.
4. Verify menu filters and product detail routes.

## Admin Panel

Open:

```text
/admin
```

The admin panel can update:

- Brand name
- Logo text
- Hero title
- Hero subtitle
- Homepage banner
- Contact information
- Social links
- Theme
- Language

This panel is intentionally frontend-only and does not include authentication or backend storage.
