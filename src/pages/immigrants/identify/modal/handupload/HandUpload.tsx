import { message, Tooltip, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { useEffect, useRef, useState } from "react";
import { Controller, useController } from "react-hook-form";
import Tiff from "tiff.js";
import { HandPhotoUploadProps } from "@/pages/immigrants/type";
import Image from "@/shared/ui/Image";
import UploadCloudIcon from "@/shared/ui/icons/global/UploadCloudIcon";

const { Dragger } = Upload;

export default function HandPhotoUpload({
  control,
  name,
  className
}: HandPhotoUploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const FINGER_LABELS: Record<string, string> = {
    left_thumb: "Левая рука — Большой палец",
    left_index: "Левая рука — Указательный палец",
    left_middle: "Левая рука — Средний палец",
    left_ring: "Левая рука — Безымянный палец",
    left_little: "Левая рука — Мизинец",
    right_thumb: "Правая рука — Большой палец",
    right_index: "Правая рука — Указательный палец",
    right_middle: "Правая рука — Средний палец",
    right_ring: "Правая рука — Безымянный палец",
    right_little: "Правая рука — Мизинец"
  };
  const fingerLabel = FINGER_LABELS[name] ?? "Загрузка отпечатка пальца";

  const {
    field: { value }
  } = useController({ name, control, defaultValue: null });

  useEffect(() => {
    if (!value) {
      setFileList([]);
      setPreviewUrl(null);
    }
  }, [value]);

  const renderTiffToCanvas = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      try {
        const tiff = new Tiff({ buffer });
        const canvas = tiff.toCanvas();
        if (canvasRef.current) {
          canvasRef.current.width = canvas.width * 0.3;
          canvasRef.current.height = canvas.height * 0.3;
          const ctx = canvasRef.current.getContext("2d")!;
          ctx.drawImage(
            canvas,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          const dataUrl = canvasRef.current.toDataURL("image/png");
          setPreviewUrl(dataUrl);
        }
      } catch (err) {
        console.error(err);
        message.error("TIFF faylni ko‘rsatib bo‘lmadi");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const props: UploadProps = {
            name: "file",
            multiple: false,
            accept: ".tif,.tiff,.svg,.png,.jpg,.jpeg,.gif",
            fileList,
            beforeUpload: (file: RcFile) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("Faqat rasm fayllarini yuklash mumkin!");
                return Upload.LIST_IGNORE;
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error("Rasm hajmi 2MB dan kichik bo‘lishi kerak!");
                return Upload.LIST_IGNORE;
              }

              if (file.type === "image/tiff") {
                renderTiffToCanvas(file);
              } else {
                const blobUrl = URL.createObjectURL(file);
                setPreviewUrl(blobUrl);
              }

              setFileList([
                {
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  size: file.size,
                  type: file.type,
                  originFileObj: file
                }
              ]);
              field.onChange(file);
              return false;
            },
            onRemove: () => {
              setFileList([]);
              setPreviewUrl(null);
              field.onChange(null);
            },
            showUploadList: false
          };

          return (
            <Tooltip title={fingerLabel} placement="top">
              <Dragger
                {...props}
                className={`absolute ${className}`}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div className="bg-white border border-[#D5D7DA] dark:border-[#3A405A] dark:bg-[#1E2035] rounded-xl !w-10 !h-10 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Uploaded preview"
                      className="!w-10 !h-10 object-cover"
                    />
                  ) : (
                    <UploadCloudIcon className="[&_path]:stroke-[#D5D7DA]" />
                  )}
                </div>
              </Dragger>
            </Tooltip>
          );
        }}
      />
    </>
  );
}
