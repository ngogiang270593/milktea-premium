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
  const categoryDots = document.querySelectorAll('.category-scroll-dot');

  categoryButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      categoryButtons.forEach((btn, btnIndex) => {
        const isActive = btn === button;

        btn.classList.toggle('is-active', isActive);
        btn.classList.toggle('bg-brand-green', isActive && btn.classList.contains('btn-secondary'));
        btn.classList.toggle('text-white', isActive && btn.classList.contains('btn-secondary'));
        btn.setAttribute('aria-pressed', String(isActive));
        categoryDots[btnIndex]?.classList.toggle('is-active', isActive);
      });

      productCards.forEach((card) => {
        const cardCategory = card.dataset.productCategory;
        card.classList.toggle('hidden', category !== 'all' && cardCategory !== category);
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
}

export function initAppInteractions() {
  initNavigation();
  initRippleButtons();
  initCategoryFilters();
  initHeroParallax();
  initProductCards();
}
