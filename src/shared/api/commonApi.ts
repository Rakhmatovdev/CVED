import axios from "./axios";

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const CommonAPI = {
  fetchPaginatedList: async <T>(urlEndingWithSlash: string, params: any) => {
    const { data } = await axios.get(urlEndingWithSlash, { params });
    return data as PaginatedResponse<T>;
  },
  fetchList: async <T>(urlEndingWithSlash: string) => {
    const { data } = await axios.get(urlEndingWithSlash);
    return data as T[];
  },
  fetchById: async <T>(urlEndingWithSlash: string, id: number) => {
    const { data } = await axios.get(`${urlEndingWithSlash}${id}`);
    return data as T;
  },
  create: async <TData, TResponse>(urlEndingWithSlash: string, data: TData) => {
    const { data: response } = await axios.post(urlEndingWithSlash, data);
    return response as TResponse;
  },
  updateById: async <TData, TResponse>(
    urlEndingWithSlash: string,
    id: number,
    data: TData
  ) => {
    const { data: response } = await axios.put(
      `${urlEndingWithSlash}${id}/`,
      data
    );
    return response as TResponse;
  },
  deleteById: async <TResponse>(urlEndingWithSlash: string, id: number) => {
    return axios.delete(`${urlEndingWithSlash}${id}/`) as Promise<TResponse>;
  }
};
