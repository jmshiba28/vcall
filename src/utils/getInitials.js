// Utility function to get initials from a name

export const getInitials = (name) => {
    const nameParts = name.split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = nameParts[nameParts.length - 1]?.charAt(0).toUpperCase() || '';
    return firstInitial + lastInitial;
  };
  