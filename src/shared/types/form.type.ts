export interface PaginationData {
  current: number;
  pageSize: number;
}

export interface TableParams {
  pagination: PaginationData;
  filters?: Record<string, any>;
  sortOrder?: "ascend" | "descend";
  sortField?: string;
}

export interface CitizenshipData {
  id?: number;
  name?: string;
  label?: string;
  alpha_code?: string;
  alpha2_code?: string;
  sp_id?: string;
  code?: string;
  value?: string;
  title?: string;
}

export interface ArmValues {
  citizenship?: CitizenshipData;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  passport_number?: string;
  birth_date?: string;
  arrival_date_from_start?: string;
  arrival_date_from_end?: string;
  arrival_date_from?: string;
  arrival_date_to?: string;
  start_date?: string;
  end_date?: string;
  search?: string;
  role?: string;
  password?: string;
  password2?: string;
  district?: string;
  region?: string;
  phone?: string;
  username?: string;
  old_password?: string;
  birthday?: string;
  crossing_point?: {
    value?: string;
    label?: string;
  };
}
