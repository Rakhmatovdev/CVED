import { Spin } from "antd";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ArmValues } from "@/shared/types/form.type";
import { CommonPageFilterComponent } from "@/shared/ui/CommonPageFilterComponent.tsx";
import { HFDatePicker } from "@/shared/ui/form-elements";
import { DebounceSelect } from "@/shared/ui/form-elements/HFDebounceSelect";
import HFInput from "@/shared/ui/form-elements/HFInput";
import FRow from "@/shared/ui/form-elements/HFRow";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon";
import LocationIcon from "@/shared/ui/icons/sufix/LocationIcon";
import UserIcon from "@/shared/ui/icons/UserIcon";
import { useBorderingPoint } from "@/utils/hooks/filter/UseBordering.tsx";
import { useCitizenshipSearch } from "@/utils/hooks/filter/useCitizenship.tsx";

const UnIdentifyFilterForm = ({
  control,
  onClear
}: {
  control: Control<ArmValues>;
  onClear: VoidFunction;
}) => {
  const { t } = useTranslation();
  const {
    options: countryOptions,
    isPending: citizenshipPending,
    setSearch: setCitizenshipSearch
  } = useCitizenshipSearch();

  const {
    options: borderingOptions,
    isPending: borderingPending,
    setSearch: borderingSearch
  } = useBorderingPoint();

  return (
    <CommonPageFilterComponent title="Фильтр" onClear={onClear}>
      <FRow label={t("inputs.arrival")}>
        <HFDatePicker
          control={control}
          name="arrival_date_from"
          prefix={<CalendarIcon />}
          placeholder={t("placeholder.period_registration")}
        />
      </FRow>
      <FRow label="">
        <HFDatePicker
          control={control}
          name="arrival_date_to"
          prefix={<CalendarIcon />}
          placeholder={t("placeholder.period_entry")}
        />
      </FRow>
      <FRow label={t("table.fio")}>
        <HFInput
          control={control}
          name="full_name"
          placeholder={t("placeholder.fio")}
          prefix={<UserIcon />}
        />
      </FRow>
      <FRow label={t("inputs.birthday")}>
        <HFDatePicker
          control={control}
          name="birth_date"
          prefix={<CalendarIcon />}
          placeholder={t("placeholder.birthday")}
        />
      </FRow>
      <FRow label={t("inputs.citizenship")}>
        <DebounceSelect
          control={control}
          name="citizenship"
          labelInValue
          filterOption={false}
          onSearch={setCitizenshipSearch}
          prefix={<LocationIcon />}
          placeholder={t("placeholder.citizenship")}
          notFoundContent={citizenshipPending ? <Spin size="small" /> : null}
          options={countryOptions}
        />
      </FRow>
      <FRow label={t("table.border_point")}>
        <DebounceSelect
          control={control}
          name="crossing_point"
          labelInValue
          filterOption={false}
          onSearch={borderingSearch}
          prefix={<LocationIcon />}
          placeholder={t("placeholder.enter-detail")}
          notFoundContent={borderingPending ? <Spin size="small" /> : null}
          options={borderingOptions}
        />
      </FRow>
    </CommonPageFilterComponent>
  );
};

export default UnIdentifyFilterForm;
