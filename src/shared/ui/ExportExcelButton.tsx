import { notification } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useExcelDownload } from "@/utils/hooks/useBlobDownloader";
import excelImg from "../assets/img/excel.svg";
import Button from "./Button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  endpoint: string;
  fileName?: string;
  params?: Record<string, string>;
  size?: "default" | "lg" | "sm" | "md" | "icon";
  variant?:
    | "link"
    | "default"
    | "primary"
    | "destructive"
    | "outline"
    | "ghost"
    | "secondary"
    | "phantom";
}

export default function ExportExcelButton({
  endpoint,
  fileName,
  variant,
  size = "default",
  params = {},
  ...props
}: Props) {
  const { t } = useTranslation();
  const { downloadExcelFile, isDownloading } = useExcelDownload();
  const handleDownload = () => {
    downloadExcelFile(endpoint, {
      ...params,
      get_file: true
    }).catch((error) => {
      notification.error({
        message: t("statics.download_error"),
        description: error.message || t("statics.download_failed")
      });
    });
  };
  return (
    <Button
      variant={variant}
      loading={isDownloading}
      {...props}
      size={size}
      onClick={handleDownload}
    >
      <img src={excelImg} className="size-5" alt="excel" />
      {t("statics.download")}
    </Button>
  );
}
