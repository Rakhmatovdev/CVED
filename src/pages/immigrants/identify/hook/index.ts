import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
import { filterImmigrantValues } from "@/pages/immigrants/identify/hook/filter.ts";
import { getInitialImmigrantValues } from "@/pages/immigrants/identify/hook/initialValue.ts";
import ImmigrantService from "@/pages/immigrants/service";
import { TableParams } from "@/pages/immigrants/type";
import { ArmValues, PaginationData } from "@/shared/types/form.type";
import { updateImmigrantSearchParams } from "@/utils/params/update.ts";

interface ImmigrantResponse {
  results: ArmValues[];
  count: number;
}

export const useImmigrantData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValues = useMemo(() => getInitialImmigrantValues(searchParams), [searchParams]);

  const { control, reset } = useForm<ArmValues>({
    defaultValues: initialValues
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const watched = useWatch({ control });
  const [debounced] = useDebounce(watched, 900);

  const current = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("page_size") ?? 10);
  const tableParams: TableParams = useMemo(
    () => ({ pagination: { current, pageSize } }),
    [current, pageSize]
  );

  const initialFilters = useMemo(
    () => filterImmigrantValues(initialValues),
    [initialValues]
  );
  useEffect(() => {
    const newFilters = filterImmigrantValues(debounced);
    if (JSON.stringify(newFilters) !== JSON.stringify(initialFilters)) {
      updateImmigrantSearchParams(
        newFilters,
        { current: 1, pageSize },
        setSearchParams
      );
    }
  }, [debounced, initialFilters, pageSize, setSearchParams]);

  const { data, isPending, refetch } = useQuery<ImmigrantResponse, Error>({
    queryKey: ["immigrants-identify", Object.fromEntries(searchParams)],
    queryFn: async () => {
      const filters = filterImmigrantValues(debounced);
      const payload: Record<string, any> = {
        ...filters,
        page: current,
        page_size: pageSize
      };
      if (payload.citizenship && typeof payload.citizenship === "object") {
        payload.citizenship = (payload.citizenship as any).value;
      }
      Object.keys(payload).forEach(
        (k) => (payload[k] == null || payload[k] === "") && delete payload[k]
      );
      return ImmigrantService.getImmigrants(payload);
    },
    enabled: true
  });

  const handleTableChange = (pagination: PaginationData) => {
    updateImmigrantSearchParams(
      filterImmigrantValues(debounced),
      { current: pagination.current, pageSize: pagination.pageSize },
      setSearchParams
    );
  };

  return {
    control,
    data: data?.results ?? [],
    tableParams,
    isPending,
    handleTableChange,
    refetch,
    count: data?.count ?? 0
  };
};
