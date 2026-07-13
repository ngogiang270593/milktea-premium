import { getSiteConfig, getSiteContent } from '../config/siteConfig.js';
import { Button } from '../components/ui/Button.js';
import { Card } from '../components/ui/Card.js';
import { Input } from '../components/ui/Input.js';
import { Select } from '../components/ui/Select.js';
import { Textarea } from '../components/ui/Textarea.js';
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

function themeLabel(theme) {
  const key = `theme.names.${theme.value}`;
  const label = t(key);

  return label === key ? theme.label : label;
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
    label: themeLabel(theme)
  }));
  const activeTheme = getResolvedTheme(getThemePreference());

  return `
    <section class="menu-page" aria-labelledby="admin-title">
      <div class="menu-container">
        <nav class="menu-breadcrumb" aria-label="${t('menu.breadcrumbAria')}">
          <ol>
            <li><a href="/">${t('navbar.home')}</a></li>
            <li aria-current="page">${t('admin.breadcrumb')}</li>
          </ol>
        </nav>

        <div class="menu-heading">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('admin.eyebrow')}</p>
            <h1 id="admin-title">${t('admin.title')}</h1>
          </div>
          <p>${t('admin.localPreview')}</p>
        </div>

        <form class="mt-10 grid gap-6" data-admin-config-form>
          ${renderAdminSection({
            title: t('admin.sections.brand.title'),
            description: t('admin.sections.brand.description'),
            children: `
              ${renderInputField({ label: t('admin.fields.brandName'), name: 'brand.name', value: siteConfig.brand.name, required: true })}
              ${renderInputField({ label: t('admin.fields.logoText'), name: 'brand.logoText', value: siteConfig.brand.logoText, required: true })}
            `
          })}

          ${renderAdminSection({
            title: t('admin.sections.hero.title'),
            description: t('admin.sections.hero.description', { language: language.toUpperCase() }),
            children: `
              ${renderInputField({ label: t('admin.fields.heroTitle'), name: `content.${language}.home.hero.title`, value: hero.title, required: true })}
              ${renderTextareaField({ label: t('admin.fields.heroSubtitle'), name: `content.${language}.home.hero.subtitle`, value: hero.subtitle, rows: 5 })}
            `
          })}

          ${renderAdminSection({
            title: t('admin.sections.banner.title'),
            description: t('admin.sections.banner.description'),
            children: `
              ${renderInputField({ label: t('admin.fields.bannerLabel'), name: `content.${language}.home.promotion.eyebrow`, value: promotion.eyebrow })}
              ${renderInputField({ label: t('admin.fields.bannerTitle'), name: `content.${language}.home.promotion.title`, value: promotion.title })}
              ${renderTextareaField({ label: t('admin.fields.bannerDescription'), name: `content.${language}.home.promotion.copy`, value: promotion.copy, rows: 4 })}
              ${renderInputField({ label: t('admin.fields.bannerCta'), name: `content.${language}.home.promotion.cta`, value: promotion.cta })}
            `
          })}

          ${renderAdminSection({
            title: t('admin.sections.contact.title'),
            description: t('admin.sections.contact.description'),
            children: `
              ${renderInputField({ label: t('admin.fields.email'), name: 'business.email', type: 'email', value: siteConfig.business.email, autocomplete: 'email' })}
              ${renderInputField({ label: t('admin.fields.phone'), name: 'business.phone', type: 'tel', value: siteConfig.business.phone, autocomplete: 'tel' })}
              ${renderInputField({ label: t('admin.fields.address'), name: `business.address.${language}`, value: siteConfig.business.address[language] || '' })}
              ${renderInputField({ label: t('admin.fields.openingHours'), name: `business.openingHours.${language}`, value: siteConfig.business.openingHours[language] || '' })}
            `
          })}

          ${renderAdminSection({
            title: t('admin.sections.social.title'),
            description: t('admin.sections.social.description'),
            children: `
              ${renderInputField({ label: 'Facebook', name: 'social.facebook', type: 'url', value: siteConfig.social.facebook })}
              ${renderInputField({ label: 'Instagram', name: 'social.instagram', type: 'url', value: siteConfig.social.instagram })}
              ${renderInputField({ label: 'TikTok', name: 'social.tiktok', type: 'url', value: siteConfig.social.tiktok })}
              ${renderInputField({ label: 'YouTube', name: 'social.youtube', type: 'url', value: siteConfig.social.youtube })}
            `
          })}

          ${renderAdminSection({
            title: t('admin.sections.preferences.title'),
            description: t('admin.sections.preferences.description'),
            children: `
              ${renderSelectField({ label: t('admin.fields.theme'), name: 'adminTheme', value: activeTheme, options: themeOptions })}
              ${renderSelectField({ label: t('common.language'), name: 'adminLanguage', value: language, options: languageOptions })}
            `
          })}

          <div class="flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-[0_18px_50px_rgba(48,35,24,0.08)] backdrop-blur-xl sm:flex-row sm:items-center">
            <p class="text-sm font-semibold text-[#7b6a5a]" role="status" aria-live="polite" data-admin-config-status>
              ${t('admin.status.idle')}
            </p>
            ${Button({
              type: 'submit',
              children: t('admin.actions.saveConfiguration'),
              className: 'min-w-44'
            })}
          </div>
        </form>
      </div>
    </section>
  `;
}
