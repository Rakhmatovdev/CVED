import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { create } from "zustand";

/** ===== State ===== */
interface IAppBreadcrumbStore {
  nextItems: ItemType[];
}

/** ===== Actions ===== */
interface IActions {
  setNextBreadcrumb: (items: ItemType[]) => void;
}

/** ===== Store ===== */
export const useAppBreadcrumbStore = create<IAppBreadcrumbStore & IActions>(
  (set) => ({
    nextItems: [],
    setNextBreadcrumb: (nextItems) => set({ nextItems })
  })
);
