
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import HelperService from "@/shared/service/helper.ts";

type SelectOption = { label: string; value: any };

export const useDistrictsSearch = (regionId?: number) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 900);

  const isSearchActive = debouncedSearch.length >= 1;
  const searchTerm = isSearchActive ? debouncedSearch : "";

  const enabled = typeof regionId === "number" && regionId > 0;

  const { data, isPending } = useQuery({
    queryKey: ["districts", regionId, searchTerm || "initial"],
    queryFn: () =>
      enabled
        ? HelperService.helperDistricts(searchTerm, 1, regionId as number)
        : Promise.resolve({ results: [] }),
    enabled,
    staleTime: 5 * 60 * 1000,
    refetchOnMount:false,
    refetchOnWindowFocus:false,
  });

  const options: SelectOption[] = useMemo(
    () =>
      (data?.results || []).map((item: any) => ({
        label: item.name ?? "",
        value: item.id
      })),
    [data]
  );

  return { options, isPending, setSearch };
};
