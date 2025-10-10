import { useQuery } from "@tanstack/react-query";
import { CommonAPI } from "../api/commonApi";

export const useCommonFetchById = <T>(
  urlEndingWithSlash: string,
  id: number
) => {
  return useQuery({
    queryKey: [urlEndingWithSlash, id],
    queryFn: () => CommonAPI.fetchById<T>(urlEndingWithSlash, id),
    enabled: !!id
  });
};
