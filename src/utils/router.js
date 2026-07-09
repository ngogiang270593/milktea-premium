/**
 * Checks whether a click event is a plain left-click.
 *
 * @param {MouseEvent} event Click event.
 * @returns {boolean} True for unmodified primary-button clicks.
 */
export function isPlainLeftClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

/**
 * Checks whether an anchor can be handled by the SPA router.
 *
 * @param {HTMLAnchorElement} link Link element.
 * @param {URL} url Parsed destination URL.
 * @param {Set<string>} appRoutes Known app routes.
 * @returns {boolean} True when the router should intercept.
 */
export function shouldHandleLink(link, url, appRoutes) {
  return (
    link.target !== '_blank' &&
    !link.hasAttribute('download') &&
    url.origin === window.location.origin &&
    appRoutes.has(url.pathname)
  );
}

/**
 * Builds the route string used for browser history comparisons.
 *
 * @param {URL | Location} url URL-like object.
 * @returns {string} Path, search, and hash.
 */
export function routeToString(url) {
  return `${url.pathname}${url.search}${url.hash}`;
}

