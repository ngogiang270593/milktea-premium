import { runWhenIdle } from './animation.js';

const prefetchedRoutes = new Set();

/**
 * Prefetches route modules once, during idle time.
 *
 * @param {string[]} routes Routes to prefetch.
 * @param {(route: string) => Promise<unknown>|unknown} preloadRoute Route preload callback.
 */
export function prefetchRoutes(routes, preloadRoute) {
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
  if (prefetchedRoutes.has(route)) {
    return;
  }

  prefetchedRoutes.add(route);
  preloadRoute(route);
}
