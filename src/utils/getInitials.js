/**
 * Utility function to get initials from a name.
 *
 * @param {string} name - The full name of the person.
 * @param {Object} options - Configuration options.
 * @param {boolean} [options.includeMiddle=false] - Whether to include middle name initials.
 * @param {string} [options.separator=''] - Separator between initials (e.g., '.', '-', or empty string).
 * @param {boolean} [options.allowSingleInitial=false] - Whether to allow a single initial for single names.
 * @returns {string} - The initials in uppercase or an empty string for invalid input.
 */
export const getInitials = (
  name,
  options = {}
) => {
  const { includeMiddle = false, separator = '', allowSingleInitial = false } = options;

  if (typeof name !== 'string' || !name.trim()) {
    console.error('Invalid name provided to getInitials:', name);
    return '';
  }

  // Normalize the name: Trim spaces & handle special characters
  const nameParts = name.trim().replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ' -]/g, '').split(/\s+/); // Supports accented letters, hyphens, apostrophes

  if (nameParts.length === 1 && allowSingleInitial) {
    return nameParts[0].charAt(0).toUpperCase();
  }

  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
  const lastInitial = nameParts[nameParts.length - 1]?.charAt(0).toUpperCase() || '';

  // Handle middle name initials if enabled
  const middleInitials = includeMiddle
    ? nameParts.slice(1, -1).map(part => part.charAt(0).toUpperCase()).join(separator)
    : '';

  // Join initials using separator
  return [firstInitial, middleInitials, lastInitial].filter(Boolean).join(separator);
};

/**
 * Utility function to generate initials with a fallback for single names.
 *
 * @param {string} name - The name of the person.
 * @param {Object} options - Configuration options.
 * @param {string} [options.fallback='N/A'] - Fallback string for empty or invalid names.
 * @param {boolean} [options.allowSingleInitial=false] - Allow single initial when no last name exists.
 * @returns {string} - The initials or the fallback string.
 */
export const getInitialsWithFallback = (
  name,
  options = {}
) => {
  const { fallback = 'N/A', allowSingleInitial = false } = options;
  const initials = getInitials(name, { allowSingleInitial });

  return initials || fallback;
};
