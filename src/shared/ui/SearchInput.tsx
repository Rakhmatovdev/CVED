import { Control, FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { HFInput } from "./form-elements";
import SearchIcon from "./icons/search/SearchIcon";

export interface SearchInputProps<T extends FieldValues = FieldValues> {
  placeholder?: string;
  control: Control<T>;
  name: Path<T>;
}

export const SearchInput = <T extends FieldValues>({
  placeholder,
  control,
  name
}: SearchInputProps<T>) => {
  const { t } = useTranslation();
  return (
    <HFInput
      control={control}
      name={name}
      placeholder={t(placeholder || "placeholder.search")}
      prefix={<SearchIcon className="size-5 mx-2" />}
      className="h-10 max-w-md rounded-lg pl-0"
      allowClear
    />
  );
};
