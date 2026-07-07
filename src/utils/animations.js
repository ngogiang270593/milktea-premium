import { CartContent } from '../components/cart/CartContent.js';
import { getProductById } from '../data/products.js';
import {
  addItem,
  clearCart,
  decreaseQuantity,
  getCartQuantity,
  getTotal,
  increaseQuantity,
  removeItem
} from '../store/cartStore.js';
import { formatCurrency } from './format.js';

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
      link.classList.toggle('is-active', link.getAttribute('href') === hash);
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

      button.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
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
    button.addEventListener('click', () => {
      const isActive = button.classList.toggle('is-active');

      button.setAttribute('aria-pressed', String(isActive));
      button.setAttribute(
        'aria-label',
        button.getAttribute('aria-label').replace(isActive ? 'Add' : 'Remove', isActive ? 'Remove' : 'Add')
      );
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

function renderCartContent() {
  const content = document.querySelector('[data-cart-content]');

  if (!content) {
    return;
  }

  content.innerHTML = CartContent();
  updateCartBadges();
  initRippleButtons();
  bindCartControls();
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
  let filteredProducts = [...products];

  const selectedValues = (name) => [...filters]
    .filter((input) => input.name === name && input.checked)
    .map((input) => input.value);

  const productMatches = (product) => {
    const query = search?.value.trim().toLowerCase() || '';
    const maxPrice = Number(priceRanges[0]?.value || 12);
    const groups = ['category', 'size', 'sugar', 'ice', 'availability'];

    if (query && !product.dataset.name.includes(query)) {
      return false;
    }

    if (Number(product.dataset.price) > maxPrice) {
      return false;
    }

    return groups.every((group) => {
      const values = selectedValues(group);
      return !values.length || values.includes(product.dataset[group]);
    });
  };

  const sortProducts = (items) => {
    const mode = sort?.value || 'featured';
    const sorted = [...items];

    if (mode === 'rating-desc') {
      sorted.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
    } else if (mode === 'price-asc') {
      sorted.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (mode === 'price-desc') {
      sorted.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    } else if (mode === 'newest') {
      sorted.sort((a, b) => Number(b.dataset.new === 'true') - Number(a.dataset.new === 'true'));
    }

    return sorted;
  };

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
    filteredProducts = sortProducts(products.filter(productMatches));
    const start = (currentPage - 1) * pageSize;
    const visibleProducts = filteredProducts.slice(start, start + pageSize);

    products.forEach((product) => {
      product.hidden = !visibleProducts.includes(product);
    });

    filteredProducts.forEach((product) => grid.append(product));

    if (count) {
      count.textContent = String(filteredProducts.length);
    }

    if (empty) {
      empty.hidden = filteredProducts.length > 0;
    }

    updatePagination();
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
  filters.forEach((input) => input.addEventListener('change', resetAndRender));
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
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

export function initScrollReveal() {
  const revealItems = document.querySelectorAll('[data-reveal]');

  if (!revealItems.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.12
  });

  revealItems.forEach((item) => observer.observe(item));
}

export function initAppInteractions() {
  initNavigation();
  initRippleButtons();
  initCategoryFilters();
  initHeroParallax();
  initProductCards();
  initMenuPage();
  initCartPage();
  initScrollReveal();

  window.addEventListener('cart:updated', updateCartBadges);
}
