import { useEffect, useState } from "react";

const useDebouncedValue = <T,>(value: T): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebouncedValue;
