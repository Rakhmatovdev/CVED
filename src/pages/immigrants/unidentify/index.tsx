import { Flex } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CommonPageWrapper } from "@/app/layouts/page-wrapper.tsx";
import UnIdentifyFilterForm from "@/pages/immigrants/unidentify/form";
import { endpoints } from "@/shared/api/endpoints";
import { useFetchData } from "@/shared/hooks/use-fetch";
import { useFilters } from "@/shared/hooks/use-filters.tsx";
import { CommonPageTitle } from "@/shared/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar.tsx";
import { Flag } from "@/shared/ui/Flag.tsx";
import HTable from "@/shared/ui/form-elements/HTable";
import { formatDate } from "@/utils/formatDate.ts";
import { DataType } from "@/utils/types";

const NoIdentify = () => {
  const { t } = useTranslation();

  const formMethods = useForm();

  const { filters, resetFilters } = useFilters(formMethods, {
    arrival_date_from: "date",
    arrival_date_to: "date",
    full_name: "string",
    birth_date: "date",
    citizenship: "number",
    crossing_point: "number"
  });

  const { data, tableParams, isPending, onChangeTable } = useFetchData<
    { results: DataType[]; count: number },
    typeof filters
  >({
    url: endpoints.immigrants.unidentify,
    filters,
    refetchKeys: ["immigrants-un-identify"]
  });

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: <p className="text-center">{t("table.n")}</p>,
        key: "index",
        render: (_: unknown, __: DataType, index: number) => {
          const currentPage = tableParams.pagination?.current || 1;
          const pageSize = tableParams.pagination?.pageSize || 10;
          const rowNumber = (currentPage - 1) * pageSize + index + 1;
          return <p className="text-center">{rowNumber}</p>;
        },
        width: 75
      },
      {
        title: t("table.fio"),
        dataIndex: "full_name",
        key: "full_name",
        width: 300,
        sorter: (a, b) => a.full_name.localeCompare(b.full_name),
        render: (text: string, record: DataType) => (
          <Link to={`${record?.id}`} className="w-full">
            <div className="cursor-pointer  gap-2  flex items-center ">
              <Avatar>
                <AvatarImage
                  src={record?.photo}
                  alt="User"
                  className={"object-cover"}
                />
                <AvatarFallback>
                  {text?.split(" ")[0].slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="line-clamp-1 w-60">{text ? text : "No name"}</div>
            </div>
          </Link>
        )
      },
      {
        title: t("table.birthday"),
        dataIndex: "birth_date",
        key: "birth_date",
        width: 150,
        render: (text: string) => <div>{formatDate(text)}</div>
      },
      {
        title: t("table.citizenship"),
        dataIndex: "citizenship",
        key: "citizenship",
        width: 300,
        render: (_, record: DataType) => (
          <div className="flex gap-2 items-center">
            <Flag code={record?.citizenship?.alpha2_code} />
            <p className="text-sm line-clamp-1">
              {record?.citizenship?.name || "-"}
            </p>
          </div>
        )
      },
      {
        title: t("table.nationality"),
        dataIndex: "nationality",
        key: "nationality",
        width: 200,
        render: (text: string) => (
          <div className="line-clamp-1 ">{text ?? "-"}</div>
        )
      },
      {
        title: t("inputs.gender"),
        dataIndex: "gender",
        key: "gender",
        width: 150,
        render: (text: string) => (
          <div className="text-email line-clamp-1">
            {text ? t("inputs.female") : t("inputs.male")}
          </div>
        )
      },
      {
        title: t("table.cved"),
        dataIndex: "last_crossing_type",
        key: "last_crossing_type",
        width: 100,
        render: (text: string) => (
          <Flex gap="8px" align="center">
            {text === "exit" ? (
              <div className="p-[6px] rounded-[6px] cursor-pointer bg-[#FECACA] hover:bg-rose-300 text-[#991B1B]">
                {t("table.departure")}
              </div>
            ) : text === "entry" ? (
              <div className="p-[6px] rounded-[6px] cursor-pointer bg-[rgba(77,210,130,0.12)] hover:bg-green-200 text-[#4DD282]">
                {t("table.checkin")}
              </div>
            ) : (
              "-"
            )}
          </Flex>
        )
      }
    ],
    [t]
  );

  return (
    <CommonPageWrapper>
      <div>
        <CommonPageTitle>{t("breadcrumb.immigrants")}</CommonPageTitle>
        <UnIdentifyFilterForm
          control={formMethods.control}
          onClear={resetFilters}
        />
      </div>
      <div className="mt-4 transition px-6 pt-6 flex-1 bg-white my-border rounded-2xl flex-col dark:border-[#3A405A] dark:bg-[#2B3048]">
        <HTable<DataType>
          key={JSON.stringify(tableParams)}
          className="!text-[8px] max-w-full w-full ht-arm"
          columns={columns}
          bordered
          dataSource={data?.results}
          loading={isPending}
          onChange={onChangeTable}
          customPagination={true}
          total={data?.count}
          tableParams={tableParams}
        />
      </div>
    </CommonPageWrapper>
  );
};
export default NoIdentify;
