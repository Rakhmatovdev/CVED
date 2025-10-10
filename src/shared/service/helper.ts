import axios from "axios";
import { endpoints } from "@/shared/api/endpoints.ts";
import Api from "../api/axios.ts";

const DEFAULT_PAGE_SIZE = 77777;

const makeHelperQuery = async (
  url: string,
  search = "",
  page = 1,
  extraParams: Record<string, any> = {}
) => {
  try {
    const response = await Api.get(url, {
      params: {
        search,
        page,
        page_size: DEFAULT_PAGE_SIZE,
        ...extraParams
      }
    });
    return response.data;
  } catch (error: unknown) {
    console.log("Ошибка при получении справочных данных:", error);

    let errorMessage = "Что-то не так. Попробуйте ещё раз позже";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

const HelperService = {
  helperCountry: (search = "", page = 1) =>
    makeHelperQuery(endpoints.helpers.county, search, page),

  helperNationality: (search = "", page = 1) =>
    makeHelperQuery(endpoints.helpers.nationality, search, page),

  helperRegions: (search = "", page = 1) =>
    makeHelperQuery(endpoints.helpers.regions, search, page),

  helperDistricts: (search = "", page = 1, region_id?: number | string) =>
    makeHelperQuery(
      endpoints.helpers.districts,
      search,
      page,
      region_id ? { region: region_id } : {}
    ),

  helperActions: (search = "", page = 1) =>
    makeHelperQuery(endpoints.helpers.actions, search, page),

  helperBordering: (crossing_point = "", page = 1) =>
    makeHelperQuery(endpoints.helpers.bordering_point, crossing_point, page)
};

export default HelperService;
