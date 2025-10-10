import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Checkbox,
  Dropdown,
  Flex,
  MenuProps,
  Modal,
  notification,
  TableColumnsType,
  TableProps
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import UpdateModal from "@/pages/immigrants/identify/modal/UpdateModal.tsx"; //refer
import ImmigrantService from "@/pages/immigrants/service";
import { country, DataType, DataType2, triple } from "@/pages/immigrants/type";
import { Flag } from "@/shared/ui/Flag.tsx";
import HTable from "@/shared/ui/form-elements/HTable.tsx";
import DotsIcon from "@/shared/ui/icons/DotsIcon.tsx";
import PencilIcon from "@/shared/ui/icons/PencilIcon.tsx";
import TrashIcon from "@/shared/ui/icons/TrushIcon.tsx";
import { formatDate } from "@/utils/formatDate.ts";
import Row from "@/shared/ui/Row.tsx";

type AttachVariables = { id: string | number; pid: string | number };

const KoggDetail = () => {
  const navigate = useNavigate();

  const [update, setUpdate] = useState(false);
  const [onliData, setOnliData] = useState({});
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    isSuccess
  } = useMutation<void, Error, AttachVariables>({
    mutationFn: ({ id, pid }) => ImmigrantService.cancelAttachment({ id, pid }),
    onSuccess: () => {
     
      notification.success({
        message: "",
        description: t("notification.arm_delete"),
        duration: 2,
        placement: "topRight",
        className: "notification"
      });
      navigate("kogg");
    },
    onError: () => {
      notification.error({
        message: "Ошибка",
        description: t("errors.arm_delete"),
        duration: 2,
        placement: "topRight",
        className: "notification"
      });
    }
  });
  const {
    data: immigrant,
    isPending: immigrantPending,
    refetch: refetchImmigrant
  } = useQuery({
    queryKey: ["immigrant2", id, isSuccess],
    queryFn: () => ImmigrantService.getImmigrant(id ?? ""),
    enabled: !!id
  });

  const [passData, setPassData] = useState({
    id: immigrant?.passport_data[0]?.id,
    passport_number: immigrant?.passport_data[0]?.passport_number,
    first_name: immigrant?.passport_data[0]?.first_name_in_passport,
    last_name: immigrant?.passport_data[0]?.last_name_in_passport,
    middle_name: immigrant?.passport_data[0]?.middle_name_in_passport,
    citizenship: {
      name: immigrant?.passport_data[0]?.citizenship?.name,
      label: immigrant?.passport_data[0]?.citizenship?.name,
      id: immigrant?.passport_data[0]?.citizenship?.id,
      alpha2_code: immigrant?.passport_data[0]?.citizenship?.alpha2_code
    },
    full_name: immigrant?.full_name,
    immigrant_id: immigrant?.passport_data[0]?.immigrant_id,
    passport_back_side_photo:
      immigrant?.passport_data[0]?.passport_back_side_photo,
    passport_front_side_photo:
      immigrant?.passport_data[0]?.passport_front_side_photo,
    birth_date: immigrant?.passport_data[0]?.birth_date,
    place_of_issue: immigrant?.passport_data[0]?.place_of_issue,
    place_of_birth: immigrant?.passport_data[0]?.place_of_birth,
    date_of_issue: immigrant?.passport_data[0]?.date_of_issue,
    valid_until: immigrant?.passport_data[0]?.valid_until,
    photo: immigrant?.passport_data[0]?.photo
  });

  const handleUpdate = (record: any) => {
    setPassData({
      id: record?.id,
      passport_number: record?.passport_number,
      first_name: record?.first_name_in_passport,
      last_name: record?.last_name_in_passport,
      middle_name: record?.middle_name_in_passport,
      full_name: record?.full_name,
      citizenship: {
        name: record?.citizenship?.name,
        label: record?.citizenship?.name,
        id: record?.citizenship?.id,
        alpha2_code: record?.citizenship?.alpha2_code
      },
      place_of_issue: record?.place_of_issue,
      date_of_issue: record?.date_of_issue,
      valid_until: record?.valid_until,
      place_of_birth: record?.place_of_birth,
      birth_date: record?.birth_date,
      immigrant_id: record?.immigrant_id,
      passport_back_side_photo: record?.passport_back_side_photo,
      passport_front_side_photo: record?.passport_front_side_photo,
      photo: record?.photo
    });
  };
  console.log(passData);

  const handleCheckboxChange = (key: string | number, checked: boolean) => {
    console.log(`id: ${checked}, pid: ${key}`);
    // }
  };

  const handleChange = ( record: any) => {
    setOnliData(record);
  };



  const items: MenuProps["items"] = [
    {
      label: (
        <div
          className="flex items-center gap-2 !hover:text-secondary"
          onClick={() => setUpdate(true)}
        >
          <PencilIcon className={"dark:text-white text-secondary"} />
          <p className="text-[#232E40 text-sm font-medium dark:text-white">
            {t("placeholder.edit") ?? "-"}
          </p>
        </div>
      ),
      key: "0"
    },
    {
      label: (
        <div
          className="flex items-center gap-2"
        >
          <TrashIcon className={"dark:text-white text-secondary"} />
          <p className="text-[#232E40] text-sm font-medium dark:text-white">
            {t("statics.delete") ?? "-"}
          </p>
        </div>
      ),
      key: "1"
    }
  ];

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
        <div
          className="hover:underline cursor-pointer hover:text-blue-500 "
          onClick={() => handleUpdate(record)}
        >
          {record?.first_name_in_passport} {record?.last_name_in_passport}{" "}
          {record?.middle_name_in_passport}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.citizenship")}</p>,
      dataIndex: "[citizenship].name",
      width: 300,
      render: (__, record) => (
        <div className="flex gap-2 items-center">
          <Flag code={record?.citizenship?.alpha2_code} />
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
      width: 150,
      render: (text) => <p>{formatDate(text)}</p>
    },
    {
      title: <p className="text-center table_th">{t("table.selected")}</p>,
      dataIndex: "choice",
      width: 100,
      render: (_, record) => (
        <div className="text-center">
          <Checkbox
            onChange={(e) => handleCheckboxChange(record?.id, e.target.checked)}
          />
        </div>
      )
    },
    {
      title: "",
      dataIndex: "edit&delete",
      width: 80,
      render: (_, record) => (
        <div className="text-center dark:text-white">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button
              type="button"
              onClick={() => handleChange(record?.id)}
            >
              <DotsIcon
                className={
                  "fill-black dark:text-white ant-modal-close rounded-md"
                }
              />
            </button>
          </Dropdown>
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
      dataIndex: "date_time",
      width: 150,
      render: (text) => {
        return <div>{formatDate(text, { time: true })}</div>;
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
      width: 300
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

  const data: DataType[] = immigrant?.passport_data;
  const data2: DataType2[] = immigrant?.border_records;
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

  return (
    <Flex vertical className="bg-lightTest  w-full px-6 pt-6 dark:bg-dbody">
      <Flex
        onClick={() => navigate("/kogg")}
        className=" mb-4 flex items-center dark:text-white"
      >
        <ArrowLeftOutlined className="text-blued dark:text-white w-5 h-5" />{" "}
        <p className="text-sm cursor-pointer">{t("table.back")}</p>
      </Flex>
      <Flex className="grid grid-cols-5  gap-4  ">
        <Flex className="flex flex-col    col-span-3 ">
          <Flex className=" p-6 space-y-4 flex-1  bg-white  flex flex-col rounded-2xl my-border dark:bg-dcontent dark:border-dborder">
            <div className="text-[#1F2937] text-[24px] font-[600] leading-[30px] dark:text-white">
              {t("table.all_passports")}
            </div>
            <HTable<DataType>
              tableLayout="fixed"
              loading={immigrantPending}
              className=" dark:bg-transparent text-sm  overflow-y-scroll h-[310px]  ht-arm"
              pagination={false}
              bordered
              rowKey={(record) => record?.id}
              // scroll={{ x: "max-content", y: 200 }}
              columns={columns}
              dataSource={data}
              onChange={onChange}
            />
          </Flex>

          <Flex className="mt-4 space-y-4 flex-1  flex flex-col p-6 bg-white  my-border  rounded-2xl dark:bg-dcontent dark:border-dborder">
            <div className="flex justify-between items-center w-full">
              <div className="text-[#1F2937] text-[24px] font-[600] dark:text-white">
                {t("table.last_border")}
              </div>
              <Link
                to={`/kogg/borders/${id}`}
                className="text-bluePrimary font-semibold hover:underline"
              >
                {t("table.see_all")} &gt;
              </Link>
            </div>
            <HTable<DataType2>
              rowKey={(record) => record?.id}
              loading={immigrantPending}
              className="w-full text-sm ht-arm overflow-y-scrolling table-scrolling scroll-smooth   ht-arm"
              pagination={false}
              bordered
              // scroll={{ x: "max-content", y: 200 }}
              columns={columns2}
              dataSource={data2}
              onChange={onChange2}
            />
          </Flex>
        </Flex>

        {immigrantPending ? (
          <p>Loading...</p>
        ) : (
          <Flex className="col-span-2 2xl:space-y-6 xl:space-y-3 p-6 bg-white dark:bg-dcontent my-border dark:text-white dark:border-dborder flex flex-col  px-6 py-9  rounded-2xl overflow-hidden">
            <div className="flex justify-center 2xl:space-y-6 xl:space-y-3 items-center flex-col">
              <div
                className={
                  "w-[160px] h-[160px] my-border dark:border-dborder rounded-xl overflow-hidden "
                }
              >
                <img
                  src={passData.photo || immigrant?.photo} //passData?.sphoto ||
                  alt="empty"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="2xl:space-y-2 xl:space-y-1">
                <div className="text-primary  text-center  xl:text-base 2xl:text-[24px] font-[600] leading-[30px] dark:text-white">
                  {passData?.full_name ||
                    immigrant?.passport_data[0]?.full_name ||
                    "-"}
                </div>
                <div className="text-[#2563EB] hover:underline text-center font-medium leading-[30px]">
                  {immigrant?.email ?? "-"}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-[#E5E7EB] dark:bg-[#3A405A]" />
            <div className="2xl:space-y-2 xl:space-y-1">
              <p className="text-[18px] font-semibold">
                {t("table.passport_detail")}
              </p>
              <Row dir={'row'} label={t("inputs.passport_series")} value={passData.passport_number || immigrant?.passport_data[0]?.passport_number}/>
              <Row dir={'row'} label={t("table.citizenship")} value={passData?.citizenship?.name || immigrant?.passport_data[0]?.citizenship?.name}/>
              <Row dir={'row'} label={t("table.place_issue")} value={passData.place_of_issue || immigrant?.passport_data[0]?.place_of_issue}/>
              <Row dir={'row'} label={t("table.date-of-issue")} value={formatDate(immigrant?.passport_data[0]?.date_of_issue)}/>
              <Row dir={'row'} label={t("table.expiry_date")} value={formatDate(immigrant?.passport_data[0]?.valid_until)}/>

            </div>
            <div className="h-px w-full bg-[#E5E7EB] dark:bg-[#3A405A]" />
            <div className="space-y-2">
              <p className="text-[18px] font-semibold">
                {t("table.immigrant_of")}
              </p>
              <Row dir={'row'} label={t("table.immigrant_id")} value={immigrant?.id}/>

              <Row dir={'row'} label={t("table.phone")} value={immigrant?.phone_number}/>
              <Row dir={'row'} label={t("table.birthday")} value={formatDate(immigrant?.birth_date)}/>
              <Row dir={'row'} label={t("inputs.gender")} value={immigrant?.gender ? t("inputs.female") : t("inputs.male")}/>

              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-[#6B7280] dark:text-[#B7BFD5]">
                  {t("inputs.gender")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm">
                  {immigrant?.gender ? t("inputs.female") : t("inputs.male")}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-[#6B7280] dark:text-[#B7BFD5]">
                  {t("table.pinfl")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm">
                  {immigrant?.pinfl ?? "-"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium 2xl:text-base xl:text-sm text-[#6B7280] dark:text-[#B7BFD5]">
                  {t("table.place_birth")}
                </p>
                <p className="font-medium 2xl:text-base xl:text-sm">
                  {formatDate(immigrant?.passport_data[0]?.place_of_birth)}
                </p>
              </div>

            </div>
          </Flex>
        )}
      </Flex>
  

      <Modal
        open={update}
        onCancel={() => setUpdate(false)}
        title={
          <p className="text-2xl font-semibold text-secondary dark:text-dvalue ">
            {t("statics.update_old")}
          </p>
        }
        footer={null}
        width={756}
        centered
        className="custom-modal"
      >
        <UpdateModal
          setUpdate={setUpdate}
          prevData={onliData}
          refetchImmigrant={refetchImmigrant}
        />
      </Modal>
    </Flex>
  );
};

export default KoggDetail;
