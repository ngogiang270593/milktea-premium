const WISHLIST_KEY = 'milktea-premium-wishlist';

let wishlist = loadWishlist();

function loadWishlist() {
  try {
    const savedWishlist = window.localStorage.getItem(WISHLIST_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
}

function saveWishlist() {
  window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
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

export function addWishlistItem(product) {
  const item = normalizeProduct(product);

  if (!wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
    wishlist = [...wishlist, item];
    saveWishlist();
  }

  return getWishlist();
}

export function removeWishlistItem(id) {
  wishlist = wishlist.filter((item) => item.id !== id);
  saveWishlist();
  return getWishlist();
}

export function toggleWishlistItem(product) {
  if (isWishlistItem(product.id)) {
    removeWishlistItem(product.id);
    return { active: false, wishlist: getWishlist() };
  }

  addWishlistItem(product);
  return { active: true, wishlist: getWishlist() };
}

export function clearWishlist() {
  wishlist = [];
  saveWishlist();
  return getWishlist();
}

export function getWishlist() {
  return wishlist.map((item) => ({ ...item }));
}

export function isWishlistItem(id) {
  return wishlist.some((item) => item.id === id);
}

export function getWishlistCount() {
  return wishlist.length;
}
