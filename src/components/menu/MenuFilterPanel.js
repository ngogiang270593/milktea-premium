import { MENU_CATEGORIES, MENU_FILTERS } from '../../repositories/CategoryRepository.js';
import { Checkbox } from '../ui/index.js';
import { t } from '../../utils/i18n.js';

function checkbox(name, value, label, count = null) {
  return Checkbox({
    name,
    value,
    label,
    count,
    className: 'menu-filter-option',
    inputAttributes: {
      'data-menu-filter': true
    }
  });
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

function ratingKey(value) {
  return String(value).replace('.', '_');
}

export function MenuFilterPanel({ mobile = false } = {}) {
  return `
    <form class="menu-filter-panel" aria-label="${mobile ? t('filters.mobileAria') : t('filters.desktopAria')}">
      ${filterGroup(t('filters.categories'), MENU_CATEGORIES.map((category) => checkbox('category', category.value, t(`filters.categoryOptions.${category.value}`), category.count)).join(''))}

      <fieldset class="menu-filter-group">
        <legend>${t('filters.priceRange')}</legend>
        <label class="mt-4 block text-sm text-[#6f5f51]" for="${mobile ? 'mobile-' : ''}menu-price">${t('filters.maximumPrice')}</label>
        <input id="${mobile ? 'mobile-' : ''}menu-price" type="range" min="2" max="12" value="12" step="0.5" class="menu-range" data-price-range />
        <div class="mt-2 flex items-center justify-between text-xs font-semibold text-[#7b6a5a]">
          <span>$2</span>
          <span data-price-value>$12</span>
        </div>
      </fieldset>

      ${filterGroup(t('filters.size'), MENU_FILTERS.sizes.map((size) => checkbox('size', size, t(`filters.sizeOptions.${size}`))).join(''))}
      ${filterGroup(t('filters.rating'), MENU_FILTERS.ratings.map((rating) => checkbox('rating', rating.value, t(`filters.ratingOptions.${ratingKey(rating.value)}`))).join(''))}
      ${filterGroup(t('filters.sugarLevel'), MENU_FILTERS.sugarLevels.map((level) => checkbox('sugar', level, t('filters.sugarValue', { value: level }))).join(''))}
      ${filterGroup(t('filters.iceLevel'), MENU_FILTERS.iceLevels.map((level) => checkbox('ice', level, t(`filters.iceOptions.${level}`))).join(''))}
      ${filterGroup(t('filters.availability'), MENU_FILTERS.availability.map((item) => checkbox('availability', item, t(`filters.availabilityOptions.${item}`))).join(''))}
    </form>
  `;
}
