import type { DatePickerProps } from "antd";
import { DatePicker, Flex, Typography } from "antd";
import dayjs from "dayjs";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon.tsx";

interface IProps<TFieldValues extends FieldValues> extends DatePickerProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, any, TFieldValues>;
  disabledHelperText?: boolean;
}

export function HFDatePicker<TFieldValues extends FieldValues>({
  name,
  disabledHelperText = false,
  control,
  ...props
}: IProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Flex vertical className="w-full transition">
          <DatePicker
            suffixIcon=""
            prefix={<CalendarIcon />}
            value={value ? dayjs(value) : null}
            onChange={(_, dateString) => {
              if (Array.isArray(dateString)) {
                onChange(dateString.join(","));
              } else {
                onChange(dateString);
              }
            }}
            status={error ? "error" : undefined}
            className="border border-[#E5E7EB] transition shadow-sm rounded-xl h-[40px] w-full px-[10px] text-[#1E1E1E] text-sm font-normal dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5]"
            {...props}
          />
          {error && !disabledHelperText && (
            <Typography.Text className="transition" type="danger">
              {error.message}
            </Typography.Text>
          )}
        </Flex>
      )}
    />
  );
}
