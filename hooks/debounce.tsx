import { useCallback, useRef, useState } from "react";

export const useDebouncedCallback = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number,
  deps: React.DependencyList = []
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: T) => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [delay, ...deps]
  );
};

export const useDebouncedValue = <T extends any>(
  initialValue: T,
  delay: number
) => {
  const [value, setValue] = useState(initialValue);

  return [value, useDebouncedCallback(setValue, delay)];
};
