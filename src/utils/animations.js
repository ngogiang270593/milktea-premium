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

export function initCategoryFilters() {
  const categoryButtons = document.querySelectorAll('[data-category]');
  const productCards = document.querySelectorAll('[data-product-category]');

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      categoryButtons.forEach((btn) => {
        btn.classList.remove('bg-brand-green', 'text-white');
      });

      button.classList.add('bg-brand-green', 'text-white');

      productCards.forEach((card) => {
        const cardCategory = card.dataset.productCategory;
        card.classList.toggle('hidden', category !== 'all' && cardCategory !== category);
      });
    });
  });
}

export function initAppInteractions() {
  initNavigation();
  initRippleButtons();
  initCategoryFilters();
}
