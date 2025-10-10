import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "@/shared/api/axios";

interface ActionOptions<TVariables, TData> {
  url: string;
  method?: "post" | "put" | "patch" | "delete";
  config?: any;
  refetchKeys?: QueryKey[];
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
  transformVariables?: (variables: TVariables) => any;
}

export function useAction<TVariables = any, TData = any>({
  url,
  method = "post",
  config,
  refetchKeys,
  onSuccess,
  onError,
  transformVariables
}: ActionOptions<TVariables, TData>) {
  const queryClient = useQueryClient();

  const mutation = useMutation<TData, any, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const payload = transformVariables
        ? transformVariables(variables)
        : variables;

      const response = await Api.request<TData>({
        url,
        method,
        data: payload,
        ...config
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (refetchKeys) {
        refetchKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    }
  });

  return {
    ...mutation,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync
  };
}
