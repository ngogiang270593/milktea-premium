import { prefersReducedMotion } from './animation.js';

/**
 * Returns app scroll behavior while respecting reduced motion.
 *
 * @returns {'auto' | 'smooth'} Scroll behavior.
 */
export function getScrollBehavior() {
  return prefersReducedMotion() ? 'auto' : 'smooth';
}

/**
 * Scrolls to the current hash after the route has rendered.
 */
export function scrollToHashAfterRender() {
  const hash = window.location.hash;

  requestAnimationFrame(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({
        behavior: getScrollBehavior(),
        block: 'start'
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  });
}
