import dayjs from "dayjs";
import { useState } from "react";
import { fetchBlob } from "@/utils/api.utils";

export function useExcelDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadExcelFile = async (
    url: string,
    params: Record<string, any>
  ) => {
    setIsDownloading(true);
    try {
      const { blob, headers } = await fetchBlob(url, params);

      let filename = `report-${dayjs(new Date()).format("yyyy-MM-dd")}.xlsx`;

      const contentDisposition = headers["content-disposition"];

      if (typeof contentDisposition === "string") {
        const match = contentDisposition.match(/filename\*=UTF-8''(.+?)($|;)/);
        if (match?.[1]) {
          filename = decodeURIComponent(match[1]);
        } else {
          const fallback = contentDisposition.match(/filename="?(.+?)"?(;|$)/);
          if (fallback?.[1]) {
            filename = fallback[1];
          }
        }
      }

      const urlBlob = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (err) {
      console.error("Failed to download Excel file:", err);
      throw err;
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadExcelFile, isDownloading };
}
