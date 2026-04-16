import { useEffect, useRef } from "react";

const useTimeoutRef = () => {
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current));

  return timeoutRef;
};

export default useTimeoutRef;
