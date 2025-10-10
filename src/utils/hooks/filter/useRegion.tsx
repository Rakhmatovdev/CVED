import HelperService from "@/shared/service/helper.ts";
import { CitizenshipData } from "@/shared/types/form.type.ts";
import { useDebouncedSelectQuery } from "@/utils/hooks/filter/useDebounce.tsx";

export const useRegionsSearch = () =>
  useDebouncedSelectQuery<CitizenshipData>({
    queryKeyPrefix: ["regions"],
    fetchFn: (search: string) => HelperService.helperRegions(search),
    mapFn: (item) => ({
      label: item.name ?? "",
      value: item.id
    }),
    loadInitial: true,
    minLength: 1
  });
