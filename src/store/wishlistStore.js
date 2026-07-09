import { readWishlistItems, writeWishlistItems } from '../services/WishlistService.js';

let wishlist = loadWishlist();

function loadWishlist() {
  return readWishlistItems()
    .filter((item) => item?.id && item?.name && Number.isFinite(Number(item.price)))
    .map(normalizeProduct);
}

function saveWishlist() {
  writeWishlistItems(wishlist);
  window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: getWishlist() }));
}

function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.name || product.title,
    image: product.image,
    price: Number(product.price),
    oldPrice: Number(product.oldPrice || product.price),
    category: product.category || product.label || 'milk-tea',
    rating: Number(product.rating || 4.8)
  };
}

/**
 * Adds a product to the persisted wishlist when it is not already present.
 *
 * @param {Record<string, *>} product Product-like object.
 * @returns {Record<string, *>[]} Updated wishlist snapshot.
 */
export function addWishlistItem(product) {
  const item = normalizeProduct(product);

  if (!wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
    wishlist = [...wishlist, item];
    saveWishlist();
  }

  return getWishlist();
}

/**
 * Removes a product from the persisted wishlist.
 *
 * @param {string} id Product id.
 * @returns {Record<string, *>[]} Updated wishlist snapshot.
 */
export function removeWishlistItem(id) {
  wishlist = wishlist.filter((item) => item.id !== id);
  saveWishlist();
  return getWishlist();
}

/**
 * Toggles a product in the wishlist.
 *
 * @param {Record<string, *>} product Product-like object.
 * @returns {{active: boolean, wishlist: Record<string, *>[]}} Toggle state and snapshot.
 */
export function toggleWishlistItem(product) {
  if (isWishlistItem(product.id)) {
    removeWishlistItem(product.id);
    return { active: false, wishlist: getWishlist() };
  }

  addWishlistItem(product);
  return { active: true, wishlist: getWishlist() };
}

/**
 * Clears all wishlist items.
 *
 * @returns {Record<string, *>[]} Empty wishlist snapshot.
 */
export function clearWishlist() {
  wishlist = [];
  saveWishlist();
  return getWishlist();
}

/**
 * Returns an immutable wishlist snapshot.
 *
 * @returns {Record<string, *>[]} Wishlist snapshot.
 */
export function getWishlist() {
  return wishlist.map((item) => ({ ...item }));
}

/**
 * Checks whether a product is currently saved.
 *
 * @param {string} id Product id.
 * @returns {boolean} True when saved.
 */
export function isWishlistItem(id) {
  return wishlist.some((item) => item.id === id);
}

/**
 * Counts wishlist items.
 *
 * @returns {number} Wishlist item count.
 */
export function getWishlistCount() {
  return wishlist.length;
}
