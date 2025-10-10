import type { IDistrict } from "@/entities/district/types.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import { IResponse } from "@/shared/api/types.ts";
import { CitizenshipData } from "@/shared/types/form.type";
import { useDebouncedSelectQuery } from "@/utils/hooks/filter/useDebounce";

interface IFetchDistrictsParams {
  search?: string;
  region?: string;
}

export async function fetchDistricts(params: IFetchDistrictsParams) {
  const { data } = await Api<IResponse<IDistrict>>(
    endpoints.helpers.districts,
    { params }
  );
  return data;
}

export function useFetchDistricts(params?: IFetchDistrictsParams) {
  return useDebouncedSelectQuery<CitizenshipData>({
    queryKeyPrefix: ["districts", params.region],
    fetchFn: (search: string) => fetchDistricts({ ...params, search }),
    mapFn: (item) => ({ label: item.name ?? "", value: item.id }),
    loadInitial: true,
    skip: !params.region
  });
}
