import { parseAsInteger, useQueryStates } from "nuqs";
import { useDebounce } from "use-debounce";
import {
  initialPaginationParams,
  initialSearchParams
} from "@/shared/api/params.ts";

const initialParams = {
  ...initialPaginationParams,
  ...initialSearchParams,
  region: parseAsInteger,
  accommodation: parseAsInteger,
  criteria: parseAsInteger,
  hotel_type: parseAsInteger,
  inn: parseAsInteger,
  contract_number: parseAsInteger
};

export const useFetchHotelsParams = () => {
  const [params, setParams] = useQueryStates(initialParams);
  const { search, ...filters } = params;
  const [debouncedParams] = useDebounce(search, 400);
  const paginationIndex = (params.page - 1) * params.page_size;
  return {
    params,
    setParams,
    debouncedParams,
    paginationIndex,
    mergedParams: { ...filters, search: debouncedParams }
  };
};
