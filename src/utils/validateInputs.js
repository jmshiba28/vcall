/**
 * Utility function to validate an email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
export const validateEmail = (email) => {
  if (typeof email !== 'string' || !email.trim()) {
    console.error('Invalid input provided to validateEmail:', email);
    return false;
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email.trim());
};

/**
 * Utility function to validate a person's name.
 *
 * @param {string} name - The name to validate.
 * @param {Object} options - Validation options.
 * @param {number} [options.minLength=2] - Minimum length for a valid name.
 * @param {boolean} [options.allowHyphens=true] - Whether to allow hyphenated names.
 * @returns {boolean} - Returns true if the name is valid, otherwise false.
 */
export const validateName = (
  name,
  options = {}
) => {
  const { minLength = 2, allowHyphens = true } = options;

  if (typeof name !== 'string' || !name.trim()) {
    console.error('Invalid input provided to validateName:', name);
    return false;
  }

  // Regex for validating names (supports letters, spaces, and optionally hyphens)
  const regex = allowHyphens ? /^[a-zA-Z\s-]+$/ : /^[a-zA-Z\s]+$/;
  return name.trim().length >= minLength && regex.test(name);
};

/**
 * Utility function to validate a password.
 *
 * @param {string} password - The password to validate.
 * @param {Object} options - Validation options.
 * @param {number} [options.minLength=8] - Minimum length for the password.
 * @param {boolean} [options.requireUppercase=true] - Require at least one uppercase letter.
 * @param {boolean} [options.requireNumber=true] - Require at least one number.
 * @param {boolean} [options.requireSpecialChar=true] - Require at least one special character.
 * @returns {boolean} - Returns true if the password is valid, otherwise false.
 */
export const validatePassword = (
  password,
  options = {}
) => {
  const { minLength = 8, requireUppercase = true, requireNumber = true, requireSpecialChar = true } = options;

  if (typeof password !== 'string' || !password.trim()) {
    console.error('Invalid input provided to validatePassword:', password);
    return false;
  }

  let regexString = `^.{${minLength},}$`; // Ensures minimum length
  if (requireUppercase) regexString = `(?=.*[A-Z])` + regexString;
  if (requireNumber) regexString = `(?=.*\\d)` + regexString;
  if (requireSpecialChar) regexString = `(?=.*[@$!%*?&])` + regexString;

  const regex = new RegExp(regexString);
  return regex.test(password);
};

/**
 * Utility function to validate a phone number.
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 */
export const validatePhoneNumber = (phoneNumber) => {
  if (typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
    console.error('Invalid input provided to validatePhoneNumber:', phoneNumber);
    return false;
  }

  // Supports E.164 international format (e.g., +1234567890)
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(phoneNumber.trim());
};

/**
 * Utility function to validate a URL.
 *
 * @param {string} url - The URL to validate.
 * @returns {boolean} - Returns true if the URL is valid, otherwise false.
 */
export const validateURL = (url) => {
  if (typeof url !== 'string' || !url.trim()) {
    console.error('Invalid input provided to validateURL:', url);
    return false;
  }

  const regex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
  return regex.test(url.trim());
};

/**
 * Utility function to validate general text input (e.g., comments, messages).
 *
 * @param {string} text - The text to validate.
 * @param {Object} options - Validation options.
 * @param {number} [options.maxLength=500] - Maximum allowed length for the text.
 * @param {boolean} [options.allowEmpty=false] - Whether to allow empty text.
 * @returns {boolean} - Returns true if the text is valid, otherwise false.
 */
export const validateText = (
  text,
  options = {}
) => {
  const { maxLength = 500, allowEmpty = false } = options;

  if (typeof text !== 'string') {
    console.error('Invalid input provided to validateText:', text);
    return false;
  }

  return (allowEmpty || text.trim().length > 0) && text.trim().length <= maxLength;
};
