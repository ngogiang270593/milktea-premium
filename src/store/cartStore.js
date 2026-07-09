import { readJson, writeJson } from '../utils/storage.js';

const CART_KEY = 'milktea-premium-cart';
const SHIPPING_FEE = 4.99;
const FREE_SHIPPING_THRESHOLD = 35;

let cart = loadCart();

function loadCart() {
  return readJson(CART_KEY, [])
    .filter((item) => item?.id && item?.name && Number.isFinite(Number(item.price)))
    .map(normalizeProduct);
}

function saveCart() {
  writeJson(CART_KEY, cart);
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: getCart() }));
}

function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.name || product.title,
    image: product.image,
    price: Number(product.price),
    oldPrice: Number(product.oldPrice || product.price),
    variant: product.variant || [
      product.size || 'Regular',
      product.sugar ? `${product.sugar} sugar` : '50% sugar',
      product.ice || 'Regular ice'
    ].join(' / '),
    quantity: Math.max(1, Math.min(99, Number(product.quantity || 1)))
  };
}

/**
 * Adds a product or product variant to the persisted cart.
 *
 * @param {Record<string, *>} product Product-like object.
 * @returns {Record<string, *>[]} Updated cart snapshot.
 */
export function addItem(product) {
  const item = normalizeProduct(product);
  const existingItem = cart.find((cartItem) => cartItem.id === item.id && cartItem.variant === item.variant);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart = [...cart, item];
  }

  saveCart();
  return getCart();
}

/**
 * Removes all cart entries with the provided product id.
 *
 * @param {string} id Product id.
 * @returns {Record<string, *>[]} Updated cart snapshot.
 */
export function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  return getCart();
}

/**
 * Increases the quantity for matching cart entries.
 *
 * @param {string} id Product id.
 * @returns {Record<string, *>[]} Updated cart snapshot.
 */
export function increaseQuantity(id) {
  cart = cart.map((item) => (
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  ));
  saveCart();
  return getCart();
}

/**
 * Decreases quantity and removes entries that reach zero.
 *
 * @param {string} id Product id.
 * @returns {Record<string, *>[]} Updated cart snapshot.
 */
export function decreaseQuantity(id) {
  cart = cart
    .map((item) => (
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    ))
    .filter((item) => item.quantity > 0);
  saveCart();
  return getCart();
}

/**
 * Clears the persisted cart.
 *
 * @returns {Record<string, *>[]} Empty cart snapshot.
 */
export function clearCart() {
  cart = [];
  saveCart();
  return getCart();
}

/**
 * Returns an immutable snapshot of cart items.
 *
 * @returns {Record<string, *>[]} Cart snapshot.
 */
export function getCart() {
  return cart.map((item) => ({ ...item }));
}

/**
 * Calculates the cart subtotal before shipping.
 *
 * @returns {number} Subtotal amount.
 */
export function getSubtotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Calculates savings from old prices.
 *
 * @returns {number} Discount amount.
 */
export function getDiscount() {
  return cart.reduce((total, item) => total + Math.max(0, item.oldPrice - item.price) * item.quantity, 0);
}

/**
 * Calculates shipping fee from the current subtotal.
 *
 * @returns {number} Shipping amount.
 */
export function getShipping() {
  const subtotal = getSubtotal();
  return subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

/**
 * Calculates the current order total.
 *
 * @returns {number} Total amount.
 */
export function getTotal() {
  return getSubtotal() + getShipping();
}

/**
 * Counts all units in the cart.
 *
 * @returns {number} Total cart quantity.
 */
export function getCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}
