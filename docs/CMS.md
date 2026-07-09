# CMS Integration Guide

MilkTea Premium is prepared for future CMS integration by separating editable business content from UI components.

## Current Content Source

Editable business content is centralized in:

```text
src/config/siteConfig.js
```

The config includes:

- Brand identity
- Contact information
- Opening hours
- Social links
- SEO metadata
- Homepage content
- Footer content
- Search and order success copy

## Runtime API

Components should read content through these functions:

```js
getSiteConfig()
getSiteContent(language)
siteText(path, language, params)
```

This keeps component code independent from where the content comes from.

## Admin Overrides

The `/admin` panel saves local configuration overrides to `localStorage`.

Persistence is handled through:

```text
src/services/SettingsService.js
```

The default config and saved overrides are merged at runtime.

## Recommended CMS Shape

A CMS response should follow the same shape as `siteConfig`.

Example:

```js
{
  brand: {
    name: "MilkTea Premium",
    logoText: "MP"
  },
  business: {
    email: "support@example.com",
    phone: "+1 800 555 0199",
    address: {
      vi: "New York, NY",
      en: "New York, NY"
    }
  },
  social: {
    instagram: "https://instagram.com/example"
  },
  content: {
    vi: {
      home: {
        hero: {
          title: "Enjoy Every Sip."
        }
      }
    }
  }
}
```

## Future API Strategy

Recommended production flow:

1. Fetch CMS configuration on app startup.
2. Validate the response shape.
3. Merge CMS values over the default config.
4. Keep local admin overrides optional for development only.
5. Cache CMS content if needed for performance.

## What Belongs in CMS

Good CMS candidates:

- Brand name
- Logo text
- Hero copy
- Promotion copy
- Footer copy
- Store contact information
- Social links
- SEO titles and descriptions
- Homepage marketing sections

Keep fixed UI labels in locale files, not CMS.

## What Should Stay Outside CMS

Do not store these in CMS unless you are building a larger backend system:

- Cart state
- Wishlist state
- Theme implementation
- Route definitions
- Component markup
- Business calculations
- Build configuration

