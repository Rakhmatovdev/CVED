import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useMemo } from "react";
import Api from "@/shared/api/axios";

interface FetchOptions<TFilters> {
  url: string;
  filters?: Partial<TFilters>;
  config?: any;
  multiSort?: boolean;
  refetchKeys?: string[];
}

interface TableParams {
  pagination: {
    current: number;
    pageSize: number;
  };
  sorters: Record<string, "asc" | "desc">;
}

interface PaginationChangeParams {
  current: number;
  pageSize: number;
  total?: number;

  [key: string]: any;
}

export function useFetchData<TData, TFilters extends Record<string, any>>({
  url,
  filters,
  config,
  refetchKeys,
  multiSort = false
}: FetchOptions<TFilters>) {
  const [queryParamsState, setQueryParamsState] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    page_size: parseAsInteger.withDefault(10),
    sort_field: parseAsString.withDefault(""),
    sort_order: parseAsString.withDefault(""),
    sort_multi: parseAsString.withDefault("")
  });
  console.log(filters);

  const queryParams = useMemo(() => {
    const sortParams: Record<string, any> = {};

    if (multiSort && queryParamsState.sort_multi) {
      const parts = queryParamsState.sort_multi.split(",");
      parts.forEach((p) => {
        const [field, order] = p.split(":");
        if (field && order) {
          sortParams[field] = order;
        }
      });
    } else if (
      !multiSort &&
      queryParamsState.sort_field &&
      queryParamsState.sort_order
    ) {
      sortParams[queryParamsState.sort_field] =
        queryParamsState.sort_order === "ascend" ? "asc" : "desc";
    }

    return {
      ...filters,
      page: queryParamsState.page,
      page_size: queryParamsState.page_size,
      ...sortParams
    };
  }, [
    filters,
    queryParamsState.page,
    queryParamsState.page_size,
    queryParamsState.sort_field,
    queryParamsState.sort_order,
    queryParamsState.sort_multi,
    multiSort
  ]);

  const tableParams: TableParams = useMemo(
    () => ({
      pagination: {
        current: queryParamsState.page,
        pageSize: queryParamsState.page_size
      },
      sorters: multiSort
        ? queryParamsState.sort_multi
            .split(",")
            .filter(Boolean)
            .reduce((acc: Record<string, "asc" | "desc">, p) => {
              const [field, order] = p.split(":");
              if (field && order) acc[field] = order as "asc" | "desc";
              return acc;
            }, {})
        : queryParamsState.sort_field && queryParamsState.sort_order
          ? {
              [queryParamsState.sort_field]:
                queryParamsState.sort_order === "ascend" ? "asc" : "desc"
            }
          : {}
    }),
    [
      queryParamsState.page,
      queryParamsState.page_size,
      queryParamsState.sort_field,
      queryParamsState.sort_order,
      queryParamsState.sort_multi,
      multiSort
    ]
  );

  const onChangeTable = (
    paginationData: PaginationChangeParams,
    sorter: any
  ) => {
    if (multiSort) {
      const sortersArray = Array.isArray(sorter) ? sorter : [sorter];
      const multiString = sortersArray
        .filter((s) => s && (s.field || s.columnKey) && s.order)
        .map((s) => {
          const field = s.field || s.columnKey;
          return `${field}:${s.order === "ascend" ? "asc" : "desc"}`;
        })
        .join(",");

      setQueryParamsState({
        page: paginationData.current,
        page_size: paginationData.pageSize,
        sort_multi: multiString,
        sort_field: "",
        sort_order: ""
      });
    } else {
      const field = sorter?.field || sorter?.columnKey;
      setQueryParamsState({
        page: paginationData.current,
        page_size: paginationData.pageSize,
        sort_field: field || "",
        sort_order: sorter?.order || "",
        sort_multi: ""
      });
    }
  };

  const filteredParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => {
        if (value === null || value === undefined || value === "") return false;
        if (typeof value === "object" && Object.keys(value).length === 0)
          return false;
        return true;
      })
    );
  }, [queryParams]);

  const queryKey = useMemo(() => {
    return [url, refetchKeys, JSON.stringify(filteredParams)];
  }, [url, refetchKeys, filteredParams]);

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await Api.get<TData>(url, {
        params: filteredParams,
        ...config
      });
      return res.data;
    },
    placeholderData: keepPreviousData
  });

  return {
    ...queryResult,
    tableParams,
    onChangeTable
  };
}
