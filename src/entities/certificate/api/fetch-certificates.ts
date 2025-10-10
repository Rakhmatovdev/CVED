import { faker } from "@faker-js/faker";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { wait } from "@/shared/lib/utils.ts";
import { ICertificates } from "../types";

function generateFakeCertificates(count = 100): ICertificates[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    region: faker.helpers.arrayElement([
      "Азизхан",
      "Намангали",
      "Фарходхан",
      "Азизхан",
      "Намангали"
    ]), // Region nomi
    nationality: faker.helpers.arrayElement([
      "Названыне",
      "Названыне",
      "Хорезми",
      "Постные",
      "Фастные"
    ]), // Millat
    fullName: faker.person.fullName(),
    inn: `157512${faker.string.numeric(6)}`, // INN formatiga mos
    rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]), // Reyting 1-5 gacha
    roomCount: 15, // Xonalar soni doimiy 15
    bedCount: 15, // Yotoqxona soni doimiy 15
    passportNumber: `157512${faker.string.numeric(6)}`, // Passport raqami
    arrivalDate: "02-02-2024", // Kelish sanasi doimiy qiymat
    departureDate: "02-02-2024", // Ketish sanasi doimiy qiymat
    status: faker.helpers.arrayElement(["Приостановлено", "Работает"]), // Holatlar
    createdAt: "02-02-2024" // Yaratilgan sa
  }));
}

// keep one dataset stable during runtime
const FAKE_CERTIFICATES = generateFakeCertificates(100);

export async function fetchCertificates(page = 1, page_size = 10) {
  await wait(500); // simulate latency

  const start = (page - 1) * page_size;
  const end = start + page_size;

  const paginated = FAKE_CERTIFICATES.slice(start, end);

  return {
    count: FAKE_CERTIFICATES.length,
    page,
    page_size,
    results: paginated
  };
  // const { data } = await Api<IResponse<IHotel>>(endpoints.hotels.get);
  // return data;
}

export function useFetchCertificates(page?: number, page_size?: number) {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: () => fetchCertificates(page, page_size),
    placeholderData: keepPreviousData
  });
}
