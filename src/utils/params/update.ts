import { ArmValues } from "@/shared/types/form.type";

export const updateImmigrantSearchParams = (
  filters: ArmValues,
  pagination: { current: number; pageSize: number },
  setSearchParams: (params: URLSearchParams) => void
) => {
  const newParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (key === "citizenship" && value?.value) {
      newParams.set("citizenship", value.value);
      if (value.label) newParams.set("citizenship_label", value.label);
    } else if (typeof value === "string" && value) {
      newParams.set(key, value);
    }
  });

  newParams.set("page", pagination.current.toString());
  newParams.set("page_size", pagination.pageSize.toString());

  setSearchParams(newParams);
};
