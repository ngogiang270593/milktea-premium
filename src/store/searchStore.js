import { CART_PRODUCTS } from '../data/products.js';
import { formatCategoryName } from '../utils/format.js';
import { escapeHtml } from '../utils/html.js';
import { readJson, writeJson } from '../utils/storage.js';

const RECENT_SEARCHES_KEY = 'milktea-premium-recent-searches';

export const POPULAR_SEARCHES = ['brown sugar', 'matcha', 'fruit tea', 'coffee', 'smoothie', 'topping'];

function readRecentSearches() {
  return readJson(RECENT_SEARCHES_KEY, []);
}

function writeRecentSearches(searches) {
  writeJson(RECENT_SEARCHES_KEY, searches.slice(0, 6));
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
    return escapeHtml(text);
  }

  const escapedText = escapeHtml(text);
  const escapedQuery = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return escapedText.replace(new RegExp(`(${escapedQuery})`, 'ig'), '<mark>$1</mark>');
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
