import { create } from "zustand";

/** ===== State Type ===== */
interface ISidebarStore {
  collapsed: boolean;
}

/** ===== Actions ===== */
interface ISidebarStoreActions {
  toggleSidebar: () => void;
}

/** ===== State ===== */
const initialState: ISidebarStore = {
  collapsed: false
};

/** ===== Store ===== */
export const useSidebarStore = create<ISidebarStore & ISidebarStoreActions>()(
  (set) => ({
    ...initialState,
    toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed }))
  })
);
