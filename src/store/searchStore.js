import { CART_PRODUCTS } from '../repositories/ProductRepository.js';
import { formatCategoryName } from '../utils/format.js';
import { escapeHtml } from '../utils/html.js';
import { t } from '../utils/i18n.js';
import { readJson, writeJson } from '../utils/storage.js';
import { getLanguage } from './languageStore.js';

const RECENT_SEARCHES_KEY = 'milktea-premium-recent-searches';
const MAX_RECENT_SEARCHES = 5;
const searchCache = new Map();

function readRecentSearches() {
  return readJson(RECENT_SEARCHES_KEY, []);
}

function writeRecentSearches(searches) {
  writeJson(RECENT_SEARCHES_KEY, searches.slice(0, MAX_RECENT_SEARCHES));
}

function normalize(value) {
  return String(value || '').toLowerCase().trim();
}

function searchableText(product) {
  const nameKey = `products.items.${product.id}.name`;
  const descriptionKey = `products.items.${product.id}.description`;
  const categoryKey = `filters.categoryOptions.${product.category}`;
  const localizedName = t(nameKey);
  const localizedDescription = t(descriptionKey);
  const localizedCategory = t(categoryKey);

  return [
    product.name,
    localizedName === nameKey ? '' : localizedName,
    localizedDescription === descriptionKey ? '' : localizedDescription,
    formatCategoryName(product.category),
    localizedCategory === categoryKey ? '' : localizedCategory,
    product.category,
    ...(product.tags || [])
  ].join(' ').toLowerCase();
}

export function getRecentSearches() {
  return readRecentSearches();
}

export function saveRecentSearch(term) {
  const normalizedTerm = term.trim();

  if (!normalizedTerm) {
    return getRecentSearches();
  }

  const nextSearches = [
    normalizedTerm,
    ...getRecentSearches().filter((item) => item.toLowerCase() !== normalizedTerm.toLowerCase())
  ];

  writeRecentSearches(nextSearches);
  return nextSearches.slice(0, MAX_RECENT_SEARCHES);
}

export function clearRecentSearches() {
  writeRecentSearches([]);
  return [];
}

export function highlightMatch(value, term) {
  const text = String(value || '');
  const query = term.trim();

  if (!query) {
    return escapeHtml(text);
  }

  const escapedText = escapeHtml(text);
  const escapedQuery = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return escapedText.replace(new RegExp(`(${escapedQuery})`, 'ig'), '<mark>$1</mark>');
}

export function searchProducts(term) {
  const query = normalize(term);
  const cacheKey = `${getLanguage()}:${query}`;

  if (!query) {
    return [];
  }

  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  const results = CART_PRODUCTS
    .filter((product, index, products) => products.findIndex((item) => item.id === product.id) === index)
    .map((product) => ({
      ...product,
      score: searchableText(product).includes(query) ? 1 : 0
    }))
    .filter((product) => product.score > 0)
    .slice(0, 8);

  searchCache.set(cacheKey, results);
  return results;
}
