'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for persisting state to localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // SetValue function that handles both direct values and updater functions
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        return newValue;
      });
    },
    []
  );

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for managing calculation history
 */
export function useCalculationHistory<T extends { id: string }>(
  key: string,
  maxItems: number = 100
) {
  const [history, setHistory] = useLocalStorage<T[]>(key, []);

  const addToHistory = useCallback(
    (item: Omit<T, 'id'>) => {
      const newItem = {
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      } as T;

      setHistory((prev) => {
        const newHistory = [newItem, ...prev];
        return newHistory.slice(0, maxItems);
      });
    },
    [setHistory, maxItems]
  );

  const removeFromHistory = useCallback(
    (id: string) => {
      setHistory((prev) => prev.filter((item) => item.id !== id));
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    count: history.length,
  };
}
