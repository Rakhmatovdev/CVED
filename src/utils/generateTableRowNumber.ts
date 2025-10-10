export const generateTableRowNumber = (index: number, paginationData: any) => {
  const currentPage = paginationData?.page || 1;
  const pageSize = paginationData?.page_size || 10;
  return (currentPage - 1) * pageSize + index + 1;
};
