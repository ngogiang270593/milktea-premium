export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

/**
 * Returns focusable elements inside a container.
 *
 * @param {ParentNode} container Container to search.
 * @returns {HTMLElement[]} Focusable elements.
 */
export function getFocusableElements(container) {
  return [...(container?.querySelectorAll(FOCUSABLE_SELECTOR) || [])];
}

/**
 * Keeps Tab focus inside a container while it is open.
 *
 * @param {KeyboardEvent} event Keyboard event.
 * @param {HTMLElement} container Focus trap container.
 */
export function trapFocus(event, container) {
  if (event.key !== 'Tab' || !container) {
    return;
  }

  const focusableElements = getFocusableElements(container);
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
}
