import { Tabs } from "antd";
import { useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CommonPageWrapper } from "@/app/layouts/page-wrapper.tsx";
import ArmFilterForm from "@/pages/immigrants/identify/form";
import ModalCreate from "@/pages/immigrants/identify/modal/ModalCreate.tsx";
import { endpoints } from "@/shared/api/endpoints";
import { useFetchData } from "@/shared/hooks/use-fetch";
import { useFilters } from "@/shared/hooks/use-filters";
import { CommonPageTitle, CommonPageWrapperCard } from "@/shared/ui";
import { DataType } from "../type";
import ArrivedImmigrant from "./componenta/ArrivedImmigrant";

const Arm = () => {
  const { t } = useTranslation();

  const [activeKey, setActiveKey] = useQueryState("active_tab", {
    defaultValue: "arrived"
  });

  const formMethods = useForm();

  const { filters, resetFilters } = useFilters(formMethods, {
    arrival_date_from: "date",
    arrival_date_to: "date",
    last_name: "string",
    first_name: "string",
    middle_name: "string",
    birth_date: "date",
    citizenship: "number"
  });

  const { data, isFetching, tableParams, onChangeTable } = useFetchData<
    { results: DataType[]; count: number },
    any
  >({
    url: endpoints.immigrants.get,
    filters,
    refetchKeys: ["immigrants-identify"]
  });

  const tables = [
    {
      key: "arrived",
      label: t("table.arrived"),
      children: (
        <ArrivedImmigrant
          data={data}
          isFetching={isFetching}
          tableParams={tableParams}
          onChangeTable={onChangeTable}
          control={formMethods.control}
        />
      )
    },
    {
      key: "not_arrived",
      label: t("breadcrumb.departed"),
      children: (
        <ArrivedImmigrant
          data={data}
          isFetching={isFetching}
          tableParams={tableParams}
          onChangeTable={onChangeTable}
          control={formMethods.control}
        />
      )
    }
  ];

  return (
    <CommonPageWrapper>
      <CommonPageTitle>{t("breadcrumb.immigrants")}</CommonPageTitle>

      <ArmFilterForm control={formMethods.control} onClear={resetFilters} />
      <CommonPageWrapperCard className={"mt-6 flex flex-col h-full"}>
        <Tabs
          defaultActiveKey={activeKey}
          activeKey={activeKey}
          items={tables}
          onChange={setActiveKey}
        />
      </CommonPageWrapperCard>
      <ModalCreate refetch={formMethods.reset} />
    </CommonPageWrapper>
  );
};
export default Arm;
