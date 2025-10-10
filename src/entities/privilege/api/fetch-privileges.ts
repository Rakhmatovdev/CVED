import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { IPrivilege } from "@/entities/privilege/types.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import type { IResponse } from "@/shared/api/types.ts";

export async function fetchPrivileges() {
  const { data } = await Api<IResponse<IPrivilege>>(
    endpoints.helpers.privilege
  );
  return data;
}

export function useFetchPrivileges() {
  return useQuery({
    queryKey: ["privileges"],
    queryFn: fetchPrivileges,
    placeholderData: keepPreviousData
  });
}
