import { parseAsInteger, useQueryStates } from "nuqs";

export const usePagination = () => {
  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    page_size: parseAsInteger.withDefault(10)
  });

  const { page, page_size } = params;
  const paginationIndex = (page - 1) * page_size;

  return {
    page,
    pageSize: page_size,
    setPage: (page: number) => setParams({ ...params, page }),
    setPageSize: (page_size: number) => setParams({ ...params, page_size }),
    paginationParams: { page, page_size },
    paginationIndex
  };
};
