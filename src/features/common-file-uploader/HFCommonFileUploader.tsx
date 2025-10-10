import type { FieldValues, Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import CommonFileUploader from "@/features/common-file-uploader/CommonFileUploader.tsx";

interface RHFFileUploaderProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  title: string;
  required?: boolean;
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  showPreview?: boolean;
  placeholder?: string;
}

export function RHFFileUploader<TFieldValues extends FieldValues>({
  name,
  ...rest
}: RHFFileUploaderProps<TFieldValues>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field }) => (
        <CommonFileUploader
          {...rest}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}
