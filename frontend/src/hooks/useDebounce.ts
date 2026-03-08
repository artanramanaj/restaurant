import { useState, useEffect } from 'react';

type UseDebounceReturn<T> = T;

function useDebounce<T = any>(value: T, delay: number): UseDebounceReturn<T> {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;