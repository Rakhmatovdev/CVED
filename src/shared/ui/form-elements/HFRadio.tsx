import { Radio } from "antd";
import { Controller } from "react-hook-form";
import "./style.css";
import { cn } from "@/shared/lib/utils.ts";

function HFRadio({
  control,
  name,
  label,
  width,
  options = [],
  disabledHelperText,
  placeholder,
  required = false,
  rules = {},
  ...props
}: any) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: required ? "This is required field" : false,
        ...rules
      }}
      render={({
        field: { onChange, value }, // fieldState: { error }
        fieldState: { error }
      }) => (
        <div style={{ width }}>
          {label && <div className="radio-label transition">{label}</div>}
          {options.length > 0 ? (
            options.map((option, index) => (
              <Radio
                key={index}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                value={option.value}
                {...props}
                className={cn("transition", props.className)}
              >
                {option.label}
              </Radio>
            ))
          ) : (
            <Radio
              checked={value === ""}
              onChange={(e) => onChange(e.target.value)}
              value=""
              {...props}
              className={cn("transition", props.className)}
            >
              {label || placeholder}
            </Radio>
          )}
          {error && (
            <div className="error-text transition">{error.message}</div>
          )}
        </div>
      )}
    />
  );
}

export default HFRadio;
