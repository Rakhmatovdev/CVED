import { message, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { ReactNode, useEffect, useState } from "react";
import { CommonFileUploaderItem } from "@/features/common-file-uploader/CommonFileUploaderItem.tsx";
import { CommonFileUploaderItemSkeleton } from "@/features/common-file-uploader/CommonFileUploaderItemSkeleton.tsx";
import { cn } from "@/shared/lib/utils.ts";
import { PdfFileIcon, UploadToCloudIcon } from "@/shared/ui/icons/file-icons";

const { Dragger } = Upload;

export type ICommonUploadedFileExtension =
  | "pdf"
  | "docx"
  | "svg"
  | "png"
  | "jpg"
  | "jpeg"
  | "gif"
  | "xlsx"
  | "doc";

export interface ICommonUploadedFile extends UploadFile {
  loading?: boolean;
  extension?: ICommonUploadedFileExtension;
}

interface IProps {
  title?: string;
  required?: boolean;
  hideAsterisk?: boolean;
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  showPreview?: boolean;
  mainPlaceholder?: ReactNode;
  secondaryPlaceholder?: ReactNode;
  value?: ICommonUploadedFile[];
  onChange?: (files: ICommonUploadedFile[]) => void;
  loading?: boolean;

  uploadFn?: (file: RcFile) => Promise<any>;
  progressMap?: Record<string, number>;
  onRemove?: (uid: string) => void;
}

export default function CommonFileUploader({
  title,
  required = false,
  hideAsterisk,
  accept = ".pdf,.docx,.svg,.png,.jpg,.jpeg,.gif",
  maxSizeMB = 2,
  multiple = false,
  showPreview = true,
  mainPlaceholder = <CommonFileUploaderDefaultMainPlaceholder />,
  secondaryPlaceholder = <CommonFileUploaderDefaultSecondaryPlaceholder />,
  uploadFn,
  loading = false,
  progressMap = {},
  onRemove,
  value
}: IProps) {
  // States
  const [fileList, setFileList] = useState<ICommonUploadedFile[]>([]);

  // Effects
  useEffect(() => {
    if (value) setFileList(value);
  }, [value]);

  // Functions
  const handleBeforeUpload = (file: RcFile) => {
    if (loading) return Upload.LIST_IGNORE; // disable while loading

    const allowedTypes = accept.split(",");
    const isValidType = allowedTypes.some((ext) =>
      file.name.toLowerCase().endsWith(ext.trim().toLowerCase())
    );
    if (!isValidType) {
      message.error(`Файл должен соответствовать формату: ${accept}`);
      return Upload.LIST_IGNORE;
    }

    if (file.size / 1024 / 1024 > maxSizeMB) {
      message.error(`Размер файла не должен превышать ${maxSizeMB}MB`);
      return Upload.LIST_IGNORE;
    }

    const newFile: ICommonUploadedFile = {
      uid: file.uid,
      name: file.name,
      status: "uploading",
      size: file.size,
      type: file.type,
      originFileObj: file
    };

    setFileList((prev) => (multiple ? [...prev, newFile] : [newFile]));

    uploadFn?.(file);
    return false;
  };

  const handleRemove = (file: ICommonUploadedFile) => {
    if (loading) return false;
    onRemove?.(file.uid);
    setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    return true;
  };

  const props: UploadProps = {
    name: "file",
    multiple,
    accept,
    fileList,
    beforeUpload: handleBeforeUpload,
    onRemove: handleRemove,
    showUploadList: false,
    disabled: loading
  };

  return (
    <div className="w-full mx-auto">
      <label className="block text-sm font-medium text-secondary mb-1 dark:text-white">
        {required && !hideAsterisk && <span className="text-red-500">*</span>}{" "}
        {title}
      </label>

      <Dragger
        {...props}
        style={{
          backgroundColor: "transparent",
          border: "none"
        }}
      >
        <div
          className={cn(
            "border select-none active:bg-gray-50 min-h-[174px] border-[#E9EAEB] dark:border-[#353747] bg-white dark:bg-[#1E2035] rounded-xl p-6 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md transition",
            loading && "opacity-50 blur-[1px]"
          )}
        >
          <UploadToCloudIcon />
          {mainPlaceholder}
          {secondaryPlaceholder}
        </div>
      </Dragger>

      {showPreview && (
        <div className="grid grid-cols-3 mt-4 gap-3">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <CommonFileUploaderItemSkeleton key={idx} />
              ))
            : fileList.map((file) => (
                <CommonFileUploaderItem
                  key={file.uid}
                  icon={<PdfFileIcon />}
                  fileName={file.name}
                  loading={file.loading}
                  sizeKB={Math.round(file.size / 1024)}
                  uploadedKB={Math.round(
                    ((progressMap[file.uid] ?? 0) * file.size) / 100 / 1024
                  )}
                  status={
                    file.status === "done"
                      ? "done"
                      : progressMap[file.uid] === 100
                        ? "done"
                        : "uploading"
                  }
                  progress={
                    file.status === "done" ? 100 : (progressMap[file.uid] ?? 0)
                  }
                  onRemove={() => handleRemove(file)}
                />
              ))}
        </div>
      )}
    </div>
  );
}

function CommonFileUploaderDefaultMainPlaceholder() {
  return (
    <p className="text-[#535862] text-sm">
      <span className="text-blue-600 font-semibold mr-1">
        Нажмите, чтобы загрузить
      </span>
      или перетащите
    </p>
  );
}

function CommonFileUploaderDefaultSecondaryPlaceholder() {
  return (
    <p className="text-[#535862] text-sm">
      SVG, PNG, JPG или GIF (макс. 800x400px)
    </p>
  );
}
