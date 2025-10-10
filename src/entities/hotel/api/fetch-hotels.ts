import { faker } from "@faker-js/faker";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { IHotel } from "@/entities/hotel/types.ts";
import { wait } from "@/shared/lib/utils.ts";

function generateFakeHotels(count = 100): IHotel[] {
  const hotelTypes: IHotel["hotel_type"][] = ["first", "second", "third"];
  const hotelStatuses: IHotel["status"][] = ["working", "stopped"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    region: faker.location.city(),
    name: faker.company.name(),
    district: faker.location.county(),
    contract_number: faker.number.int({ min: 10000, max: 99999 }),
    hotel_type: faker.helpers.arrayElement(hotelTypes),
    stars: faker.number.int({ min: 1, max: 5 }),
    status: faker.helpers.arrayElement(hotelStatuses),
    inn: faker.number.int({ min: 100000000, max: 999999999 }),
    number_of_rooms: faker.number.int({ min: 20, max: 200 }),
    koek: faker.number.int({ min: 40, max: 400 }),
    address: faker.location.streetAddress(),
    phone_number: faker.phone.number({ style: "international" })
  }));
}

// keep one dataset stable during runtime
const FAKE_HOTELS = generateFakeHotels(100);

export async function fetchHotels(page = 1, page_size = 10) {
  await wait(500); // simulate latency

  const start = (page - 1) * page_size;
  const end = start + page_size;

  const paginated = FAKE_HOTELS.slice(start, end);

  return {
    count: FAKE_HOTELS.length,
    page,
    page_size,
    results: paginated
  };
  // const { data } = await Api<IResponse<IHotel>>(endpoints.hotels.get);
  // return data;
}

export function useFetchHotels(page?: number, page_size?: number) {
  return useQuery({
    queryKey: ["hotels"],
    queryFn: () => fetchHotels(page, page_size),
    placeholderData: keepPreviousData
  });
}
