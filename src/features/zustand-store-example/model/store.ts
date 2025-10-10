import { create } from "zustand";

/** ===== Store State ===== */
interface ISimpleStore {
  count: number;
  username: string;
}

/** ===== Store Actions ===== */
interface ISimpleStoreActions {
  setCount: (count: number) => void;
  setUsername: (name: string) => void;
  reset: () => void;
}

/** ===== Initial State ===== */
const initialState: ISimpleStore = {
  count: 0,
  username: "Guest"
};

/** ===== Zustand Store ===== */
export const useSimpleStore = create<ISimpleStore & ISimpleStoreActions>()(
  (set) => ({
    ...initialState,
    setCount: (count) => set({ count }),
    setUsername: (username) => set({ username }),
    reset: () => set({ ...initialState })
  })
);

/** ===== EXAMPLE ===== */
// const setCount = useSimpleStore((state) => state.setCount);
// const setUsername = useSimpleStore((state) => state.setUsername);
// const reset = useSimpleStore((state) => state.reset);
