import { parseAsString, useQueryStates } from "nuqs";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";
import { initialPaginationParams } from "@/shared/api/params";

const initialParams = {
  ...initialPaginationParams,
  full_name: parseAsString,
  birth_date: parseAsString,
  citizenship: parseAsString,
  gender: parseAsString,
  register_start_date: parseAsString,
  register_end_date: parseAsString,
  entry_start_date: parseAsString,
  entry_end_date: parseAsString,
  passport_number: parseAsString,
  person_id: parseAsString
};

export const useGuestHistoryPageParams = () => {
  const [params, setParams] = useQueryStates(initialParams);

  const rawFilters = useMemo(
    () => ({
      full_name: params.full_name,
      citizenship: params.citizenship,
      gender: params.gender,
      register_start_date: params.register_start_date,
      register_end_date: params.register_end_date,
      entry_start_date: params.entry_start_date,
      entry_end_date: params.entry_end_date,
      passport_number: params.passport_number,
      person_id: params.person_id
    }),
    [params]
  );

  const [debouncedParams] = useDebounce(rawFilters, 400);
  const paginationIndex = (params.page - 1) * params.page_size;
  return {
    params,
    setParams,
    paginationIndex,
    mergedParams: {
      ...debouncedParams,
      page: params.page,
      page_size: params.page_size
    }
  };
};
