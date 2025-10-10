import { theme as antdTheme, ConfigProvider, Select } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";

export type Option = {
  label: React.ReactNode;
  value: string | number;
};

type DebounceSelectProps = {
  control: any;
  name: string;
  labelInValue?: boolean;
  placeholder?: string;
  fetchOptions?: (search: string) => Promise<Option[]>;
  onSearch?: (value: string) => void;
  onPopupScroll?: (e: React.UIEvent<HTMLElement>) => void;
  filterOption?: boolean;
  notFoundContent?: React.ReactNode;
  loading?: boolean;
  options?: Option[];
  className?: string;
  defaultValue?: any;
  prefix?: React.ReactNode;
  disabled?: boolean;
  onChange?: (value: {
    disabled: boolean;
    key: string;
    label: string;
    title: string;
    value: string;
  }) => void;
};

const arrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={"#6B7280"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-down-icon lucide-chevron-down"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const DebounceSelect: React.FC<DebounceSelectProps> = ({
  control,
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
  disabled = false,
  onChange
}) => {
  // Options ni memoize qilish
  const memoizedOptions = useMemo(() => options, [options]);

  // Dark mode ni to'g'ri boshqarish
  const [isDark, setIsDark] = useState(() =>
    document.body.classList.contains("dark")
  );

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
                disabled={disabled}
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
                  console.log("change", value);
                  field.onChange(value);
                  if (!value && onSearch) {
                    onSearch("");
                  }
                  if (onChange) {
                    onChange(value);
                  }
                }}
                onClear={() => {
                  console.log("clear");
                  field.onChange(undefined);
                  control.setValue(name, undefined);
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
                className={`h-[40px] w-full shadow-sm debounce-select text-[#1E1E1E] border border-[#E5E7EB] rounded-xl text-sm font-normal dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5] ${className || ""}`}
                classNames={{
                  popup: {
                    root: "debounce-popup"
                  }
                }}
                suffixIcon={arrowIcon()}
              />
            );
          }}
        />
      </ConfigProvider>
    </div>
  );
};
