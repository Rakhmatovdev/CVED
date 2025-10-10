export interface IResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IPaginationParams {
  page?: number;
  page_size?: number;
}
