export interface IPrivilege {
  id: number;
  deleted: string | null;
  deleted_by_cascade: boolean;
  created_at: string;
  updated_at: string;
  date: string;
  code: string;
  is_active: boolean;
  used_at: string | null;
  created_by: number;
  updated_by: number;
  used_by: number;
}
