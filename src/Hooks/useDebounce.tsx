import { useState, useEffect } from "react";

export function useDebounce<T>(initialValue: T): [T, T, React.Dispatch<T>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [value]);
  return [debouncedValue, value, setValue];
}
