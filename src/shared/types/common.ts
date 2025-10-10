export interface IIdName {
  id: number;
  name: string;
}

export interface ITimestamps {
  created_at: string;
  updated_at: string;
}

export interface IIdNameCode extends IIdName {
  code: string;
}
