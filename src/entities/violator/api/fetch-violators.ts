import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useFetchViolatorsParams } from "@/entities/violator/model/use-fetch-violators-params.ts";
import type { IViolator } from "@/entities/violator/types.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import type { IResponse } from "@/shared/api/types.ts";

type IFetchViolatorsParams = ReturnType<
  typeof useFetchViolatorsParams
>["mergedParams"];

export async function fetchViolators(params: IFetchViolatorsParams) {
  const { data } = await Api.get<IResponse<IViolator>>(
    endpoints.immigrants.get,
    { params }
  );
  return data;
}

export function useFetchViolators() {
  const { mergedParams } = useFetchViolatorsParams();

  return useQuery({
    queryKey: ["immigrants-identify", JSON.stringify(mergedParams)],
    queryFn: () => fetchViolators(mergedParams),
    placeholderData: keepPreviousData
  });
}
