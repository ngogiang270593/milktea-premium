import { MenuFilterPanel } from '../components/menu/MenuFilterPanel.js';
import { MenuPagination } from '../components/menu/MenuPagination.js';
import { MenuProductCard } from '../components/menu/MenuProductCard.js';
import { MenuToolbar } from '../components/menu/MenuToolbar.js';
import { MENU_PRODUCTS } from '../repositories/ProductRepository.js';
import { t } from '../utils/i18n.js';

export function MenuPage() {
  return `
    <section class="menu-page" aria-labelledby="menu-title">
      <div class="menu-container">
        <nav class="menu-breadcrumb" aria-label="${t('menu.breadcrumbAria')}">
          <ol>
            <li><a href="/">${t('navbar.home')}</a></li>
            <li aria-current="page">${t('navbar.menu')}</li>
          </ol>
        </nav>

        <div class="menu-heading" data-reveal>
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('menu.eyebrow')}</p>
            <h1 id="menu-title">${t('menu.title')}</h1>
          </div>
          <p>${t('menu.productCountPrefix')} <span data-product-count>${MENU_PRODUCTS.length}</span> ${t('menu.productCountSuffix')}</p>
        </div>

        ${MenuToolbar()}

        <div class="menu-layout">
          <aside class="hidden lg:block" aria-label="${t('filters.desktopRegionAria')}">
            ${MenuFilterPanel()}
          </aside>

          <section aria-label="${t('products.resultsAria')}" class="min-w-0">
            <div id="menu-results" class="menu-results-grid" data-menu-grid aria-live="polite">
              ${MENU_PRODUCTS.map(MenuProductCard).join('')}
            </div>
            <p class="menu-empty" data-menu-empty hidden>${t('menu.emptyState')}</p>
            ${MenuPagination(Math.ceil(MENU_PRODUCTS.length / 8))}
          </section>
        </div>
      </div>

      <div class="menu-filter-overlay" data-filter-overlay hidden aria-hidden="true"></div>
      <aside id="menu-filter-drawer" class="menu-filter-drawer" role="dialog" aria-modal="true" aria-label="${t('filters.mobileAria')}" aria-hidden="true" inert>
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-xl font-semibold text-[#1f1710]">${t('filters.title')}</h2>
          <button type="button" class="nav-icon-button ripple-button" data-filter-close aria-label="${t('filters.closeAria')}">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
          </button>
        </div>
        <div class="mt-8">
          ${MenuFilterPanel({ mobile: true })}
        </div>
      </aside>
    </section>
  `;
}
