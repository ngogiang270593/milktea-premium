import { readJson, writeJson } from './StorageService.js';

export const WISHLIST_STORAGE_KEY = 'milktea-premium-wishlist';

export function readWishlistItems() {
  return readJson(WISHLIST_STORAGE_KEY, []);
}

export function writeWishlistItems(items) {
  return writeJson(WISHLIST_STORAGE_KEY, items);
}
