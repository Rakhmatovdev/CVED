import { Flex, TableColumnType } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useCommonFetchTableData } from "@/shared/hooks/use-common-fetch-table-data";
import { HTable } from "@/shared/ui/form-elements";

import Button from "../Button";
import ExportExcelButton from "../ExportExcelButton";
import PlusIcon from "../icons/Pluse";
import { SearchInput, SearchInputProps } from "../SearchInput";

export interface CommonDataTableProps<T extends object, P extends object> {
  fetchApiUrl: string;
  columns: TableColumnType<T>[];
  createButton?: CreateButtonProps;
  importUrl?: string;
  searchInputProps?: Omit<SearchInputProps<P>, "control">; // ✅ no need to pass control manually
}

export interface CreateButtonProps {
  i18nText: string;
  link: string;
  // label: string;
}

export interface ExportButtonProps {
  apiUrl: string;
  fileName?: string;
}

export interface QueryParams {
  page: number;
  page_size: number;
  search?: string;
  order?: string;
}

export function CommonDataTable<
  T extends { id: number },
  P extends QueryParams
>({
  columns,
  fetchApiUrl,
  createButton,
  importUrl,
  searchInputProps
}: CommonDataTableProps<T, P>) {
  const { t } = useTranslation();
  const {
    control,
    params,
    // setParams,
    // reset,
    // refetch,
    handleTableChange,
    loading,
    total,
    dataSource
  } = useCommonFetchTableData<T>(fetchApiUrl);

  return (
    <div className="p-4 border bg-white rounded-xl dark:bg-[#2B3048] dark:border-[#3A405A] transition">
      <Flex
        justify={searchInputProps ? "space-between" : "flex-end"}
        align="center"
        className="mb-4"
      >
        {searchInputProps && (
          <SearchInput control={control} {...searchInputProps} />
        )}
        <Flex gap={8}>
          {createButton && (
            <Link to={createButton.link}>
              <Button variant={"phantom"}>
                <PlusIcon />
                {t(createButton.i18nText || "buttons.add")}
              </Button>
            </Link>
          )}
          {importUrl && (
            <ExportExcelButton
              fileName="holidays"
              variant={"phantom"}
              endpoint={importUrl}
              disabled={!dataSource?.length}
            />
          )}
        </Flex>
      </Flex>
      <HTable<T>
        className="!text-[8px] scroll-smooth h-full table-scrollinga ht-arm"
        columns={columns}
        bordered
        rowKey={(record) => record.id}
        dataSource={dataSource}
        loading={loading}
        total={total}
        tableParams={{
          pagination: { page: params.page, pageSize: params.page_size }
        }}
        customPagination={true}
        // onRow={(record) => ({
        //     className:
        //         params.visa_request_id === record.id
        //             ? "bg-blue-50 dark:bg-blue-900/20"
        //             : "hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer",
        //     onClick: () => handleRowClick(record)
        // })}
        onChange={handleTableChange}
      />
    </div>
  );
}
