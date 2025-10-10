import { keepPreviousData, skipToken, useQuery } from "@tanstack/react-query";
import type { ISearchedImmigrantPassport } from "@/entities/immigrant/search-passport/types.ts";

// import Api from "@/shared/api/axios.ts";
// import { endpoints } from "@/shared/api/endpoints.ts";

interface IFetchImmigrantPassportParams {
  country_id: number;
  passport_number: string;
  birth_date: string;
  visa?: 1 | undefined;
}

const FAKE_PASSPORT: ISearchedImmigrantPassport = {
  id: 1455,
  immigrant_id: 2165,
  passport_front_side_photo:
    "https://tse4.mm.bing.net/th/id/OIP.uH5_aU1nxjaZ196BqK1yDQHaE3?rs=1&pid=ImgDetMain&o=7&rm=3",
  passport_back_side_photo:
    "https://tse1.mm.bing.net/th/id/OIP.F5YecdAJbUlFYGHMPCKxBQHaFK?w=1024&h=714&rs=1&pid=ImgDetMain&o=7&rm=3",
  passport_number: "KA11122233",
  first_name_in_passport: "Hasan",
  last_name_in_passport: "Musa",
  middle_name_in_passport: "Izz",
  // place_of_birth: "",
  birth_date: "2016-07-18",
  citizenship: {
    id: 566,
    name: "ГУАМ",
    alpha2_code: "GU"
  },
  place_of_issue: "2023-07-18",
  date_of_issue: "2023-05-18",
  valid_until: "2027-07-18",
  email: "something@gmial.com",
  full_name: "Hasan Musa Izz",
  photo: "https://minio.uz/media/immigrants/2025/07/18/1bcbb23f.jpeg",
  last_entry: "2024-07-20",
  visa: {
    number: "OLD_0111111"
  }
};

export async function fetchImmigrantPassport() {
  // params: IFetchImmigrantPassportParams
  return FAKE_PASSPORT;
  // const { data } = await Api.get<ISearchedImmigrantPassport>(
  //   endpoints.immigrants.passport,
  //   { params }
  // );
  // return data;
}

interface IUseFetchImmigrantPassportParams
  extends IFetchImmigrantPassportParams {
  enabled: boolean;
  queryKey?: string;
}

export function useFetchImmigrantPassport({
  enabled,
  queryKey,
  ...params
}: IUseFetchImmigrantPassportParams) {
  return useQuery({
    queryKey: [queryKey || "immigrant-passport", params],
    // queryFn: !enabled ? skipToken : () => fetchImmigrantPassport(params),
    queryFn: !enabled ? skipToken : () => fetchImmigrantPassport(),
    placeholderData: keepPreviousData
  });
}
