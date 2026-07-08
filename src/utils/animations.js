import { CartContent } from '../components/cart/CartContent.js';
import { WishlistContent } from '../components/wishlist/WishlistContent.js';
import { getProductById, MENU_PRODUCTS } from '../data/products.js';
import {
  clearRecentSearches,
  getRecentSearches,
  highlightMatch,
  saveRecentSearch,
  searchProducts
} from '../store/searchStore.js';
import {
  addItem,
  clearCart,
  decreaseQuantity,
  getCartQuantity,
  getTotal,
  increaseQuantity,
  removeItem
} from '../store/cartStore.js';
import {
  getWishlistCount,
  isWishlistItem,
  removeWishlistItem,
  toggleWishlistItem
} from '../store/wishlistStore.js';
import {
  applyTheme,
  cycleThemePreference,
  getThemeLabel,
  getThemePreference,
  getResolvedTheme,
  subscribeToSystemTheme,
  THEMES
} from '../store/themeStore.js';
import { formatCurrency } from './format.js';
import { escapeAttribute, escapeHtml } from './html.js';
import { imageAttributes } from './images.js';
import { applyProductFilters } from './productFilter.js';

let motionModulePromise;

function getScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function loadMotionModule() {
  motionModulePromise ||= import('./motion.js');
  return motionModulePromise;
}

function scheduleMotionInit() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
    document.querySelectorAll('[data-reveal], .fade-up').forEach((element) => {
      element.classList.add('is-visible');
    });
    return;
  }

  const startMotion = () => {
    loadMotionModule().then(({ initGsapMotion }) => initGsapMotion());
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(startMotion, { timeout: 1200 });
  } else {
    window.setTimeout(startMotion, 120);
  }
}

function animateCards(cards, options) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  loadMotionModule().then(({ animateCardSet }) => animateCardSet(cards, options));
}

function updateThemeControls() {
  const preference = getThemePreference();
  const resolvedTheme = getResolvedTheme(preference);
  const label = getThemeLabel(preference);

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.dataset.themePreference = preference;
    button.dataset.themeResolved = resolvedTheme;
    button.setAttribute('aria-label', `Current theme: ${label}. Change theme`);
    button.setAttribute('aria-pressed', String(preference !== THEMES.SYSTEM));
  });

  document.querySelectorAll('[data-theme-label]').forEach((element) => {
    element.textContent = label;
  });
}

export function initThemeSystem() {
  applyTheme();
  updateThemeControls();

  if (window.themeSystemReady !== true) {
    window.themeSystemReady = true;
    subscribeToSystemTheme(updateThemeControls);
    window.addEventListener('theme:updated', updateThemeControls);
  }

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    if (button.dataset.themeReady === 'true') {
      return;
    }

    button.dataset.themeReady = 'true';
    button.addEventListener('click', () => {
      const { preference } = cycleThemePreference();
      showToast(`Theme set to ${getThemeLabel(preference)}`);
    });
  });
}

export function initNavigation() {
  const header = document.querySelector('#site-header');
  const mobileToggle = document.querySelector('#menu-toggle');
  const mobileClose = document.querySelector('#menu-close');
  const drawer = document.querySelector('#mobile-drawer');
  const overlay = document.querySelector('#drawer-overlay');
  const navLinks = document.querySelectorAll('[data-nav-link]');
  let lastFocusedElement = null;

  if (!header) {
    return;
  }

  const updateHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  const closeDrawer = () => {
    if (!drawer || !overlay || !mobileToggle) {
      return;
    }

    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;

    window.setTimeout(() => {
      if (!drawer.classList.contains('is-open')) {
        overlay.hidden = true;
      }
    }, 300);

    lastFocusedElement?.focus();
  };

  const openDrawer = () => {
    if (!drawer || !overlay || !mobileToggle || !mobileClose) {
      return;
    }

    lastFocusedElement = document.activeElement;
    overlay.hidden = false;
    mobileToggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    drawer.inert = false;
    document.body.classList.add('nav-open');

    requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      mobileClose.focus();
    });
  };

  const setActiveLink = (hash) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === hash;

      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const sectionIds = [...navLinks]
    .map((link) => link.getAttribute('href'))
    .filter((href) => href?.startsWith('#'))
    .map((href) => href.slice(1));

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const updateActiveSection = () => {
    if (!sections.length) {
      setActiveLink(window.location.pathname);
      return;
    }

    const current = sections
      .filter((section) => section.getBoundingClientRect().top <= 140)
      .at(-1);

    if (current) {
      setActiveLink(`#${current.id}`);
    } else {
      setActiveLink('#categories');
    }
  };

  updateHeaderState();
  updateActiveSection();

  window.addEventListener('scroll', () => {
    updateHeaderState();
    updateActiveSection();
  }, { passive: true });

  mobileToggle?.addEventListener('click', openDrawer);
  mobileClose?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDrawer();
    }

    if (event.key !== 'Tab' || !drawer?.classList.contains('is-open')) {
      return;
    }

    const focusableElements = drawer.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (!firstFocusable || !lastFocusable) {
      return;
    }

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  });
}

export function initRippleButtons() {
  const rippleButtons = document.querySelectorAll('.ripple-button');

  rippleButtons.forEach((button) => {
    if (button.dataset.rippleReady === 'true') {
      return;
    }

    button.dataset.rippleReady = 'true';
    button.addEventListener('click', (event) => {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');

      ripple.className = 'ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;

      button.append(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    });
  });
}

function updateCartBadges() {
  const quantity = getCartQuantity();

  document.querySelectorAll('[data-cart-count]').forEach((badge) => {
    badge.textContent = String(quantity);
    badge.setAttribute('aria-label', `${quantity} items in cart`);
  });

  document.querySelectorAll('[data-cart-page-count]').forEach((count) => {
    count.textContent = String(quantity);
  });
}

function updateWishlistBadges() {
  const quantity = getWishlistCount();

  document.querySelectorAll('[data-wishlist-count]').forEach((badge) => {
    badge.textContent = String(quantity);
    badge.setAttribute('aria-label', `${quantity} saved wishlist items`);
  });

  document.querySelectorAll('[data-wishlist-page-count]').forEach((count) => {
    count.textContent = String(quantity);
  });
}

function showToast(message) {
  let toast = document.querySelector('[data-toast]');

  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.dataset.toast = '';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add('is-visible');

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2400);
}

function debounce(callback, delay = 300) {
  let timeout;

  return (...args) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => callback(...args), delay);
  };
}

export function initCategoryFilters() {
  const categoryButtons = document.querySelectorAll('[data-category]');
  const categoryDots = document.querySelectorAll('.category-scroll-dot');

  categoryButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      categoryButtons.forEach((btn, btnIndex) => {
        const isActive = btn === button;

        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
        categoryDots[btnIndex]?.classList.toggle('is-active', isActive);
      });

      button.scrollIntoView({ behavior: getScrollBehavior(), inline: 'center', block: 'nearest' });
    });
  });
}

export function initHeroParallax() {
  const scene = document.querySelector('[data-parallax-scene]');

  if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const items = scene.querySelectorAll('[data-parallax-item]');
  let animationFrame = null;

  const updateItems = (event) => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }

    animationFrame = window.requestAnimationFrame(() => {
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      items.forEach((item) => {
        const depth = Number(item.dataset.depth || 0);
        item.style.setProperty('--parallax-x', `${x * depth}px`);
        item.style.setProperty('--parallax-y', `${y * depth}px`);
      });
    });
  };

  const resetItems = () => {
    items.forEach((item) => {
      item.style.removeProperty('--parallax-x');
      item.style.removeProperty('--parallax-y');
    });
  };

  scene.addEventListener('pointermove', updateItems, { passive: true });
  scene.addEventListener('pointerleave', resetItems);
}

export function initProductCards() {
  const favoriteButtons = document.querySelectorAll('[data-favorite-button]');
  const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');

  favoriteButtons.forEach((button) => {
    if (button.dataset.favoriteReady === 'true') {
      return;
    }

    button.dataset.favoriteReady = 'true';
    const productId = button.dataset.favoriteButton;
    const product = getProductById(productId);

    if (product && isWishlistItem(product.id)) {
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-label', `Remove ${product.name} from wishlist`);
    }

    button.addEventListener('click', () => {
      const currentProduct = getProductById(button.dataset.favoriteButton);

      if (!currentProduct) {
        return;
      }

      const { active } = toggleWishlistItem(currentProduct);
      button.classList.toggle('is-active', active);
      button.classList.add('heart-pop');
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', `${active ? 'Remove' : 'Add'} ${currentProduct.name} ${active ? 'from' : 'to'} wishlist`);
      updateWishlistBadges();
      showToast(active ? `${currentProduct.name} saved to wishlist` : `${currentProduct.name} removed from wishlist`);
      button.addEventListener('animationend', () => button.classList.remove('heart-pop'), { once: true });
    });
  });

  addToCartButtons.forEach((button) => {
    if (button.dataset.cartReady === 'true') {
      return;
    }

    button.dataset.cartReady = 'true';
    button.addEventListener('click', () => {
      const product = getProductById(button.dataset.addToCart);

      if (!product) {
        return;
      }

      addItem(product);
      updateCartBadges();
      showToast(`${product.name} added to cart`);
    });
  });
}

function renderWishlistContent() {
  const content = document.querySelector('[data-wishlist-content]');

  if (!content) {
    return;
  }

  content.innerHTML = WishlistContent();
  updateWishlistBadges();
  initRippleButtons();
  bindWishlistControls();
  animateCards(content.querySelectorAll('.wishlist-item'));
}

function bindWishlistControls() {
  const content = document.querySelector('[data-wishlist-content]');

  if (!content || content.dataset.wishlistReady === 'true') {
    return;
  }

  content.dataset.wishlistReady = 'true';
  content.addEventListener('click', (event) => {
    const move = event.target.closest('[data-wishlist-move]');
    const remove = event.target.closest('[data-wishlist-remove]');

    if (move) {
      const product = getProductById(move.dataset.wishlistMove);

      if (product) {
        addItem(product);
        removeWishlistItem(product.id);
        showToast(`${product.name} moved to cart`);
      }

      content.dataset.wishlistReady = 'false';
      renderWishlistContent();
      updateCartBadges();
    } else if (remove) {
      const product = getProductById(remove.dataset.wishlistRemove);

      removeWishlistItem(remove.dataset.wishlistRemove);
      showToast(`${product?.name || 'Item'} removed from wishlist`);
      content.dataset.wishlistReady = 'false';
      renderWishlistContent();
    }
  });
}

export function initWishlistPage() {
  updateWishlistBadges();
  bindWishlistControls();
}

function searchResultItem(product, term) {
  const tags = product.tags?.slice(0, 3).map((tag) => highlightMatch(tag, term)).join(', ');

  return `
    <a href="/product?id=${product.id}" class="search-result-item" role="option">
      <img ${imageAttributes(product.image, {
        alt: '',
        width: 120,
        height: 120,
        sizes: '72px'
      })} />
      <span>
        <strong>${highlightMatch(product.name, term)}</strong>
        <small>${highlightMatch(product.category.replaceAll('-', ' '), term)} &middot; ${tags}</small>
      </span>
    </a>
  `;
}

export function initSearchOverlay() {
  const overlay = document.querySelector('[data-search-overlay]');

  if (!overlay) {
    return;
  }

  const input = overlay.querySelector('[data-search-input]');
  const results = overlay.querySelector('[data-search-results]');
  const empty = overlay.querySelector('[data-search-empty]');
  const meta = overlay.querySelector('[data-search-meta]');
  const recentList = overlay.querySelector('[data-search-recent-list]');
  const openButtons = document.querySelectorAll('[data-search-open]');
  const closeButtons = overlay.querySelectorAll('[data-search-close]');
  const clearButton = overlay.querySelector('[data-search-clear]');
  let lastFocusedElement = null;

  const renderRecentSearches = () => {
    const recentSearches = getRecentSearches();
    recentList.innerHTML = recentSearches.length
      ? recentSearches.map((term) => `<button type="button" class="search-chip" data-search-term="${escapeAttribute(term)}" data-search-recent>${escapeHtml(term)}</button>`).join('')
      : '<p class="text-sm text-[#7b6a5a]">No recent searches yet.</p>';
  };

  const renderResults = (term) => {
    const query = term.trim();
    const matches = searchProducts(query);

    meta.hidden = Boolean(query);
    empty.hidden = !query || matches.length > 0;
    results.innerHTML = query ? matches.map((product) => searchResultItem(product, query)).join('') : '';
  };

  const debouncedRender = debounce((event) => renderResults(event.target.value), 300);

  const openSearch = () => {
    lastFocusedElement = document.activeElement;
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
    renderRecentSearches();

    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
      input.focus();
    });
  };

  const closeSearch = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-open');

    window.setTimeout(() => {
      if (!overlay.classList.contains('is-open')) {
        overlay.hidden = true;
      }
    }, 260);

    lastFocusedElement?.focus();
  };

  openButtons.forEach((button) => button.addEventListener('click', openSearch));
  closeButtons.forEach((button) => button.addEventListener('click', closeSearch));
  input.addEventListener('input', debouncedRender);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && input.value.trim()) {
      const firstResult = results.querySelector('a');

      if (firstResult) {
        saveRecentSearch(input.value.trim());
        renderRecentSearches();
        firstResult.click();
      }
    }
  });

  overlay.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-search-term]');
    const result = event.target.closest('.search-result-item');

    if (result && input.value.trim()) {
      saveRecentSearch(input.value.trim());
      renderRecentSearches();
      return;
    }

    if (!chip) {
      return;
    }

    input.value = chip.dataset.searchTerm;
    saveRecentSearch(input.value);
    renderRecentSearches();
    renderResults(input.value);
    input.focus();
  });

  clearButton?.addEventListener('click', () => {
    clearRecentSearches();
    renderRecentSearches();
    input.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeSearch();
    }
  });

  renderRecentSearches();
}

function renderCartContent() {
  const content = document.querySelector('[data-cart-content]');

  if (!content) {
    return;
  }

  content.innerHTML = CartContent();
  updateCartBadges();
  initRippleButtons();
  bindCartControls();
  animateCards(content.querySelectorAll('.cart-item'));
}

function bindCartControls() {
  const content = document.querySelector('[data-cart-content]');

  if (!content || content.dataset.cartReady === 'true') {
    return;
  }

  content.dataset.cartReady = 'true';
  content.addEventListener('click', (event) => {
    const increase = event.target.closest('[data-cart-increase]');
    const decrease = event.target.closest('[data-cart-decrease]');
    const remove = event.target.closest('[data-cart-remove]');
    const clear = event.target.closest('[data-cart-clear]');

    if (increase) {
      increaseQuantity(increase.dataset.cartIncrease);
      showToast('Quantity updated');
      content.dataset.cartReady = 'false';
      renderCartContent();
    } else if (decrease) {
      decreaseQuantity(decrease.dataset.cartDecrease);
      showToast('Quantity updated');
      content.dataset.cartReady = 'false';
      renderCartContent();
    } else if (remove) {
      removeItem(remove.dataset.cartRemove);
      showToast('Item removed');
      content.dataset.cartReady = 'false';
      renderCartContent();
    } else if (clear) {
      clearCart();
      showToast('Cart cleared');
      content.dataset.cartReady = 'false';
      renderCartContent();
    }
  });

  content.addEventListener('submit', (event) => {
    const form = event.target.closest('.cart-coupon');

    if (!form) {
      return;
    }

    event.preventDefault();
    const input = form.querySelector('[data-coupon-input]');
    const message = form.querySelector('[data-coupon-message]');
    const total = form.closest('.cart-summary')?.querySelector('[data-cart-total]');
    const code = input?.value.trim().toUpperCase();

    if (code === 'MILKTEA10') {
      const discountedTotal = Math.max(0, getTotal() - getTotal() * 0.1);
      total.textContent = formatCurrency(discountedTotal);
      message.textContent = 'Coupon applied: 10% off your order.';
      showToast('Coupon applied');
    } else {
      message.textContent = 'Try MILKTEA10 for 10% off.';
    }
  });
}

export function initCartPage() {
  updateCartBadges();
  bindCartControls();
}

function getSelectedProductOptions() {
  const selectedOptions = {};

  document.querySelectorAll('[data-product-option].is-active').forEach((option) => {
    selectedOptions[option.dataset.productOption] = option.dataset.optionValue;
  });

  const toppings = [...document.querySelectorAll('[data-product-topping]:checked')]
    .map((input) => input.value);

  return {
    ...selectedOptions,
    toppings
  };
}

function buildDetailProduct(id) {
  const product = getProductById(id);
  const quantity = Number(document.querySelector('[data-detail-quantity-value]')?.textContent || 1);
  const options = getSelectedProductOptions();
  const variantParts = [
    options.size || product.size,
    `${options.sugar || product.sugar} sugar`,
    options.ice || product.ice,
    options.toppings.length ? options.toppings.join(', ') : 'No extra toppings'
  ];

  return {
    ...product,
    size: options.size || product.size,
    sugar: options.sugar || product.sugar,
    ice: options.ice || product.ice,
    variant: variantParts.join(' / '),
    quantity
  };
}

export function initProductDetail() {
  const detail = document.querySelector('[data-product-detail]');

  if (!detail) {
    return;
  }

  const mainImage = detail.querySelector('[data-gallery-main]');
  const zoom = detail.querySelector('[data-product-zoom]');
  const quantityValue = detail.querySelector('[data-detail-quantity-value]');

  detail.querySelectorAll('[data-gallery-thumb]').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.dataset.galleryThumb;
      mainImage.srcset = thumb.dataset.gallerySrcset;
      mainImage.sizes = '(min-width: 1024px) 48vw, 92vw';
      detail.querySelectorAll('[data-gallery-thumb]').forEach((item) => {
        item.classList.toggle('is-active', item === thumb);
      });
    });
  });

  zoom?.addEventListener('pointermove', (event) => {
    const rect = zoom.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    mainImage.style.transformOrigin = `${x}% ${y}%`;
    mainImage.classList.add('is-zoomed');
  }, { passive: true });

  zoom?.addEventListener('pointerleave', () => {
    mainImage.classList.remove('is-zoomed');
    mainImage.style.transformOrigin = '';
  });

  detail.querySelectorAll('[data-product-option]').forEach((option) => {
    option.addEventListener('click', () => {
      detail.querySelectorAll(`[data-product-option="${option.dataset.productOption}"]`).forEach((item) => {
        const isActive = item === option;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
    });
  });

  detail.querySelectorAll('[data-detail-quantity]').forEach((button) => {
    button.addEventListener('click', () => {
      const current = Number(quantityValue.textContent);
      const next = button.dataset.detailQuantity === 'increase'
        ? Math.min(12, current + 1)
        : Math.max(1, current - 1);

      quantityValue.textContent = String(next);
      quantityValue.classList.remove('quantity-bump');
      requestAnimationFrame(() => quantityValue.classList.add('quantity-bump'));
    });
  });

  detail.querySelectorAll('[data-detail-add], [data-detail-buy]').forEach((button) => {
    button.addEventListener('click', () => {
      const product = buildDetailProduct(button.dataset.detailAdd || button.dataset.detailBuy);

      addItem(product);
      updateCartBadges();
      showToast(`${product.name} added to cart`);

      if (button.dataset.detailBuy) {
        window.location.href = '/cart';
      }
    });
  });
}

export function initMenuPage() {
  const grid = document.querySelector('[data-menu-grid]');

  if (!grid) {
    return;
  }

  const search = document.querySelector('[data-menu-search]');
  const sort = document.querySelector('[data-menu-sort]');
  const filters = document.querySelectorAll('[data-menu-filter]');
  const priceRanges = document.querySelectorAll('[data-price-range]');
  const priceValues = document.querySelectorAll('[data-price-value]');
  const count = document.querySelector('[data-product-count]');
  const empty = document.querySelector('[data-menu-empty]');
  const pagination = document.querySelector('[data-menu-pagination]');
  const filterOpen = document.querySelector('[data-filter-open]');
  const filterClose = document.querySelector('[data-filter-close]');
  const filterDrawer = document.querySelector('#menu-filter-drawer');
  const filterOverlay = document.querySelector('[data-filter-overlay]');
  const viewButtons = document.querySelectorAll('[data-view-mode]');
  const products = [...grid.querySelectorAll('[data-menu-product]')];
  const pageSize = 8;
  let currentPage = 1;
  let filteredProducts = [...MENU_PRODUCTS];

  const selectedValues = (name) => [...filters]
    .filter((input) => input.name === name && input.checked)
    .map((input) => input.value);

  const getFilterState = () => ({
    search: search?.value || '',
    categories: selectedValues('category'),
    maxPrice: Number(priceRanges[0]?.value || 12),
    sizes: selectedValues('size'),
    sugarLevels: selectedValues('sugar'),
    iceLevels: selectedValues('ice'),
    availability: selectedValues('availability'),
    minRating: Math.max(0, ...selectedValues('rating').map(Number)),
    sort: sort?.value || 'featured'
  });

  const updatePagination = () => {
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const buttons = pagination?.querySelectorAll('[data-page]');

    pagination?.querySelector('[data-page-prev]')?.toggleAttribute('disabled', currentPage === 1);
    pagination?.querySelector('[data-page-next]')?.toggleAttribute('disabled', currentPage === totalPages);

    buttons?.forEach((button) => {
      const page = Number(button.dataset.page);
      const isActive = page === currentPage;

      button.hidden = page > totalPages;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  };

  const renderProducts = () => {
    filteredProducts = applyProductFilters(MENU_PRODUCTS, getFilterState());
    const start = (currentPage - 1) * pageSize;
    const visibleProducts = filteredProducts.slice(start, start + pageSize);
    const visibleIds = new Set(visibleProducts.map((product) => product.id));

    products.forEach((product) => {
      product.hidden = !visibleIds.has(product.dataset.productId);
    });

    filteredProducts.forEach((product) => {
      const element = products.find((item) => item.dataset.productId === product.id);

      if (element) {
        grid.append(element);
      }
    });

    if (count) {
      count.textContent = String(filteredProducts.length);
    }

    if (empty) {
      empty.hidden = filteredProducts.length > 0;
    }

    updatePagination();

    if (grid.dataset.initialMenuMotion === 'true') {
      animateCards(products.filter((product) => !product.hidden), {
        duration: 0.38,
        stagger: 0.035
      });
    } else {
      grid.dataset.initialMenuMotion = 'true';
    }
  };

  const resetAndRender = () => {
    currentPage = 1;
    renderProducts();
  };

  const openFilters = () => {
    if (!filterDrawer || !filterOverlay || !filterOpen) {
      return;
    }

    filterOverlay.hidden = false;
    filterDrawer.inert = false;
    filterDrawer.setAttribute('aria-hidden', 'false');
    filterOpen.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');

    requestAnimationFrame(() => {
      filterOverlay.classList.add('is-open');
      filterDrawer.classList.add('is-open');
      filterClose?.focus();
    });
  };

  const closeFilters = () => {
    if (!filterDrawer || !filterOverlay || !filterOpen) {
      return;
    }

    filterOverlay.classList.remove('is-open');
    filterDrawer.classList.remove('is-open');
    filterDrawer.inert = true;
    filterDrawer.setAttribute('aria-hidden', 'true');
    filterOpen.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');

    window.setTimeout(() => {
      if (!filterDrawer.classList.contains('is-open')) {
        filterOverlay.hidden = true;
      }
    }, 260);
  };

  search?.addEventListener('input', resetAndRender);
  sort?.addEventListener('change', resetAndRender);
  filters.forEach((input) => input.addEventListener('change', () => {
    filters.forEach((matchingInput) => {
      if (matchingInput !== input && matchingInput.name === input.name && matchingInput.value === input.value) {
        matchingInput.checked = input.checked;
      }
    });
    resetAndRender();
  }));
  priceRanges.forEach((range) => {
    range.addEventListener('input', () => {
      priceRanges.forEach((input) => {
        input.value = range.value;
      });
      priceValues.forEach((value) => {
        value.textContent = `$${range.value}`;
      });
      resetAndRender();
    });
  });

  viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.viewMode;

      viewButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });

      grid.classList.toggle('is-list', mode === 'list');
    });
  });

  pagination?.addEventListener('click', (event) => {
    const target = event.target.closest('button');

    if (!target) {
      return;
    }

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

    if (target.dataset.pagePrev !== undefined) {
      currentPage = Math.max(1, currentPage - 1);
    } else if (target.dataset.pageNext !== undefined) {
      currentPage = Math.min(totalPages, currentPage + 1);
    } else if (target.dataset.page) {
      currentPage = Number(target.dataset.page);
    }

    renderProducts();
    grid.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
  });

  filterOpen?.addEventListener('click', openFilters);
  filterClose?.addEventListener('click', closeFilters);
  filterOverlay?.addEventListener('click', closeFilters);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeFilters();
    }
  });

  renderProducts();
}

export function initAppInteractions() {
  initThemeSystem();
  initNavigation();
  initRippleButtons();
  initCategoryFilters();
  initHeroParallax();
  initProductCards();
  initSearchOverlay();
  initMenuPage();
  initCartPage();
  initWishlistPage();
  initProductDetail();
  scheduleMotionInit();

  window.addEventListener('cart:updated', updateCartBadges);
  window.addEventListener('wishlist:updated', updateWishlistBadges);
}
