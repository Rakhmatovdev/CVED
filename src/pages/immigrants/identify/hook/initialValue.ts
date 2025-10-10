import { ArmValues } from "@/shared/types/form.type.ts";

export const getInitialImmigrantValues = (
  searchParams: URLSearchParams
): ArmValues => ({
  citizenship: {
    label: searchParams.get("citizenship_label") || "",
    value: searchParams.get("citizenship") || ""
  },
  first_name: searchParams.get("first_name") || "",
  last_name: searchParams.get("last_name") || "",
  middle_name: searchParams.get("middle_name") || "",
  birth_date: searchParams.get("birth_date") || "",
  arrival_date_from: searchParams.get("arrival_date_from") || "",
  arrival_date_to: searchParams.get("arrival_date_to") || "",
  search: searchParams.get("search") || ""
});
