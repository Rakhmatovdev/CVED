import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import { User } from "@/utils/hooks/useUser";

export interface UserMeResponse {
  data?: User;
  // yoki to'g'ridan-to'g'ri User properties
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  photo?: string;
  role?: string;
  permissions?: string[];
  is_active?: boolean;
  date_joined?: string;
  last_login?: string;
}

const DashboardService = {
  // Current user ma'lumotlarini olish
  usersMe: async (): Promise<UserMeResponse> => {
    try {
      const response = await Api.get<UserMeResponse>(endpoints.users.me);
      return response.data;
    } catch (error) {
      console.error("User ma'lumotlarini olishda xatolik:", error);
      throw error;
    }
  },

  // User ma'lumotlarini yangilash
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await Api.patch<User>(endpoints.users.me, userData);
      return response.data;
    } catch (error) {
      console.error("Profil yangilashda xatolik:", error);
      throw error;
    }
  },

  // Parolni o'zgartirish
  changePassword: async (passwordData: {
    old_password: string;
    new_password: string;
    confirm_password: string;
  }): Promise<{ message: string }> => {
    try {
      const response = await Api.post<{ message: string }>(
        endpoints.users.change_password,
        passwordData
      );
      return response.data;
    } catch (error) {
      console.error("Parol o'zgartirishda xatolik:", error);
      throw error;
    }
  },

  // User rollarini olish
  getUserRoles: async (): Promise<any[]> => {
    try {
      const response = await Api.get<any[]>(endpoints.users.roles);
      return response.data;
    } catch (error) {
      console.error("User rollarini olishda xatolik:", error);
      throw error;
    }
  },

  // User permissions'larini olish
  getUserPermissions: async (): Promise<any[]> => {
    try {
      const response = await Api.get<any[]>(endpoints.users.permissions);
      return response.data;
    } catch (error) {
      console.error("User permissions'larini olishda xatolik:", error);
      throw error;
    }
  }
};

export default DashboardService;
