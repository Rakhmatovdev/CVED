import React from "react";
import {
  CommonDataTable,
  CommonDataTableProps,
  QueryParams
} from "./CommonDataTable";
import { CommonFilter } from "./CommonFilter";
import { CommonPageWrapper } from "./CommonPageWrapper";

interface CommonPageProps<T extends { id: number }, P extends QueryParams>
  extends React.PropsWithChildren {
  i18nTitle?: string;
  filter?: React.ReactNode;
  dataTableProps?: CommonDataTableProps<T, P>;
}

const CommonPage = <T extends { id: number }, P extends QueryParams>({
  i18nTitle,
  dataTableProps,
  filter,
  children
}: CommonPageProps<T, P>) => {
  return (
    <CommonPageWrapper i18nTitle={i18nTitle}>
      {filter && <CommonFilter filter={filter} />}
      <CommonDataTable<T, P>
        {...(dataTableProps as CommonDataTableProps<T, P>)}
      />
      {children}
    </CommonPageWrapper>
  );
};

export default CommonPage;
