import { useState, useEffect, useRef } from "react";

export const useThrottle = <T>(value: T, interval: number = 200): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (lastUpdated.current === null) {
      // Mount: state already initialized to `value`, no emit needed.
      lastUpdated.current = now;
      return;
    }

    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const fireAt = lastUpdated.current + interval;
      const id = setTimeout(() => {
        lastUpdated.current = fireAt;
        setThrottledValue(value);
      }, fireAt - now);
      return () => clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
};
