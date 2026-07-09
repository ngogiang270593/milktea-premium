/**
 * Checks whether the user prefers reduced motion.
 *
 * @returns {boolean} True when reduced motion is requested.
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Debounces a callback by the given delay.
 *
 * @param {Function} callback Function to debounce.
 * @param {number} delay Delay in milliseconds.
 * @returns {Function} Debounced function.
 */
export function debounce(callback, delay = 300) {
  let timeout;

  return (...args) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => callback(...args), delay);
  };
}

/**
 * Runs a callback at most once per animation frame.
 *
 * @param {Function} callback Callback to throttle.
 * @returns {Function} Throttled callback.
 */
export function rafThrottle(callback) {
  let frame = null;
  let latestArgs = [];

  return (...args) => {
    latestArgs = args;

    if (frame) {
      return;
    }

    frame = window.requestAnimationFrame(() => {
      frame = null;
      callback(...latestArgs);
    });
  };
}

/**
 * Schedules non-critical work when the browser is idle.
 *
 * @param {Function} callback Work to run.
 * @param {number} timeout Maximum delay in milliseconds.
 */
export function runWhenIdle(callback, timeout = 1600) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout });
    return;
  }

  window.setTimeout(callback, Math.min(timeout, 250));
}
