import { useEffect, useRef } from "react";

const useTimeout = () => {
  const ref = useRef<NodeJS.Timeout>(undefined);

  const clear = () => clearTimeout(ref.current);

  useEffect(() => clear, []);

  return {
    set: (callback: () => void, delay: number) => {
      ref.current = setTimeout(callback, delay);
    },
    clear,
  };
};

export default useTimeout;
