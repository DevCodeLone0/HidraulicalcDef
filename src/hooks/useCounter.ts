'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
}

/**
 * Animated counter hook that counts from start to end
 */
export function useCounter({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = useCallback(() => {
    setIsAnimating(true);
    const startTime = Date.now();
    const difference = end - start;

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const current = start + difference * easeOut;
      setCount(Number(current.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(step);
  }, [start, end, duration, decimals]);

  useEffect(() => {
    animate();
  }, [animate]);

  return { count, isAnimating, restart: animate };
}

/**
 * Simple counter with increment/decrement
 */
export function useSimpleCounter(initialValue: number = 0, min?: number, max?: number) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(
    (step: number = 1) => {
      setCount((prev) => {
        const next = prev + step;
        if (max !== undefined && next > max) return prev;
        return next;
      });
    },
    [max]
  );

  const decrement = useCallback(
    (step: number = 1) => {
      setCount((prev) => {
        const next = prev - step;
        if (min !== undefined && next < min) return prev;
        return next;
      });
    },
    [min]
  );

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset, setCount };
}
