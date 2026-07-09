/**
 * Safely reads and parses JSON from localStorage.
 *
 * @param {string} key Storage key.
 * @param {*} fallback Value returned when storage is unavailable or invalid.
 * @returns {*} Parsed value or fallback.
 */
export function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safely serializes JSON into localStorage.
 *
 * @param {string} key Storage key.
 * @param {*} value Serializable value.
 * @returns {boolean} True when the write succeeds.
 */
export function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
