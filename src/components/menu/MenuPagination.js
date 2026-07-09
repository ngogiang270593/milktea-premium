import { t } from '../../utils/i18n.js';

export function MenuPagination(totalPages = 2) {
  return `
    <nav class="menu-pagination" aria-label="${t('menu.paginationAria')}" data-menu-pagination>
      <button type="button" data-page-prev aria-label="${t('menu.previousPageAria')}">${t('buttons.previous')}</button>
      ${Array.from({ length: totalPages }, (_, index) => `
        <button type="button" data-page="${index + 1}" class="${index === 0 ? 'is-active' : ''}" aria-current="${index === 0 ? 'page' : 'false'}">${index + 1}</button>
      `).join('')}
      <button type="button" data-page-next aria-label="${t('menu.nextPageAria')}">${t('buttons.next')}</button>
    </nav>
  `;
}
