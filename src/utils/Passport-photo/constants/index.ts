export const BORDER_MARGIN_X = 0;
export const BORDER_MARGIN_Y = 35;
export const MIN_FACE_COVERAGE = 20; // %
export const MAX_FACE_COVERAGE = 130; // %
export const OVAL_CENTER_TOLERANCE = 0.2; // 20%
export const CAPTURE_INTERVAL = 1000; // check every 1s
export const COUNTDOWN_SECONDS = 3;
export const OVAL_HEIGHT_RATIO = 0.5;
export const OVAL_ASPECT_RATIO = 0.75; // width = 75% of height
export const cameraResolutionWidth = 1280;
export const cameraResolutionHeight = 720;
export const MAX_YAW = 0.1; // nose offset tolerance
export const MAX_ROLL = 0.08; // eyes slope tolerance
export const PITCH_RANGE = [0.6, 1.6]; // ratio between nose-to-eyes and nose-to-mouth
export const MEDIAPIPE_PATHS = {
  WASM: "/mediapipe/wasm",
  FACE_DETECTOR: "/mediapipe/model/blaze_face_short_range.tflite",
  FACE_LANDMARKER: "/mediapipe/face_landmarker/face_landmarker.task"
} as const;
