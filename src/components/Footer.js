import { getSiteConfig, getSiteContent } from '../config/siteConfig.js';
import { getLanguage } from '../store/languageStore.js';
import { t } from '../utils/i18n.js';

export function Footer() {
  const language = getLanguage();
  const siteConfig = getSiteConfig();
  const footer = getSiteContent(language).footer;

  return `
    <footer class="border-t border-gray-200 bg-white py-14" aria-label="${t('footer.label')}">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid gap-10 md:grid-cols-3">
          <div>
            <p class="text-lg font-semibold text-brand-green">${siteConfig.brand.name}</p>
            <p class="mt-4 max-w-sm text-sm text-gray-600">${footer.tagline}</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">${t('footer.explore')}</p>
            <nav class="mt-4" aria-label="${t('footer.navigation')}">
            <ul class="space-y-3 text-sm text-gray-600">
              <li><a href="#categories" class="hover:text-brand-green">${t('navbar.categories')}</a></li>
              <li><a href="#featured" class="hover:text-brand-green">${t('navbar.featured')}</a></li>
              <li><a href="#testimonials" class="hover:text-brand-green">${t('navbar.testimonials')}</a></li>
            </ul>
            </nav>
          </div>
          <div>
            <p class="font-semibold text-gray-900">${t('footer.contact')}</p>
            <ul class="mt-4 space-y-3 text-sm text-gray-600">
              <li>${siteConfig.business.address[language]}</li>
              <li><a href="mailto:${siteConfig.business.email}" class="hover:text-brand-green">${siteConfig.business.email}</a></li>
              <li><a href="tel:${siteConfig.business.phone.replaceAll(' ', '')}" class="hover:text-brand-green">${siteConfig.business.phone}</a></li>
              <li>${siteConfig.business.openingHours[language]}</li>
            </ul>
          </div>
        </div>
        <div class="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">&copy; ${siteConfig.business.copyrightYear} ${siteConfig.brand.name}. ${footer.copyright}</div>
      </div>
    </footer>
  `;
}
