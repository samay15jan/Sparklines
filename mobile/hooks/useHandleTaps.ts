import { useRef } from "react";

const useHandleTaps = (onSingleTap: any, onDoubleTap: any, delay = 100) => {
  const timer = useRef<number | null>(null);

  const handleTap = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
      onDoubleTap();
    } else {
      timer.current = setTimeout(() => {
        onSingleTap();
        timer.current = null;
      }, delay);
    }
  };

  return handleTap;
};

export default useHandleTaps