import { Flex, Popover, Spin } from "antd";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils.ts";
import { TickSuccessIcon } from "@/shared/ui/icons/status-icons";
import TrashIcon from "@/shared/ui/icons/TrushIcon.tsx";

type ICommonFileUploaderItemStatus = "done" | "uploading" | "error";

interface IProps {
  icon: ReactNode;
  fileName: string;
  sizeKB: number;
  uploadedKB?: number;
  status: ICommonFileUploaderItemStatus;
  progress?: number;
  loading?: boolean;
  onRemove?: () => void;
}

export function CommonFileUploaderItem({
  icon,
  fileName,
  status,
  progress = 0,
  onRemove,
  sizeKB,
  loading,
  uploadedKB
}: IProps) {
  const getStatusColor = () => {
    if (status === "done") return "#3276FF";
    if (status === "error") return "#E83A3A";
    return "#356FE8"; // uploading
  };

  return (
    <Flex
      gap={13}
      className={cn(
        "relative border dark:border-midnightBlue h-[98px] rounded-xl p-4",
        loading && "opacity-65"
      )}
    >
      {icon}
      <Flex vertical className="w-full">
        <Popover content={<span>{fileName}</span>} trigger="hover">
          <div className="max-w-[380px] dark:text-zinc-400 truncate min-h-5 text-[#41424A] font-medium leading-5">
            {fileName}
          </div>
        </Popover>
        <Flex align="center">
          <p className="text-[#535359] dark:text-zinc-500">
            {uploadedKB ?? sizeKB} КБ из {sizeKB} КБ
          </p>
          <div className="bg-[#D5CBC6] dark:bg-zinc-600 w-[2px] h-[80%] mx-2 rounded-full h" />
          {status === "done" && (
            <Flex className="flex text-[#088D4D] items-center gap-1">
              <TickSuccessIcon />
              Завершено
            </Flex>
          )}
          {status === "error" && (
            <span className="text-[#E83A3A] font-medium">Ошибка</span>
          )}
        </Flex>
        {/* Progress bar */}
        <Flex gap={12} align="center" className="mt-2">
          <div className="flex-grow bg-[#E6E6E6]  rounded-full relative h-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: getStatusColor()
              }}
            />
          </div>
          <span className="dark:!text-zinc-300">{progress}%</span>
        </Flex>
      </Flex>

      <button
        onClick={onRemove}
        disabled={loading}
        type="button"
        className="absolute active:bg-zinc-200 hover:bg-zinc-100 p-1 rounded-md size-7 -m-1 right-4 top-4"
      >
        {loading ? (
          <Spin size="small" className="-mt-1.5" spinning={true} />
        ) : (
          <TrashIcon />
        )}
      </button>
    </Flex>
  );
}
