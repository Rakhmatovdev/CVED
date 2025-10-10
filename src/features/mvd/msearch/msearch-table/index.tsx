import { Flex, TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import { endpoints } from "@/shared/api/endpoints.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Button from "@/shared/ui/Button";
import { CountBadge } from "@/shared/ui/CountBadge";
import CustomBadge from "@/shared/ui/CustomBadge";
import ExportExcelButton from "@/shared/ui/ExportExcelButton.tsx";
import { Flag } from "@/shared/ui/Flag";
import HTable from "@/shared/ui/form-elements/HTable";
import PlusIcon from "@/shared/ui/icons/Pluse";
import { formatDate } from "@/utils/formatDate";
import { DataType } from "@/utils/types";
import ActionDropdown from "./components/ActionDropdown";

export default function MSearchTable({
  data,
  count,
  isPending,
  handleTableChange,
  tableParams,
  setShowModal
}: {
  data: any;
  count: number;
  isPending: boolean;
  handleTableChange: (pagination: any, filters: any, sorter: any) => void;
  tableParams: any;
  setShowModal: (value: boolean) => void;
}) {
  const { t } = useTranslation();

  const columns: TableColumnsType<DataType> = [
    {
      title: <p className="text-center">{t("table.n")}</p>,
      render: (_: unknown, __: DataType, index: number) => {
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
      render: (text, record) => (
        <Flex align="center" gap={8}>
          <Avatar>
            <AvatarImage
              src={record?.photo}
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
      title: t("table.citizenship"),
      dataIndex: "citizenship",
      width: 300,
      render: (_, record: DataType) => (
        <Flex gap={16} align="center">
          <Flag code={record?.citizenship?.alpha2_code} />
          <p className="line-clamp-1">{record?.citizenship?.name || "-"}</p>
        </Flex>
      )
    },
    {
      title: t("inputs.passport_series"),
      dataIndex: "passport_data",
      width: 200,
      render: (text) => <div className="line-clamp-1">{text ?? "-"}</div>
    },
    {
      title: t("table.birthday"),
      dataIndex: "birth_date",
      width: 200,
      render: (text) => (
        <div className="line-clamp-1">{formatDate(text) ?? "-"}</div>
      )
    },
    {
      title: t("inputs.status"),
      dataIndex: "status",
      width: 200,
      render: () => (
        <CustomBadge
          color="info"
          size="sm"
          indicator="true"
          className="rounded-full border border-blue-500/50 text-blue-500"
          indicatorColor="info"
          indicatorColorClass="rounded-full w-2 h-2 bg-blue-500/50"
        >
          Text
        </CustomBadge>
      )
    },
    {
      title: t("inputs.comment"),
      dataIndex: "comments",
      render: (text) => <div className="line-clamp-1">{text ?? "-"}</div>
    },
    {
      title: "",
      dataIndex: "status",
      fixed: "right",
      width: 50,
      render: (_, record) => <ActionDropdown id={record.id} />
    }
  ];

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-4">
        <Flex align="center" gap={16}>
          <h3 className="transition text-xl font-semibold text-primary dark:text-white ">
            {t("table.result_find")}
          </h3>
          <CountBadge count={count} />
        </Flex>
        <Flex align="center" gap={16}>
          <Button onClick={() => setShowModal(true)} variant={"phantom"}>
            <PlusIcon className={"dark:fill-white"} />
            <span className="text-secondary font-medium dark:text-white ">
              {t("statics.add_entry")}
            </span>
          </Button>
          <ExportExcelButton
            endpoint={endpoints.holidays}
            disabled={!data?.length}
            variant={"phantom"}
          />
        </Flex>
      </Flex>
      <HTable<DataType>
        key={JSON.stringify(tableParams)}
        className="!text-[8px] h-full ht-arm"
        columns={columns}
        bordered
        dataSource={data as DataType[]}
        loading={isPending}
        onChange={handleTableChange}
        customPagination={true}
        total={count}
        tableParams={tableParams}
      />
    </>
  );
}
