import { useQuery } from "@tanstack/react-query";
import { Flex, TableColumnsType } from "antd";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { CommonPageWrapper } from "@/app/layouts/page-wrapper";
import ReportService from "@/pages/reports/service";
import { GenderDataType } from "@/pages/reports/type";
import { endpoints } from "@/shared/api/endpoints.ts";
import { ArmValues } from "@/shared/types/form.type.ts";
import { CommonPageWrapperCard } from "@/shared/ui";
import ExportExcelButton from "@/shared/ui/ExportExcelButton.tsx";
import { Flag } from "@/shared/ui/Flag.tsx";
import { HFDatePicker } from "@/shared/ui/form-elements/HFDatePicker";
import FRow from "@/shared/ui/form-elements/HFRow";
import HTable from "@/shared/ui/form-elements/HTable";
import SearchI from "@/shared/ui/icons/search/SearchI.tsx";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon.tsx";

const Gender = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialValues = (): ArmValues => {
    return {
      start_date: searchParams.get("start_date") || "",
      end_date: searchParams.get("end_date") || ""
    };
  };

  const { control, getValues } = useForm<ArmValues>({
    defaultValues: getInitialValues()
  });

  const updateParams = useCallback(() => {
    const { start_date, end_date } = getValues();

    const newParams: Record<string, string> = {};
    if (start_date) newParams.start_date = start_date;
    if (end_date) newParams.end_date = end_date;

    setSearchParams(newParams);
  }, [getValues, setSearchParams]);

  const { data: by_age, isLoading: byagePending } = useQuery({
    queryKey: ["by-age", searchParams.toString()],
    queryFn: () =>
      ReportService.reportByAge({
        start_date: searchParams.get("start_date") || "",
        end_date: searchParams.get("end_date") || ""
      })
  });

  const columns: TableColumnsType<GenderDataType> = [
    {
      title: <p className="text-center table_th">{t("table.n")}</p>,
      key: "index",
      render: (_, __, idx: number) => <p className="text-center">{idx + 1}</p>,
      width: 75
    },
    {
      title: <p className="table_th">{t("table.countries")}</p>,
      dataIndex: "country_name",
      key: "country",
      width: 300,
      render: (_, rec: GenderDataType) => (
        <div className="flex gap-2 items-center">
          {/*<div className={`fi fi-${rec.country_code.toLowerCase()}`} />*/}
          <Flag code={rec.country_code} />
          <p className="text-sm line-clamp-1">{rec.country_name}</p>
        </div>
      )
    },
    {
      title: <p className="table_th">{t("inputs.gender")}</p>,
      children: [
        {
          title: <p className="table_th">{t("inputs.male")}</p>,
          dataIndex: "male",
          key: "male",
          width: 100,
          render: (v: number) => <div className="line-clamp-1">{v}</div>
        },
        {
          title: <p className="table_th">{t("inputs.female")}</p>,
          dataIndex: "female",
          key: "female",
          width: 100,
          render: (v: number) => <div className="line-clamp-1">{v}</div>
        }
      ]
    },
    {
      title: <p className="table_th">{t("year.age")}</p>,
      children: [
        {
          title: <p className="table_th">00-15</p>,
          dataIndex: "age_0_15",
          key: "age_0_15",
          width: 100,
          render: (v: number) => <div className="line-clamp-1">{v}</div>
        },
        {
          title: <p className="table_th">16-30</p>,
          dataIndex: "age_16_30",
          key: "age_16_30",
          width: 100,
          render: (v: number) => <div className="line-clamp-1">{v}</div>
        },
        {
          title: <p className="table_th">31-50</p>,
          dataIndex: "age_31_50",
          key: "age_31_50",
          width: 100,
          render: (v: number) => <div className="line-clamp-1">{v}</div>
        },
        {
          title: <p className="table_th">51 +</p>,
          dataIndex: "age_51_plus",
          key: "age_51_plus",
          width: 100,
          render: (v: number) => <div className="line-clamp-1">{v}</div>
        }
      ]
    },
    {
      title: <p className="table_th">{t("year.total")}</p>,
      dataIndex: "total",
      key: "total",
      width: 100,
      render: (v: number) => <div className="line-clamp-1">{v}</div>
    }
  ];

  const data: GenderDataType[] = by_age || [];

  return (
    <CommonPageWrapper>
      <div className="">
        <div className="transition-colors text-primary text-[24px] font-[600] leading-[30px] dark:text-dprimary">
          {t("breadcrumb.gender")}
        </div>

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
            <FRow label="">
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
            className="font-medium mt-7 bg-blue-500 text-white px-4 py-2 my-border dark:border-dborder rounded-lg flex items-center gap-2"
          >
            <SearchI strokeColor="#fff" />
            <p className="font-medium dark:text-white">{t("buttons.search")}</p>
          </button>
        </div>
      </div>
      <CommonPageWrapperCard className="mt-6 flex flex-col gap-4 ">
        <Flex className={"justify-end mb-4 "}>
          <ExportExcelButton
            endpoint={endpoints.reports.by_age}
            params={{
              start_date: searchParams.get("start_date") || "",
              end_date: searchParams.get("end_date") || ""
            }}
            variant={"phantom"}
          />
        </Flex>
        <HTable<GenderDataType>
          className=" ht-arm !text-[8px]"
          columns={columns}
          bordered
          rowKey={(record) => record.id}
          dataSource={data}
          loading={byagePending}
          // scroll={{ x: "max-content", y: "calc(100vh - 495px)" }}
          // scroll={{ x: "max-content" }}
          customPagination={true}
          total={data?.length}
        />
      </CommonPageWrapperCard>
    </CommonPageWrapper>
  );
};

export default Gender;
