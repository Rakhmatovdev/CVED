import { theme as antdTheme, ConfigProvider, Select, Spin } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { SelectArrowDownIcon } from "@/shared/ui/icons/others.tsx";

export type IDebounceSelectOption = {
  label: React.ReactNode;
  value: string | number;
};

interface IProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  labelInValue?: boolean;
  placeholder?: string;
  fetchOptions?: (search: string) => Promise<IDebounceSelectOption[]>;
  onSearch?: (value: string) => void;
  onPopupScroll?: (e: React.UIEvent<HTMLElement>) => void;
  filterOption?: boolean;
  notFoundContent?: React.ReactNode;
  loading?: boolean;
  options?: IDebounceSelectOption[];
  className?: string;
  defaultValue?: any;
  prefix?: React.ReactNode;
  disabled?: boolean;
}

export function DebounceSelect2<TFieldValues extends FieldValues>({
  name,
  labelInValue = false,
  placeholder = "",
  onSearch,
  filterOption = false,
  notFoundContent,
  loading,
  options = [],
  className,
  defaultValue,
  prefix,
  disabled = false
}: IProps<TFieldValues>) {
  // Helpers
  const { control } = useFormContext<TFieldValues>();

  // States
  const [isDark, setIsDark] = useState(() =>
    document.body.classList.contains("dark")
  );

  // Effects
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.body.classList.contains("dark"));
    };

    // MutationObserver bilan dark mode o'zgarishini kuzatish
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, []);

  const memoizedOptions = useMemo(() => options, [options]);

  const handleSearch = useCallback(
    (value: string) => {
      if (onSearch) {
        onSearch(value);
      }
    },
    [onSearch]
  );

  return (
    <div className="relative w-full [&_.ant-select-selector]:rounded-xl">
      <ConfigProvider
        theme={{
          algorithm: isDark
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
          components: {
            Select: {
              colorBgElevated: isDark ? "" : "",
              colorText: isDark ? "" : "",
              optionSelectedBg: isDark ? "" : ""
            }
          }
        }}
      >
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue ?? undefined}
          render={({ field }) => {
            const selectValue =
              labelInValue && field.value?.value === ""
                ? undefined
                : field.value;
            return (
              <Select
                showSearch
                disabled={disabled || loading}
                prefix={prefix}
                allowClear
                labelInValue={labelInValue}
                placeholder={placeholder}
                filterOption={filterOption}
                onSearch={handleSearch}
                notFoundContent={notFoundContent}
                loading={loading}
                options={memoizedOptions}
                onChange={(value) => {
                  field.onChange(value);
                  if (!value && onSearch) {
                    onSearch("");
                  }
                }}
                onClear={() => {
                  field.onChange(undefined);
                  if (onSearch) {
                    onSearch("");
                  }
                }}
                onBlur={() => {
                  field.onBlur();
                }}
                getPopupContainer={(trigger) =>
                  trigger.parentNode as HTMLElement
                }
                value={selectValue}
                className={`h-[40px] transition w-full shadow-sm debounce-select text-[#1E1E1E] border border-[#E5E7EB] rounded-xl text-sm font-normal dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5] ${className || ""}`}
                classNames={{
                  popup: {
                    root: "debounce-popup"
                  }
                }}
                suffixIcon={
                  loading ? <Spin size="small" /> : <SelectArrowDownIcon />
                }
              />
            );
          }}
        />
      </ConfigProvider>
    </div>
  );
}
