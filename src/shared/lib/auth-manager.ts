import Cookies from "js-cookie";
import { navigate } from "@/routes/navigation.ts";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import queryClient from "@/shared/config/query-client.ts";

export const ACCESS_TOKEN_NAME = "accessToken";
export const REFRESH_TOKEN_NAME = "refreshToken";

export class AuthManager {
  static getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_NAME);
  }

  static getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_NAME);
  }

  static setAccessToken(token: string, options?: ICookieOptions) {
    Cookies.set(ACCESS_TOKEN_NAME, token, options);
  }

  static setRefreshToken(token: string, options?: ICookieOptions) {
    Cookies.set(REFRESH_TOKEN_NAME, token, options);
  }

  static clearTokens() {
    Cookies.remove(ACCESS_TOKEN_NAME);
    Cookies.remove(REFRESH_TOKEN_NAME);
  }

  static logout() {
    // AuthManager.clearTokens();
    queryClient.clear();
    navigate("/auth/login", { replace: true });
  }

  static async refreshAccessToken(): Promise<string | null> {
    const refreshToken = AuthManager.getRefreshToken();

    // if (!refreshToken) {
    //   AuthManager.logout();
    //   return null;
    // }

    try {
      const { data } = await Api.post<IRefreshTokenResponse>(
        endpoints.auth.refresh,
        { refresh: refreshToken }
      );

      const newAccessToken = data.access;

      if (newAccessToken) {
        AuthManager.setAccessToken(newAccessToken);
        return newAccessToken;
      }

      // AuthManager.logout();
      return null;
    } catch (error: any) {
      console.error("Token refresh error:", error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        // AuthManager.logout();
      }

      return null;
    }
  }
}

interface IRefreshTokenResponse {
  access: string;
  refresh?: string;
}

export interface ICookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";

  [key: string]: any;
}
