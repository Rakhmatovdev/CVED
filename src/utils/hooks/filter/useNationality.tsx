import HelperService from "@/shared/service/helper.ts";
import { CitizenshipData } from "@/shared/types/form.type.ts";
import { useDebouncedSelectQuery } from "@/utils/hooks/filter/useDebounce.tsx";

export const useNationalitySearch = () =>
  useDebouncedSelectQuery<CitizenshipData>({
    queryKeyPrefix: ["nationality-data"],
    fetchFn: HelperService.helperNationality,
    mapFn: (item) => ({ label: item.name ?? "", value: item.id }),
    loadInitial: true
  });
