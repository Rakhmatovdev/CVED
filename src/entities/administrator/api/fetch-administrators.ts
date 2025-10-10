import { faker } from "@faker-js/faker";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { wait } from "@/shared/lib/utils.ts";
import type { IAdministrator } from "../types";

function generateFakeAdministrators(count = 100): IAdministrator[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    avatar: faker.image.avatar(),
    hotel: "MALICHO REGENCY",
    role: faker.name.fullName(),
    rooms: faker.number.int({ min: 1, max: 100 }),
    client: {
      name: faker.name.fullName(),
      email: faker.internet.email()
    },
    status: faker.helpers.arrayElement(["Активный", "Не активный"]),
    checkInDate: "2025-10-09",
    amount: -Number((Math.random() * (20000000 - 10000000) + 10000).toFixed(2))
  }));
}

// keep one dataset stable during runtime
const FAKE_ADMINISTRATORS = generateFakeAdministrators(100);

export async function fetchAdministrators(page = 1, page_size = 10) {
  await wait(500); // simulate latency

  const start = (page - 1) * page_size;
  const end = start + page_size;

  const paginated = FAKE_ADMINISTRATORS.slice(start, end);

  return {
    count: FAKE_ADMINISTRATORS.length,
    page,
    page_size,
    results: paginated
  };
  // const { data } = await Api<IResponse<IHotel>>(endpoints.hotels.get);
  // return data;
}

export function useFetchAdministrators(page?: number, page_size?: number) {
  return useQuery({
    queryKey: ["administrators"],
    queryFn: () => fetchAdministrators(page, page_size),
    placeholderData: keepPreviousData
  });
}
