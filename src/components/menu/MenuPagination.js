export function MenuPagination(totalPages = 2) {
  return `
    <nav class="menu-pagination" aria-label="Menu pagination" data-menu-pagination>
      <button type="button" data-page-prev aria-label="Previous page">Prev</button>
      ${Array.from({ length: totalPages }, (_, index) => `
        <button type="button" data-page="${index + 1}" class="${index === 0 ? 'is-active' : ''}" aria-current="${index === 0 ? 'page' : 'false'}">${index + 1}</button>
      `).join('')}
      <button type="button" data-page-next aria-label="Next page">Next</button>
    </nav>
  `;
}
