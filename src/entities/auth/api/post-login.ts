import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { prefetchMe } from "@/entities/auth/api/fetch-me.ts";
import { useAuthStore } from "@/entities/auth/model/store.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access: string;
  refresh: string;
  message?: string;
}

export async function postLogin(body: ILoginPayload) {
  const { data } = await Api.post<ILoginResponse>(endpoints.auth.signIn, body);
  return data;
}

export const usePostLogin = () => {
  // Helpers
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as any)?.from?.pathname +
      (location.state as any)?.from?.search || "/";

  // Store
  const { setAccessToken, setRefreshToken } = useAuthStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: async (data) => {
      prefetchMe();
      if (data.access) setAccessToken(data.access);
      if (data.refresh) setRefreshToken(data.refresh);
      navigate(from, { replace: true });
    },
    onError: (err: unknown) => {
      console.log(err);
    }
  });
};
