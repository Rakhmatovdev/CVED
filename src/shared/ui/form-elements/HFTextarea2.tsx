import { Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import type { TextAreaProps } from "antd/lib/input";
import type { FieldValues, Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

interface IProps<TFieldValues extends FieldValues> extends TextAreaProps {
  name: Path<TFieldValues>;
  disabledHelperText?: boolean;
}

export function HFTextarea2<TFieldValues extends FieldValues>({
  name,
  disabledHelperText = false,
  ...props
}: IProps<TFieldValues>) {
  // Helpers
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextArea
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className="border scroll-none border-[#E5E7EB] rounded-xl h-[40px] w-full px-[10px] text-[#1E1E1E] text-sm font-normal dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5] hover:dark:bg-[#272B30] focus:dark:bg-[#272B30]"
            status={error ? "error" : ""}
            // error={error}
            // helperText={!disabledHelperText && (error?.message ?? " ")}
            {...props}
          />
          {error && !disabledHelperText && (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          )}
        </>
      )}
    />
  );
}
