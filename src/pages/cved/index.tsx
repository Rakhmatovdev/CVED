import { Skeleton, Tabs } from "antd";
import { TabsProps } from "antd/lib";
import { useQueryState } from "nuqs";
import { Suspense, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CommonPageWrapper } from "@/app/layouts/page-wrapper.tsx";
import { Arrived, Departed, DetailsModal, FilterForm } from "@/features/kogg";
import KoggCharts from "@/features/kogg/components/KoggCharts";
import { endpoints } from "@/shared/api/endpoints";
import { useFetchData } from "@/shared/hooks/use-fetch";
import { useFilters } from "@/shared/hooks/use-filters";
import { CommonPageTitle } from "@/shared/ui";

const ChartSkeleton = () => {
  return (
    <div className="flex gap-4 w-full justify-between mt-6">
      <Skeleton.Node active className="!w-full !h-[380px] !rounded-2xl" />
      <Skeleton.Node active className="!w-full !h-[380px] !rounded-2xl" />
      <Skeleton.Node active className="!w-full !h-[380px] !rounded-2xl" />
    </div>
  );
};

const Cved = () => {
  const { t } = useTranslation();

  const [activeKey, setActiveKey] = useQueryState("active_key", {
    defaultValue: "arrived"
  });

  const formMethods = useForm();
  const { filters, resetFilters } = useFilters(formMethods, {
    arrival_date_from: "date",
    arrival_date_to: "date",
    birth_date: "date",
    citizenship: "number",
    first_name: "string",
    last_name: "string",
    passport_number: "string",
    gender: "string"
  });

  const mergedFilters = useMemo(() => {
    return {
      ...filters,
      crossing_type: activeKey === "arrived" ? "entry" : "exit"
    };
  }, [filters, activeKey]);

  const { data, isFetching, tableParams, onChangeTable } = useFetchData<
    { results: any[]; count: number },
    any
  >({
    url: endpoints.immigrants.kogg,
    filters: mergedFilters,
    refetchKeys: ["immigrants", activeKey]
  });

  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "arrived",
        label: t("breadcrumb.arrived"),
        children: (
          <Arrived
            data={data?.results}
            isPending={isFetching}
            tableParams={tableParams}
            handleTableChange={onChangeTable}
            count={data?.count}
          />
        )
      },
      {
        key: "departed",
        label: t("breadcrumb.departed"),
        children: (
          <Departed
            data={data?.results}
            isPending={isFetching}
            tableParams={tableParams}
            handleTableChange={onChangeTable}
            count={data?.count}
          />
        )
      }
    ],
    [data, isFetching, tableParams, onChangeTable]
  );

  const onChange = useCallback(
    (key: string) => {
      setActiveKey(key);
    },
    [setActiveKey]
  );

  return (
    <CommonPageWrapper>
      <CommonPageTitle>{t("breadcrumb.cved")}</CommonPageTitle>
      <FilterForm control={formMethods.control} resetFilters={resetFilters} />
      <Suspense fallback={<ChartSkeleton />}>
        <KoggCharts />
      </Suspense>
      <div className="mt-6 bg-white dark:bg-[#2B3149] rounded-2xl p-6">
        <Tabs activeKey={activeKey} items={items} onChange={onChange} />
      </div>
      <DetailsModal />
    </CommonPageWrapper>
  );
};

export default Cved;
