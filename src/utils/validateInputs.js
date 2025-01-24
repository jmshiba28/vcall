// Utility function to validate text inputs (email, name, etc.)

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  
  export const validateName = (name) => {
    return name.trim().length >= 3;
  };
  