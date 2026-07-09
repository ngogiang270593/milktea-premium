/**
 * Escapes text before rendering it into HTML strings.
 *
 * @param {unknown} value Value to escape.
 * @returns {string} Escaped HTML text.
 */
export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/**
 * Escapes values used inside HTML attributes.
 *
 * @param {unknown} value Value to escape.
 * @returns {string} Escaped attribute value.
 */
export function escapeAttribute(value = '') {
  return escapeHtml(value).replaceAll('`', '&#96;');
}

/**
 * Joins conditional class names.
 *
 * @param {...string} values Class names.
 * @returns {string} Joined class list.
 */
export function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

/**
 * Serializes a plain object into HTML attributes.
 *
 * @param {Record<string, unknown>} attributes Attributes map.
 * @returns {string} Serialized attributes.
 */
export function attributes(attributes = {}) {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => (value === true ? key : `${key}="${escapeAttribute(value)}"`))
    .join(' ');
}

/**
 * Returns true when browser-only APIs are available.
 *
 * @returns {boolean} Browser API availability.
 */
export function canUseDOM() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Writes text only when it changes.
 *
 * @param {Element} element Target element.
 * @param {string} value Text value.
 */
export function setTextIfChanged(element, value) {
  if (element && element.textContent !== value) {
    element.textContent = value;
  }
}

/**
 * Writes an attribute only when it changes.
 *
 * @param {Element} element Target element.
 * @param {string} name Attribute name.
 * @param {string} value Attribute value.
 */
export function setAttributeIfChanged(element, name, value) {
  if (element && element.getAttribute(name) !== value) {
    element.setAttribute(name, value);
  }
}
