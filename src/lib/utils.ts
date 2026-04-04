import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number to a specified number of decimal places
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return '---';
  }
  return value.toFixed(decimals);
}

/**
 * Format a number with thousands separator
 */
export function formatNumberWithSeparator(value: number, decimals: number = 2): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return '---';
  }
  return value.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if a value is a valid positive number
 */
export function isPositiveNumber(value: unknown): boolean {
  const num = Number(value);
  return !Number.isNaN(num) && Number.isFinite(num) && num > 0;
}

/**
 * Convert cubic meters to cubic feet
 */
export function m3Toft3(m3: number): number {
  return m3 * 35.3147;
}

/**
 * Convert cubic meters to liters
 */
export function m3ToLiters(m3: number): number {
  return m3 * 1000;
}

/**
 * Convert cubic feet to cubic meters
 */
export function ft3ToM3(ft3: number): number {
  return ft3 / 35.3147;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
