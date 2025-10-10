import axios from "axios";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";

const ProfileService = {
  // Current user ma'lumotlarini olish
  // usersMe: async () => {
  //   try {
  //     const response = await Api.get(endpoints.users.me);
  //     // localStorage'ga saqlash (cache sync uchun)
  //     // localStorage.setItem("user", JSON.stringify(response.data));
  //     return response.data;
  //   } catch (error: unknown) {
  //     console.log("Группа пользователей не справилась", error);
  //     let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
  //
  //     if (error instanceof Error) {
  //       errorMessage = error.message;
  //     }
  //     if (axios.isAxiosError(error) && error.response?.data?.message) {
  //       errorMessage = error.response.data.message;
  //     }
  //
  //     throw new Error(errorMessage);
  //   }
  // },

  // User ma'lumotlarini yangilash
  usersMeUpdate: async (data: any) => {
    try {
      // FormData yaratish
      const formData = new FormData();

      // Ma'lumotlarni FormData'ga qo'shish
      Object.entries(data).forEach(([key, value]) => {
        if (key === "photo" && value instanceof File) {
          formData.append("photo", value);
        } else if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });

      const response = await Api.patch(endpoints.users.me, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Yangilangan user ma'lumotlarini localStorage'ga saqlash
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    } catch (error: unknown) {
      console.error("Пользователь не справился", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";

      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.username) {
        errorMessage = error.response.data.username;
      }

      throw new Error(errorMessage);
    }
  },

  // Parolni o'zgartirish
  userChangePassword: async (data: any) => {
    try {
      const response = await Api.post(endpoints.users.change_password, data);
      return response.data;
    } catch (error: unknown) {
      let fieldErrors: Record<string, string[]> = {};

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errors) {
          fieldErrors = error.response.data.errors;
        }
        // Agar field errors bo'lmasa, umumiy xatolikni qaytarish
        if (
          Object.keys(fieldErrors).length === 0 &&
          error.response?.data?.message
        ) {
          throw new Error(error.response.data.message);
        }
      }

      // Field errorsni tashlaymiz (formik uchun)
      throw fieldErrors;
    }
  }
};

export default ProfileService;
