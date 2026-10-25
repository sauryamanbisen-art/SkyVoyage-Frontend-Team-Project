/**
 * Skynora / SkyVoyage — Utility Helpers
 * Core utility functions: DOM query helpers, LocalStorage management,
 * currency/date formatting, and PNR generation.
 */

/**
 * DOM selector helper for a single element.
 * @param {string} selector - CSS selector
 * @param {Element|Document} context - Context element (default: document)
 * @returns {Element|null}
 */
export const $ = (selector, context = document) => context.querySelector(selector);

/**
 * DOM selector helper for multiple elements.
 * @param {string} selector - CSS selector
 * @param {Element|Document} context - Context element (default: document)
 * @returns {Element[]}
 */
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

/**
 * Safely retrieve and parse JSON data from LocalStorage.
 * @param {string} key - Storage key
 * @param {*} defaultValue - Fallback value if key doesn't exist or on parse error
 * @returns {*} Parsed value or defaultValue
 */
export function loadFromStorage(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : defaultValue;
  } catch (error) {
    console.error(`Error loading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safely serialize and save data to LocalStorage.
 * @param {string} key - Storage key
 * @param {*} value - Data to serialize
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
  }
}

/**
 * Remove an item from LocalStorage.
 * @param {string} key - Storage key
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
  }
}

/**
 * Format a numeric amount as currency string.
 * @param {number} amount - Numeric amount
 * @param {string} currency - ISO currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format date string to readable format.
 * @param {string|Date} dateString - Date string or Date object
 * @param {Intl.DateTimeFormatOptions} options - Formatting options
 * @returns {string}
 */
export function formatDate(dateString, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

/**
 * Generate a unique Passenger Name Record (PNR) code (e.g. SK-7A8B9).
 * @returns {string}
 */
export function generatePNR() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SK-${code}`;
}
