import { useMutation } from "@tanstack/react-query";

import { CommonAPI } from "../api/commonApi";

type DeleteParams = {
  url: string;
  id: number;
};

export const useCommonDeleteById = <TResponse = unknown>() => {
  return useMutation<TResponse, unknown, DeleteParams>({
    mutationFn: async ({ url, id }) => {
      return await CommonAPI.deleteById<TResponse>(url, id);
    }
  });
};
