import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils.ts";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon.tsx";

export function CustomDatepicker({ className, ...props }: DatePickerProps) {
  const { t } = useTranslation();
  return (
    <DatePicker
      placeholder={t("placeholder.dmg")}
      value={dayjs()}
      suffixIcon={undefined}
      prefix={<CalendarIcon />}
      classNames={{
        popup: {
          root: "input-popup"
        }
      }}
      {...props}
      className={cn(
        "border border-[#E5E7EB] shadow-sm rounded-xl h-[40px] w-full px-[10px] text-[#1E1E1E] text-sm font-normal dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5]",
        className
      )}
    />
  );
}
