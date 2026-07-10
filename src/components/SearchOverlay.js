import { Chip } from './ui/index.js';
import { POPULAR_SEARCHES } from '../store/searchStore.js';
import { t } from '../utils/i18n.js';

function searchChip(term, type) {
  return Chip({
    children: term,
    className: 'search-chip',
    attributes: {
      'data-search-term': term,
      [`data-search-${type}`]: true
    }
  });
}

export function SearchOverlay() {
  const search = {
    placeholder: t('search.placeholder'),
    popularSearches: t('search.popularSearches'),
    recentSearches: t('search.recentSearches'),
    clear: t('search.clear'),
    noResults: t('search.noResults'),
    emptyCopy: t('search.emptyCopy')
  };

  return `
    <div class="search-overlay" data-search-overlay hidden aria-hidden="true">
      <div class="search-scrim" data-search-close></div>
      <section class="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">${t('buttons.search')}</p>
            <h2 id="search-title">Find your next drink.</h2>
          </div>
          <button type="button" class="nav-icon-button ripple-button" data-search-close aria-label="${t('buttons.close')}">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
          </button>
        </div>

        <div class="search-input-wrap">
          <label for="global-search" class="sr-only">Search products by name, category, or tags</label>
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="m21 21-4.35-4.35"></path>
            <circle cx="11" cy="11" r="7"></circle>
          </svg>
          <input id="global-search" type="search" placeholder="${search.placeholder}" autocomplete="off" data-search-input />
        </div>

        <div class="search-meta" data-search-meta>
          <section aria-labelledby="popular-searches-title">
            <h3 id="popular-searches-title">${search.popularSearches}</h3>
            <div class="search-chip-row">
              ${POPULAR_SEARCHES.map((term) => searchChip(term, 'popular')).join('')}
            </div>
          </section>
          <section aria-labelledby="recent-searches-title">
            <div class="flex items-center justify-between gap-4">
              <h3 id="recent-searches-title">${search.recentSearches}</h3>
              <button type="button" class="search-clear" data-search-clear>${search.clear}</button>
            </div>
            <div class="search-chip-row" data-search-recent-list></div>
          </section>
        </div>

        <div class="search-results" data-search-results role="listbox" aria-label="${t('products.resultsAria')}" aria-live="polite"></div>
        <div class="search-empty" data-search-empty hidden>
          <h3>${search.noResults}</h3>
          <p>${search.emptyCopy}</p>
        </div>
      </section>
    </div>
  `;
}
