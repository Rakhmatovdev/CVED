import { parseAsString, useQueryStates } from "nuqs";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";
import { initialPaginationParams } from "@/shared/api/params";

const initialParams = {
  ...initialPaginationParams,
  id: parseAsString,
  passport_number: parseAsString,
  region: parseAsString,
  district: parseAsString,
  status: parseAsString
};

export const useFetchViolatorsParams = () => {
  const [filters, setFilters] = useQueryStates(initialParams);
  const filteredParams = useMemo(
    () => ({
      id: filters.id,
      passport_number: filters.passport_number,
      region: filters.region,
      district: filters.district,
      status: filters.status
    }),
    [filters]
  );
  const [debouncedParams] = useDebounce(filteredParams, 400);
  return {
    filters,
    setFilters,
    mergedParams: {
      ...debouncedParams,
      page: filters.page,
      page_size: filters.page_size
    }
  };
};
