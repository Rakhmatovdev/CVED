import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  type Detection,
  FaceDetector,
  FaceLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision";
import { Flex } from "antd";
import { type ReactElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCameraStore } from "@/features/camera/model/store.ts";
import Button from "@/shared/ui/Button.tsx";
import {
  BORDER_MARGIN_X,
  BORDER_MARGIN_Y,
  // cameraResolutionHeight,
  // cameraResolutionWidth,
  CAPTURE_INTERVAL,
  COUNTDOWN_SECONDS,
  MAX_FACE_COVERAGE,
  MAX_ROLL,
  MAX_YAW,
  MEDIAPIPE_PATHS,
  MIN_FACE_COVERAGE,
  OVAL_ASPECT_RATIO,
  OVAL_CENTER_TOLERANCE,
  OVAL_HEIGHT_RATIO,
  PITCH_RANGE
} from "./constants";
import type { ValidationResult } from "./types";

const PassportPhotoValidator = () => {
  const {
    isVisible: isCameraVisible,
    setCameraPhoto,
    photo: validatedImage
  } = useCameraStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null);
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(
    null
  );
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const countdownTimerRef = useRef<number | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (!faceDetector) return;

    if (!isCameraVisible) {
      stopCamera();
    } else {
      startCamera();
    }

    return () => {
      stopCamera();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    };
  }, [faceDetector, t, isCameraVisible]);

  // Initialize MediaPipe Face Detection
  useEffect(() => {
    const initializeFaceDetection = async (): Promise<void> => {
      try {
        setIsModelLoading(true);
        setModelError(null);

        const vision = await FilesetResolver.forVisionTasks(
          MEDIAPIPE_PATHS.WASM
        );
        const detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MEDIAPIPE_PATHS.FACE_DETECTOR,
            delegate: "GPU"
          },
          runningMode: "IMAGE"
        });

        const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: MEDIAPIPE_PATHS.FACE_LANDMARKER
          },
          outputFaceBlendshapes: false,
          runningMode: "VIDEO",
          numFaces: 1
        });

        setFaceDetector(detector);
        setFaceLandmarker(faceLandmarker);
        setIsModelLoading(false);
      } catch (error) {
        console.error(t("camera.failed-to-initialize-MediaPipe"), error);
        setModelError(t("camera.failed-to-load-face"));
        setIsModelLoading(false);
      }
    };

    initializeFaceDetection();
  }, []);

  const startCamera = async (): Promise<void> => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          // width: { ideal: cameraResolutionWidth },
          // height: { ideal: cameraResolutionHeight },
          width: { ideal: 354 },
          height: { ideal: 472 },
          aspectRatio: { ideal: 16 / 9 }
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();

        intervalRef.current = window.setInterval(() => {
          const image = capturePhoto();
          if (image) {
            validatePassportPhoto(image).then((result) => {
              setValidationResult(result);

              // If invalid while countdown running → stop countdown
              if (!result.isValid && countdown > 0) {
                if (countdownTimerRef.current) {
                  clearInterval(countdownTimerRef.current);
                  countdownTimerRef.current = null;
                }
                setCountdown(0);
              }

              // If valid and countdown not started → start countdown
              if (
                result.isValid &&
                countdown === 0 &&
                !countdownTimerRef.current
              ) {
                setCountdown(COUNTDOWN_SECONDS);

                countdownTimerRef.current = window.setInterval(async () => {
                  setCountdown((prev) => {
                    if (prev <= 1) {
                      // Before final capture → validate again
                      const finalImage = capturePhoto();
                      if (finalImage) {
                        validatePassportPhoto(finalImage).then(
                          (finalResult) => {
                            if (finalResult.isValid) {
                              setCameraPhoto(finalImage);
                              stopCamera();
                              if (intervalRef.current) {
                                clearInterval(intervalRef.current);
                                intervalRef.current = null;
                              }
                            } else {
                              // Reset if invalid at the last moment
                              setCountdown(0);
                            }
                          }
                        );
                      }
                      if (countdownTimerRef.current) {
                        clearInterval(countdownTimerRef.current);
                        countdownTimerRef.current = null;
                      }
                      return 0;
                    }
                    return prev - 1;
                  });
                }, 1000) as unknown as number;
              }
            });
          }
        }, CAPTURE_INTERVAL);
      }
      streamRef.current = mediaStream;
    } catch (error) {
      console.error(t("camera.error-accessing-camera"), error);
    }
  };

  const stopCamera = (): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    if (faceDetector) {
      startCamera();
    }
    if (!validatedImage) {
      stopCamera();
    }
    return () => {
      stopCamera();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [faceDetector, t, validatedImage]);

  const capturePhoto = (): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return null;

    const context = canvas.getContext("2d");
    if (!context) return null;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    return canvas.toDataURL("image/png");
  };

  const validatePassportPhoto = async (
    imageDataUrl: string
  ): Promise<ValidationResult> => {
    if (!faceDetector) {
      return {
        isValid: false,
        errors: [t("camera.face-detection-model-not-loaded")]
      };
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const detections = faceDetector.detect(img);
          const faces: Detection[] = detections.detections;

          if (faces.length === 0) {
            resolve({
              isValid: false,
              errors: [t("camera.face-not-found")],
              imageData: { width: img.width, height: img.height }
            });
            return;
          }

          // Largest face
          let largestFace = faces[0];
          let maxArea =
            largestFace.boundingBox!.width * largestFace.boundingBox!.height;

          for (let i = 1; i < faces.length; i++) {
            const area =
              faces[i].boundingBox!.width * faces[i].boundingBox!.height;
            if (area > maxArea) {
              largestFace = faces[i];
              maxArea = area;
            }
          }

          const errors: string[] = [];
          const face = largestFace.boundingBox!;
          const faceLeft = face.originX;
          const faceTop = face.originY;
          const faceRight = faceLeft + face.width;
          const faceBottom = faceTop + face.height;
          const faceWidth = face.width;
          const faceHeight = face.height;

          // Border margin checks
          if (faceLeft < BORDER_MARGIN_X)
            errors.push(t("camera.the-face-is-too-close-to-the-right-border"));
          if (img.width - faceRight < BORDER_MARGIN_X)
            errors.push(t("camera.the-face-is-too-close-to-the-left-border"));
          if (faceTop < BORDER_MARGIN_Y)
            errors.push(t("camera.the-face-is-too-close-to-the-upper-border"));
          if (img.height - faceBottom < BORDER_MARGIN_Y)
            errors.push(t("camera.the-face-is-too-close-to-the-lower-border"));

          // Oval guide
          const ovalCenterX = img.width / 2;
          const ovalCenterY = img.height / 2;
          const ovalRadiusY = (img.height * OVAL_HEIGHT_RATIO) / 2;
          const ovalRadiusX = ovalRadiusY * OVAL_ASPECT_RATIO;

          // Coverage %
          const ovalArea = Math.PI * ovalRadiusX * ovalRadiusY;
          const faceArea = faceWidth * faceHeight;
          const faceCoveragePercentage = (faceArea / ovalArea) * 100;

          if (faceCoveragePercentage < MIN_FACE_COVERAGE) {
            errors.push(`${t("camera.get-closer")} ${faceCoveragePercentage}`);
          }
          if (faceCoveragePercentage > MAX_FACE_COVERAGE) {
            errors.push(`${t("camera.move-away")} ${faceCoveragePercentage}`);
          }

          // Oval check
          const isWithinOval = (x: number, y: number): boolean => {
            const dx = (x - ovalCenterX) / ovalRadiusX;
            const dy = (y - ovalCenterY) / ovalRadiusY;
            return dx * dx + dy * dy <= 1;
          };

          const rectMostlyInsideOval = (
            left: number,
            top: number,
            width: number,
            height: number,
            samples = 7,
            threshold = 0.8
          ): boolean => {
            let inside = 0,
              total = 0;
            for (let r = 0; r < samples; r++) {
              for (let c = 0; c < samples; c++) {
                const x = left + (c / (samples - 1)) * width;
                const y = top + (r / (samples - 1)) * height;
                total++;
                if (isWithinOval(x, y)) inside++;
              }
            }
            return inside / total >= threshold;
          };

          const isFaceCenteredInOval = (
            faceLeft: number,
            faceTop: number,
            faceWidth: number,
            faceHeight: number
          ): boolean => {
            const faceCenterX = faceLeft + faceWidth / 2;
            const faceCenterY = faceTop + faceHeight / 2;
            const dx = (faceCenterX - ovalCenterX) / ovalRadiusX;
            const dy = (faceCenterY - ovalCenterY) / ovalRadiusY;
            return (
              Math.abs(dx) <= OVAL_CENTER_TOLERANCE &&
              Math.abs(dy) <= OVAL_CENTER_TOLERANCE
            );
          };

          if (!rectMostlyInsideOval(faceLeft, faceTop, faceWidth, faceHeight)) {
            errors.push(t("camera.move-the-face-into-an-oval-shape"));
          } else if (
            !isFaceCenteredInOval(faceLeft, faceTop, faceWidth, faceHeight)
          ) {
            errors.push(t("camera.the-face-is-not-centered-in-the-oval"));
          }

          if (faceLandmarker) {
            const video = videoRef.current;
            if (video) {
              const results = faceLandmarker.detectForVideo(
                video,
                performance.now()
              );

              if (results.faceLandmarks && results.faceLandmarks.length > 0) {
                const lm = results.faceLandmarks[0];

                const leftEye = lm[33]; // left eye
                const rightEye = lm[263]; // right eye
                const noseTip = lm[1]; // nose
                const leftCheek = lm[234];
                const rightCheek = lm[454];
                const mouth = lm[13];

                // --- Roll (tilt sideways) ---
                const eyeSlope = Math.abs(
                  (leftEye.y - rightEye.y) / (leftEye.x - rightEye.x)
                );
                if (eyeSlope > MAX_ROLL) {
                  errors.push(t("camera.dont-tilt-your-head-to-the-side"));
                }

                // --- Yaw (turn left/right) ---
                const faceCenterX = (leftCheek.x + rightCheek.x) / 2;
                const noseOffset = Math.abs(noseTip.x - faceCenterX);
                if (noseOffset > MAX_YAW) {
                  errors.push(t("camera.look-straight-ahead-left-or-right"));
                }

                // --- Pitch (look up/down) ---
                const eyeY = (leftEye.y + rightEye.y) / 2;
                const noseToEyes = eyeY - noseTip.y;
                const noseToMouth = noseTip.y - mouth.y;
                const ratio = noseToEyes / noseToMouth;
                if (ratio < PITCH_RANGE[0] || ratio > PITCH_RANGE[1]) {
                  errors.push(t("camera.look-straight-ahead"));
                }
              }
            }
          }

          const mirroredFaceLeft = img.width - faceRight;
          const mirroredFaceRight = img.width - faceLeft;

          resolve({
            isValid: errors.length === 0,
            errors,
            faceData: {
              left: mirroredFaceLeft,
              top: faceTop,
              right: mirroredFaceRight,
              bottom: faceBottom,
              width: faceWidth,
              height: faceHeight,
              coverage: faceCoveragePercentage
            },
            imageData: { width: img.width, height: img.height },
            oval: {
              centerX: ovalCenterX,
              centerY: ovalCenterY,
              radiusX: ovalRadiusX,
              radiusY: ovalRadiusY
            }
          });
        } catch (error) {
          resolve({
            isValid: false,
            errors: [t("camera.validation-error") + (error as Error).message]
          });
        }
      };

      img.onerror = () => {
        resolve({ isValid: false, errors: [t("camera.failed-to-load-image")] });
      };

      img.src = imageDataUrl;
    });
  };

  const renderValidationOverlay = (): ReactElement | null => {
    if (
      !validationResult?.faceData ||
      !validationResult.oval ||
      !validationResult.imageData
    )
      return null;
    const { faceData, oval, imageData } = validationResult;

    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${imageData.width} ${imageData.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <ellipse
            cx={oval.centerX}
            cy={oval.centerY}
            rx={oval.radiusX}
            ry={oval.radiusY}
            fill="none"
            stroke="green"
            strokeWidth="6"
            // strokeDasharray="5,5"
          />
          <rect
            x={faceData.left}
            y={faceData.top}
            width={faceData.width}
            height={faceData.height}
            fill="none"
            stroke={validationResult.isValid ? "green" : "red"}
            strokeWidth="2" // Increase to 2 to see the rectangle
          />
          <line
            x1={BORDER_MARGIN_X}
            y1="0"
            x2={BORDER_MARGIN_X}
            y2={imageData.height}
            stroke="orange"
            strokeWidth="1" // Increase to 1 to see the line
            strokeDasharray="3,3"
          />
          <line
            x1={imageData.width - BORDER_MARGIN_X}
            y1="0"
            x2={imageData.width - BORDER_MARGIN_X}
            y2={imageData.height}
            stroke="orange"
            strokeWidth="1" // Increase to 1 to see the line
            strokeDasharray="3,3"
          />
          <line
            x1="0"
            y1={BORDER_MARGIN_Y}
            x2={imageData.width}
            y2={BORDER_MARGIN_Y}
            stroke="orange"
            strokeWidth="1" // Increase to 1 to see the line
            strokeDasharray="3,3"
          />
          <line
            x1="0"
            y1={imageData.height - BORDER_MARGIN_Y}
            x2={imageData.width}
            y2={imageData.height - BORDER_MARGIN_Y}
            stroke="orange"
            strokeWidth="1" // Increase to 1 to see the line
            strokeDasharray="3,3"
          />
        </svg>
      </div>
    );
  };

  if (isModelLoading) {
    return <p>{t("camera.loading-face-detection")}...</p>;
  }

  if (modelError) {
    return <p className="text-red-600">{modelError}</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-4">
          <div className="">
            <div className="relative w-full mx-auto">
              <div className="h-[calc(100vh-250px)] w-full rounded-lg overflow-hidden">
                {validatedImage ? (
                  <img
                    src={validatedImage}
                    alt="Validated"
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                )}

                {countdown > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold bg-black opacity-40">
                    {countdown}
                  </div>
                )}

                {validationResult && (
                  <div
                    className={`absolute bottom-2 text-sm w-full text-[40px] flex items-center justify-center space-x-2 ${
                      validationResult?.isValid
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {validationResult.isValid ? (
                      <CheckCircleOutlined size={24} />
                    ) : (
                      <CloseCircleOutlined size={24} />
                    )}
                    {validationResult.errors.length > 0
                      ? validationResult.errors[0]
                      : t("camera.photo-is-suitable")}
                  </div>
                )}

                {renderValidationOverlay()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Flex className={"mt-4  gap-4 relative"}>
        <Button
          variant={"phantom"}
          className={"w-[48%]"}
          onClick={() => setCameraPhoto(null)}
        >
          {t("buttons.cancel")}
        </Button>
      </Flex>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PassportPhotoValidator;
