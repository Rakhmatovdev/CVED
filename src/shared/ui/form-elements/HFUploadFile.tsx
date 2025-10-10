import { message, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useEffect, useState } from "react";
import { Controller, useController } from "react-hook-form";
import { PhotoUploadProps } from "@/pages/immigrants/type";
import UploadCloud from "/static/upload-cloud-02.svg";

const { Dragger } = Upload;

export default function HFUploadFile({
  control,
  name,
  title,
  required
}: PhotoUploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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
          <div className="w-full">
            <label className="block transition text-sm font-medium text-secondary  dark:text-white">
              {required && <span className="text-red-500">*</span>} {title}
            </label>

            <Dragger
              {...props}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <div className=" flex gap-4 border border-gray-300 dark:border-[#353747] bg-white dark:bg-[#2B3048] dark:text-[#B7BFD5] rounded-xl p-[15px] shadow-sm hover:shadow-md transition ">
                <div className="p-[10px] transition border border-gray-300 dark:border-[#353747] bg-white  rounded-lg  dark:bg-[#2B3048] dark:text-[#B7BFD5]">
                  <img
                    src={UploadCloud}
                    className="transition"
                    alt="upload cloud"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-blue-600 font-semibold text-sm text-start">
                    Выберите файл
                  </p>

                  <p className="text-xs text-gray-500 mt-1 text-center">
                    SVG, PNG, JPG или GIF (макс. 800x400 пикселей)
                  </p>
                </div>
              </div>
              {fileList.length > 0 && (
                <div className="text-sm text-gray-600">
                  Выбранный файл: {fileList[0].name}
                </div>
              )}
            </Dragger>
          </div>
        );
      }}
    />
  );
}
