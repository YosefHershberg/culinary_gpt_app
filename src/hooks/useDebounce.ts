import { useState, useEffect } from "react";

type UseDebounceResponse = {
  debouncedValue: string;
  isDebouncing: boolean;
};

const useDebounce = (value: string, delay: number): UseDebounceResponse => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  useEffect(() => {
    setIsDebouncing(true); // Start debouncing
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false); // End debouncing after the delay
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
};

export default useDebounce;
