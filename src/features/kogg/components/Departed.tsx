import { Flex, TableColumnsType } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar.tsx";
import { Flag } from "@/shared/ui/Flag.tsx";
import HTable from "@/shared/ui/form-elements/HTable";
import { formatDate } from "@/utils/formatDate.ts";

const Departed = ({
  data,
  tableParams,
  handleTableChange,
  isPending,
  count
}: {
  data: any[];
  tableParams: any;
  handleTableChange: (pagination: any, filters: any, sorter: any) => void;
  isPending: boolean;
  count: number;
}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onTableRow = (record: any) => {
    navigate("departed/" + record?.passport?.immigrant_id);
  };

  const columns: TableColumnsType<any> = useMemo(
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
        render: (text: string, record) => (
          <Flex align="center" gap={8}>
            <Avatar>
              <AvatarImage
                src={record?.passport?.photo}
                alt="User"
                className={"object-cover"}
              />
              <AvatarFallback>{text?.split(" ")[0].slice(0, 1)}</AvatarFallback>
            </Avatar>
            <p className="line-clamp-1 w-60 font-medium">{text ?? "-"}</p>
          </Flex>
        )
      },
      {
        title: t("table.arrival"),
        dataIndex: "date_time",
        width: 200,
        render: (text) => <div>{formatDate(text, { time: true })}</div>
      },

      {
        title: t("table.citizenship"),
        dataIndex: ["passport", "citizenship"],
        width: 300,
        render: (text) => (
          <div className="flex gap-2 items-center">
            <Flag code={text?.alpha2_code} />
            <p className="text-sm line-clamp-1"> {text?.name || "-"}</p>
          </div>
        )
      },
      {
        title: t("inputs.passport_series"),
        dataIndex: ["passport", "passport_number"],
        width: 200,
        render: (text) => <div className="line-clamp-1">{text ?? "-"}</div>
      },
      {
        title: t("table.birthday"),
        dataIndex: ["passport", "birth_date"],
        width: 150,
        render: (text) => <div>{formatDate(text)}</div>,
        sorter: {
          compare: (a, b) =>
            a?.passport?.birth_date.localeCompare(b?.passport?.birth_date),
          multiple: 1
        }
      }
    ],
    [t]
  );

  return (
    <HTable<any>
      loading={isPending}
      key={JSON.stringify(tableParams)}
      rowKey={(record) => record.id}
      bordered
      columns={columns}
      className={"ht-arm"}
      dataSource={data as any[]}
      onChange={handleTableChange}
      customPagination={true}
      total={count}
      tableParams={tableParams}
      onRow={(record) => ({
        onClick: () => onTableRow(record),
        style: { cursor: "pointer" }
      })}
    />
  );
};

export default Departed;
