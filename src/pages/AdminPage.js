import { getSiteConfig, getSiteContent } from '../config/siteConfig.js';
import { Button, Card, Input, Select, Textarea } from '../components/ui/index.js';
import { getAvailableLanguages, getLanguage } from '../store/languageStore.js';
import { getSelectableThemes, getResolvedTheme, getThemePreference } from '../store/themeStore.js';
import { t } from '../utils/i18n.js';

function renderInputField({ label, name, value = '', type = 'text', autocomplete, required = false }) {
  return `
    <label class="grid gap-2">
      <span class="text-sm font-bold text-[#1f1710]">${label}</span>
      ${Input({
        name,
        type,
        value,
        autocomplete,
        required,
        attributes: {
          'data-admin-field': name
        }
      })}
    </label>
  `;
}

function renderTextareaField({ label, name, value = '', rows = 4 }) {
  return `
    <label class="grid gap-2">
      <span class="text-sm font-bold text-[#1f1710]">${label}</span>
      ${Textarea({
        name,
        value,
        rows,
        attributes: {
          'data-admin-field': name
        }
      })}
    </label>
  `;
}

function renderSelectField({ label, name, value, options }) {
  return `
    <label class="grid gap-2">
      <span class="text-sm font-bold text-[#1f1710]">${label}</span>
      ${Select({
        name,
        value,
        options,
        attributes: {
          'data-admin-field': name
        }
      })}
    </label>
  `;
}

function renderAdminSection({ title, description, children }) {
  return Card({
    as: 'section',
    className: 'p-6 md:p-8',
    children: `
      <div class="mb-6">
        <h2 class="text-xl font-extrabold tracking-tight text-[#1f1710]">${title}</h2>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-[#7b6a5a]">${description}</p>
      </div>
      <div class="grid gap-5 md:grid-cols-2">
        ${children}
      </div>
    `
  });
}

/**
 * Renders the local configuration panel used to preview CMS-ready storefront content.
 *
 * @returns {string} Admin page markup.
 */
export function AdminPage() {
  const language = getLanguage();
  const siteConfig = getSiteConfig();
  const content = getSiteContent(language);
  const hero = content.home.hero;
  const promotion = content.home.promotion;
  const languageOptions = getAvailableLanguages().map((item) => ({
    value: item.code,
    label: t(item.labelKey)
  }));
  const themeOptions = getSelectableThemes().map((theme) => ({
    value: theme.value,
    label: theme.label
  }));
  const activeTheme = getResolvedTheme(getThemePreference());

  return `
    <main class="menu-page" aria-labelledby="admin-title">
      <div class="menu-container">
        <nav class="menu-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">${t('navbar.home')}</a></li>
            <li aria-current="page">Admin</li>
          </ol>
        </nav>

        <div class="menu-heading">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Configuration</p>
            <h1 id="admin-title">Admin Panel</h1>
          </div>
          <p>Local preview</p>
        </div>

        <form class="mt-10 grid gap-6" data-admin-config-form>
          ${renderAdminSection({
            title: 'Brand',
            description: 'Editable brand identity used across the storefront.',
            children: `
              ${renderInputField({ label: 'Brand Name', name: 'brand.name', value: siteConfig.brand.name, required: true })}
              ${renderInputField({ label: 'Logo Text', name: 'brand.logoText', value: siteConfig.brand.logoText, required: true })}
            `
          })}

          ${renderAdminSection({
            title: 'Homepage Hero',
            description: `Content for the currently active language: ${language.toUpperCase()}.`,
            children: `
              ${renderInputField({ label: 'Hero Title', name: `content.${language}.home.hero.title`, value: hero.title, required: true })}
              ${renderTextareaField({ label: 'Hero Subtitle', name: `content.${language}.home.hero.subtitle`, value: hero.subtitle, rows: 5 })}
            `
          })}

          ${renderAdminSection({
            title: 'Homepage Banner',
            description: 'Promotion banner copy shown on the homepage.',
            children: `
              ${renderInputField({ label: 'Banner Label', name: `content.${language}.home.promotion.eyebrow`, value: promotion.eyebrow })}
              ${renderInputField({ label: 'Banner Title', name: `content.${language}.home.promotion.title`, value: promotion.title })}
              ${renderTextareaField({ label: 'Banner Description', name: `content.${language}.home.promotion.copy`, value: promotion.copy, rows: 4 })}
              ${renderInputField({ label: 'Banner CTA', name: `content.${language}.home.promotion.cta`, value: promotion.cta })}
            `
          })}

          ${renderAdminSection({
            title: 'Contact Information',
            description: 'Customer-facing store contact details.',
            children: `
              ${renderInputField({ label: 'Email', name: 'business.email', type: 'email', value: siteConfig.business.email, autocomplete: 'email' })}
              ${renderInputField({ label: 'Phone', name: 'business.phone', type: 'tel', value: siteConfig.business.phone, autocomplete: 'tel' })}
              ${renderInputField({ label: 'Address', name: `business.address.${language}`, value: siteConfig.business.address[language] || '' })}
              ${renderInputField({ label: 'Opening Hours', name: `business.openingHours.${language}`, value: siteConfig.business.openingHours[language] || '' })}
            `
          })}

          ${renderAdminSection({
            title: 'Social Links',
            description: 'External links used by the footer and social sections.',
            children: `
              ${renderInputField({ label: 'Facebook', name: 'social.facebook', type: 'url', value: siteConfig.social.facebook })}
              ${renderInputField({ label: 'Instagram', name: 'social.instagram', type: 'url', value: siteConfig.social.instagram })}
              ${renderInputField({ label: 'TikTok', name: 'social.tiktok', type: 'url', value: siteConfig.social.tiktok })}
              ${renderInputField({ label: 'YouTube', name: 'social.youtube', type: 'url', value: siteConfig.social.youtube })}
            `
          })}

          ${renderAdminSection({
            title: 'Preferences',
            description: 'Preview storefront theme and language without a page reload.',
            children: `
              ${renderSelectField({ label: 'Theme', name: 'adminTheme', value: activeTheme, options: themeOptions })}
              ${renderSelectField({ label: 'Language', name: 'adminLanguage', value: language, options: languageOptions })}
            `
          })}

          <div class="flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-[0_18px_50px_rgba(48,35,24,0.08)] backdrop-blur-xl sm:flex-row sm:items-center">
            <p class="text-sm font-semibold text-[#7b6a5a]" role="status" aria-live="polite" data-admin-config-status>
              Changes are saved to this browser and can later be replaced by an API response.
            </p>
            ${Button({
              type: 'submit',
              children: 'Save Configuration',
              className: 'min-w-44'
            })}
          </div>
        </form>
      </div>
    </main>
  `;
}
