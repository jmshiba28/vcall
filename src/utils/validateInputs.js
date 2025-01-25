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
 * Utility function to validate a name.
 *
 * @param {string} name - The name to validate.
 * @param {number} [minLength=3] - Minimum length for a valid name.
 * @returns {boolean} - Returns true if the name is valid, otherwise false.
 */
export const validateName = (name, minLength = 3) => {
  if (typeof name !== 'string' || !name.trim()) {
    console.error('Invalid input provided to validateName:', name);
    return false;
  }
  return name.trim().length >= minLength && /^[a-zA-Z\s]+$/.test(name);
};

/**
 * Utility function to validate a password.
 *
 * @param {string} password - The password to validate.
 * @param {number} [minLength=8] - Minimum length for a valid password.
 * @returns {boolean} - Returns true if the password is valid, otherwise false.
 */
export const validatePassword = (password, minLength = 8) => {
  if (typeof password !== 'string' || !password.trim()) {
    console.error('Invalid input provided to validatePassword:', password);
    return false;
  }
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return password.length >= minLength && regex.test(password);
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
  const regex = /^\+?[1-9]\d{1,14}$/; // E.164 international phone number format
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
  const regex = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,6}(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
  return regex.test(url.trim());
};

/**
 * Utility function to validate general text input (e.g., comments, messages).
 *
 * @param {string} text - The text to validate.
 * @param {number} [maxLength=500] - Maximum allowed length for the text.
 * @returns {boolean} - Returns true if the text is valid, otherwise false.
 */
export const validateText = (text, maxLength = 500) => {
  if (typeof text !== 'string') {
    console.error('Invalid input provided to validateText:', text);
    return false;
  }
  return text.trim().length > 0 && text.trim().length <= maxLength;
};
