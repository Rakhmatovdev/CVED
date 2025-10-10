export interface FaceData {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  coverage: number;
}

export interface OvalData {
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
}

export interface ImageData {
  width: number;
  height: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  faceData?: FaceData;
  imageData?: ImageData;
  oval?: OvalData;
}
