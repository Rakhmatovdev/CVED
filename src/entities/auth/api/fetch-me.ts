import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/entities/auth/model/store.ts";
import type { ICurrentUser } from "@/entities/auth/types.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import queryClient from "@/shared/config/query-client.ts";

export async function fetchMe() {
  const { data } = await Api.get<ICurrentUser>(endpoints.users.me);
  return data;
}

export function useFetchMe() {
  // Store
  const { isAuthorized } = useAuthStore();

  return useQuery({
    queryKey: ["me"],
    queryFn: isAuthorized ? fetchMe : skipToken,
    placeholderData: keepPreviousData
  });
}

export function prefetchMe() {
  return queryClient.prefetchQuery({
    queryKey: ["me"],
    queryFn: fetchMe
  });
}
