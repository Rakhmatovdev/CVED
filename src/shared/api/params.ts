import { parseAsInteger, parseAsString } from "nuqs";

import { defaultPaginationParams } from "@/shared/config";

export const initialPaginationParams = {
  page: parseAsInteger.withDefault(defaultPaginationParams.page),
  page_size: parseAsInteger.withDefault(defaultPaginationParams.page_size)
};

export const initialSearchParams = {
  search: parseAsString.withDefault("")
};

export const initialSortParams = {
  order: parseAsString
};
