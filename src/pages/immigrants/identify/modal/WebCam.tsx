import { useMutation } from "@tanstack/react-query";
import { Button, notification, Space, Spin } from "antd";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCameraStore } from "@/features/camera/model/store.ts";
import ImmigrantService from "@/pages/immigrants/service";
import { WebCamProps, WebcamWithMaskHandle } from "@/pages/immigrants/type";

const dataURLtoFile = (dataUrl: string, fileName: string): File => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime, lastModified: Date.now() });
};

const WebcamWithMask = forwardRef<WebcamWithMaskHandle, WebCamProps>(
  ({ name, control }, ref) => {
    // Helpers
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const {
      field: { onChange, value }
    } = useController({ name, control });

    // States
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [photoTaken, setPhotoTaken] = useState(!!value);
    const [cameraLoading, setCameraLoading] = useState(false);

    // Store
    const { setCameraSuccess, isVisible: isCameraVisible } = useCameraStore();

    // Queries
    const { mutate: recognizeFace, isPending: faceLoading } = useMutation({
      mutationKey: ["face-of"],
      mutationFn: (file: File) => ImmigrantService.faceOfImmigrant(file),
      onSuccess: () => {
        setCameraSuccess(true);
        notification.success({ message: t("notification.face_success") });
      },
      onError: (err: Error) => {
        setCameraSuccess(false);
        notification.error({
          message: t("notification.face_failed"),
          description: err.message
        });
      }
    });

    useImperativeHandle(ref, () => ({
      stopCamera: () => {
        stream?.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }));

    useEffect(() => {
      const startCamera = async () => {
        try {
          const ms = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } }
          });

          if (videoRef.current) {
            videoRef.current.srcObject = ms;
            console.log("Camera started successfully");
          }
          setStream(ms);
          setCameraLoading(false);
        } catch (e) {
          setCameraLoading(false);
          console.error("Camera error:", e);
        }
      };

      if (isCameraVisible && !photoTaken) {
        console.log("Attempting to start camera");
        startCamera();
      } else {
        console.log("Stopping camera", { isCameraVisible, photoTaken });
        stream?.getTracks().forEach((t) => t.stop());
        setStream(null);
      }

      return () => {
        stream?.getTracks().forEach((t) => t.stop());
        setStream(null);
      };
    }, [isCameraVisible, photoTaken, t, notification]);

    useEffect(() => {
      setPhotoTaken(!!value);
    }, [value]);

    const takePhoto = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0);

      // Kamera to‘xtatish
      stream?.getTracks().forEach((t) => t.stop());
      setStream(null);

      const dataUrl = canvas.toDataURL("image/jpeg");
      const file = dataURLtoFile(dataUrl, `${crypto.randomUUID()}.jpg`);
      onChange(file);
      setPhotoTaken(true);

      // Suratni darhol API-ga yuboramiz
      recognizeFace(file);
    };

    const retryPhoto = () => {
      onChange(undefined);
      setPhotoTaken(false);
      // setCameraVisibility(true);
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full h-[450px] overflow-hidden ">
          {!photoTaken ? (
            <>
              {cameraLoading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <Spin size="large" />
                  <span className="ml-2 text-white">Loading camera...</span>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-[200px] h-[300px] border-[3px] border-white rounded-[80%/60%]" />
                  </div>
                </>
              )}
            </>
          ) : (
            value && (
              <img
                src={URL.createObjectURL(value)}
                alt="Captured"
                className="w-full h-full object-cover rounded-lg"
              />
            )
          )}
        </div>

        <Space>
          {!photoTaken ? (
            <Button type="primary" onClick={takePhoto} loading={faceLoading}>
              Сфотографируй
            </Button>
          ) : (
            <Button onClick={retryPhoto}>Retry</Button>
          )}
        </Space>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    );
  }
);

export default WebcamWithMask;
