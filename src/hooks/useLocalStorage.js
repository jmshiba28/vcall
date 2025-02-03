import { useState, useEffect, useCallback } from "react";

const useLocalStorage = (key, initialValue, { session = false } = {}) => {
  const storage = session ? window.sessionStorage : window.localStorage;

  const getStoredValue = useCallback(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error accessing storage:", error);
      return initialValue;
    }
  }, [key, storage, initialValue]);

  const [storedValue, setStoredValue] = useState(getStoredValue);

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        storage.setItem(key, JSON.stringify(valueToStore));

        // Dispatch a storage event for cross-tab synchronization
        window.dispatchEvent(new StorageEvent("storage", { key, newValue: JSON.stringify(valueToStore) }));
      } catch (error) {
        console.error("Error setting storage:", error);
      }
    },
    [key, storage, storedValue]
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
};

export default useLocalStorage;
