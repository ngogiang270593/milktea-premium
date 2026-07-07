const CART_KEY = 'milktea-premium-cart';
const SHIPPING_FEE = 4.99;
const FREE_SHIPPING_THRESHOLD = 35;

let cart = loadCart();

function loadCart() {
  try {
    const savedCart = window.localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
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
    quantity: Number(product.quantity || 1)
  };
}

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

export function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  return getCart();
}

export function increaseQuantity(id) {
  cart = cart.map((item) => (
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  ));
  saveCart();
  return getCart();
}

export function decreaseQuantity(id) {
  cart = cart
    .map((item) => (
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    ))
    .filter((item) => item.quantity > 0);
  saveCart();
  return getCart();
}

export function clearCart() {
  cart = [];
  saveCart();
  return getCart();
}

export function getCart() {
  return cart.map((item) => ({ ...item }));
}

export function getSubtotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getDiscount() {
  return cart.reduce((total, item) => total + Math.max(0, item.oldPrice - item.price) * item.quantity, 0);
}

export function getShipping() {
  const subtotal = getSubtotal();
  return subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

export function getTotal() {
  return getSubtotal() + getShipping();
}

export function getCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}
