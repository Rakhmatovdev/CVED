import { useMutation } from "@tanstack/react-query";
import { CommonAPI } from "../api/commonApi";

type UpdateParams<TData> = {
  url: string;
  id: number;
  data: TData;
};

export const useCommonUpdateById = <TData, TResponse>() => {
  return useMutation({
    mutationFn: ({ url, id, data }: UpdateParams<TData>) =>
      CommonAPI.updateById<TData, TResponse>(url, id, data),
    onSuccess: () => {},
    onError: () => {}
  });
};
