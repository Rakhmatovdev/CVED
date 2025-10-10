import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { CommonAPI } from "../api/commonApi";
import {
  initialPaginationParams,
  initialSearchParams,
  initialSortParams
} from "../api/params";
import { debounceTime, defaultPaginationParams } from "../config";
import { PaginationData } from "../types/form.type";

const initialParams = {
  ...initialPaginationParams,
  ...initialSearchParams,
  ...initialSortParams
};

export function useCommonFetchTableData<T>(url: string) {
  const [params, setParams] = useQueryStates(initialParams);

  const { control, reset } = useForm({
    defaultValues: { ...params }
  });
  const watched = useWatch({ control });
  const [debouncedParams] = useDebounce(watched, debounceTime.medium);

  const { data, isFetching, refetch, dataUpdatedAt } = useQuery({
    queryKey: [url, params],
    queryFn: ({ queryKey }) =>
      CommonAPI.fetchPaginatedList<T>(queryKey[0] as string, { ...params }),
    placeholderData: keepPreviousData
  });

  const handleTableChange = (pagination: PaginationData) => {
    setParams((prev) => ({
      ...prev,
      page: pagination.current,
      page_size: pagination.pageSize
    }));
  };

  // useEffect(() => {
  //   console.log({ params, formState });
  // }, [params]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      ...debouncedParams,
      page: defaultPaginationParams.page,
      page_size: defaultPaginationParams.page_size
    }));
  }, [debouncedParams, setParams]);

  return {
    control,
    params,
    debouncedParams,
    setParams,
    reset,
    refetch,
    handleTableChange,
    dataUpdatedAt,
    loading: isFetching,
    total: data?.count ?? 0,
    dataSource: data?.results ?? []
  };
}
