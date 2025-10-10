import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import type { IFetchedImmigrant } from "@/entities/immigrant/immigrant/types.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";

interface IFetchImmigrantByIdParams {
  id: number;
}

export async function fetchImmigrantById({
  id,
  ...params
}: IFetchImmigrantByIdParams) {
  const { data } = await Api.get<IFetchedImmigrant>(
    `${endpoints.immigrants.get}/${id}`,
    { params }
  );
  return data;
}

export function useFetchImmigrantById({ id }: IFetchImmigrantByIdParams) {
  return useQuery({
    queryKey: ["immigrant-by-id", id],
    queryFn: !id ? skipToken : () => fetchImmigrantById({ id }),
    placeholderData: keepPreviousData
  });
}
