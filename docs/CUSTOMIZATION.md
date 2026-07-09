# Customization Guide

This guide explains the safest way to customize MilkTea Premium without breaking architecture.

## Brand Identity

Edit default brand values in:

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

You can also edit key values from:

```text
/admin
```

Admin changes are saved locally in the browser.

## Products

Product data is stored in:

```text
src/data/products.js
```

Access product data through:

```text
src/repositories/ProductRepository.js
```

When adding a product:

1. Add the image asset.
2. Import it into `products.js`.
3. Add the product object.
4. Add localized product copy if needed.
5. Verify menu filters and product detail page.

## Categories and Filters

Category/filter data lives in:

```text
src/data/categories.js
```

Access it through:

```text
src/repositories/CategoryRepository.js
```

Keep category values stable because filters, product records, and translations reference them.

## Images

Local images live in:

```text
src/assets/images/
```

Recommended structure:

- `products/`
- `hero/`
- `categories/`
- `testimonials/`
- `backgrounds/`
- `icons/`

Guidelines:

- Use optimized JPG or WebP.
- Keep product images square.
- Preserve aspect ratios.
- Provide useful alt text for meaningful images.
- Use decorative images with empty alt text or `aria-hidden`.

## UI Components

Reusable primitives live in:

```text
src/components/ui/
```

Use them for new interface work:

- Button
- Input
- Select
- Checkbox
- Switch
- Badge
- Chip
- Card
- Modal
- Drawer
- Tabs
- Accordion
- Toast
- EmptyState

## Styling

CSS layers:

```text
src/assets/css/base.css
src/assets/css/components.css
src/assets/css/utilities.css
```

Design tokens:

```text
src/design/
```

Prefer extending tokens and reusable components before adding one-off CSS.

## Language

Fixed UI text lives in:

```text
src/locales/
```

Use:

```js
t('buttons.addToCart')
```

Editable marketing copy should remain in `siteConfig`, not locale files.

## Theme

Theme definitions live in:

```text
src/constants/theme.js
```

Theme logic lives in:

```text
src/store/themeStore.js
```

See [THEME.md](THEME.md) for details.

## Safe Customization Checklist

- Run `npm run lint`.
- Run `npm run test:run`.
- Run `npm run build`.
- Test desktop, tablet, and mobile.
- Test language switching.
- Test theme switching.
- Test cart and wishlist persistence.
- Test route refresh on `/menu`, `/product`, `/cart`, `/wishlist`, and `/admin`.

