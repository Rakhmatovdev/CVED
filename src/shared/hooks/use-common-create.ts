import { useMutation } from "@tanstack/react-query";
import { CommonAPI } from "../api/commonApi";

export const useCommonCreate = <TData, TResponse>() => {
  return useMutation({
    mutationFn: ({ url, data }: { url: string; data: TData }) =>
      CommonAPI.create<TData, TResponse>(url, data),
    onSuccess: () => {},
    onError: () => {}
  });
};
