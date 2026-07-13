import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function prefersReducedMotion() {
  return reduceMotionQuery.matches;
}

function visibleElements(selector, scope = document) {
  return gsap.utils.toArray(selector, scope).filter((element) => !element.hidden);
}

function formatCounter(value, template) {
  const match = template.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

  if (!match) {
    return template;
  }

  const [, prefix, rawNumber, suffix] = match;
  const decimals = rawNumber.includes('.') ? rawNumber.split('.')[1].length : 0;
  const formatted = Number(value).toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  });

  return `${prefix}${formatted}${suffix}`;
}

function prepareReducedMotion() {
  document.documentElement.classList.add('reduced-motion');
  document.querySelectorAll('[data-reveal], .fade-up').forEach((element) => {
    element.classList.add('is-visible');
    gsap.set(element, { clearProps: 'all' });
  });
}

function initNavbarReveal() {
  const header = document.querySelector('#site-header');

  if (!header || performance.now() > 900) {
    return;
  }

  gsap.fromTo(header, {
    autoAlpha: 0,
    y: -16
  }, {
    autoAlpha: 1,
    y: 0,
    duration: 0.56,
    ease: 'power3.out',
    clearProps: 'opacity,visibility,transform'
  });
}

function initHeroReveal() {
  const hero = document.querySelector('.premium-hero');

  if (!hero || performance.now() > 900) {
    return;
  }

  const timeline = gsap.timeline({
    defaults: {
      duration: 0.72,
      ease: 'power3.out'
    }
  });

  timeline
    .fromTo(hero.querySelectorAll('.fade-up'), {
      autoAlpha: 0,
      y: 26
    }, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.075,
      clearProps: 'opacity,visibility,transform'
    })
    .fromTo(hero.querySelector('.hero-visual'), {
      autoAlpha: 0,
      scale: 0.97,
      y: 22
    }, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      clearProps: 'opacity,visibility,transform'
    }, '-=0.42');
}

function initScrollReveals() {
  visibleElements('[data-reveal]:not(#site-header)').forEach((element) => {
    gsap.fromTo(element, {
      autoAlpha: 0,
      y: 22
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.62,
      ease: 'power3.out',
      clearProps: 'opacity,visibility,transform',
      scrollTrigger: {
        trigger: element,
        start: 'top 84%',
        once: true
      },
      onComplete: () => element.classList.add('is-visible')
    });
  });
}

function initCounters() {
  visibleElements('.hero-stat-card strong').forEach((counter) => {
    if (counter.dataset.counterReady === 'true') {
      return;
    }

    counter.dataset.counterReady = 'true';
    const targetText = counter.textContent.trim();
    const match = targetText.match(/[0-9]+(?:\.[0-9]+)?/);

    if (!match) {
      return;
    }

    const targetValue = Number(match[0]);
    const state = { value: 0 };

    gsap.to(state, {
      value: targetValue,
      duration: 1.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 86%',
        once: true
      },
      onUpdate: () => {
        counter.textContent = formatCounter(state.value, targetText);
      },
      onComplete: () => {
        counter.textContent = targetText;
      }
    });
  });
}

function initFloatingBubbles() {
  const floatingItems = visibleElements('.hero-bubble, .floating-card, .hero-quality-card');

  if (!floatingItems.length) {
    return;
  }

  gsap.to(floatingItems, {
    y: (index) => (index % 2 === 0 ? -10 : 10),
    x: (index) => (index % 3 === 0 ? 4 : -4),
    duration: (index) => 4.8 + index * 0.28,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    stagger: 0.12
  });
}

export function animateCardSet(cards, options = {}) {
  const elements = gsap.utils.toArray(cards).filter((element) => !element.hidden);

  if (!elements.length) {
    return;
  }

  if (prefersReducedMotion()) {
    gsap.set(elements, { clearProps: 'all' });
    return;
  }

  gsap.fromTo(elements, {
    autoAlpha: 0,
    y: 18,
    scale: 0.985
  }, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    duration: options.duration || 0.48,
    ease: 'power3.out',
    stagger: options.stagger || 0.055,
    clearProps: 'opacity,visibility,transform'
  });
}

function initCardStaggers() {
  const cardSelectors = '.category-card, .trust-card, .about-card, .about-stat, .about-team-card, .contact-method-card, .contact-faq-link, .faq-item, .product-card, .featured-premium-card, .menu-product-card, .testimonial-card, .instagram-tile, .wishlist-item, .cart-item';

  ScrollTrigger.batch(cardSelectors, {
    start: 'top 88%',
    once: true,
    interval: 0.12,
    batchMax: 6,
    onEnter: (batch) => animateCardSet(batch)
  });
}

export function initSmoothScroll() {
  if (window.smoothScrollReady === true) {
    return;
  }

  window.smoothScrollReady = true;

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) {
      return;
    }

    const link = event.target.closest('a[href^="#"], a[href^="/#"]');

    if (!link) {
      return;
    }

    const href = link.getAttribute('href');
    const hash = href.startsWith('/#') ? href.slice(1) : href;
    const target = document.getElementById(hash.slice(1));

    if (!target || (href.startsWith('/#') && window.location.pathname !== '/')) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start'
    });
    window.history.replaceState(null, '', hash);

  });
}

export function initGsapMotion() {
  initSmoothScroll();

  if (prefersReducedMotion()) {
    prepareReducedMotion();
    return;
  }

  document.documentElement.classList.add('gsap-motion');
  initNavbarReveal();
  initHeroReveal();
  initScrollReveals();
  initCardStaggers();
  initCounters();
  initFloatingBubbles();
}
