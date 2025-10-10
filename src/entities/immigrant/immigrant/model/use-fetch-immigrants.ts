import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useDebounce } from "use-debounce";
import {
  initialPaginationParams,
  initialSearchParams
} from "@/shared/api/params.ts";

const initialParams = {
  ...initialPaginationParams,
  ...initialSearchParams,
  birth_date_from: parseAsString,
  birth_date_to: parseAsString,
  birth_date: parseAsString,
  citizenship: parseAsString,
  first_name: parseAsString,
  last_name: parseAsString,
  middle_name: parseAsString,
  passport_number: parseAsString,
  arrival_date_from: parseAsString,
  arrival_date_to: parseAsString,
  ordering: parseAsString,

  // Frontend only
  visa_request_id: parseAsInteger
};

export const useFetchImmigrantsParams = () => {
  const [params, setParams] = useQueryStates(initialParams);
  // biome-ignore lint: lint/correctness/noUnusedVariables: for now
  const { visa_request_id, search, ...filters } = params;
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
