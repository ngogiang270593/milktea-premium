import { readJson, writeJson } from './StorageService.js';

export const CART_STORAGE_KEY = 'milktea-premium-cart';

export function readCartItems() {
  return readJson(CART_STORAGE_KEY, []);
}

export function writeCartItems(items) {
  return writeJson(CART_STORAGE_KEY, items);
}
