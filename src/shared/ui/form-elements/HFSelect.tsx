import { Select, Typography } from "antd";
import { Controller } from "react-hook-form";
import "./style.css";

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
function HFSelect({
  control,
  name,
  width = "100%",
  options = [],
  disabledHelperText,
  placeholder,
  required = false,
  rules = {},
  defaultValue,
  ...props
}: any): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue || (props.labelInValue ? null : undefined)}
      rules={{
        required: required ? "Это объязательная поля!" : false,
        ...rules
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Select
            {...props}
            value={value || undefined}
            defaultValue={defaultValue}
            style={{
              width,
              // borderRadius: "8px",
              // border: error ? "1px solid #ff4d4f" : "1px solid #E5E7EB",
              color: "#1E1E1E"
            }}
            popupClassName="dark:bg-[#2B3048] debounce-popup !text-white"
            className="h-[40px] w-full text-[#1E1E1E] text-sm font-normal dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5] rounded-xl  shadow-sm"
            status={error ? "error" : undefined}
            onChange={(val) => {
              if (props.labelInValue) {
                onChange(val);
              } else {
                onChange(val);
              }
            }}
            options={options}
            placeholder={placeholder}
            // dropdownClassName={`debounce-popup dark:dark-dropdown  light-dropdown}`}
            classNames={{
              popup: {
                root: "debounce-popup dark:dark-dropdown  light-dropdown}"
              }
            }}
            suffixIcon={arrowIcon()}
          />

          {error && !disabledHelperText && (
            <Typography.Text type="danger">{error.message}</Typography.Text>
          )}
        </>
      )}
    />
  );
}

export default HFSelect;
