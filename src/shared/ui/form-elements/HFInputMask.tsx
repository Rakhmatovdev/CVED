import { Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

interface HFInputMaskProps {
  control: any;
  name: string;
  disabledHelperText?: boolean;
  required?: boolean;
  rules?: Record<string, any>;
  [key: string]: any;
}

const HFInputMask = React.forwardRef<HTMLInputElement, HFInputMaskProps>(
  (
    {
      control,
      name = "",
      disabledHelperText = false,
      required = false,
      rules = {},
      ...props
    },
    ref
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          required: required ? "Это объязательная поля!" : false,
          ...rules
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="w-full">
            <InputMask
              {...props}
              // eslint-disable-next-line no-nonoctal-decimal-escape
              mask="+\9\98 (99) 999-99-99"
              placeholder={"+998 (__) ___-__-__"}
              className={`border transition border-solid rounded-xl h-[40px] w-full px-[10px] text-sm font-normal
                ${error ? "border-[#ff4d4f]" : "border-[#E5E7EB] dark:border-[#3A405A]"}
                text-[#1E1E1E] dark:bg-[#2B3048] dark:text-[#B7BFD5]`}
              value={value || ""}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "");
                onChange(cleaned);
              }}
              inputRef={ref} // Properly forward the ref
            />
            {error && !disabledHelperText && (
              <Typography.Text type="danger" className="mt-1 block">
                {error.message}
              </Typography.Text>
            )}
          </div>
        )}
      />
    );
  }
);

HFInputMask.displayName = "HFInputMask";

export default HFInputMask;
