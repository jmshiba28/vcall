/**
 * Utility function to get initials from a name.
 *
 * @param {string} name - The full name of the person.
 * @param {boolean} [includeMiddle=false] - Whether to include the middle name's initial.
 * @param {string} [separator=''] - Separator between initials (e.g., '.', '-', or empty string).
 * @returns {string} - The initials in uppercase. Returns an empty string for invalid input.
 */
export const getInitials = (name, includeMiddle = false, separator = '') => {
  if (typeof name !== 'string' || !name.trim()) {
    console.error('Invalid name provided to getInitials:', name);
    return '';
  }

  const nameParts = name.trim().split(/\s+/); // Split by whitespace and trim excess spaces
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
  const lastInitial = nameParts[nameParts.length - 1]?.charAt(0).toUpperCase() || '';

  // Handle middle name initials if needed
  const middleInitials = includeMiddle
    ? nameParts.slice(1, -1).map(part => part.charAt(0).toUpperCase()).join(separator)
    : '';

  // Combine initials with separator
  return [firstInitial, middleInitials, lastInitial].filter(Boolean).join(separator);
};

/**
 * Utility function to generate initials with fallback for single names.
 *
 * @param {string} name - The name of the person.
 * @param {string} [fallback='N/A'] - Fallback string for single names or empty input.
 * @returns {string} - The initials or fallback string.
 */
export const getInitialsWithFallback = (name, fallback = 'N/A') => {
  const initials = getInitials(name);
  return initials || fallback;
};
