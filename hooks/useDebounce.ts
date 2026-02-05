import { useEffect, useState } from "react";

export function useDebounce({ val, delay }: { val: string; delay: number }) {
  const [debounceVal, setDebounceVal] = useState<string>(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => clearTimeout(handler);
  }, [val, delay]);

  return debounceVal;
}
