import type { SelectProps } from "antd";
import { Select, Spin } from "antd";
import { cn } from "@/shared/lib/utils.ts";
import { SelectArrowDownIcon } from "@/shared/ui/icons/others.tsx";

export const CustomSelect = <T,>(props: SelectProps<T>) => {
  return (
    <Select<T>
      allowClear
      filterOption={false}
      showSearch
      notFoundContent={props.loading ? <Spin size="small" /> : null}
      getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
      classNames={{
        popup: {
          root: "debounce-popup transition dark:dark-dropdown light-dropdown"
        }
      }}
      suffixIcon={
        props.loading ? <Spin size="small" /> : <SelectArrowDownIcon />
      }
      {...props}
      className={cn(
        "h-10 w-full transition shadow-sm text-[#1E1E1E] border border-[#E5E7EB] rounded-xl text-sm font-normal dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5]",
        props.className
      )}
    />
  );
};
