import { faker } from "@faker-js/faker";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { IGuestHistory } from "@/entities/guest-history/types.ts";
import i18n from "@/i18n";
import { wait } from "@/shared/lib/utils.ts";

// Country data with proper alpha codes
const countryData = {
  "United States": {
    ru: "Соединенные Штаты",
    alpha2: "US",
    alpha3: "USA"
  },
  Russia: {
    ru: "Россия",
    alpha2: "RU",
    alpha3: "RUS"
  },
  China: {
    ru: "Китай",
    alpha2: "CN",
    alpha3: "CHN"
  },
  Germany: {
    ru: "Германия",
    alpha2: "DE",
    alpha3: "DEU"
  },
  France: {
    ru: "Франция",
    alpha2: "FR",
    alpha3: "FRA"
  },
  "United Kingdom": {
    ru: "Великобритания",
    alpha2: "GB",
    alpha3: "GBR"
  },
  Japan: {
    ru: "Япония",
    alpha2: "JP",
    alpha3: "JPN"
  },
  Italy: {
    ru: "Италия",
    alpha2: "IT",
    alpha3: "ITA"
  },
  Spain: {
    ru: "Испания",
    alpha2: "ES",
    alpha3: "ESP"
  },
  Canada: {
    ru: "Канада",
    alpha2: "CA",
    alpha3: "CAN"
  },
  Australia: {
    ru: "Австралия",
    alpha2: "AU",
    alpha3: "AUS"
  },
  Brazil: {
    ru: "Бразилия",
    alpha2: "BR",
    alpha3: "BRA"
  },
  India: {
    ru: "Индия",
    alpha2: "IN",
    alpha3: "IND"
  },
  "South Korea": {
    ru: "Южная Корея",
    alpha2: "KR",
    alpha3: "KOR"
  },
  Turkey: {
    ru: "Турция",
    alpha2: "TR",
    alpha3: "TUR"
  },
  Kazakhstan: {
    ru: "Казахстан",
    alpha2: "KZ",
    alpha3: "KAZ"
  },
  Uzbekistan: {
    ru: "Узбекистан",
    alpha2: "UZ",
    alpha3: "UZB"
  },
  Ukraine: {
    ru: "Украина",
    alpha2: "UA",
    alpha3: "UKR"
  },
  Belarus: {
    ru: "Беларусь",
    alpha2: "BY",
    alpha3: "BLR"
  },
  Poland: {
    ru: "Польша",
    alpha2: "PL",
    alpha3: "POL"
  },
  "Czech Republic": {
    ru: "Чехия",
    alpha2: "CZ",
    alpha3: "CZE"
  },
  Netherlands: {
    ru: "Нидерланды",
    alpha2: "NL",
    alpha3: "NLD"
  },
  Sweden: {
    ru: "Швеция",
    alpha2: "SE",
    alpha3: "SWE"
  },
  Norway: {
    ru: "Норвегия",
    alpha2: "NO",
    alpha3: "NOR"
  },
  Finland: {
    ru: "Финляндия",
    alpha2: "FI",
    alpha3: "FIN"
  }
};

export function generateFakeCitizenship() {
  // Get only the countries from our mapping
  const availableCountries = Object.keys(countryData);
  const countryEn = faker.helpers.arrayElement(availableCountries);
  const selectedCountry = countryData[countryEn as keyof typeof countryData];

  // Get localized country name based on current language
  const currentLang = i18n.language || "ru";
  const country = currentLang === "ru" ? selectedCountry.ru : countryEn;

  return {
    id: faker.number.int({ min: 1, max: 200 }),
    name: country,
    label: country,
    alpha_code: selectedCountry.alpha3,
    alpha2_code: selectedCountry.alpha2,
    value: selectedCountry.alpha2,
    title: country
  };
}

function generateFakeGuestHistory(count = 100): IGuestHistory[] {
  return Array.from({ length: count }, (_, i) => ({
    id: 2112321323 * (i + 1) + 2,
    person_id: faker.number.int({ min: 2314234, max: 2314234 + 100 }),
    fio: faker.name.fullName(),
    photo: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
    citizenship: generateFakeCitizenship(),
    hotel: "MALICHO REGENCY",
    passport: `AB${faker.number.int({ min: 1000000, max: 9999999 })}`,
    arrived: "12.01.25",
    birth_date: "12.08.25",
    status: faker.helpers.arrayElement(["Активный", "Не активный"]),
    trip_duration: faker.number.int({ min: 15, max: 100 }),
    client: {
      name: faker.name.fullName(),
      email: faker.internet.email()
    },
    checkInDate: faker.date.recent().toLocaleString(),
    amount: -Number((Math.random() * (2000000 - 100000) + 100000).toFixed(2))
  }));
}

// keep one dataset stable during runtime
const FAKE_ADMINISTRATORS = generateFakeGuestHistory(10);

export async function fetchGuestHistory(page = 1, page_size = 10) {
  await wait(10); // simulate latency

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

export function useFetchGuestHistory(page?: number, page_size?: number) {
  return useQuery({
    queryKey: ["guest-history"],
    queryFn: () => fetchGuestHistory(page, page_size),
    placeholderData: keepPreviousData
  });
}
