import { Typography } from "antd";
import { Controller, FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CustomInput } from "@/shared/ui/form-elements/CustomInput";

interface IProps<TFieldValues> {
  control: any;
  name: Path<TFieldValues>;
  disabledHelperText?: boolean;
  required?: boolean;
  rules?: any;

  [x: string]: any;

  defaultValue?: string | number;
}

function HFInput<TFieldValues extends FieldValues>({
  control,
  name,
  disabledHelperText = false,
  required = false,
  defaultValue,
  placeholder = "Введите значение",
  rules = {},
  allowClear,
  ...rest
}: IProps<TFieldValues>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? "Это объязательная поля!" : false,
        ...rules
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <CustomInput
            value={value || undefined}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            allowClear={allowClear}
            placeholder={placeholder}
            status={error ? "error" : ("success" as any)}
            {...rest}
          />
          {error && !disabledHelperText && (
            <Typography.Text type="danger">
              {t("validation.required")}
            </Typography.Text>
          )}
        </>
      )}
    />
  );
}

export default HFInput;
