import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import { useQuery } from "@tanstack/react-query";
import { Checkbox, Flex, TableColumnsType, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import ImmigrantService from "@/pages/immigrants/service";
import { country, DataType, DataType2, triple } from "@/pages/immigrants/type";
import { Flag } from "@/shared/ui/Flag.tsx";
import HTable from "@/shared/ui/form-elements/HTable";
import DotsIcon from "@/shared/ui/icons/DotsIcon.tsx";
import { formatDate } from "@/utils/formatDate.ts";
import Row from "@/shared/ui/Row.tsx";

const NoIdentifyDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: u_data, isLoading: uLoading } = useQuery({
    queryKey: ["unidentify immigrant-10", id],
    queryFn: () => ImmigrantService.getUnidentify(id ?? ""),
    enabled: !!id
  });

  const { data: immigrant, isLoading: immigrantPending } = useQuery({
    queryKey: ["unidentify immigrant-user", id],
    queryFn: () => ImmigrantService.getUnidentifyByid(id ?? ""),
    enabled: !!id
  });
  const columns: TableColumnsType<DataType> = [
    {
      title: (
        <p className="text-center text-xs font-medium   text-[#6B7280]">
          {t("table.n")}
        </p>
      ),
      render: (__, _, index) => <p className="text-center">{index + 1}</p>,
      width: 50
    },
    {
      title: <p className="table_th">{t("table.fio")}</p>,
      dataIndex: "first_name_in_passport",
      width: 255,
      render: (_, record) => (
        <div className="hover:underline cursor-pointer hover:text-blue-500 ">
          {record?.first_name_in_passport} {record?.last_name_in_passport}{" "}
          {record?.middle_name_in_passport}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.citizenship")}</p>,
      dataIndex: "[citizenship].name",
      width: 250,
      render: (__, record) => (
        <div className="flex gap-2 items-center">
          <div
            className={`fi fi-${record?.citizenship?.alpha2_code?.toLocaleLowerCase()}`}
          />
          <p className="text-sm line-clamp-1 w-[200px]">
            {record?.citizenship?.name}
          </p>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.passport")}</p>,
      dataIndex: "passport_number",
      width: 150
    },
    {
      title: <p className="table_th">{t("table.date-of-issue")}</p>,
      dataIndex: "birth_date",
      width: 150
    },
    {
      title: <p className="text-center table_th">{t("table.selected")}</p>,
      dataIndex: "choice",
      width: 100,
      render: (_) => (
        <div className="text-center">
          <Checkbox />
        </div>
      )
    },
    {
      title: "",
      dataIndex: "edit&delete",
      width: 80,
      render: (_) => (
        <div className="text-center dark:text-white">
          {/*<Dropdown menu={{ items }} trigger={["click"]}>*/}
          {/*  <a onClick={() => handleChange(record?.id, record)}>*/}
          {/*    <DotsIcon*/}
          {/*      className={*/}
          {/*        "fill-black dark:text-white ant-components-close rounded-md"*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </a>*/}
          {/*</Dropdown>*/}
          <DotsIcon />
          className=
          {"fill-black dark:text-white ant-components-close rounded-md"}
        </div>
      )
    }
  ];
  const columns2: TableColumnsType<DataType2> = [
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
      dataIndex: "reg_date",
      width: 167,
      render: (text) => {
        return (
          <Flex gap="8px" align="center">
            <div className="text-sm">
              {formatDate(text,{time:true})}
            </div>
          </Flex>
        );
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
      width: 200,
      render: (value: triple) => <p>{value?.name ?? "-"}</p>
    },
    {
      title: <p className="table_th">{t("table.border_crossing")}</p>,
      dataIndex: "transport_type",
      render: (value: triple) => <p>{value?.name ?? "-"}</p>,
      width: 200
    },
    {
      title: <p className="table_th">{t("table.trip_purpose")}</p>,
      dataIndex: "trip_purpose",
      render: (value: triple) => <p>{value?.name ?? "-"}</p>,
      width: 200
    },
    {
      title: <p className="table_th">{t("table.stay_count")}</p>,
      dataIndex: "stay_country",
      render: (value: triple) => <p>{value?.name ?? "-"}</p>,
      width: 200
    }
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    filters,
    sorter,
    extra
  ) => {
    console.log("params", filters, sorter, extra);
  };

  const onChange2: TableProps<DataType2>["onChange"] = (
    filters,
    sorter,
    extra
  ) => {
    console.log("params", filters, sorter, extra);
  };

  const myClick = () => {
    navigate("/immigrants/unidentify");
  };
  const unidentify = u_data?.results;
  const data: DataType[] = immigrant?.passport_data;
  return (
    <Flex
      vertical
      className="bg-[#F8FAFC] h-full w-full p-[24px] dark:bg-dbody"
    >
      <Flex vertical className="">
        <div
          onClick={myClick}
          className="mb-4 flex items-center cursor-pointer"
        >
          <ArrowLeftOutlined className="text-[#3276FF] w-5 h-5 dark:text-dvalue" />
          <p className="text-sm cursor-pointer dark:text-dvalue">
            {t("table.back")}
          </p>
        </div>
      </Flex>
      <Flex className="grid grid-cols-5 gap-4 h-full">
        <Flex className="flex flex-col col-span-3 gap-4 h-full">
          <Flex className=" p-6 space-y-4 flex-1 bg-[#FFF]  flex flex-col rounded-2xl my-border dark:bg-[#2B3048] dark:border-[#383E58]">
            <div className="text-[#1F2937] text-[24px] font-[600] leading-[30px] dark:text-white">
              {t("table.all_passports")}
            </div>
            <HTable<DataType>
              tableLayout="fixed"
              loading={immigrantPending}
              className="table-scroll hf-table"
              pagination={false}
              bordered
              rowKey={(record) => record?.id}
              scroll={{ x: "max-content", y: 200 }}
              columns={columns}
              dataSource={data}
              onChange={onChange}
            />
          </Flex>
          <Flex className="p-6 space-y-4  flex-1 my-border  dark:border-dborder  bg-white flex flex-col  rounded-2xl overflow-hidden dark:bg-dcontent">
            <div className="text-secondary dark:text-dvalue    text-[24px] font-[700] leading-[30px]">
              {t("table.border_history")}
            </div>
            <HTable<DataType2>
              rowKey={(record) => record.id}
              tableLayout="fixed"
              loading={uLoading}
              columns={columns2}
              bordered
              // scroll={{ y: "300px" }}
              className="w-full text-sm  ht-arm h-[200px]  overflow-y-scroll  scroll-none"
              dataSource={unidentify}
              pagination={false}
              onChange={onChange2}
            />
          </Flex>
        </Flex>

        {immigrantPending ? (
          <p>Loading...</p>
        ) : (
          <Flex className="col-span-2  my-border dark:border-dborder 2xl:space-y-6 xl:space-y-3 p-6 dark:bg-dcontent bg-white flex flex-col  px-6 py-9  rounded-2xl overflow-hidden">
            <div className="flex justify-center 2xl:space-y-6 xl:space-y-3 items-center flex-col">
              <div
                className={
                  "w-[160px] h-[160px] my-border dark:border-dborder rounded-xl overflow-hidden"
                }
              >
                <img
                  src={immigrant?.photo}
                  alt="empty"
                  className="w-full h-full object-cover"
                  style={{
                    backgroundPosition: "-56.034px 0px",
                    backgroundSize: "170.668% 113.75%"
                  }}
                />
              </div>
              <div className="2xl:space-y-2 xl:space-y-1">
                <div className="text-[#1F2937] dark:text-dvalue  text-center  xl:text-base 2xl:text-[24px] font-[600] leading-[30px]">
                  {immigrant?.full_name ?? "-"}
                </div>
                {/*<div className="text-[#2563EB] hover:underline text-center font-medium leading-[30px]">*/}
                {/*    {unidentify?.email ?? "-"}*/}
                {/*</div>*/}
              </div>
            </div>

            <div className="h-px w-full bg-[#E5E7EB] dark:bg-dborder" />
            <div className="2xl:space-y-2 xl:space-y-1">
              <p className="text-[18px] font-semibold dark:text-dvalue">
                {t("table.passport_detail")}
              </p>
              <Row label={t("table.citizenship")} dir={"row"} value={immigrant?.citizenship?.name}/>
              <Row label={t("table.nationality")} dir={"row"} value={immigrant?.nationality}/>
              <Row label={t("inputs.gender")} dir={"row"} value={immigrant?.gender ? t("inputs.female") : t("inputs.male")}/>
              <Row label={t("table.birthday")} dir={"row"} value={formatDate(immigrant?.birth_date)}/>

            </div>
            <div className="h-px w-full bg-[#E5E7EB] dark:bg-dborder" />
            <div className="space-y-2">
              <p className="text-[18px] font-semibold dark:text-white ">
                {t("table.immigrant_of")}
              </p>
              <Row label={t("table.immigrant_id")} dir={"row"} value={immigrant?.current_document}/>
            </div>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default NoIdentifyDetail;
