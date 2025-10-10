import { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import { Flag } from "@/shared/ui/Flag";
import { formatDate } from "../formatDate";
import { DataType } from "../types";

const filteredData: DataType[] = [
  {
    id: 1,
    key: 1,
    passport: "",
    birth_date: "1980-12-31",
    email: "example@example.com",
    first_name: "Ivan",
    last_name: "Ivanov",
    full_name: "Ivan Ivanov",
    gender: "Мужской",
    middle_name: "Petrovich",
    nationality: "Russia",
    phone_number: "+71234567890",
    photo: "https://example.com/photo.jpg",
    passport_data: [
      {
        id: 101,
        birth_date: "1980-12-31",
        citizenship: {
          label: "Россия",
          name: "Russia",
          value: "1",
          alpha2_code: "RU"
        },
        date_of_issue: "2010-05-01",
        first_name_in_passport: "Ivan",
        immigrant_id: "imm_001",
        last_name_in_passport: "Ivanov",
        middle_name_in_passport: "Petrovich",
        passport_back_side_photo: "https://example.com/back.jpg",
        passport_front_side_photo: "https://example.com/front.jpg",
        passport_number: "AB1234567",
        place_of_birth: "Moscow",
        place_of_issue: "Moscow Office",
        valid_until: "2030-05-01"
      }
    ],
    kogg: "Some KOGG Info",
    date_time: "2024-10-01",
    direction: "Въезд",
    purpose_placeholder: "Выезд из несоседней страны в Узбекистан без визы",
    bordering_point: "ДПП “Зангиота-авто”",
    duration_trip_placeholder: 30
  },
  {
    id: 1,
    key: 1,
    passport: "",
    birth_date: "1980-12-31",
    email: "example@example.com",
    first_name: "Ivan",
    last_name: "Ivanov",
    full_name: "Ivan Ivanov",
    gender: "Мужской",
    middle_name: "Petrovich",
    nationality: "Russia",
    phone_number: "+71234567890",
    photo: "https://example.com/photo.jpg",
    passport_data: [
      {
        id: 101,
        birth_date: "1980-12-31",
        citizenship: {
          label: "Россия",
          name: "Russia",
          value: "1",
          alpha2_code: "RU"
        },
        date_of_issue: "2010-05-01",
        first_name_in_passport: "Ivan",
        immigrant_id: "imm_001",
        last_name_in_passport: "Ivanov",
        middle_name_in_passport: "Petrovich",
        passport_back_side_photo: "https://example.com/back.jpg",
        passport_front_side_photo: "https://example.com/front.jpg",
        passport_number: "AB1234567",
        place_of_birth: "Moscow",
        place_of_issue: "Moscow Office",
        valid_until: "2030-05-01"
      }
    ],
    kogg: "Some KOGG Info",
    date_time: "2024-10-01",
    direction: "Въезд",
    purpose_placeholder: "Выезд из несоседней страны в Узбекистан без визы",
    bordering_point: "ДПП “Зангиота-авто”",
    duration_trip_placeholder: 90
  }
];

const filteredData2: DataType[] = [
  {
    id: 1,
    key: 1,
    passport: "",
    birth_date: "1980-12-31",
    email: "example@example.com",
    first_name: "Ivan",
    last_name: "Ivanov",
    full_name: "АЗИМОВ САМАНДАР  ФАЗИЛОВИЧ",
    gender: "Мужской",
    middle_name: "Petrovich",
    nationality: "Russia",
    phone_number: "+71234567890",
    photo: "https://example.com/photo.jpg",
    passport_data: [
      {
        id: 101,
        birth_date: "1980-12-31",
        citizenship: {
          label: "Россия",
          name: "Russia",
          value: "1",
          alpha2_code: "RU"
        },
        date_of_issue: "12.12.2024 14:45:51",
        first_name_in_passport: "Ivan",
        immigrant_id: "imm_001",
        last_name_in_passport: "Ivanov",
        middle_name_in_passport: "Petrovich",
        passport_back_side_photo: "https://example.com/back.jpg",
        passport_front_side_photo: "https://example.com/front.jpg",
        passport_number: "AB1234567",
        place_of_birth: "г. Ташкент, Яккасарайский район",
        place_of_issue: "Ахмад Таробий, дом 26",
        valid_until: "2030-05-01"
      }
    ],
    kogg: "Some KOGG Info",
    date_time: "12.12.2024 14:45:51",
    direction: "Въезд",
    purpose_placeholder: "Средства размешения",
    bordering_point: "Ray Premium",
    duration_trip_placeholder: 30,
    description:
      "Автоматически снят запрет. Причина: Убыл из РУз. Дата: 29,04,2024 10:45:41"
  }
];

export const ColData = () => {
  const { t } = useTranslation();

  const columns: TableColumnsType<DataType> = [
    {
      title: <p className="table_th">{t("table.country")}</p>,
      dataIndex: "nationality",
      render: (_, record: DataType) => (
        <div className=" gap-1 flex items-center">
          <div className="fi fi-ru w-4 h-4" />
          <div className="line-clamp-1 dark:text-dvalue">
            {" "}
            {record?.nationality || "-"}
          </div>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.date_time")}</p>,
      dataIndex: "birthday",

      render: (_, record: DataType) => (
        <div className=" gap-1 flex items-center">
          <div className="line-clamp-1 dark:text-dvalue">
            {" "}
            {record?.date_time || "-"}
          </div>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.direction")}</p>,
      dataIndex: "direction",
      render: (_, record: DataType) => (
        <div className="flex items-center gap-1">
          <div className="border flex gap-1 items-center text-xs dark:border-dborder px-2 py-[2px] rounded-md">
            {record?.direction == "Выезд" ? (
              <div className="h-2 w-2 rounded-full bg-red-500 " />
            ) : (
              <div className="h-2 w-2 rounded-full bg-[#17B26A]" />
            )}
            <p className={"dark:text-dvalue"}> {record?.direction || "-"}</p>
          </div>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("placeholder.purpose")}</p>,
      dataIndex: "date_time",
      width: 240,
      render: (_, record: DataType) => (
        <div className="text-sm font-normal dark:text-dvalue">
          {record?.purpose_placeholder || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.bordering_point")}</p>,
      dataIndex: "birt_data",
      render: (_, record: DataType) => (
        <div className="dark:text-dvalue ">
          {record?.bordering_point || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("placeholder.duration_trip")}</p>,
      dataIndex: "birt_data",
      render: (_, record: DataType) => (
        <div
          className={`border inline rounded-lg px-2 py-[2px] ${
            (record.duration_trip_placeholder ?? 0) <= "31"
              ? "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]"
              : "border-[#FECDCA]  bg-[#FEF3F2] text-[#B42318]"
          } `}
        >
          {record.duration_trip_placeholder != null
            ? `${record.duration_trip_placeholder} день`
            : "-"}
        </div>
      )
    }
  ];
  const columns2: TableColumnsType<DataType> = [
    {
      title: <p className="table_th">{t("table.modul")}</p>,
      dataIndex: "purpose_placeholder",
      render: (_, record: DataType) => (
        <div className="text-sm dark:text-dvalue">
          {" "}
          {record?.purpose_placeholder || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.passport")}</p>,
      dataIndex: "passport",
      render: (_, record: DataType) => (
        <div className=" gap-1 flex items-center">
          <div className="line-clamp-1 text-sm dark:text-dvalue">
            {" "}
            {record?.passport_data[0].passport_number || "-"}
          </div>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.district")}</p>,
      dataIndex: "district",
      width: 210,
      render: (_, record: DataType) => (
        <div className="text-[#1F2937] font-normal text-sm dark:text-dvalue">
          {record?.passport_data[0]?.place_of_birth || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.address")}</p>,
      dataIndex: "adres",
      render: (_, record: DataType) => (
        <div className="text-sm font-normal dark:text-dvalue">
          {record?.passport_data[0].place_of_issue || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.department")}</p>,
      dataIndex: "address",
      render: (_, record: DataType) => (
        <div className=" text-sm dark:text-dvalue">
          {record?.bordering_point || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.check")}</p>,
      dataIndex: "check",
      render: (_, record: DataType) => (
        <div className=" text-sm dark:text-dvalue">
          {record?.passport_data[0].date_of_issue || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.bordering_point")}</p>,
      dataIndex: "date_time",
      render: (_, record: DataType) => (
        <div className="text-sm dark:text-dvalue">
          {record?.date_time || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.violation")}</p>,
      dataIndex: "violation",
      render: () => (
        <div className="bg-[#EF4444] w-3 h-3 rounded-full border border-[#b11717]" />
      )
    }
  ];
  const columns3: TableColumnsType<DataType> = [
    {
      title: <p className="table_th">{t("table.user")}</p>,
      dataIndex: "user",
      render: (_, record) => (
        <div className="text-sm dark:text-dvalue">
          {" "}
          {record?.full_name ?? "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.event")}</p>,
      dataIndex: "direction",
      render: (_, record) => (
        <div className="">
          <div className="text-xs border inline font-medium px-2 py-[2px] rounded-md dark:text-dvalue dark:border-dborder ">
            {" "}
            {record?.direction ?? "-"}
          </div>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.description")}</p>,
      dataIndex: "direction",

      render: (_, record) => (
        <div className="text-[#1F2937] font-normal text-sm dark:text-dvalue">
          {record?.description ?? "-"}
        </div>
      )
    },

    {
      title: <p className="table_th">{t("table.created")}</p>,
      dataIndex: "created",
      render: (_, record) => (
        <div className=" text-sm font-normal dark:text-dvalue">
          {record?.passport_data[0]?.date_of_issue ?? "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("inputs.pid")}</p>,
      dataIndex: "personal id",
      render: (_, record: DataType) => (
        <div className="text-sm dark:text-dvalue ">
          {record?.passport_data[0].id || "-"}
        </div>
      )
    }
  ];
  const columns4: TableColumnsType<DataType> = [
    {
      title: <p className="table_th">{t("table.visa_n")}</p>,
      dataIndex: "user",
      render: (_, record: DataType) => (
        <div className="text-sm dark:text-dvalue">
          {" "}
          {record?.passport_data[0]?.immigrant_id || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.type")}</p>,
      dataIndex: "direction",
      render: () => (
        <div className="">
          <div className="text-xs border items-center gap-1 dark:border-dborder flex font-medium px-1 py-[2px] rounded-md ">
            <div className="h-2 w-2 rounded-full bg-[#717680] " />{" "}
            <span className="text-[#414651] dark:text-dvalue">FV</span>
          </div>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.contras")}</p>,
      dataIndex: "direction",

      render: (_, record: DataType) => (
        <div className="text-[#1F2937] font-normal text-sm dark:text-dvalue">
          {record?.id || "-"}
        </div>
      )
    },

    {
      title: <p className="table_th">{t("table.date_ot")}</p>,
      dataIndex: "created",
      render: (_, record: DataType) => (
        <div className=" text-sm font-normal dark:text-dvalue">
          {record?.passport_data[0]?.birth_date || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.date_do")}</p>,
      dataIndex: "personal id",
      render: (_, record: DataType) => (
        <div className="text-sm font-normal dark:text-dvalue">
          {record?.passport_data[0]?.birth_date || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.days")}</p>,
      dataIndex: "personal id",
      render: (_, record: DataType) => (
        <div className="text-sm font-normal dark:text-dvalue">
          {record?.duration_trip_placeholder || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.issued_by")}</p>,
      dataIndex: "personal id",
      render: (_, record: DataType) => (
        <div className="text-sm font-normal dark:text-dvalue">
          {record?.kogg || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.issued")}</p>,
      dataIndex: "personal id",
      render: (_, record: DataType) => (
        <div className="text-sm font-normal dark:text-dvalue">
          {record?.passport_data[0].birth_date || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.created")}</p>,
      dataIndex: "personal id",
      render: (_, record: DataType) => (
        <div className="text-sm font-medium dark:text-dvalue">
          {record?.passport_data[0].date_of_issue || "-"}
        </div>
      )
    }
  ];
  const columns5: TableColumnsType<DataType> = [
    {
      title: <p className="table_th">{t("table.fio")}</p>,
      dataIndex: "fiona",
      render: (_, record: DataType) => (
        <div className="text-sm dark:text-dvalue flex gap-2">
          <Flag code="uz" size="sm" />
          <p> {record?.full_name || "-"}</p>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.date_time")}</p>,
      dataIndex: "data time",
      render: (_, record: DataType) => (
        <div className=" gap-1 flex items-center">
          <div className="line-clamp-1 text-sm dark:text-dvalue">
            {formatDate(record?.passport_data[0].date_of_issue) || "-"}
          </div>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.passport")}</p>,
      dataIndex: "passport",
      width: 210,
      render: (_, record: DataType) => (
        <div className="text-[#1F2937] font-normal text-sm dark:text-dvalue">
          {record?.passport_data[0]?.passport_number || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.region_r")}</p>,
      dataIndex: "region",
      width: 210,
      render: (_, record: DataType) => (
        <div className="text-[#1F2937] font-normal text-sm dark:text-dvalue">
          {record?.passport_data[0]?.place_of_birth || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.address")}</p>,
      dataIndex: "adres",
      render: (_, record: DataType) => (
        <div className="text-sm font-normal dark:text-dvalue">
          {record?.passport_data[0].place_of_issue || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.hostel")}</p>,
      dataIndex: "hostel",
      render: (_, record: DataType) => (
        <div className=" text-sm dark:text-dvalue">
          {record?.bordering_point || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.check")}</p>,
      dataIndex: "check",
      render: (_, record: DataType) => (
        <div className=" text-sm dark:text-dvalue">
          {formatDate(record?.passport_data[0].date_of_issue) || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.entry_e")}</p>,
      dataIndex: "entry",
      render: (_, record: DataType) => (
        <div className=" text-sm dark:text-dvalue">
          {formatDate(record?.passport_data[0].date_of_issue) || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.violation")}</p>,
      dataIndex: "violation",
      render: () => (
        <div className="bg-[#EF4444] w-3 h-3 rounded-full border border-[#b11717]" />
      )
    }
  ];
  const columns6: TableColumnsType<DataType> = [
    {
      title: <p className="table_th">{t("table.date")}</p>,
      dataIndex: "birth_date",
      render: (_, record: DataType) => (
        <div className="text-sm dark:text-dvalue">
          {formatDate(record?.birth_date, { time: true }) || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("tabs.events")}</p>,
      dataIndex: "kogg",
      render: (_, record: DataType) => (
        <div className=" gap-1 flex items-center">
          <div className="line-clamp-1 text-sm dark:text-dvalue">
            {record?.kogg || "-"}
          </div>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("breadcrumb.employee")}</p>,
      dataIndex: "first_name",
      render: (_, record: DataType) => (
        <div className="text-[#1F2937] font-normal text-sm dark:text-dvalue">
          {record?.first_name || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.branch")}</p>,
      dataIndex: "adres",
      render: (_, record: DataType) => (
        <div className="text-sm font-normal dark:text-dvalue">
          {record?.passport_data[0].place_of_birth || "-"}
        </div>
      )
    },
    {
      title: <p className="table_th">{t("table.notes")}</p>,
      dataIndex: "address",
      render: (_, record: DataType) => (
        <div className=" text-sm dark:text-dvalue">
          {record?.bordering_point || "-"}
        </div>
      )
    }
  ];

  return {
    columns,
    columns2,
    columns3,
    columns4,
    filteredData,
    filteredData2,
    columns5,
    columns6
  };
};

export const Statics = () => {
  const { t } = useTranslation();
  const genderOptions = [
    { label: t("inputs.male"), value: "0" },
    { label: t("inputs.female"), value: "1" }
  ];
  return { genderOptions };
};
