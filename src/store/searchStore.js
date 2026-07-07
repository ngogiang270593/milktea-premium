import { CART_PRODUCTS } from '../data/products.js';
import { formatCategoryName } from '../utils/format.js';

const RECENT_SEARCHES_KEY = 'milktea-premium-recent-searches';

export const POPULAR_SEARCHES = ['brown sugar', 'matcha', 'fruit tea', 'coffee', 'smoothie', 'topping'];

function readRecentSearches() {
  try {
    return JSON.parse(window.localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
  } catch {
    return [];
  }
}

function writeRecentSearches(searches) {
  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches.slice(0, 6)));
}

function normalize(value) {
  return String(value || '').toLowerCase().trim();
}

function searchableText(product) {
  return [
    product.name,
    formatCategoryName(product.category),
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
  return nextSearches.slice(0, 6);
}

export function clearRecentSearches() {
  writeRecentSearches([]);
  return [];
}

export function highlightMatch(value, term) {
  const text = String(value || '');
  const query = term.trim();

  if (!query) {
    return text;
  }

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escapedQuery})`, 'ig'), '<mark>$1</mark>');
}

export function searchProducts(term) {
  const query = normalize(term);

  if (!query) {
    return [];
  }

  return CART_PRODUCTS
    .filter((product, index, products) => products.findIndex((item) => item.id === product.id) === index)
    .map((product) => ({
      ...product,
      score: searchableText(product).includes(query) ? 1 : 0
    }))
    .filter((product) => product.score > 0)
    .slice(0, 8);
}
