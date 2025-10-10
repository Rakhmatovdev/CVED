import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ICountry } from "@/entities/country/types.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import type { IResponse } from "@/shared/api/types.ts";

interface IFetchCountriesParams {
  search?: string;
  page?: number;
  page_size: number;
}

export async function fetchCountries(params: IFetchCountriesParams) {
  const { data } = await Api<IResponse<ICountry>>(endpoints.helpers.county, {
    params
  });
  return data;
}

export function useFetchCountries(params?: IFetchCountriesParams) {
  // const { debouncedParams } = useFetchCountriesParams();
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => fetchCountries({ ...params }),
    placeholderData: keepPreviousData
  });
}
