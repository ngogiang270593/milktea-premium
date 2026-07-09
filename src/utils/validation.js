/**
 * Checks whether a value is a non-array object.
 *
 * @param {unknown} value Value to inspect.
 * @returns {boolean} True for plain object-like values.
 */
export function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Checks whether a value exists in an allowed list.
 *
 * @param {unknown} value Value to validate.
 * @param {unknown[]} allowedValues Allowed values.
 * @returns {boolean} True when valid.
 */
export function isOneOf(value, allowedValues = []) {
  return allowedValues.includes(value);
}

/**
 * Normalizes text for case-insensitive matching.
 *
 * @param {unknown} value Value to normalize.
 * @returns {string} Lowercase normalized string.
 */
export function normalizeText(value = '') {
  return String(value).trim().toLowerCase();
}

