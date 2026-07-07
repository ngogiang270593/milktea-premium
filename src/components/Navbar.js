import { BRAND_NAME, NAV_LINKS } from '../utils/constants.js';

function navLink({ label, href }, className) {
  const resolvedHref = href.startsWith('#') && window.location.pathname === '/menu' ? `/${href}` : href;
  return `<a href="${resolvedHref}" class="${className}" data-nav-link>${label}</a>`;
}

function iconButton(label, icon, extraClass = '') {
  return `
    <button type="button" class="nav-icon-button ripple-button ${extraClass}" aria-label="${label}">
      ${icon}
    </button>
  `;
}

export function Navbar() {
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

  return `
    <header id="site-header" class="site-header sticky top-0 z-50 px-4 py-4 transition-all duration-300" data-reveal>
      <div class="nav-shell mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-3 rounded-full px-4 py-3 transition-all duration-300 md:grid-cols-[1fr_auto_1fr] md:px-5">
        <a href="/" class="nav-logo group inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-tight text-brand-green outline-none transition focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2">
          <span class="grid h-10 w-10 place-items-center rounded-full bg-[#0d3b2e] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(13,59,46,0.24)]">MP</span>
          <span class="hidden sm:inline">${BRAND_NAME}</span>
        </a>

        <nav class="hidden items-center justify-center gap-1 rounded-full bg-white/35 px-2 py-1 md:flex" aria-label="Primary navigation">
          ${NAV_LINKS.map((link) => navLink(link, 'nav-link rounded-full px-4 py-2 text-sm font-medium text-[#4d4035] outline-none transition duration-300 hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70')).join('')}
        </nav>

        <div class="hidden items-center justify-end gap-2 md:flex">
          ${iconButton('Search products', searchIcon)}
          <a href="#newsletter" class="nav-login ripple-button rounded-full bg-[#0d3b2e] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(13,59,46,0.22)] outline-none transition hover:bg-[#143f31] focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2">Login</a>
          <button type="button" class="nav-icon-button ripple-button relative" aria-label="Open shopping cart">
            ${cartIcon}
            <span class="cart-badge absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-gold px-1 text-[10px] font-bold text-[#2f2419] shadow-sm" aria-hidden="true">2</span>
          </button>
        </div>

        <button id="menu-toggle" type="button" class="nav-icon-button ripple-button justify-self-end md:hidden" aria-label="Open navigation menu" aria-controls="mobile-drawer" aria-expanded="false">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16"></path>
          </svg>
        </button>
      </div>

      <div id="drawer-overlay" class="drawer-overlay fixed inset-0 z-40 bg-[#1f1710]/30 opacity-0 backdrop-blur-sm transition duration-300 md:hidden" hidden aria-hidden="true"></div>
      <aside id="mobile-drawer" class="mobile-drawer fixed right-0 top-0 z-50 h-dvh w-[min(86vw,24rem)] translate-x-full bg-white/92 p-5 shadow-[-24px_0_70px_rgba(31,23,16,0.2)] backdrop-blur-2xl transition duration-300 md:hidden" aria-label="Mobile navigation" aria-hidden="true" inert>
        <div class="flex items-center justify-between">
          <a href="/" class="inline-flex items-center gap-3 rounded-full text-sm font-semibold text-brand-green outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70">
            <span class="grid h-10 w-10 place-items-center rounded-full bg-[#0d3b2e] text-sm font-semibold text-white">MP</span>
            ${BRAND_NAME}
          </a>
          <button id="menu-close" type="button" class="nav-icon-button ripple-button" aria-label="Close navigation menu">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18"></path>
            </svg>
          </button>
        </div>

        <nav class="mt-10 grid gap-2" aria-label="Mobile primary navigation">
          ${NAV_LINKS.map((link) => navLink(link, 'nav-link mobile-nav-link rounded-2xl px-4 py-3 text-base font-medium text-[#4d4035] outline-none transition hover:bg-brand-mint/40 hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70')).join('')}
        </nav>

        <div class="mt-8 grid gap-3">
          <button type="button" class="ripple-button flex items-center justify-center gap-2 rounded-full border border-[#d8c8b8] bg-white px-5 py-3 text-sm font-semibold text-[#4d4035] outline-none transition hover:border-brand-green hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70" aria-label="Search products">
            ${searchIcon}
            Search
          </button>
          <a href="#newsletter" class="ripple-button rounded-full bg-[#0d3b2e] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_28px_rgba(13,59,46,0.22)] outline-none transition hover:bg-[#143f31] focus-visible:ring-2 focus-visible:ring-brand-gold/70">Login</a>
        </div>
      </aside>
    </header>
  `;
}
