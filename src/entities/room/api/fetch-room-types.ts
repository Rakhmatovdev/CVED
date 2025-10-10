import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { IRoomType } from "@/entities/room/types.ts";
import type { IResponse } from "@/shared/api/types.ts";

const FAKE_DATA: IRoomType[] = [
  { id: 1, number: 1, eng: "hello", uzbek: "salom", rus: "привет" },
  { id: 2, number: 2, eng: "book", uzbek: "kitob", rus: "книга" },
  { id: 3, number: 3, eng: "water", uzbek: "suv", rus: "вода" },
  { id: 4, number: 4, eng: "sun", uzbek: "quyosh", rus: "солнце" },
  { id: 5, number: 5, eng: "moon", uzbek: "oy", rus: "луна" }
];

const FAKE_RESPONSE: IResponse<IRoomType> = {
  next: "",
  previous: "",
  count: 20,
  results: FAKE_DATA
};

export async function fetchRoomTypes() {
  return FAKE_RESPONSE;
  // const { data } = await Api.get<IResponse<IRoomType>>(
  //   endpoints.directory.roomTypes
  // );
  // return data;
}

export function useFetchRoomTypes() {
  return useQuery({
    queryKey: ["room-types"],
    queryFn: () => fetchRoomTypes(),
    placeholderData: keepPreviousData
  });
}
