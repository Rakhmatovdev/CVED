/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Flex, Typography } from "antd";
import dayjs from "dayjs";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

const { RangePicker } = DatePicker;

function HFDateRangePicker<T extends FieldValues>({
  control,
  name,
  disabledHelperText = false,
  required = false,
  rules = {},
  ...props
}: {
  control: Control<T>;
  name: Path<T>;
  disabledHelperText?: boolean;
  required?: boolean;
  rules?: any;
  [x: string]: any;
}): JSX.Element {
  const convertDateStringToDayjsObject = (
    dates: [string, string] | null
  ): [dayjs.Dayjs, dayjs.Dayjs] | null =>
    dates ? [dayjs(dates[0]), dayjs(dates[1])] : null;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? "Это объязательная поля!" : false,
        ...rules
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Flex vertical className="w-full">
          <RangePicker
            suffixIcon={<></>}
            value={
              Array.isArray(value) && value[0] && value[1]
                ? convertDateStringToDayjsObject(value)
                : null
            }
            onChange={(_dates: any, dateStrings: [string, string]) => {
              onChange(dateStrings);
            }}
            status={error ? "error" : ("success" as any)}
            className="border border-[#E5E7EB] rounded-xl h-[40px] w-full px-[10px] text-[#1E1E1E] text-sm font-normal dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5]"
            {...props}
          />

          {error && !disabledHelperText && (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          )}
        </Flex>
      )}
    />
  );
}

export default HFDateRangePicker;
