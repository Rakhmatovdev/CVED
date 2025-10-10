import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Api from "@/shared/api/axios";

interface IFileUploaderPayload {
  file: File;
  uid: string;
  url: string;
  extraFormData?: Record<string, string>;
}

export function useFileUploader<TResponse = unknown>() {
  // Refs
  const controllersRef = useRef<Record<string, AbortController>>({});

  // States
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  // Queries
  const mutation: UseMutationResult<TResponse, unknown, IFileUploaderPayload> =
    useMutation({
      mutationFn: async ({
        file,
        uid,
        url,
        extraFormData = {}
      }: IFileUploaderPayload): Promise<TResponse> => {
        const controller = new AbortController();
        controllersRef.current[uid] = controller;

        const formData = new FormData();
        formData.append("file", file);
        Object.entries(extraFormData).forEach(([k, v]) =>
          formData.append(k, v)
        );

        const response = await Api.post<TResponse>(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          signal: controller.signal,
          onUploadProgress: (event) => {
            const percent = event.total
              ? Math.round((event.loaded * 100) / event.total)
              : 0;
            setProgressMap((prev) => ({ ...prev, [uid]: percent }));
          }
        });

        delete controllersRef.current[uid];
        return response.data;
      }
    });

  const cancelUpload = (uid: string) => {
    const controller = controllersRef.current[uid];
    if (controller) {
      controller.abort();
      delete controllersRef.current[uid];
      setProgressMap((prev) => ({ ...prev, [uid]: 0 }));
    }
  };

  return { ...mutation, progressMap, cancelUpload };
}
