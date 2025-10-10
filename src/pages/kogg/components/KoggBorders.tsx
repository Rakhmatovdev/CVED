import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import { useQuery } from "@tanstack/react-query";
import { Flex, TableColumnsType, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router";
import ImmigrantService from "@/pages/immigrants/service";
import {
  country,
  DataType2,
  TableParams,
  triple
} from "@/pages/immigrants/type";
import { Flag } from "@/shared/ui/Flag.tsx";
import HTable from "@/shared/ui/form-elements/HTable";
import { formatDate } from "@/utils/formatDate.ts";
import empty from "/static/user.png";

const KoggBoarders = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { bid } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: immigrant, isPending: immigrantPending } = useQuery({
    queryKey: ["immigrant2", bid],
    queryFn: () => ImmigrantService.getImmigrant(bid ?? ""),
    enabled: !!bid
  });

  const columns: TableColumnsType<DataType2> = [
    {
      title: <p className="text-center table_th">{t("table.n")}</p>,
      dataIndex: "id",
      render: (_, __, index) => <p className="text-center">{index + 1}</p>,
      width: 50
    },
    {
      title: <p className=" table_th">{t("table.country")}</p>,
      dataIndex: "direction_country",
      width: 300,
      render: (value: country) => (
        <div className="flex gap-2 text-sm items-center">
          <Flag code={value?.alpha2_code} />
          <p className={"w-[150px] line-clamp-1"}>{value.name ?? "-"}</p>
        </div>
      )
    },
    {
      title: <p className=" table_th">{t("table.date_time")}</p>,
      dataIndex: "date_time",
      width: 187,
      render: (text) => {
        return <p>{formatDate(text, { time: true })}</p>;
      }
    },
    {
      title: <p className="table_th">{t("table.kogg")}</p>,
      dataIndex: "crossing_type",
      width: 103,
      render: (text) => {
        return (
          <Flex gap="8px" align="center">
            <div
              className={`p-[6px] text-xs rounded-[6px] cursor-pointer ${
                text == "exit"
                  ? "bg-[#FECACA] hover:bg-rose-300 text-[#991B1B]"
                  : "bg-[rgba(77,210,130,0.12)] hover:bg-green-200 text-[#4DD282]"
              }`}
            >
              {text == "exit"
                ? t("table.departure")
                : (t("table.checkin") ?? "-")}
            </div>
          </Flex>
        );
      }
    },
    {
      title: <p className="table_th">{t("table.border_point")}</p>,
      dataIndex: "crossing_point",
      width: 250,
      render: (value: triple) => <p>{value?.name ?? "-"}</p>
    },
    {
      title: <p className="table_th">{t("table.border_crossing")}</p>,
      dataIndex: "transport_type",
      render: (value: triple) => <p>{value?.name ?? "-"}</p>,
      width: 250
    },
    {
      title: <p className="table_th">{t("table.trip_purpose")}</p>,
      dataIndex: "trip_purpose",
      render: (value: triple) => <p>{value?.name ?? "-"}</p>,
      width: 400
    }
    // ,
    // {
    //   title: <p className="table_th">{t("table.stay_count")}</p>,
    //   dataIndex: "stay_country",
    //   render: (value: triple) => <p>{value?.name ?? "-"}</p>,
    //   width: 200
    // }
  ];

  const onChange: TableProps<DataType2>["onChange"] = (
    filters,
    sorter,
    extra
  ) => {
    console.log("params", filters, sorter, extra);
  };

  const getInitialTableParams = (): TableParams => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("page_size") || "10", 10);

    return {
      pagination: {
        current: page,
        pageSize: pageSize
      }
    };
  };
  const [tableParams, setTableParams] = useState<TableParams>(
    getInitialTableParams()
  );

  const updateQueryParams = (pagination?: {
    current: number;
    pageSize: number;
  }) => {
    const newParams = new URLSearchParams();
    if (pagination) {
      newParams.set("page", pagination.current.toString());
      newParams.set("page_size", pagination.pageSize.toString());
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    updateQueryParams(tableParams.pagination);
  }, [tableParams]);

  useEffect(() => {
    setTableParams(getInitialTableParams());
  }, [searchParams]);

  const { data: crossing, isPending: crossingPending } = useQuery({
    queryKey: ["crossing", tableParams.pagination],
    queryFn: () => {
      const { current: page, pageSize } = tableParams.pagination;
      const rawValues = {
        page,
        page_size: pageSize
      };

      return ImmigrantService.crossingImmigrant(rawValues, bid ?? "");
    }
  });

  const myClick = () => {
    // e.preventDefault()
    navigate(`/kogg/arrived/${bid}`);
  };

  const data: DataType2[] = crossing?.results;

  return (
    <Flex
      vertical
      className="bg-lightTest h-full w-full p-[24px] dark:bg-dbody"
    >
      <Flex vertical className="">
        <div
          onClick={myClick}
          className="mb-4 flex items-center cursor-pointer"
        >
          <ArrowLeftOutlined className="text-blued w-5 h-5 dark:text-dvalue" />
          <p className="text-sm cursor-pointer dark:text-dvalue">
            {t("table.back")}
          </p>
        </div>
      </Flex>
      <Flex className="grid grid-cols-5 gap-4">
        <Flex className="flex flex-col col-span-3">
          <Flex className="p-6 space-y-4 h-full bg-white flex flex-col  rounded-2xl overflow-hidden dark:bg-dcontent">
            <div className="text-secondary dark:text-dvalue text-[24px] font-[700] leading-[30px]">
              {t("table.border_history")}
            </div>
            <HTable<DataType2>
              tableLayout="fixed"
              rowKey={(record) => record?.id}
              loading={crossingPending}
              columns={columns}
              bordered
              // scroll={{ x: "1000px", y: "1000px" }}
              className="w-full text-sm  ht-arm rounded-xl"
              // bordered
              dataSource={data}
              onChange={onChange}
              customPagination={true}
              total={crossing?.count}
              tableParams={tableParams}
            />
          </Flex>
        </Flex>

        {immigrantPending ? (
           <p>Loading...</p>
        ) : (
          <Flex className="col-span-2 2xl:space-y-6 xl:space-y-3 p-6 dark:bg-dcontent bg-white flex flex-col px-6 py-9  rounded-2xl overflow-hidden">
            <div className="flex justify-center 2xl:space-y-6 xl:space-y-3 items-center flex-col">
              <div
                className={
                  "w-[160px] h-[160px] my-border dark:border-nightSlate rounded-xl overflow-hidden"
                }
              >
                <img
                  src={immigrant?.photo ?? empty}
                  alt="empty"
                  className="w-full h-full object-cover"
                  style={{
                    backgroundPosition: "-56.034px 0px",
                    backgroundSize: "170.668% 113.75%"
                  }}
                />
              </div>
              <div className="2xl:space-y-2 xl:space-y-1">
                <div className="text-primary dark:text-dvalue  text-center  xl:text-base 2xl:text-[24px] font-[600] leading-[30px]">
                  {immigrant?.full_name ?? "-"}
                </div>
                <div className="text-bluePrimary hover:underline text-center font-medium leading-[30px]">
                  {immigrant?.email ?? "-"}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-lightGray dark:bg-dborder" />
            <div className="2xl:space-y-2 xl:space-y-1">
              <p className="text-[18px] font-semibold dark:text-dvalue">
                {t("table.passport_detail")}
              </p>

              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("inputs.passport_series")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {immigrant?.passport_data[0].passport_number ?? "-"}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("table.citizenship")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {immigrant?.passport_data[0]?.citizenship?.name ?? "-"}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("table.place_issue")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {immigrant?.passport_data[0]?.place_of_issue || "-"}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("table.date-of-issue")}
                </p>
                <p className="fonts-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {formatDate(immigrant?.passport_data[0]?.date_of_issue)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("table.expiry_date")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {formatDate(immigrant?.passport_data[0]?.valid_until)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("table.expiry_date")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {formatDate(immigrant?.passport_data[0]?.valid_until)}
                </p>
              </div>
            </div>
            <div className="h-px w-full bg-lightGray dark:bg-dborder" />
            <div className="space-y-2">
              <p className="text-[18px] font-semibold dark:text-white ">
                {t("table.immigrant_of")}
              </p>
              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("table.immigrant_id")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {immigrant?.id ?? "-"}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("breadcrumb.sphone")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {immigrant?.phone_number ?? "-"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("table.birthday")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {formatDate(immigrant?.birth_date)}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("inputs.gender")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {immigrant?.gender ? t("inputs.female") : t("inputs.male")}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("table.pinfl")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {immigrant?.pinfl ?? "-"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-lighter dark:text-dtext">
                  {t("table.place_birth")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm dark:text-dvalue">
                  {immigrant?.place_of_birth || "-"}
                </p>
              </div>
            </div>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default KoggBoarders;
