import { runWhenIdle } from './animation.js';

const prefetchedRoutes = new Set();

function canPrefetch() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  return !connection?.saveData && !['slow-2g', '2g'].includes(connection?.effectiveType);
}

/**
 * Prefetches route modules once, during idle time.
 *
 * @param {string[]} routes Routes to prefetch.
 * @param {(route: string) => Promise<unknown>|unknown} preloadRoute Route preload callback.
 */
export function prefetchRoutes(routes, preloadRoute) {
  if (!canPrefetch()) {
    return;
  }

  runWhenIdle(() => {
    routes.forEach((route) => {
      if (prefetchedRoutes.has(route)) {
        return;
      }

      prefetchedRoutes.add(route);
      preloadRoute(route);
    });
  });
}

/**
 * Prefetches one route module after user intent, such as hovering a link.
 *
 * @param {string} route Route path.
 * @param {(route: string) => Promise<unknown>|unknown} preloadRoute Route preload callback.
 */
export function prefetchRoute(route, preloadRoute) {
  if (!canPrefetch() || prefetchedRoutes.has(route)) {
    return;
  }

  prefetchedRoutes.add(route);
  preloadRoute(route);
}
