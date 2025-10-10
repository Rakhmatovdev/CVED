import { TableColumnsType } from "antd";
import { useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";
import CustomBadge from "@/shared/ui/CustomBadge";
import { Flag } from "@/shared/ui/Flag";
import { HTable } from "@/shared/ui/form-elements";
import { formatDate } from "@/utils/formatDate.ts";

export default function LarrivedTable({
  tableParams,
  data,
  isPending,
  handleTableChange,
  count
}: any) {
  const { t } = useTranslation();
  const [_, setImmigrantId] = useQueryState("immigrant_id", {
    defaultValue: ""
  });

  const columns: TableColumnsType<any> = [
    {
      title: <p className="text-center">{t("table.n")}</p>,
      render: (_: unknown, __: any, index: number) => {
        const currentPage = tableParams.pagination?.current || 1;
        const pageSize = tableParams.pagination?.pageSize || 10;
        const rowNumber = (currentPage - 1) * pageSize + index + 1;
        return <p className="text-center">{rowNumber}</p>;
      },
      width: 75
    },
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
      width: 100
    },
    {
      title: t("table.fio"),
      dataIndex: "full_name",
      key: "full_name",
      width: 300,
      render: (text) => <p className="line-clamp-1">{text ?? "-"}</p>
    },
    {
      title: t("table.citizenship"),
      dataIndex: "citizenship",
      width: 300,
      render: (_, record) => (
        <div className="gap-1 flex items-center">
          <Flag code={record?.citizenship?.alpha2_code} />
          <p className="line-clamp-1">{record?.citizenship?.name ?? "-"}</p>
        </div>
      )
    },
    {
      title: t("inputs.passport_series"),
      dataIndex: "passport_data",
      width: 200,
      render: (text) => <p className="line-clamp-1">{text ?? "-"}</p>
    },
    {
      title: t("table.birthday"),
      dataIndex: "birth_date",
      width: 200,
      render: (text) => <p>{formatDate(text)}</p>
    },
    {
      title: t("inputs.status"),
      dataIndex: "status",
      width: 200,
      render: () => <CustomBadge>{t("Комфорт")}</CustomBadge>
    },
    {
      title: t("inputs.comment"),
      dataIndex: "comments",
      width: 300,
      ellipsis: true
    }
  ];

  return (
    <HTable<any>
      key={JSON.stringify(tableParams)}
      className="!text-[8px] mt-2 h-full ht-arm"
      columns={columns}
      bordered
      rowKey={(record) => record.id}
      dataSource={data as any[]}
      loading={isPending}
      onChange={handleTableChange}
      customPagination={true}
      total={count}
      tableParams={tableParams}
      onRow={(record) => ({
        onClick: () => {
          setImmigrantId(record.id);
        },
        className: "cursor-pointer"
      })}
    />
  );
}
