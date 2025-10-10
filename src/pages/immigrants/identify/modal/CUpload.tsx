import { message, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useEffect, useState } from "react";
import { Controller, useController } from "react-hook-form";
import { PhotoUploadProps } from "@/pages/immigrants/type";
import UploadCloudIcon from "@/shared/ui/icons/global/UploadCloudIcon";

const { Dragger } = Upload;

export default function ImmigrantPhotoUpload({
  control,
  name,
  title,
  required
}: PhotoUploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const {
    field: { value }
  } = useController({
    name,
    control,
    defaultValue: null
  });

  useEffect(() => {
    if (value === null || value === undefined) {
      setFileList([]);
    }
  }, [value]);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const props: UploadProps = {
          name: "file",
          multiple: false,
          accept: ".svg,.png,.jpg,.jpeg,.gif",
          fileList,
          beforeUpload: (file: RcFile) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
              message.error("Faqat rasm fayllarini yuklash mumkin!");
              return Upload.LIST_IGNORE;
            }

            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              message.error("Rasim hajmi 2MB dan kichik bo‘lishi kerak!");
              return Upload.LIST_IGNORE;
            }
            const newFile: UploadFile = {
              uid: file.uid,
              name: file.name,
              status: "done",
              size: file.size,
              type: file.type,
              originFileObj: file
            };
            setFileList([newFile]);
            field.onChange(file);
            return false;
          },
          onRemove: () => {
            setFileList([]);
            field.onChange(null);
          },
          showUploadList: false
        };

        return (
          <div
            className="w-full mx-auto"
            onDragEnter={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
          >
            <label className="block text-sm font-medium text-secondary mb-1 dark:text-white">
              {required && <span className="text-red-500">*</span>} {title}
            </label>

            <Dragger
              {...props}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <div
                className={`border ${
                  isDragging
                    ? "border-[#3276FF] dark:bg-[#3244666b]/20 dark:backdrop-blur-sm"
                    : "border-[#E9EAEB] dark:border-[#1E2035]"
                } bg-white dark:bg-[#1E2035] rounded-xl p-6 flex flex-col items-center justify-center h-40 transition`}
              >
                <div className="border-[#D5D7DA] dark:border-[#3A405A] dark:bg-[#333850]/50 flex items-center justify-center rounded-xl w-10 h-10">
                  <UploadCloudIcon className="[&_path]:stroke-[#D5D7DA]" />
                </div>
                <p className="text-[#3276FF] font-semibold text-lg">
                  Выберите файл
                </p>

                <p className="text-sm text-gray-500 mt-1 text-center">
                  SVG, PNG, JPG или GIF (макс. 800x400 пикселей)
                </p>
              </div>
              {fileList.length > 0 && (
                <p className="text-sm text-gray-600">
                  Выбранный файл: {fileList[0].name}
                </p>
              )}
            </Dragger>
          </div>
        );
      }}
    />
  );
}
