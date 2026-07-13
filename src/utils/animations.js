import { CartContent } from '../components/cart/CartContent.js';
import { updateLanguageSwitchers } from '../components/LanguageSwitcher.js';
import { updateNavbarTranslations } from '../components/Navbar.js';
import { ThemeProvider } from '../components/ThemeProvider.js';
import { updateThemeSwitchers } from '../components/ThemeSwitcher.js';
import { Toast } from '../components/ui/index.js';
import { WishlistContent } from '../components/wishlist/WishlistContent.js';
import {
  getSiteConfigOverrides,
  setSiteConfigOverrides
} from '../config/siteConfig.js';
import { getProductById, MENU_PRODUCTS } from '../repositories/ProductRepository.js';
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
  getDiscount,
  getSubtotal,
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
  setThemePreference,
  subscribeToSystemTheme,
  THEMES
} from '../store/themeStore.js';
import { getLanguage, setLanguage } from '../store/languageStore.js';
import { debounce, prefersReducedMotion, rafThrottle } from './animation.js';
import { trapFocus } from './accessibility.js';
import { setAttributeIfChanged, setTextIfChanged } from './dom.js';
import { formatCurrency } from './format.js';
import { escapeAttribute, escapeHtml } from './html.js';
import { imageAttributes } from './image.js';
import { t } from './i18n.js';
import { applyProductFilters } from './productFilter.js';
import { getScrollBehavior } from './scroll.js';
import { updateDocumentMeta } from './seo.js';

let motionModulePromise;

function loadMotionModule() {
  motionModulePromise ||= import('./motion.js');
  return motionModulePromise;
}

function scheduleMotionInit() {
  if (prefersReducedMotion()) {
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
  if (prefersReducedMotion()) {
    return;
  }

  loadMotionModule().then(({ animateCardSet }) => animateCardSet(cards, options));
}

function updateThemeControls() {
  const preference = getThemePreference();
  const resolvedTheme = getResolvedTheme(preference);
  const label = translatedThemeLabel(preference);

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.dataset.themePreference = preference;
    button.dataset.themeResolved = resolvedTheme;
    button.setAttribute('aria-label', t('theme.currentAria', { label }));
    button.setAttribute('aria-pressed', String(preference !== THEMES.SYSTEM));
  });

  document.querySelectorAll('[data-theme-label]').forEach((element) => {
    element.textContent = translatedThemeLabel(preference);
  });

  updateThemeSwitchers();
}

function translatedThemeLabel(preference) {
  const resolvedTheme = getResolvedTheme(preference);
  const key = `theme.names.${resolvedTheme}`;
  const label = t(key);

  return label === key ? getThemeLabel(preference) : label;
}

export function initThemeSystem() {
  ThemeProvider();
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
      showToast(t('toast.themeChanged', { theme: translatedThemeLabel(preference) }));
    });
  });

  document.querySelectorAll('[data-theme-switcher]').forEach((select) => {
    if (select.dataset.themeReady === 'true') {
      return;
    }

    select.dataset.themeReady = 'true';
    select.addEventListener('change', () => {
      const { preference } = setThemePreference(select.value);
      updateThemeControls();
      showToast(t('toast.themeChanged', { theme: translatedThemeLabel(preference) }));
    });
  });
}

export function initLanguageControls() {
  document.querySelectorAll('[data-language-switcher]').forEach((button) => {
    if (button.dataset.languageReady === 'true') {
      return;
    }

    button.dataset.languageReady = 'true';
    button.addEventListener('click', () => {
      const nextLanguage = setLanguage(button.dataset.languageNext);
      updateNavbarTranslations();
      updateLanguageSwitchers();
      updateDocumentMeta();
      showToast(t('toast.languageChanged', { language: t(nextLanguage === 'vi' ? 'common.vietnamese' : 'common.english') }));
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

  let isHeaderScrolled = null;

  const updateHeaderState = () => {
    const nextScrolled = window.scrollY > 40;

    if (nextScrolled !== isHeaderScrolled) {
      isHeaderScrolled = nextScrolled;
      header.classList.toggle('is-scrolled', nextScrolled);
    }
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

  let activeHref = '';
  const updateActiveSection = () => {
    if (!sections.length) {
      setActiveLink(window.location.pathname);
      return;
    }

    const current = sections
      .filter((section) => section.getBoundingClientRect().top <= 140)
      .at(-1);

    const nextHref = current ? `#${current.id}` : '#categories';

    if (nextHref !== activeHref) {
      activeHref = nextHref;
      setActiveLink(nextHref);
    }
  };
  const updateOnScroll = rafThrottle(() => {
    updateHeaderState();
    updateActiveSection();
  });

  updateHeaderState();
  updateActiveSection();

  window.navScrollCleanup?.();
  window.addEventListener('scroll', updateOnScroll, { passive: true });
  window.navScrollCleanup = () => window.removeEventListener('scroll', updateOnScroll);

  mobileToggle?.addEventListener('click', openDrawer);
  mobileClose?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  window.navKeydownCleanup?.();
  const handleNavigationKeydown = (event) => {
    if (event.key === 'Escape') {
      closeDrawer();
    }

    if (event.key !== 'Tab' || !drawer?.classList.contains('is-open')) {
      return;
    }

    trapFocus(event, drawer);
  };
  document.addEventListener('keydown', handleNavigationKeydown);
  window.navKeydownCleanup = () => document.removeEventListener('keydown', handleNavigationKeydown);
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
    setTextIfChanged(badge, String(quantity));
    setAttributeIfChanged(badge, 'aria-label', t('navbar.cartCount', { count: quantity }));
  });

  document.querySelectorAll('[data-cart-page-count]').forEach((count) => {
    setTextIfChanged(count, String(quantity));
  });
}

function updateWishlistBadges() {
  const quantity = getWishlistCount();

  document.querySelectorAll('[data-wishlist-count]').forEach((badge) => {
    setTextIfChanged(badge, String(quantity));
    setAttributeIfChanged(badge, 'aria-label', t('navbar.wishlistCount', { count: quantity }));
  });

  document.querySelectorAll('[data-wishlist-page-count]').forEach((count) => {
    setTextIfChanged(count, String(quantity));
  });
}

function showToast(message) {
  let toast = document.querySelector('[data-toast]');

  if (!toast) {
    document.body.insertAdjacentHTML('beforeend', Toast());
    toast = document.querySelector('[data-toast]');
  }

  toast.textContent = message;
  toast.classList.add('is-visible');

  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2400);
}

function cloneConfig(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

function setNestedConfigValue(source, path, value) {
  const blockedKeys = new Set(['__proto__', 'constructor', 'prototype']);
  const keys = path.split('.').filter(Boolean);

  if (!keys.length || keys.some((key) => blockedKeys.has(key))) {
    return source;
  }

  keys.reduce((target, key, index) => {
    if (index === keys.length - 1) {
      target[key] = value;
      return target[key];
    }

    target[key] = target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])
      ? target[key]
      : {};

    return target[key];
  }, source);

  return source;
}

export function initAdminPanel() {
  const form = document.querySelector('[data-admin-config-form]');

  if (!form || form.dataset.adminReady === 'true') {
    return;
  }

  form.dataset.adminReady = 'true';
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const status = form.querySelector('[data-admin-config-status]');
    const data = new FormData(form);
    const selectedTheme = data.get('adminTheme');
    const selectedLanguage = data.get('adminLanguage') || getLanguage();
    const overrides = cloneConfig(getSiteConfigOverrides());

    data.forEach((value, key) => {
      if (key.startsWith('admin')) {
        return;
      }

      setNestedConfigValue(overrides, key, String(value).trim());
    });

    if (selectedTheme) {
      setThemePreference(String(selectedTheme));
    }

    setLanguage(String(selectedLanguage));
    setSiteConfigOverrides(overrides);
    updateThemeControls();
    updateLanguageSwitchers();
    updateDocumentMeta();

    if (status) {
      status.textContent = t('admin.status.saved');
    }

    showToast(t('toast.configurationSaved'));
  });
}

export function initCategoryFilters() {
  const categoryButtons = document.querySelectorAll('[data-category]');
  const categoryDots = document.querySelectorAll('.category-scroll-dot');

  categoryButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      categoryButtons.forEach((btn, btnIndex) => {
        const isActive = btn === button;

        btn.classList.toggle('is-active', isActive);
        if (btn.tagName === 'BUTTON') {
          btn.setAttribute('aria-pressed', String(isActive));
        } else {
          btn.setAttribute('aria-current', isActive ? 'true' : 'false');
        }
        categoryDots[btnIndex]?.classList.toggle('is-active', isActive);
      });

      button.scrollIntoView({ behavior: getScrollBehavior(), inline: 'center', block: 'nearest' });
    });
  });
}

export function initHeroParallax() {
  const scene = document.querySelector('[data-parallax-scene]');

  if (!scene || prefersReducedMotion()) {
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
      showToast(t(active ? 'toast.wishlistSaved' : 'toast.wishlistRemoved', { name: currentProduct.name }));
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
      showToast(t('toast.addedToCart', { name: product.name }));
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
        showToast(t('toast.movedToCart', { name: product.name }));
      }

      content.dataset.wishlistReady = 'false';
      renderWishlistContent();
      updateCartBadges();
    } else if (remove) {
      const product = getProductById(remove.dataset.wishlistRemove);

      removeWishlistItem(remove.dataset.wishlistRemove);
      showToast(t('toast.wishlistRemoved', { name: product?.name || t('common.item') }));
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
  const nameKey = `products.items.${product.id}.name`;
  const descriptionKey = `products.items.${product.id}.description`;
  const localizedName = t(nameKey) === nameKey ? product.name : t(nameKey);
  const localizedCategory = t(`filters.categoryOptions.${product.category}`);
  const category = localizedCategory === `filters.categoryOptions.${product.category}`
    ? product.category.replaceAll('-', ' ')
    : localizedCategory;
  const tags = product.tags?.slice(0, 3).map((tag) => highlightMatch(tag, term)).join(', ');
  const description = t(descriptionKey) === descriptionKey ? tags : highlightMatch(t(descriptionKey), term);

  return `
    <a href="/product?id=${product.id}" id="search-option-${escapeAttribute(product.id)}" class="search-result-item" role="option" data-search-option aria-selected="false">
      <img ${imageAttributes(product.image, {
        alt: '',
        width: 120,
        height: 120,
        sizes: '72px'
      })} />
      <span>
        <strong>${highlightMatch(localizedName, term)}</strong>
        <small>${highlightMatch(category, term)} &middot; ${description}</small>
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
  const resetButton = overlay.querySelector('[data-search-reset]');
  let lastFocusedElement = null;
  let activeIndex = -1;
  let lastResultsHtml = '';

  const options = () => [...results.querySelectorAll('[data-search-option]')];

  const setActiveOption = (index) => {
    const items = options();

    activeIndex = items.length ? Math.max(0, Math.min(index, items.length - 1)) : -1;
    items.forEach((item, itemIndex) => {
      const isActive = itemIndex === activeIndex;

      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });

    input.setAttribute('aria-activedescendant', activeIndex >= 0 ? items[activeIndex].id : '');
  };

  const renderRecentSearches = () => {
    const recentSearches = getRecentSearches();
    recentList.innerHTML = recentSearches.length
      ? recentSearches.map((term) => `<button type="button" class="search-chip" data-search-term="${escapeAttribute(term)}" data-search-recent>${escapeHtml(term)}</button>`).join('')
      : `<p class="text-sm text-[#7b6a5a]">${t('search.noRecent')}</p>`;
  };

  const renderResults = (term) => {
    const query = term.trim();
    const matches = searchProducts(query);
    const html = query ? matches.map((product) => searchResultItem(product, query)).join('') : '';

    meta.hidden = Boolean(query);
    empty.hidden = !query || matches.length > 0;
    input.setAttribute('aria-expanded', String(Boolean(query)));

    if (html !== lastResultsHtml) {
      results.innerHTML = html;
      lastResultsHtml = html;
    }

    setActiveOption(matches.length ? 0 : -1);
  };

  const debouncedRender = debounce((event) => renderResults(event.target.value), 250);

  const openSearch = () => {
    lastFocusedElement = document.activeElement;
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('nav-open');
    renderRecentSearches();

    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
      input.focus();
      renderResults(input.value);
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
    const items = options();

    if (event.key === 'ArrowDown' && items.length) {
      event.preventDefault();
      setActiveOption(activeIndex + 1);
    } else if (event.key === 'ArrowUp' && items.length) {
      event.preventDefault();
      setActiveOption(activeIndex <= 0 ? items.length - 1 : activeIndex - 1);
    } else if (event.key === 'Enter' && input.value.trim()) {
      const selectedResult = items[activeIndex] || items[0];

      if (selectedResult) {
        event.preventDefault();
        saveRecentSearch(input.value.trim());
        renderRecentSearches();
        selectedResult.click();
      }
    } else if (event.key === 'Escape') {
      closeSearch();
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
    showToast(t('toast.searchCleared'));
    input.focus();
  });

  resetButton?.addEventListener('click', () => {
    input.value = '';
    renderResults('');
    input.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeSearch();
    }
  });

  renderRecentSearches();
}

function bindCheckoutControls() {
  const form = document.querySelector('[data-checkout-form]');

  if (!form || form.dataset.checkoutReady === 'true') {
    return;
  }

  form.dataset.checkoutReady = 'true';
  const fields = [...form.querySelectorAll('[data-checkout-field]')];
  const submitButton = form.querySelector('[data-checkout-submit]');
  const couponInput = form.querySelector('[data-checkout-coupon]');
  const couponButton = form.querySelector('[data-checkout-apply-coupon]');
  const couponMessage = form.querySelector('[data-checkout-coupon-message]');
  const summary = form.querySelector('[data-checkout-summary]');
  let couponApplied = false;
  let submitting = false;

  const validationMessage = (field) => {
    const value = field.value.trim();

    if (field.dataset.required === 'true' && !value) {
      return t('validation.requiredField');
    }

    if (!value) {
      return '';
    }

    if (field.dataset.checkoutField === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return t('validation.invalidEmail');
    }

    if (field.dataset.checkoutField === 'phone' && !/^[+()\d\s.-]{8,18}$/.test(value)) {
      return t('checkout.errors.invalidPhone');
    }

    return '';
  };

  const setFieldState = (field) => {
    const error = validationMessage(field);
    const wrapper = field.closest('.checkout-field');
    const errorElement = wrapper?.querySelector('[data-field-error]');

    field.classList.toggle('is-invalid', Boolean(error));
    field.setAttribute('aria-invalid', String(Boolean(error)));
    if (errorElement) {
      errorElement.textContent = error;
      errorElement.hidden = !error;
    }

    return !error;
  };

  const updateSubmitState = () => {
    const isValid = fields.every((field) => validationMessage(field) === '');

    if (submitButton) {
      submitButton.disabled = !isValid || submitting;
      submitButton.toggleAttribute('aria-disabled', !isValid || submitting);
    }

    return isValid;
  };

  const selectedShipping = () => Number(form.querySelector('[data-shipping-option]:checked')?.dataset.shippingCost || 0);

  const updateOptionState = (name) => {
    form.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
      input.closest('.checkout-option')?.classList.toggle('is-active', input.checked);
    });
  };

  const updateSummary = () => {
    const subtotal = getSubtotal();
    const itemDiscount = getDiscount();
    const couponDiscount = couponApplied ? subtotal * Number(summary?.dataset.couponRate || 0) : 0;
    const shipping = selectedShipping();
    const tax = Math.max(0, subtotal - couponDiscount) * Number(summary?.dataset.taxRate || 0);
    const total = Math.max(0, subtotal - couponDiscount + shipping + tax);

    setTextIfChanged(summary?.querySelector('[data-checkout-subtotal]'), formatCurrency(subtotal));
    setTextIfChanged(summary?.querySelector('[data-checkout-discount]'), `-${formatCurrency(itemDiscount)}`);
    setTextIfChanged(summary?.querySelector('[data-checkout-coupon-discount]'), `-${formatCurrency(couponDiscount)}`);
    setTextIfChanged(summary?.querySelector('[data-checkout-shipping]'), shipping === 0 ? t('cart.freeShipping') : formatCurrency(shipping));
    setTextIfChanged(summary?.querySelector('[data-checkout-tax]'), formatCurrency(tax));
    setTextIfChanged(summary?.querySelector('[data-checkout-total]'), formatCurrency(total));
  };

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      setFieldState(field);
      updateSubmitState();
    });
    field.addEventListener('blur', () => {
      setFieldState(field);
      updateSubmitState();
    });
  });

  form.querySelectorAll('[data-shipping-option], [data-payment-option]').forEach((input) => {
    input.addEventListener('change', () => {
      updateOptionState(input.name);
      updateSummary();
    });
  });

  couponButton?.addEventListener('click', () => {
    const code = couponInput?.value.trim().toUpperCase();

    couponApplied = code === 'MILKTEA10';
    couponMessage.textContent = couponApplied ? t('checkout.couponSuccess') : t('checkout.couponInvalid');
    couponMessage.classList.toggle('is-success', couponApplied);
    couponMessage.classList.toggle('is-error', !couponApplied);
    updateSummary();
    showToast(couponApplied ? t('toast.couponApplied') : t('checkout.couponInvalid'));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = fields.every(setFieldState);
    updateSubmitState();

    if (!isValid || submitting) {
      fields.find((field) => validationMessage(field))?.focus();
      return;
    }

    submitting = true;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = t('common.loading');

    window.setTimeout(() => {
      submitButton.textContent = submitButton.dataset.actionSuccess || t('checkout.orderSuccess');
      submitButton.classList.add('cart-pop');
      document.querySelector('#order-success')?.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
      window.history.replaceState(null, '', '#order-success');
    }, 700);
  });

  updateOptionState('delivery-method');
  updateOptionState('payment-method');
  updateSummary();
  updateSubmitState();
}

function bindContactForm() {
  const form = document.querySelector('[data-contact-form]');

  if (!form || form.dataset.contactReady === 'true') {
    return;
  }

  form.dataset.contactReady = 'true';
  const fields = [...form.querySelectorAll('[data-contact-field]')];
  const submitButton = form.querySelector('[data-contact-submit]');
  const message = form.querySelector('[data-contact-message]');
  let submitting = false;

  const validationMessage = (field) => {
    const value = field.value.trim();

    if (field.dataset.required === 'true' && !value) {
      return t('validation.requiredField');
    }

    if (!value) {
      return '';
    }

    if (field.dataset.contactField === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return t('validation.invalidEmail');
    }

    if (field.dataset.contactField === 'phone' && !/^[+()\d\s.-]{8,18}$/.test(value)) {
      return t('checkout.errors.invalidPhone');
    }

    return '';
  };

  const setFieldState = (field) => {
    const error = validationMessage(field);
    const errorElement = document.getElementById(field.getAttribute('aria-describedby'));

    field.classList.toggle('is-invalid', Boolean(error));
    field.setAttribute('aria-invalid', String(Boolean(error)));

    if (errorElement) {
      errorElement.textContent = error;
      errorElement.hidden = !error;
    }

    return !error;
  };

  const updateSubmitState = () => {
    const isValid = fields.every((field) => validationMessage(field) === '');

    if (submitButton) {
      submitButton.disabled = !isValid || submitting;
      submitButton.toggleAttribute('aria-disabled', !isValid || submitting);
    }

    return isValid;
  };

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      setFieldState(field);
      updateSubmitState();
    });
    field.addEventListener('blur', () => {
      setFieldState(field);
      updateSubmitState();
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = fields.every(setFieldState);
    updateSubmitState();

    if (!isValid || submitting) {
      fields.find((field) => validationMessage(field))?.focus();
      return;
    }

    submitting = true;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = t('contact.form.sending');

    window.setTimeout(() => {
      submitting = false;
      form.reset();
      submitButton.disabled = false;
      submitButton.setAttribute('aria-busy', 'false');
      submitButton.textContent = t('contact.form.submit');

      if (message) {
        message.textContent = t('contact.form.success');
        message.classList.add('is-success');
      }

      updateSubmitState();
    }, 520);
  });

  updateSubmitState();
}

function initFaqPage() {
  const accordion = document.querySelector('[data-faq-accordion]');
  const categoryButtons = [...document.querySelectorAll('[data-faq-category]')];

  if (!accordion || accordion.dataset.faqReady === 'true') {
    return;
  }

  accordion.dataset.faqReady = 'true';
  const items = [...accordion.querySelectorAll('[data-faq-item]')];

  const setCategory = (category) => {
    categoryButtons.forEach((button) => {
      const isActive = button.dataset.faqCategory === category;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    items.forEach((item, index) => {
      const isVisible = item.dataset.faqPanel === category;
      item.hidden = !isVisible;

      if (!isVisible) {
        item.open = false;
      } else if (index === items.findIndex((entry) => entry.dataset.faqPanel === category)) {
        item.open = true;
      }
    });
  };

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => setCategory(button.dataset.faqCategory));
  });

  const firstCategory = categoryButtons[0]?.dataset.faqCategory;

  if (firstCategory) {
    setCategory(firstCategory);
  }
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
  bindCheckoutControls();
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
      showToast(t('toast.quantityUpdated'));
      content.dataset.cartReady = 'false';
      renderCartContent();
    } else if (decrease) {
      decreaseQuantity(decrease.dataset.cartDecrease);
      showToast(t('toast.quantityUpdated'));
      content.dataset.cartReady = 'false';
      renderCartContent();
    } else if (remove) {
      removeItem(remove.dataset.cartRemove);
      showToast(t('toast.removedFromCart'));
      content.dataset.cartReady = 'false';
      renderCartContent();
    } else if (clear) {
      clearCart();
      showToast(t('toast.cartCleared'));
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
      message.textContent = t('cart.couponApplied');
      showToast(t('toast.couponApplied'));
    } else {
      message.textContent = t('cart.couponHint');
    }
  });
}

export function initCartPage() {
  updateCartBadges();
  bindCartControls();
  bindCheckoutControls();
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

function getDetailQuantity() {
  const quantityInput = document.querySelector('[data-detail-quantity-value]');
  const quantity = Number(quantityInput?.value || quantityInput?.textContent || 1);

  return Math.max(1, Number.isFinite(quantity) ? quantity : 1);
}

function getTranslatedProductName(product) {
  const key = `products.items.${product.id}.name`;
  const name = t(key);

  return name === key ? product.name : name;
}

function getTranslatedProductDescription(product) {
  const key = `products.items.${product.id}.description`;
  const description = t(key);

  return description === key ? product.description : description;
}

function getTranslatedProductCategory(product) {
  const key = `filters.categoryOptions.${product.category}`;
  const category = t(key);

  return category === key ? product.category.replaceAll('-', ' ') : category;
}

function quickViewContent(product) {
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const name = getTranslatedProductName(product);
  const description = getTranslatedProductDescription(product);
  const category = getTranslatedProductCategory(product);
  const activeWishlist = isWishlistItem(product.id);

  return `
    <div class="quick-view-grid">
      <section class="quick-view-gallery" aria-label="${t('productDetail.galleryAria', { name })}">
        <div class="quick-view-main-image">
          <img ${imageAttributes(gallery[0], {
            alt: name,
            width: 900,
            height: 900,
            sizes: '(min-width: 1024px) 42vw, 92vw',
            extra: 'data-quick-view-main'
          })} />
        </div>
        <div class="quick-view-thumbnails" role="group" aria-label="${t('productDetail.thumbnailsAria')}">
          ${gallery.map((image, index) => `
            <button type="button" class="${index === 0 ? 'is-active' : ''}" data-quick-view-thumb="${escapeAttribute(image)}" aria-label="${t('productDetail.viewImageAria', { index: index + 1 })}" aria-pressed="${index === 0}">
              <img ${imageAttributes(image, {
                alt: '',
                width: 120,
                height: 120,
                sizes: '72px'
              })} />
            </button>
          `).join('')}
        </div>
      </section>

      <section class="quick-view-info" aria-labelledby="quick-view-title">
        <p class="menu-product-category">${category}</p>
        <h2 id="quick-view-title">${name}</h2>
        <div class="product-rating" aria-label="${t('products.ratingAria', { rating: product.rating, reviews: product.reviews })}">
          <span aria-hidden="true">&#9733;</span>
          <strong>${product.rating}</strong>
          <small>${t('products.reviewCount', { count: product.reviews })}</small>
        </div>
        <div class="quick-view-price-row">
          <strong>${formatCurrency(product.price)}</strong>
          <span>${formatCurrency(product.oldPrice)}</span>
          <em>-${product.discount}%</em>
        </div>
        <p>${description}</p>

        <div class="quick-view-actions">
          <div class="cart-quantity" aria-label="${t('productDetail.quantityAria')}">
            <button type="button" data-quick-view-quantity="decrease" aria-label="${t('productDetail.decreaseQuantity')}">-</button>
            <input type="number" value="1" min="1" max="12" inputmode="numeric" class="product-quantity-input" data-quick-view-quantity-value aria-label="${t('productDetail.quantityInputAria')}" />
            <button type="button" data-quick-view-quantity="increase" aria-label="${t('productDetail.increaseQuantity')}">+</button>
          </div>
          <button type="button" class="btn-primary ripple-button quick-view-add-cart" data-quick-view-add="${product.id}">${t('buttons.addToCart')}</button>
          <button type="button" class="favorite-button ripple-button static${activeWishlist ? ' is-active' : ''}" aria-label="${t('products.addWishlistAria', { name })}" aria-pressed="${activeWishlist}" data-quick-view-wishlist="${product.id}">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path></svg>
          </button>
        </div>
        <a href="/product?id=${product.id}" class="btn-secondary quick-view-detail-link">${t('products.viewFullDetails')}</a>
      </section>
    </div>
  `;
}

function getQuickViewQuantity(modal) {
  const input = modal?.querySelector('[data-quick-view-quantity-value]');
  const value = Number(input?.value || 1);

  return Math.max(1, Math.min(12, Number.isFinite(value) ? value : 1));
}

function setQuickViewQuantity(modal, value) {
  const input = modal?.querySelector('[data-quick-view-quantity-value]');

  if (input) {
    input.value = String(Math.max(1, Math.min(12, Number(value) || 1)));
  }
}

function closeQuickView() {
  const modal = document.querySelector('[data-quick-view-modal]');

  if (!modal || modal.classList.contains('hidden')) {
    return;
  }

  modal.classList.remove('is-open');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('nav-open');
  window.quickViewLastFocus?.focus?.();
}

function openQuickView(productId, trigger) {
  const modal = document.querySelector('[data-quick-view-modal]');
  const content = modal?.querySelector('[data-quick-view-content]');
  const product = getProductById(productId);

  if (!modal || !content || !product) {
    return;
  }

  window.quickViewLastFocus = trigger || document.activeElement;
  content.innerHTML = quickViewContent(product);
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('nav-open');
  initRippleButtons();

  requestAnimationFrame(() => {
    modal.classList.add('is-open');
    modal.querySelector('[data-quick-view-close]')?.focus();
  });
}

function trapQuickViewFocus(event, modal) {
  const focusable = [...modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  const first = focusable[0];
  const last = focusable.at(-1);

  if (!first || !last) {
    return;
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function initQuickView() {
  if (window.quickViewReady === true) {
    return;
  }

  window.quickViewReady = true;

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-quick-view]');
    const close = event.target.closest('[data-quick-view-close]');
    const modal = document.querySelector('[data-quick-view-modal]');

    if (trigger) {
      event.preventDefault();
      openQuickView(trigger.dataset.quickView, trigger);
      return;
    }

    if (close || event.target === modal) {
      closeQuickView();
      return;
    }

    const thumb = event.target.closest('[data-quick-view-thumb]');
    if (thumb && modal?.classList.contains('is-open')) {
      const mainImage = modal.querySelector('[data-quick-view-main]');
      mainImage.classList.add('is-switching');
      mainImage.src = thumb.dataset.quickViewThumb;
      thumb.parentElement.querySelectorAll('[data-quick-view-thumb]').forEach((item) => {
        const isActive = item === thumb;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
      mainImage.addEventListener('load', () => mainImage.classList.remove('is-switching'), { once: true });
      return;
    }

    const quantityButton = event.target.closest('[data-quick-view-quantity]');
    if (quantityButton) {
      const current = getQuickViewQuantity(modal);
      setQuickViewQuantity(modal, quantityButton.dataset.quickViewQuantity === 'increase' ? current + 1 : current - 1);
      return;
    }

    const addButton = event.target.closest('[data-quick-view-add]');
    if (addButton) {
      const product = getProductById(addButton.dataset.quickViewAdd);
      if (product) {
        addItem({ ...product, name: getTranslatedProductName(product), quantity: getQuickViewQuantity(modal) });
        updateCartBadges();
        showToast(t('toast.addedToCart', { name: getTranslatedProductName(product) }));
        addButton.classList.add('cart-pop');
        addButton.addEventListener('animationend', () => addButton.classList.remove('cart-pop'), { once: true });
      }
      return;
    }

    const wishlistButton = event.target.closest('[data-quick-view-wishlist]');
    if (wishlistButton) {
      const product = getProductById(wishlistButton.dataset.quickViewWishlist);
      if (product) {
        const { active } = toggleWishlistItem(product);
        wishlistButton.classList.toggle('is-active', active);
        wishlistButton.setAttribute('aria-pressed', String(active));
        updateWishlistBadges();
        showToast(t(active ? 'toast.wishlistSaved' : 'toast.wishlistRemoved', { name: getTranslatedProductName(product) }));
      }
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target.matches('[data-quick-view-quantity-value]')) {
      setQuickViewQuantity(document.querySelector('[data-quick-view-modal]'), event.target.value);
    }
  });

  document.addEventListener('keydown', (event) => {
    const modal = document.querySelector('[data-quick-view-modal].is-open');

    if (!modal) {
      return;
    }

    if (event.key === 'Escape') {
      closeQuickView();
    } else if (event.key === 'Tab') {
      trapQuickViewFocus(event, modal);
    }
  });
}

export function initNewsletterForms() {
  document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
    if (form.dataset.newsletterReady === 'true') {
      return;
    }

    form.dataset.newsletterReady = 'true';
    const input = form.querySelector('[data-newsletter-email]');
    const message = form.querySelector('[data-newsletter-message]');
    const button = form.querySelector('button[type="submit"]');

    const validate = () => {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());

      input.classList.toggle('is-invalid', input.value.trim() && !valid);
      input.setAttribute('aria-invalid', String(input.value.trim() && !valid));

      return valid;
    };

    input?.addEventListener('input', () => {
      validate();
      message.textContent = '';
      message.className = 'newsletter-message';
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!validate()) {
        message.textContent = t('validation.invalidEmail');
        message.className = 'newsletter-message is-error';
        input.focus();
        return;
      }

      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.textContent = t('common.loading');

      window.setTimeout(() => {
        message.textContent = t('home.newsletter.success');
        message.className = 'newsletter-message is-success';
        button.textContent = t('home.newsletter.subscribed');
        button.classList.add('cart-pop');
      }, 450);
    });
  });
}

function buildDetailProduct(id) {
  const product = getProductById(id);
  const quantity = getDetailQuantity();
  const options = getSelectedProductOptions();
  const variantParts = [
    options.size || product.size,
    t('filters.sugarValue', { value: options.sugar || product.sugar }),
    options.ice || product.ice,
    options.toppings.length
      ? options.toppings.map((topping) => t(`productDetail.toppings.${topping}`)).join(', ')
      : t('productDetail.noExtraToppings')
  ];

  return {
    ...product,
    name: getTranslatedProductName(product),
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
  const thumbs = [...detail.querySelectorAll('[data-gallery-thumb]')];

  const setQuantity = (value) => {
    const next = Math.max(1, Math.min(12, Number(value) || 1));

    if ('value' in quantityValue) {
      quantityValue.value = String(next);
    } else {
      quantityValue.textContent = String(next);
    }

    quantityValue.classList.remove('quantity-bump');
    requestAnimationFrame(() => quantityValue.classList.add('quantity-bump'));
  };

  const selectThumb = (thumb) => {
    if (!thumb || thumb.classList.contains('is-active')) {
      return;
    }

    const revealImage = () => {
      mainImage.classList.remove('is-switching');
    };

    mainImage.classList.add('is-switching');
    mainImage.addEventListener('load', revealImage, { once: true });
    mainImage.src = thumb.dataset.galleryThumb;
    mainImage.srcset = thumb.dataset.gallerySrcset;
    mainImage.sizes = '(min-width: 1024px) 48vw, 92vw';
    thumbs.forEach((item) => {
      const isActive = item === thumb;

      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    if (mainImage.complete) {
      window.requestAnimationFrame(revealImage);
    }
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => selectThumb(thumb));
    thumb.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        return;
      }

      event.preventDefault();
      const lastIndex = thumbs.length - 1;
      const nextIndex = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? lastIndex
          : event.key === 'ArrowRight'
            ? Math.min(lastIndex, index + 1)
            : Math.max(0, index - 1);
      const nextThumb = thumbs[nextIndex];

      nextThumb.focus();
      selectThumb(nextThumb);
    });
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

  detail.querySelector('[data-product-share="copy"]')?.addEventListener('click', async () => {
    const shareUrl = window.location.href;

    try {
      await navigator.clipboard?.writeText(shareUrl);
      showToast(t('toast.linkCopied'));
    } catch {
      showToast(shareUrl);
    }
  });

  detail.querySelectorAll('[data-detail-quantity]').forEach((button) => {
    button.addEventListener('click', () => {
      const current = getDetailQuantity();
      const next = button.dataset.detailQuantity === 'increase'
        ? Math.min(12, current + 1)
        : Math.max(1, current - 1);

      setQuantity(next);
    });
  });

  quantityValue?.addEventListener('input', () => {
    if (Number(quantityValue.value) < 1) {
      quantityValue.value = '1';
    }
  });

  quantityValue?.addEventListener('change', () => setQuantity(quantityValue.value));

  detail.querySelectorAll('[data-detail-add], [data-detail-buy]').forEach((button) => {
    button.addEventListener('click', () => {
      const product = buildDetailProduct(button.dataset.detailAdd || button.dataset.detailBuy);
      const label = button.dataset.actionLabel || button.textContent;
      const successLabel = button.dataset.actionSuccess || label;

      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.textContent = t('common.loading');
      addItem(product);
      updateCartBadges();
      showToast(t('toast.addedToCart', { name: product.name }));
      button.textContent = successLabel;
      button.classList.remove('cart-pop');
      window.requestAnimationFrame(() => button.classList.add('cart-pop'));
      button.addEventListener('animationend', () => button.classList.remove('cart-pop'), { once: true });

      if (button.dataset.detailBuy) {
        window.location.href = '/cart';
        return;
      }

      window.setTimeout(() => {
        button.disabled = false;
        button.removeAttribute('aria-busy');
        button.textContent = label;
      }, 850);
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
  const menuTitle = document.querySelector('[data-menu-title]');
  const menuBreadcrumb = document.querySelector('[data-menu-breadcrumb]');
  const pagination = document.querySelector('[data-menu-pagination]');
  const filterOpen = document.querySelector('[data-filter-open]');
  const filterClose = document.querySelector('[data-filter-close]');
  const filterDrawer = document.querySelector('#menu-filter-drawer');
  const filterOverlay = document.querySelector('[data-filter-overlay]');
  const viewButtons = document.querySelectorAll('[data-view-mode]');
  const products = [...grid.querySelectorAll('[data-menu-product]')];
  const productElementsById = new Map(products.map((product) => [product.dataset.productId, product]));
  const pageSize = 8;
  const initialParams = new URLSearchParams(window.location.search);
  const initialCategory = initialParams.get('category') || '';
  const initialCategories = initialCategory ? [initialCategory] : [];
  const initialSearch = initialParams.get('q') || '';
  let currentPage = 1;
  let filteredProducts = [...MENU_PRODUCTS];

  const selectedValues = (name) => [...new Set(
    [...filters]
      .filter((input) => input.name === name && input.checked)
      .map((input) => input.value)
  )];

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

  const syncInitialFiltersFromUrl = () => {
    if (search && initialSearch) {
      search.value = initialSearch;
    }

    if (!initialCategories.length) {
      return;
    }

    filters.forEach((input) => {
      if (input.name === 'category') {
        input.checked = initialCategories.includes(input.value);
      }
    });
  };

  const updateMenuUrl = ({ replace = false } = {}) => {
    const state = getFilterState();
    const params = new URLSearchParams(window.location.search);

    params.delete('category');
    if (state.categories[0]) {
      params.set('category', state.categories[0]);
    }

    if (state.search.trim()) {
      params.set('q', state.search.trim());
    } else {
      params.delete('q');
    }

    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.history[replace ? 'replaceState' : 'pushState'](null, '', nextUrl);
    }
  };

  const categoryLabel = (category) => {
    const key = `filters.categoryOptions.${category}`;
    const label = t(key);

    return label === key ? category : label;
  };

  const updateCategoryHeader = () => {
    const categories = getFilterState().categories;
    const singleCategory = categories.length === 1 ? categories[0] : '';
    const title = singleCategory ? categoryLabel(singleCategory) : t('menu.title');

    if (menuTitle) {
      setTextIfChanged(menuTitle, title);
    }

    if (menuBreadcrumb) {
      menuBreadcrumb.innerHTML = `
        <li><a href="/">${t('navbar.home')}</a></li>
        ${singleCategory ? `<li><a href="/menu">${t('navbar.menu')}</a></li><li aria-current="page">${title}</li>` : `<li aria-current="page">${t('navbar.menu')}</li>`}
      `;
    }
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
    filteredProducts = applyProductFilters(MENU_PRODUCTS, getFilterState());
    const start = (currentPage - 1) * pageSize;
    const visibleProducts = filteredProducts.slice(start, start + pageSize);
    const visibleIds = new Set(visibleProducts.map((product) => product.id));

    products.forEach((product) => {
      product.hidden = !visibleIds.has(product.dataset.productId);
    });

    filteredProducts.forEach((product) => {
      const element = productElementsById.get(product.id);

      if (element) {
        grid.append(element);
      }
    });

    if (count) {
      setTextIfChanged(count, String(filteredProducts.length));
    }

    if (empty) {
      empty.hidden = filteredProducts.length > 0;
    }

    updateCategoryHeader();
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

  syncInitialFiltersFromUrl();

  search?.addEventListener('input', () => {
    updateMenuUrl({ replace: true });
    resetAndRender();
  });
  sort?.addEventListener('change', resetAndRender);
  filters.forEach((input) => input.addEventListener('change', () => {
    if (input.name === 'category' && input.checked) {
      filters.forEach((matchingInput) => {
        if (matchingInput.name === 'category' && matchingInput.value !== input.value) {
          matchingInput.checked = false;
        }
      });
    }

    filters.forEach((matchingInput) => {
      if (matchingInput !== input && matchingInput.name === input.name && matchingInput.value === input.value) {
        matchingInput.checked = input.checked;
      }
    });
    if (input.name === 'category') {
      updateMenuUrl();
    }
    resetAndRender();
  }));
  priceRanges.forEach((range) => {
    range.addEventListener('input', () => {
      priceRanges.forEach((input) => {
        input.value = range.value;
      });
      priceValues.forEach((value) => {
        value.textContent = formatCurrency(Number(range.value));
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
  initLanguageControls();
  initNavigation();
  initRippleButtons();
  initCategoryFilters();
  initHeroParallax();
  initProductCards();
  initQuickView();
  initNewsletterForms();
  bindContactForm();
  initFaqPage();
  initSearchOverlay();
  initMenuPage();
  initCartPage();
  initWishlistPage();
  initProductDetail();
  initAdminPanel();
  scheduleMotionInit();

  window.addEventListener('cart:updated', updateCartBadges);
  window.addEventListener('wishlist:updated', updateWishlistBadges);
}
