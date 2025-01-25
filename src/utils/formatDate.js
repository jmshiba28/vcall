// Utility functions for formatting dates

/**
 * Formats a given date into a human-readable string based on the provided options.
 *
 * @param {Date | string | number} date - The date to format. Can be a Date object, timestamp, or ISO string.
 * @param {Intl.DateTimeFormatOptions} options - Optional formatting options.
 * @param {string} locale - Optional locale, defaults to 'en-US'.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (date, options = {}, locale = 'en-US') => {
  try {
    const defaultOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const formatOptions = { ...defaultOptions, ...options };
    return new Date(date).toLocaleDateString(locale, formatOptions);
  } catch (error) {
    console.error('Invalid date provided to formatDate:', date, error);
    return 'Invalid date';
  }
};

/**
 * Converts a date into a relative time string (e.g., "5 minutes ago").
 *
 * @param {Date | string | number} date - The date to convert.
 * @returns {string} - Relative time string.
 */
export const formatRelativeTime = (date) => {
  try {
    const now = new Date();
    const targetDate = new Date(date);
    const diff = now - targetDate; // Difference in milliseconds

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } catch (error) {
    console.error('Invalid date provided to formatRelativeTime:', date, error);
    return 'Invalid date';
  }
};

/**
 * Formats a date into a time-only string (e.g., "2:30 PM").
 *
 * @param {Date | string | number} date - The date to format.
 * @param {string} locale - Optional locale, defaults to 'en-US'.
 * @returns {string} - Formatted time string.
 */
export const formatTime = (date, locale = 'en-US') => {
  try {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Date(date).toLocaleTimeString(locale, options);
  } catch (error) {
    console.error('Invalid date provided to formatTime:', date, error);
    return 'Invalid time';
  }
};

/**
 * Formats a date into a compact, ISO-like string (e.g., "2025-01-25T14:32:00").
 *
 * @param {Date | string | number} date - The date to format.
 * @returns {string} - Compact ISO string.
 */
export const formatISO = (date) => {
  try {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
  } catch (error) {
    console.error('Invalid date provided to formatISO:', date, error);
    return 'Invalid ISO date';
  }
};

/**
 * Checks if a given date is today.
 *
 * @param {Date | string | number} date - The date to check.
 * @returns {boolean} - True if the date is today, false otherwise.
 */
export const isToday = (date) => {
  try {
    const targetDate = new Date(date);
    const now = new Date();
    return (
      targetDate.getDate() === now.getDate() &&
      targetDate.getMonth() === now.getMonth() &&
      targetDate.getFullYear() === now.getFullYear()
    );
  } catch (error) {
    console.error('Invalid date provided to isToday:', date, error);
    return false;
  }
};
