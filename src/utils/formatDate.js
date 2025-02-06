// Utility functions for formatting dates

/**
 * Formats a given date into a human-readable string based on the provided options.
 *
 * @param {Date | string | number} date - The date to format. Can be a Date object, timestamp, or ISO string.
 * @param {Object} options - Optional formatting options.
 * @param {string} locale - Optional locale, defaults to 'en-US'.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (date, options = {}, locale = 'en-US') => {
  if (!date) return 'Invalid date';
  try {
    const defaultOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(date).toLocaleDateString(locale, { ...defaultOptions, ...options });
  } catch (error) {
    console.error('Invalid date provided to formatDate:', date, error);
    return 'Invalid date';
  }
};

/**
 * Converts a date into a relative time string (e.g., "5 minutes ago").
 *
 * @param {Date | string | number} date - The date to convert.
 * @param {string} locale - Locale for formatting (default: 'en-US').
 * @returns {string} - Relative time string.
 */
export const formatRelativeTime = (date, locale = 'en-US') => {
  if (!date) return 'Invalid date';
  try {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    const thresholds = [
      { unit: 'second', value: 60 },
      { unit: 'minute', value: 60 },
      { unit: 'hour', value: 24 },
      { unit: 'day', value: 7 },
      { unit: 'week', value: 4.33 },
      { unit: 'month', value: 12 },
      { unit: 'year', value: Infinity },
    ];

    let timeValue = diffInSeconds;
    let unit = 'second';

    for (const threshold of thresholds) {
      if (Math.abs(timeValue) < threshold.value) break;
      unit = threshold.unit;
      timeValue /= threshold.value;
    }

    return rtf.format(Math.round(-timeValue), unit);
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
  if (!date) return 'Invalid time';
  try {
    return new Date(date).toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
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
  if (!date) return 'Invalid ISO date';
  try {
    return new Date(date).toISOString();
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
  if (!date) return false;
  try {
    const now = new Date();
    const targetDate = new Date(date);
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

/**
 * Checks if a given date is yesterday.
 *
 * @param {Date | string | number} date - The date to check.
 * @returns {boolean} - True if the date was yesterday, false otherwise.
 */
export const isYesterday = (date) => {
  if (!date) return false;
  try {
    const now = new Date();
    const targetDate = new Date(date);
    now.setDate(now.getDate() - 1);
    return (
      targetDate.getDate() === now.getDate() &&
      targetDate.getMonth() === now.getMonth() &&
      targetDate.getFullYear() === now.getFullYear()
    );
  } catch (error) {
    console.error('Invalid date provided to isYesterday:', date, error);
    return false;
  }
};

/**
 * Converts a timestamp to a formatted string in a specific timezone.
 *
 * @param {Date | string | number} date - The date to format.
 * @param {string} timeZone - The desired timezone (e.g., "America/New_York").
 * @param {string} locale - Optional locale, defaults to 'en-US'.
 * @returns {string} - Formatted date string in the specified timezone.
 */
export const formatWithTimeZone = (date, timeZone, locale = 'en-US') => {
  if (!date) return 'Invalid date';
  try {
    return new Date(date).toLocaleString(locale, { timeZone });
  } catch (error) {
    console.error('Invalid date provided to formatWithTimeZone:', date, error);
    return 'Invalid date';
  }
};
