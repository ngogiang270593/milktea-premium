import { getSiteConfig } from '../config/siteConfig.js';
import { NAV_LINKS } from '../constants/navigation.js';
import { LanguageSwitcher } from './LanguageSwitcher.js';
import { ThemeToggle } from './ThemeToggle.js';
import { getCartQuantity } from '../store/cartStore.js';
import { getWishlistCount } from '../store/wishlistStore.js';
import { t } from '../utils/i18n.js';

function navLink({ label, labelKey, href }, className) {
  const resolvedHref = href.startsWith('#') && window.location.pathname !== '/' ? `/${href}` : href;
  return `<a href="${resolvedHref}" class="${className}" data-nav-link data-i18n-text="${labelKey || ''}">${label}</a>`;
}

function iconButton(label, icon, extraClass = '', attributes = '') {
  return `
    <button type="button" class="nav-icon-button ripple-button ${extraClass}" aria-label="${label}" ${attributes}>
      ${icon}
    </button>
  `;
}

export function Navbar() {
  const siteConfig = getSiteConfig();
  const searchIcon = `
    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="m21 21-4.35-4.35"></path>
      <circle cx="11" cy="11" r="7"></circle>
    </svg>
  `;
  const cartIcon = `
    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="M6.5 8h11l-1.1 7.2a2 2 0 0 1-2 1.8H9.6a2 2 0 0 1-2-1.8L6.5 8Z"></path>
      <path d="M9 8a3 3 0 0 1 6 0"></path>
      <path d="M9 20h.01M15 20h.01"></path>
    </svg>
  `;
  const heartIcon = `
    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21.6l8.8-8.8a5.1 5.1 0 0 0 0-7.2Z"></path>
    </svg>
  `;

  const localizedLinks = NAV_LINKS.map((link) => ({
    ...link,
    label: link.labelKey ? t(link.labelKey) : link.label
  }));
  const wishlistCount = getWishlistCount();
  const cartQuantity = getCartQuantity();

  return `
    <header id="site-header" class="site-header sticky top-0 z-50 px-4 py-4 transition-all duration-300" data-reveal>
      <div class="nav-shell mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-4 py-3 transition-all duration-300 md:gap-4 md:px-5">
        <a href="/" class="nav-logo group inline-flex shrink-0 items-center gap-3 rounded-full text-sm font-semibold tracking-tight text-brand-green outline-none transition focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2">
          <span class="grid h-10 w-10 place-items-center rounded-full bg-[#0d3b2e] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(13,59,46,0.24)]">${siteConfig.brand.logoText}</span>
          <span class="hidden sm:inline">${siteConfig.brand.name}</span>
        </a>

        <nav class="hidden min-w-0 flex-1 items-center justify-center gap-1 rounded-full bg-white/35 px-2 py-1 md:flex" aria-label="${t('navbar.primary')}" data-i18n-aria="navbar.primary">
          ${localizedLinks.map((link) => navLink(link, 'nav-link rounded-full px-4 py-2 text-sm font-medium text-[#4d4035] outline-none transition duration-300 hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70')).join('')}
        </nav>

        <div class="nav-actions hidden shrink-0 items-center justify-end gap-2 md:flex">
          ${iconButton(t('navbar.searchProducts'), searchIcon, '', 'data-search-open aria-haspopup="dialog" data-i18n-aria="navbar.searchProducts"')}
          ${ThemeToggle()}
          ${LanguageSwitcher()}
          <a href="${window.location.pathname === '/' ? '#newsletter' : '/#newsletter'}" class="nav-login ripple-button rounded-full bg-[#0d3b2e] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(13,59,46,0.22)] outline-none transition hover:bg-[#143f31] focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2" data-i18n-text="buttons.login">${t('buttons.login')}</a>
          <a href="/wishlist" class="nav-icon-button ripple-button relative" aria-label="${t('navbar.openWishlist')}" data-i18n-aria="navbar.openWishlist">
            ${heartIcon}
            <span class="wishlist-badge absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-peach px-1 text-[10px] font-bold text-[#2f2419] shadow-sm" aria-label="${t('navbar.wishlistCount', { count: wishlistCount })}" data-wishlist-count data-i18n-count-aria="navbar.wishlistCount">${wishlistCount}</span>
          </a>
          <a href="/cart" class="nav-icon-button ripple-button relative" aria-label="${t('navbar.openCart')}" data-i18n-aria="navbar.openCart">
            ${cartIcon}
            <span class="cart-badge absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-gold px-1 text-[10px] font-bold text-[#2f2419] shadow-sm" aria-label="${t('navbar.cartCount', { count: cartQuantity })}" data-cart-count data-i18n-count-aria="navbar.cartCount">${cartQuantity}</span>
          </a>
        </div>

        <button id="menu-toggle" type="button" class="nav-icon-button ripple-button ml-auto md:hidden" aria-label="${t('navbar.openMenu')}" aria-controls="mobile-drawer" aria-expanded="false" data-i18n-aria="navbar.openMenu">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16"></path>
          </svg>
        </button>
      </div>

      <div id="drawer-overlay" class="drawer-overlay fixed inset-0 z-40 bg-[#1f1710]/30 opacity-0 backdrop-blur-sm transition duration-300 md:hidden" hidden aria-hidden="true"></div>
      <aside id="mobile-drawer" class="mobile-drawer fixed right-0 top-0 z-50 h-dvh w-[min(86vw,24rem)] translate-x-full bg-white/92 p-5 shadow-[-24px_0_70px_rgba(31,23,16,0.2)] backdrop-blur-2xl transition duration-300 md:hidden" role="dialog" aria-modal="true" aria-label="${t('navbar.mobile')}" aria-hidden="true" inert data-i18n-aria="navbar.mobile">
        <div class="flex items-center justify-between">
          <a href="/" class="inline-flex items-center gap-3 rounded-full text-sm font-semibold text-brand-green outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70">
            <span class="grid h-10 w-10 place-items-center rounded-full bg-[#0d3b2e] text-sm font-semibold text-white">${siteConfig.brand.logoText}</span>
            ${siteConfig.brand.name}
          </a>
          <button id="menu-close" type="button" class="nav-icon-button ripple-button" aria-label="${t('navbar.closeMenu')}" data-i18n-aria="navbar.closeMenu">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18"></path>
            </svg>
          </button>
        </div>

        <nav class="mt-10 grid gap-2" aria-label="${t('navbar.mobilePrimary')}" data-i18n-aria="navbar.mobilePrimary">
          ${localizedLinks.map((link) => navLink(link, 'nav-link mobile-nav-link rounded-2xl px-4 py-3 text-base font-medium text-[#4d4035] outline-none transition hover:bg-brand-mint/40 hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70')).join('')}
        </nav>

        <div class="mt-8 grid gap-3">
          <button type="button" class="ripple-button flex items-center justify-center gap-2 rounded-full border border-[#d8c8b8] bg-white px-5 py-3 text-sm font-semibold text-[#4d4035] outline-none transition hover:border-brand-green hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70" aria-label="${t('navbar.searchProducts')}" data-search-open aria-haspopup="dialog" data-i18n-aria="navbar.searchProducts">
            ${searchIcon}
            <span data-i18n-text="buttons.search">${t('buttons.search')}</span>
          </button>
          ${ThemeToggle({ mobile: true })}
          ${LanguageSwitcher({ mobile: true })}
          <a href="${window.location.pathname === '/' ? '#newsletter' : '/#newsletter'}" class="ripple-button rounded-full bg-[#0d3b2e] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_28px_rgba(13,59,46,0.22)] outline-none transition hover:bg-[#143f31] focus-visible:ring-2 focus-visible:ring-brand-gold/70" data-i18n-text="buttons.login">${t('buttons.login')}</a>
          <a href="/wishlist" class="ripple-button rounded-full border border-[#d8c8b8] bg-white px-5 py-3 text-center text-sm font-semibold text-[#4d4035] outline-none transition hover:border-brand-green hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70"><span data-i18n-text="buttons.wishlist">${t('buttons.wishlist')}</span> (<span data-wishlist-count>${wishlistCount}</span>)</a>
          <a href="/cart" class="ripple-button rounded-full border border-[#d8c8b8] bg-white px-5 py-3 text-center text-sm font-semibold text-[#4d4035] outline-none transition hover:border-brand-green hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70"><span data-i18n-text="buttons.viewCart">${t('buttons.viewCart')}</span> (<span data-cart-count>${cartQuantity}</span>)</a>
        </div>
      </aside>
    </header>
  `;
}

export function updateNavbarTranslations(scope = document) {
  scope.querySelectorAll('[data-i18n-text]').forEach((element) => {
    const key = element.dataset.i18nText;

    if (key) {
      element.textContent = t(key);
    }
  });

  scope.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    const key = element.dataset.i18nAria;

    if (key) {
      element.setAttribute('aria-label', t(key));
    }
  });

  scope.querySelectorAll('[data-i18n-count-aria]').forEach((element) => {
    const key = element.dataset.i18nCountAria;
    const count = element.textContent.trim();

    if (key) {
      element.setAttribute('aria-label', t(key, { count }));
    }
  });
}
