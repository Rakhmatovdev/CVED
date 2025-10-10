import axios from "axios";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";

const ReportService = {
  reportByAge: async (params: { start_date: string; end_date: string }) => {
    try {
      const response = await Api.get(`${endpoints.reports.by_age}`, {
        params: {
          start_date: params.start_date,
          end_date: params.end_date
        }
      });
      return response.data;
    } catch (error: unknown) {
      console.log("Группа пользователей не справилась", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Группа пользователей не справилась",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  reportMontly: async (params: {
    start_date: string;
    end_date: string;
    get_file: boolean;
  }) => {
    try {
      const response = await Api.get(`${endpoints.reports.monthly}`, {
        params: {
          start_date: params.start_date,
          end_date: params.end_date,
          get_file: params.get_file
        }
      });
      return response.data;
    } catch (error: unknown) {
      console.log("Группа пользователей не справилась", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Группа пользователей не справилась",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  }
};

export default ReportService;
