import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useFetchImmigrantsParams } from "@/entities/immigrant/immigrant/model/use-fetch-immigrants.ts";
import type { IImmigrant } from "@/entities/immigrant/immigrant/types.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import type { IResponse } from "@/shared/api/types.ts";

type IFetchImmigrantsParams = ReturnType<
  typeof useFetchImmigrantsParams
>["mergedParams"];

export async function fetchImmigrants(params: IFetchImmigrantsParams) {
  const { data } = await Api.get<IResponse<IImmigrant>>(
    endpoints.immigrants.get,
    { params }
  );
  return data;
}

export function useFetchImmigrants() {
  const { mergedParams } = useFetchImmigrantsParams();
  return useQuery({
    queryKey: ["fetch-immigrants", mergedParams],
    queryFn: () => fetchImmigrants(mergedParams),
    placeholderData: keepPreviousData
  });
}
