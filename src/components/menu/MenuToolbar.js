import { SORT_OPTIONS } from '../../data/categories.js';
import { t } from '../../utils/i18n.js';

export function MenuToolbar() {
  return `
    <section class="menu-toolbar" aria-label="${t('menu.controlsAria')}">
      <div class="relative flex-1">
        <label for="menu-search" class="sr-only">${t('menu.searchLabel')}</label>
        <svg viewBox="0 0 24 24" class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a7767]" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="m21 21-4.35-4.35"></path>
          <circle cx="11" cy="11" r="7"></circle>
        </svg>
        <input id="menu-search" type="search" placeholder="${t('menu.searchPlaceholder')}" class="menu-search-input" autocomplete="off" aria-controls="menu-results" data-menu-search />
      </div>

      <label class="sr-only" for="menu-sort">${t('sort.label')}</label>
      <select id="menu-sort" class="menu-select" data-menu-sort>
        ${SORT_OPTIONS.map((option) => `<option value="${option.value}">${t(`sort.options.${option.value}`)}</option>`).join('')}
      </select>

      <div class="menu-view-switch" aria-label="${t('menu.viewSwitchAria')}">
        <button type="button" class="is-active" data-view-mode="grid" aria-pressed="true" aria-label="${t('menu.gridViewAria')}">${t('menu.gridView')}</button>
        <button type="button" data-view-mode="list" aria-pressed="false" aria-label="${t('menu.listViewAria')}">${t('menu.listView')}</button>
      </div>

      <button type="button" class="menu-filter-trigger ripple-button lg:hidden" data-filter-open aria-controls="menu-filter-drawer" aria-expanded="false" aria-label="${t('filters.openAria')}">
        ${t('filters.title')}
      </button>
    </section>
  `;
}
