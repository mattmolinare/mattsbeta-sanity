import { useCallback, useRef } from "react";

const useDebouncedCallback = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number,
  deps: React.DependencyList = []
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: T) => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [delay, ...deps]
  );
};

export default useDebouncedCallback;
