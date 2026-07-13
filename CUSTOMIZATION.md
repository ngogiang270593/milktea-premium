# Customization

MilkTea Premium is structured so buyers can customize content, branding, themes, images, products, and language without rewriting the application.

## Brand and Business Information

Edit:

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
- `business.mapUrl`
- `social.facebook`
- `social.instagram`
- `social.tiktok`
- `social.youtube`

The `/admin` page can also update selected values locally. Admin changes are saved to `localStorage` and merged over the default config.

## CMS-Ready Content

Editable marketing and business content is read through:

```js
getSiteConfig()
getSiteContent(language)
```

A future CMS should return data matching the `siteConfig` shape. Components can keep using the same getters.

Recommended CMS mapping:

| CMS Area | Config Path |
| --- | --- |
| Brand settings | `brand` |
| Contact details | `business` |
| Social links | `social` |
| SEO metadata | `seo` |
| Homepage content | `content.{language}.home` |
| Footer content | `content.{language}.footer` |
| Popular searches | `search.popularTerms` |

## Themes

Edit:

```text
src/store/themeStore.js
```

Theme definitions use CSS variables for:

- Page background
- Surface colors
- Border colors
- Text colors
- Brand colors
- Accent colors
- Shadows
- Gradients

To add a theme:

1. Add a value to the theme constants.
2. Add a theme definition.
3. Add it to selectable themes.
4. Add localized labels in `src/locales/vi.js` and `src/locales/en.js`.

## Language

Locales live in:

```text
src/locales/
```

To add a language:

1. Create a locale file, for example `ja.js`.
2. Match the key structure in `vi.js` and `en.js`.
3. Register the locale in `src/locales/index.js`.
4. Add language metadata in the language store.

Use:

```js
t('path.to.key')
```

for fixed UI labels. Keep editable marketing/business content in `siteConfig`.

## Products

Edit:

```text
src/data/products.js
```

Each product should include:

- `id`
- `name`
- `category`
- `image`
- `gallery`
- `rating`
- `reviews`
- `price`
- `oldPrice`
- `discount`
- `size`
- `sugar`
- `ice`
- `availability`
- `tags`

Add localized product names and descriptions in the locale files under `products.items`.

## Categories

Edit:

```text
src/data/categories.js
```

Category values should match product `category` values and menu filter keys.

## Images

Images live in:

```text
src/assets/images/
```

Recommended folders:

- `products/`
- `categories/`
- `hero/`
- `testimonials/`
- `backgrounds/`
- `icons/`

Guidelines:

- Use optimized JPG or WebP.
- Keep product images square.
- Preserve `width` and `height` attributes through the shared image helper.
- Use descriptive alt text for content images.
- Avoid remote image URLs in production packages.

## Screenshots

Suggested marketplace screenshots:

```text
screenshots/home-desktop.jpg
screenshots/home-mobile.jpg
screenshots/menu.jpg
screenshots/product-detail.jpg
screenshots/checkout.jpg
screenshots/admin.jpg
```

## Admin Panel

Open:

```text
/admin
```

The admin panel is frontend-only. It is intended for local preview and future API integration, not secure production administration.
