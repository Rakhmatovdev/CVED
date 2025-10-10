import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
import ImmigrantService from "@/pages/immigrants/service";
import { ArmValues } from "@/shared/types/form.type";

export const useCountryData = () => {
  const getInitialValues = (): ArmValues => {
    return {
      arrival_date_from: searchParams.get("start_date") || "",
      arrival_date_to: searchParams.get("end_date") || ""
    };
  };
  const { control } = useForm<ArmValues>({ defaultValues: getInitialValues() });
  const [searchParams, setSearchParams] = useSearchParams();
  const watchedValues = useWatch({ control });
  const [debouncedValues] = useDebounce(watchedValues, 900);

  const updateQueryParams = (values: ArmValues) => {
    const newParams = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "string" && value) {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

  useEffect(() => {
    updateQueryParams(debouncedValues);
  }, [debouncedValues]);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["report-country"],
    queryFn: async () => {
      const filters = {
        arrival_date_from: searchParams.get("arrival_date_from"),
        arrival_date_to: searchParams.get("arrival_date_to")
      };
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== undefined && v !== "")
      );
      return ImmigrantService.getImmigrants(params);
    }
  });

  return {
    control,
    data: data?.results || [],
    isPending,
    refetch,
    count: data?.count
  };
};
