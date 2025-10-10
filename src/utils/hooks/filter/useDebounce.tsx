import { skipToken, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

type UseDebouncedSelectQueryProps<T> = {
  queryKeyPrefix: string[];
  fetchFn: (search: string) => Promise<{ results: T[] }>;
  mapFn: (item: T) => { label: string; value: any };
  minLength?: number;
  skip?: boolean;
};

export function useDebouncedSelectQuery<T>({
  queryKeyPrefix,
  fetchFn,
  mapFn,
  minLength = 1,
  loadInitial = false,
  skip
}: UseDebouncedSelectQueryProps<T> & { loadInitial?: boolean }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 700);
  const isSearchActive = debouncedSearch.length >= minLength;
  const shouldFetch = isSearchActive || (loadInitial && debouncedSearch === "");

  const { data, isPending, isLoading } = useQuery({
    queryKey: [queryKeyPrefix, debouncedSearch || "initial"],
    queryFn: skip ? skipToken : () => fetchFn(debouncedSearch),
    enabled: shouldFetch,
    select: (data) => (data?.results || []).map(mapFn),
    staleTime: 5 * 60 * 1000,
    refetchOnMount:false,
    refetchOnWindowFocus:false,
  });

  return {
    options: data,
    isPending,
    isLoading,
    setSearch,
    isSearchActive
  };
}
