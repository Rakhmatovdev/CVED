import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthManager } from "@/shared/lib/auth-manager.ts";

interface ICurrentUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

/** ===== Store State ===== */
interface IAuthStore {
  isAuthorized: boolean;
  currentUser: ICurrentUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

/** ===== Store Actions ===== */
interface IAuthStoreActions {
  resetAuth: () => void;
  logIn: () => void;
  logOut: () => void;
  setCurrentUser: (user: ICurrentUser) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
}

/** ===== Initial State ===== */
const initialState: IAuthStore = {
  isAuthorized: !!AuthManager.getAccessToken(),
  currentUser: null,
  accessToken: AuthManager.getAccessToken(),
  refreshToken: AuthManager.getRefreshToken()
};

/** ===== Zustand Store ===== */
export const useAuthStore = create<IAuthStore & IAuthStoreActions>()(
  persist<IAuthStore & IAuthStoreActions>(
    (set) => ({
      ...initialState,
      setAccessToken: (accessToken) => {
        AuthManager.setAccessToken(accessToken);
        set({ accessToken });
      },
      setRefreshToken: (refreshToken) => {
        AuthManager.setRefreshToken(refreshToken);
        set({ refreshToken });
      },
      resetAuth: () => set({ ...initialState }),
      logIn: () => set({ isAuthorized: true }),
      setCurrentUser: (currentUser) => set({ currentUser }),
      logOut: () => {
        set({ ...initialState });
        AuthManager.logout();
      }
    }),
    {
      name: "user-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        ({
          currentUser: state.currentUser
        }) as IAuthStore & IAuthStoreActions
    }
  )
);

/** ===== Selectors ===== */
export const selectIsAuthorized = (state: IAuthStore) => state.isAuthorized;
export const selectCurrentUser = (state: IAuthStore) => state.currentUser;

/** ===== EXAMPLE ===== */
// const isAuthorized = useAuthStore(selectIsAuthorized)
// const currentUser = useAuthStore(selectCurrentUser)
