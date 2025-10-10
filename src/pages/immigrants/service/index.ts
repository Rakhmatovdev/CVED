import axios from "axios";
import Api from "@/shared/api/axios.ts";
import { endpoints } from "@/shared/api/endpoints.ts";
import flatObject from "@/utils/cleanObject.ts";

interface ImmigrantFilters {
  region_id?: number;
  status?: string;
  page?: number;
  page_size?: number;
  [key: string]: any;
}

const ImmigrantService = {
  // Immigrants
  getImmigrants: async (filters: ImmigrantFilters) => {
    try {
      const config =
        filters && Object.keys(filters).length
          ? { params: filters }
          : undefined;
      const response = await Api.get(endpoints.immigrants.get, config);
      return response.data;
    } catch (error: unknown) {
      console.log("Получить иммигрантов не удалось", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Иммигранты не удалось получить",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  getImmigrant: async (id?: string | number) => {
    try {
      const response = await Api.get(`${endpoints.immigrants.get}/${id}`);
      return response.data;
    } catch (error: unknown) {
      console.log("Получить иммигранта не удалось", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Иммигрант Fetch не удалось",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  crossingImmigrant: async (
    data: { page: number; page_size: number },
    id: number | string
  ) => {
    try {
      const response = await Api.get(
        `${endpoints.immigrants.get}/${id}${endpoints.immigrants.crossing}`,
        { data }
      );
      return response.data;
    } catch (error: unknown) {
      console.log("Получить иммигранта не удалось", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Иммигрант Fetch не удалось",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  faceOfImmigrant: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("photo", file); // если сервер ждёт другое имя — поменяй здесь
      const response = await Api.post(endpoints.immigrants.face_of, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      return response.data;
    } catch (error: unknown) {
      console.error("Ошибка при распознавании иммигранта по лицу:", error);

      let errorMessage = "Что-то пошло не так. Попробуйте позже.";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Если нужно, включи уведомление:
      // notification.error({
      //   message: "Ошибка загрузки лица иммигранта",
      //   description: errorMessage,
      // });

      throw new Error(errorMessage);
    }
  },
  // unidentify
  getUnidentifys: async (filters?: Record<string, any>) => {
    try {
      const config =
        filters && Object.keys(filters).length
          ? { params: filters }
          : undefined;
      const response = await Api.get(
        `${endpoints.immigrants.unidentify}`,
        config
      );
      return response.data;
    } catch (error: unknown) {
      console.log("Получить иммигрантов не удалось", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "неопознанный не удалось получить",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  getUnidentify: async (id?: string | number) => {
    try {
      const response = await Api.get(
        `${endpoints.immigrants.unidentify}${id}${endpoints.immigrants.record}`
      );
      return response.data;
    } catch (error: unknown) {
      console.log("Получить неопознанный не удалось", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Неопознанный не удалось",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  getUnidentifyByid: async (id?: string | number) => {
    try {
      const response = await Api.get(
        `${endpoints.immigrants.unidentify}${id}/`
      );
      return response.data;
    } catch (error: unknown) {
      console.log("Получить неопознанный не удалось", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Неопознанный не удалось",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  cancelAttachment: async ({
    id,
    pid
  }: {
    id: number | string;
    pid: number | string;
  }) => {
    try {
      const res = await Api.post(
        `${endpoints.connectId.post}${pid}${endpoints.connectId.cancel}`,
        { passport_id: id }
      );
      return res.data;
    } catch (error: unknown) {
      console.error("Отменить вложение не удалось", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Отменить вложение не удалось",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  // Create immigrant now takes data directly
  createImmigrant: async (data: Record<string, any>) => {
    const formData = new FormData();
    if (data.phone_number) {
      formData.append("phone_number", data.phone_number);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.first_name) {
      formData.append("first_name", data.first_name);
    }
    if (data.last_name) {
      formData.append("last_name", data.last_name);
    }
    if (data.middle_name) {
      formData.append("middle_name", data.middle_name);
    }
    if (data.nationality) {
      formData.append("nationality", data.nationality);
    }
    if (data.gender) {
      formData.append("gender", data.gender);
    }
    if (data.birth_date) {
      formData.append("birth_date", data.birth_date);
    }
    if (data.place_of_birth) {
      formData.append("place_of_birth", data.place_of_birth);
    }
    if (data.arrival_date?.length > 0) {
      formData.append("arrival_date", data.arrival_date);
    }
    if (data.pinfl) {
      formData.append("pinfl", data.pinfl);
    }
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    if (data.passport_number) {
      formData.append("passport_number", data.passport_number);
    }
    if (data.place_of_issue) {
      formData.append("place_of_issue", data.place_of_issue);
    }
    if (data.date_of_issue) {
      formData.append("date_of_issue", data.date_of_issue);
    }
    if (data.valid_until) {
      formData.append("valid_until", data.valid_until);
    }
    if (data.citizenship_id) {
      formData.append("citizenship_id", data.citizenship_id);
    }

    if (data?.passport_data) {
      formData.append(
        "passport_data",
        JSON.stringify(flatObject(data?.passport_data))
      );
    }
    if (data.fingerprints.left_thumb) {
      formData.append("fingerprint_left_thumb", data.fingerprints.left_thumb);
    }
    if (data.fingerprints.left_index) {
      formData.append("fingerprint_left_index", data.fingerprints.left_index);
    }
    if (data.fingerprints.left_middle) {
      formData.append("fingerprint_left_middle", data.fingerprints.left_middle);
    }
    if (data.fingerprints.left_ring) {
      formData.append("fingerprint_left_ring", data.fingerprints.left_ring);
    }
    if (data.fingerprints.left_little) {
      formData.append("fingerprint_left_little", data.fingerprints.left_little);
    }
    if (data.fingerprints.right_thumb) {
      formData.append("fingerprint_right_thumb", data.fingerprints.right_thumb);
    }
    if (data.fingerprints.right_index) {
      formData.append("fingerprint_right_index", data.fingerprints.right_index);
    }
    if (data.fingerprints.right_middle) {
      formData.append(
        "fingerprint_right_middle",
        data.fingerprints.right_middle
      );
    }
    if (data.fingerprints.right_ring) {
      formData.append("fingerprint_right_ring", data.fingerprints.right_ring);
    }
    if (data.fingerprints.right_little) {
      formData.append(
        "fingerprint_right_little",
        data.fingerprints.right_little
      );
    }

    try {
      const res = await Api.post(endpoints.immigrants.add, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return res.data;
    } catch (error: unknown) {
      console.error("Создать иммигранта не удалось", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Создать иммигранта не удалось",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  // Update
  updateImmigrantpas: async (
    id: number | string,
    data: Record<string, any>
  ) => {
    const formData = new FormData();

    if (data.first_name) {
      formData.append("first_name_in_passport", data.first_name);
    }
    if (data.last_name) {
      formData.append("last_name_in_passport", data.last_name);
    }
    if (data.middle_name) {
      formData.append("middle_name_in_passport", data.middle_name);
    }

    if (data.birth_date) {
      formData.append("birth_date", data.birth_date);
    }
    if (data.citizenship) {
      formData.append("citizenship", data.citizenship);
    }
    if (data.place_of_birth) {
      formData.append("place_of_birth", data.place_of_birth);
    }
    if (data.date_of_issue) {
      formData.append("date_of_issue", data.date_of_issue);
    }
    if (data.valid_until) {
      formData.append("valid_until", data.valid_until);
    }
    if (data.place_of_issue) {
      formData.append("place_of_issue", data.place_of_issue);
    }
    if (data.nationality) {
      formData.append("nationality", data.nationality);
    }
    if (data.pinfl) {
      formData.append("pinfl", data.pinfl);
    }
    if (data.photo) {
      formData.append("photo", data.photo);
    }
    if (data.passport_front_side_photo) {
      formData.append(
        "passport_front_side_photo",
        data.passport_front_side_photo
      );
    }
    if (data.passport_back_side_photo) {
      formData.append(
        "passport_back_side_photo",
        data.passport_back_side_photo
      );
    }
    if (data.passport_number) {
      formData.append("passport_number", data.passport_number);
    }
    if (data.fingerprints) {
      formData.append("fingerprints", data.fingerprints);
    }
    console.log(data);

    try {
      const res = await Api.patch(
        `${endpoints.immigrants.base}${id}${endpoints.immigrants.uppas}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return res.data;
    } catch (error: unknown) {
      console.error("Создать иммигранта не удалось", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Создать иммигранта не удалось",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  },
  helperCountry: async (search = "", page = 1) => {
    const page_size = 77777;
    try {
      const response = await Api.get(endpoints.helpers.county, {
        params: { search, page, page_size } // include page here
      });
      return response.data;
    } catch (error: unknown) {
      console.log("Помощник страны не справился", error);
      let errorMessage = "Что-то не так. Попробуйте ещё раз позже";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      // notification.error({
      //   message: "Помощник страны не справился",
      //   description: errorMessage
      // });
      throw new Error(errorMessage);
    }
  }
};

export default ImmigrantService;
