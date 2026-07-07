import { SORT_OPTIONS } from '../../data/categories.js';

export function MenuToolbar() {
  return `
    <section class="menu-toolbar" aria-label="Menu controls">
      <div class="relative flex-1">
        <label for="menu-search" class="sr-only">Search menu</label>
        <svg viewBox="0 0 24 24" class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a7767]" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="m21 21-4.35-4.35"></path>
          <circle cx="11" cy="11" r="7"></circle>
        </svg>
        <input id="menu-search" type="search" placeholder="Search milk tea, coffee, toppings..." class="menu-search-input" data-menu-search />
      </div>

      <label class="sr-only" for="menu-sort">Sort products</label>
      <select id="menu-sort" class="menu-select" data-menu-sort>
        ${SORT_OPTIONS.map((option) => `<option value="${option.value}">${option.label}</option>`).join('')}
      </select>

      <div class="menu-view-switch" aria-label="Choose product view">
        <button type="button" class="is-active" data-view-mode="grid" aria-pressed="true">Grid</button>
        <button type="button" data-view-mode="list" aria-pressed="false">List</button>
      </div>

      <button type="button" class="menu-filter-trigger ripple-button lg:hidden" data-filter-open aria-controls="menu-filter-drawer" aria-expanded="false">
        Filters
      </button>
    </section>
  `;
}
