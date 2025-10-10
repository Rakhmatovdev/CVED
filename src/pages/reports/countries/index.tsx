import { useQuery } from "@tanstack/react-query";
import { Flex, TableColumnsType } from "antd";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { CommonPageWrapper } from "@/app/layouts/page-wrapper";
import ReportService from "@/pages/reports/service";
import {
  CountryDataType,
  MonthlyFilterForm,
  MonthlyRecord
} from "@/pages/reports/type";
import { endpoints } from "@/shared/api/endpoints.ts";
import { CommonPageWrapperCard } from "@/shared/ui";
import ExportExcelButton from "@/shared/ui/ExportExcelButton.tsx";
import { Flag } from "@/shared/ui/Flag.tsx";
import { HFDatePicker } from "@/shared/ui/form-elements/HFDatePicker";
import FRow from "@/shared/ui/form-elements/HFRow";
import HTable from "@/shared/ui/form-elements/HTable";
import SearchI from "@/shared/ui/icons/search/SearchI.tsx";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon.tsx";

const Countries = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const getInitialValues = (): MonthlyFilterForm => {
    return {
      start_date: searchParams.get("start_date") || "",
      end_date: searchParams.get("end_date") || ""
    };
  };

  const { control, getValues } = useForm<MonthlyFilterForm>({
    defaultValues: getInitialValues()
  });

  const updateParams = useCallback(() => {
    const { start_date, end_date } = getValues();

    const newParams: Record<string, string> = {};

    if (start_date) {
      newParams.start_date = start_date;
    }
    if (end_date) {
      newParams.end_date = end_date;
    }

    setSearchParams(newParams);
  }, [getValues, setSearchParams]);

  const { data: mounthly, isLoading: mounthlyPending } = useQuery({
    queryKey: ["gender-data", searchParams.toString()],
    queryFn: () =>
      ReportService.reportMontly({
        start_date: searchParams.get("start_date") || "",
        end_date: searchParams.get("end_date") || "",
        get_file: false
      })
  });

  const columns: TableColumnsType<CountryDataType> = [
    {
      title: <p className="text-center table_th">{t("table.n")}</p>,
      key: "index",
      render: (_, __: MonthlyRecord, idx: number) => (
        <p className="text-center">{idx + 1}</p>
      ),
      width: 75
    },
    {
      title: <p className="table_th">{t("table.countries")}</p>,
      dataIndex: "country_name",
      key: "country",
      width: 300,
      render: (_, rec: MonthlyRecord) => (
        <div className="transition flex gap-2 items-center">
          {/*<div className={`fi fi-${rec.citizenship.toLowerCase()}`} />*/}
          <Flag code={rec?.citizenship} />
          <p className="text-sm line-clamp-1">{rec?.country_name}</p>
        </div>
      )
    },
    ...[
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ].flatMap((month) => [
      {
        title: (
          <p className="transition table_th">
            {t(`month.${month.toLowerCase()}_full`)}
          </p>
        ),
        children: [
          {
            title: <p className="">{t("table.checkin")}</p>,
            key: `${month}_entry`,
            render: (_, rec: MonthlyRecord) => {
              const m = rec.months.find((x) => x.month === month);
              return m ? 111111 : 1212;
            },
            width: 100
          },
          {
            title: <p className="transition">{t("table.departure")}</p>,
            key: `${month}_exit`,
            render: (_, rec: MonthlyRecord) => {
              const m = rec.months.find((x) => x.month === month);
              return <div className="transition">{m ? m.exit : 1111110}</div>;
            },
            width: 100
          }
        ]
      }
    ])
  ];

  const data: CountryDataType[] = mounthly || [];

  return (
    <CommonPageWrapper>
      <div className="transition text-primary text-[24px] font-[600] leading-[30px] dark:text-dvalue">
        {t("breadcrumb.countries")}
      </div>
      <div className="">
        <div className="flex justify-between gap-[16px] mt-4">
          <div className="inline-flex gap-4">
            <FRow label={t("inputs.arrival")}>
              <HFDatePicker
                prefix={<CalendarIcon />}
                control={control}
                name="start_date"
                placeholder={t("placeholder.period_registration")}
              />
            </FRow>
            <FRow label={""}>
              <HFDatePicker
                prefix={<CalendarIcon />}
                control={control}
                name="end_date"
                placeholder={t("placeholder.period_entry")}
              />
            </FRow>
          </div>

          <button
            onClick={updateParams}
            className="transition font-medium mt-7 bg-blue-500 text-white px-4 py-2 my-border dark:border-dborder rounded-lg flex items-center gap-2"
          >
            <SearchI strokeColor="#fff" />
            <p className="font-medium dark:text-white">{t("buttons.search")}</p>
          </button>
        </div>
      </div>

      <CommonPageWrapperCard className="mt-6 flex flex-col gap-4">
        <Flex className={"justify-end mb-4"}>
          <ExportExcelButton
            endpoint={endpoints.reports.monthly}
            params={{
              start_date: searchParams.get("start_date") || "",
              end_date: searchParams.get("end_date") || ""
            }}
            variant={"phantom"}
          />
        </Flex>
        <HTable<CountryDataType>
          loading={mounthlyPending}
          className="w-full ht-arm scroll-none !text-[8px]"
          rowKey={(record) => record.id}
          bordered
          // scroll={{ y: "calc(100vh - 395px)" }}
          total={data?.length}
          columns={columns}
          dataSource={data}
        />
      </CommonPageWrapperCard>
    </CommonPageWrapper>
  );
};

export default Countries;
