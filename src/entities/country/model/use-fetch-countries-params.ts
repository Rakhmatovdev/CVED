// import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
// import { useDebounce } from "use-debounce";
//
// const initialParams = {
//   page: parseAsInteger.withDefault(1),
//   page_size: parseAsInteger.withDefault(1000),
//   search: parseAsString.withDefault("")
// };
//
// export const useFetchCountriesParams = () => {
//   const [filters, setFilters] = useQueryStates(initialParams);
//   const [debouncedSearch] = useDebounce(filters.search, 500);
//   return {
//     filters,
//     setFilters,
//     debouncedParams: { ...filters, search: debouncedSearch }
//   };
// };
