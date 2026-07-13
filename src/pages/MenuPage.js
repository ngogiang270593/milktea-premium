import { MenuFilterPanel } from '../components/menu/MenuFilterPanel.js';
import { MenuPagination } from '../components/menu/MenuPagination.js';
import { MenuProductCard } from '../components/menu/MenuProductCard.js';
import { MenuToolbar } from '../components/menu/MenuToolbar.js';
import { MENU_CATEGORIES } from '../repositories/CategoryRepository.js';
import { MENU_PRODUCTS } from '../repositories/ProductRepository.js';
import { t } from '../utils/i18n.js';
import { EmptyState } from '../components/ui/EmptyState.js';

function getSelectedCategory() {
  const category = new URLSearchParams(window.location.search).get('category');

  return MENU_CATEGORIES.find((item) => item.value === category);
}

export function MenuPage() {
  const selectedCategory = getSelectedCategory();
  const selectedCategoryTitle = selectedCategory ? t(`filters.categoryOptions.${selectedCategory.value}`) : '';
  const visibleProducts = selectedCategory
    ? MENU_PRODUCTS.filter((product) => product.category === selectedCategory.value)
    : MENU_PRODUCTS;
  const title = selectedCategoryTitle || t('menu.title');

  return `
    <section class="menu-page" aria-labelledby="menu-title">
      <div class="menu-container">
        <nav class="menu-breadcrumb" aria-label="${t('menu.breadcrumbAria')}">
          <ol data-menu-breadcrumb>
            <li><a href="/">${t('navbar.home')}</a></li>
            ${selectedCategory ? `<li><a href="/menu">${t('navbar.menu')}</a></li>` : `<li aria-current="page">${t('navbar.menu')}</li>`}
            ${selectedCategory ? `<li aria-current="page">${selectedCategoryTitle}</li>` : ''}
          </ol>
        </nav>

        <div class="menu-heading" data-reveal>
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('menu.eyebrow')}</p>
            <h1 id="menu-title" data-menu-title>${title}</h1>
          </div>
          <p>${t('menu.productCountPrefix')} <span data-product-count>${visibleProducts.length}</span> ${t('menu.productCountSuffix')}</p>
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
            ${EmptyState({
              title: t('menu.emptyTitle'),
              description: t('menu.emptyCopy'),
              actionHref: '/menu',
              actionLabel: t('menu.viewAll'),
              illustration: 'menu',
              className: 'menu-empty',
              attributes: {
                'data-menu-empty': '',
                hidden: true
              }
            })}
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
