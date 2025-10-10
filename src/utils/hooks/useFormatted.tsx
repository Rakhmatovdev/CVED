import { useMemo } from "react";

export function useFormattedNumber(number: number | string): string {
  const formatted = useMemo(() => {
    if (typeof number !== "number") return "";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }, [number]);

  return formatted;
}
