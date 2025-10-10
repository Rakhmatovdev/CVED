import type { ColumnsType } from "antd/es/table/interface";

export type IStrictTableColumns<T> = Omit<ColumnsType<T>[number], "dataIndex"> &
  {
    dataIndex: keyof T;
  }[];
