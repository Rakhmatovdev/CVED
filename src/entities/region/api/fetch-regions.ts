import type { IRegion } from "@/entities/region/types.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import type { IResponse } from "@/shared/api/types.ts";
import { CitizenshipData } from "@/shared/types/form.type.ts";
import { useDebouncedSelectQuery } from "@/utils/hooks/filter/useDebounce.tsx";

interface IFetchRegionsParams {
  search?: string;
}

export async function fetchRegions(params: IFetchRegionsParams) {
  const { data } = await Api<IResponse<IRegion>>(endpoints.helpers.regions, {
    params
  });
  return data;
}

export function useFetchRegions(params?: IFetchRegionsParams) {
  return useDebouncedSelectQuery<CitizenshipData>({
    queryKeyPrefix: ["regions"],
    fetchFn: (search: string) => fetchRegions({ ...params, search }),
    mapFn: (item) => ({ label: item.name ?? "", value: item.id }),
    loadInitial: true
  });
}
