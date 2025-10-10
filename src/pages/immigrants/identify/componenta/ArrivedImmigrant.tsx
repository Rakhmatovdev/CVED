import { Flex } from "antd";
import { ColumnsType } from "antd/es/table";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Button from "@/shared/ui/Button.tsx";
import CustomBadge from "@/shared/ui/CustomBadge";
import { Flag } from "@/shared/ui/Flag";
import { HFInput } from "@/shared/ui/form-elements";
import HTable from "@/shared/ui/form-elements/HTable";
import PlusIcon from "@/shared/ui/icons/Pluse.tsx";
import SearchI from "@/shared/ui/icons/search/SearchI";
import { formatDate } from "@/utils/formatDate.ts";
import { DataType } from "@/utils/types";

export default function ArrivedImmigrant({
  data,
  isFetching,
  tableParams,
  onChangeTable,
  control
}: any) {
  const { t } = useTranslation();

  const [_, setCreate] = useQueryState("create_arrived", {
    defaultValue: "false"
  });

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: <p className="text-center">{t("table.n")}</p>,
        key: "index",
        render: (_, __, index: number) => {
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
          <Link to={`${record?.id}`} className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                className={"object-cover"}
                src={record?.photo}
                alt="User"
              />
              <AvatarFallback>{text?.split(" ")[0].slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="line-clamp-1 w-60 font-medium">{text ?? "-"}</span>
          </Link>
        )
      },
      {
        title: t("table.birthday"),
        dataIndex: "birth_date",
        key: "birth_date",
        width: 150,
        render: (text: string) => <p>{formatDate(text)}</p>
      },
      {
        title: t("table.citizenship"),
        dataIndex: "citizenship",
        key: "citizenship",
        width: 300,
        render: (_, record: DataType) => (
          <Flex gap="8px" align="center">
            <Flag code={record?.citizenship?.alpha2_code} />
            <p className="text-sm line-clamp-1">
              {record?.citizenship?.name ?? "-"}
            </p>
          </Flex>
        )
      },
      {
        title: t("table.nationality"),
        dataIndex: "nationality",
        key: "nationality",
        width: 200,
        render: (text: string) => (
          <span className="line-clamp-1 ">{text ?? "-"}</span>
        )
      },
      {
        title: t("table.immigrant_id"),
        dataIndex: "passport_data",
        key: "passport_number",
        width: 135
      },
      {
        title: t("breadcrumb.sphone"),
        dataIndex: "phone_number",
        key: "phone_number",
        render: (text: string | undefined) => {
          if (!text) return "-";
          const formattedText = text.startsWith("+") ? text : `+${text}`;
          return <div className="line-clamp-1">{formattedText}</div>;
        },
        width: 205
      },
      {
        title: t("inputs.gender"),
        dataIndex: "gender",
        key: "gender",
        width: 150,
        render: (text: string) => (
          <span className="text-email line-clamp-1">
            {text ? t("inputs.female") : t("inputs.male")}
          </span>
        )
      },
      // {
      //   title: t("table.email"),
      //   dataIndex: "email",
      //   key: "email",
      //   width: 250
      // },
      {
        title: t("table.kogg"),
        dataIndex: "last_crossing_type",
        key: "last_crossing_type",
        width: 100,
        render: (text: string) => (
          <CustomBadge
            transparent
            variant={text === "entry" ? "info" : "destructive"}
          >
            {text === "entry" ? t("table.checkin") : t("table.departure")}
          </CustomBadge>
        )
      }
    ],
    [t]
  );

  return (
    <div className="space-y-4">
      <Flex gap={8} align="center" justify="space-between">
        <HFInput
          control={control}
          name="search"
          prefix={<SearchI />}
          style={{ width: 400 }}
        />
        <Button onClick={() => setCreate("true")} variant={"phantom"}>
          <PlusIcon />
          <span> {t("buttons.add")}</span>
        </Button>
      </Flex>

      <HTable<DataType>
        key={JSON.stringify(tableParams)}
        columns={columns}
        bordered
        rowKey={(record) => record.id}
        className={"ht-arm"}
        dataSource={data?.results as DataType[]}
        loading={isFetching}
        onChange={onChangeTable}
        customPagination={true}
        total={data?.count || 0}
        tableParams={tableParams}
      />
    </div>
  );
}
