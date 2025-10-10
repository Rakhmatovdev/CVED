import { create } from "zustand";

/** ===== State ===== */
interface CameraState {
  isVisible: boolean;
  isSuccess: boolean;
  photo: string | null;
}

/** ===== Actions ===== */
interface CameraActions {
  setCameraVisibility: (value: boolean) => void;
  setCameraSuccess: (value: boolean) => void;
  setCameraPhoto: (value: string) => void;
}

/** ===== Store ===== */
export const useCameraStore = create<CameraState & CameraActions>((set) => ({
  isVisible: false,
  isSuccess: false,
  photo: null,
  setCameraVisibility: (value: boolean) => set({ isVisible: value }),
  setCameraSuccess: (value: boolean) => set({ isSuccess: value }),
  setCameraPhoto: (value: string) => set({ photo: value })
}));
