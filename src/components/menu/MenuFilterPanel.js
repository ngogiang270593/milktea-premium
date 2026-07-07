import { MENU_CATEGORIES, MENU_FILTERS } from '../../data/categories.js';

function checkbox(name, value, label, count = null) {
  return `
    <label class="menu-filter-option">
      <input type="checkbox" name="${name}" value="${value}" data-menu-filter />
      <span>${label}</span>
      ${count === null ? '' : `<small>${count}</small>`}
    </label>
  `;
}

function filterGroup(title, content) {
  return `
    <fieldset class="menu-filter-group">
      <legend>${title}</legend>
      <div class="mt-4 grid gap-3">
        ${content}
      </div>
    </fieldset>
  `;
}

export function MenuFilterPanel({ mobile = false } = {}) {
  return `
    <form class="menu-filter-panel" aria-label="${mobile ? 'Mobile menu filters' : 'Menu filters'}">
      ${filterGroup('Categories', MENU_CATEGORIES.map((category) => checkbox('category', category.value, category.label, category.count)).join(''))}

      <fieldset class="menu-filter-group">
        <legend>Price range</legend>
        <label class="mt-4 block text-sm text-[#6f5f51]" for="${mobile ? 'mobile-' : ''}menu-price">Maximum price</label>
        <input id="${mobile ? 'mobile-' : ''}menu-price" type="range" min="2" max="12" value="12" step="0.5" class="menu-range" data-price-range />
        <div class="mt-2 flex items-center justify-between text-xs font-semibold text-[#7b6a5a]">
          <span>$2</span>
          <span data-price-value>$12</span>
        </div>
      </fieldset>

      ${filterGroup('Size', MENU_FILTERS.sizes.map((size) => checkbox('size', size, size)).join(''))}
      ${filterGroup('Sugar level', MENU_FILTERS.sugarLevels.map((level) => checkbox('sugar', level, level)).join(''))}
      ${filterGroup('Ice level', MENU_FILTERS.iceLevels.map((level) => checkbox('ice', level, level)).join(''))}
      ${filterGroup('Availability', MENU_FILTERS.availability.map((item) => checkbox('availability', item, item)).join(''))}
    </form>
  `;
}
