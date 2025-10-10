import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

function HFYearPicker({
  control,
  name = "",
  disabledHelperText = false,
  required = false,
  rules = {},
  ...props
}: any): JSX.Element {
  const convertDateStringToDayjsObject = (dateString: string): any =>
    dayjs(dateString);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: required ? "Это объязательная поля!" : false,
        ...rules
      }}
      render={(
        { field: { onChange, value } } //fieldState: { error }
      ) => (
        <DatePicker
          value={value ? convertDateStringToDayjsObject(value) : null}
          format="YYYY-MM-DD"
          onChange={(date: any, dateString: string) => {
            console.log(date);

            onChange(dateString);
          }}
          className="border border-[#E5E7EB] rounded-xl h-[40px] w-full px-[10px] text-[#1E1E1E] text-sm font-normal dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5] hover:dark:bg-[#272B30] focus:dark:bg-[#272B30]"
          {...props}
        />
      )}
    />
  );
}

export default HFYearPicker;
