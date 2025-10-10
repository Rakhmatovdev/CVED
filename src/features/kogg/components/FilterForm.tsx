import { Spin } from "antd";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ArmValues } from "@/shared/types/form.type";
import { CommonPageFilterComponent } from "@/shared/ui/CommonPageFilterComponent";
import { HFDatePicker } from "@/shared/ui/form-elements";
import { DebounceSelect } from "@/shared/ui/form-elements/HFDebounceSelect";
import HFInput from "@/shared/ui/form-elements/HFInput";
import FRow from "@/shared/ui/form-elements/HFRow";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon";
import LocationIcon from "@/shared/ui/icons/sufix/LocationIcon";
import PassportIcon from "@/shared/ui/icons/sufix/PassportIcon.tsx";
import UserIcon from "@/shared/ui/icons/UserIcon";
import { useCitizenshipSearch } from "@/utils/hooks/filter/useCitizenship.tsx";

const FilterForm = ({
  control,
  resetFilters
}: {
  control: Control<ArmValues>;
  resetFilters: () => void;
}) => {
  const { t } = useTranslation();
  const {
    options: countryOptions,
    isPending: citizenshipPending,
    setSearch: setCitizenshipSearch
  } = useCitizenshipSearch();

  return (
    <CommonPageFilterComponent
      title={t("statics.search-criteria")}
      onClear={resetFilters}
      className="flex gap-4"
    >
      <FRow label={t("inputs.name")}>
        <HFInput
          control={control}
          name="first_name"
          prefix={<UserIcon />}
          placeholder={t("placeholder.name")}
        />
      </FRow>
      <FRow label={t("inputs.surname")}>
        <HFInput
          control={control}
          name="last_name"
          prefix={<UserIcon />}
          placeholder={t("placeholder.surname")}
        />
      </FRow>
      <FRow label={t("inputs.passport_series")}>
        <HFInput
          prefix={<PassportIcon />}
          control={control}
          name="passport_number"
          placeholder={t("placeholder.passport_series")}
        />
      </FRow>
      <FRow label={t("inputs.arrival")}>
        <HFDatePicker
          control={control}
          name="arrival_date_from"
          prefix={<CalendarIcon />}
          placeholder={t("placeholder.period_registration")}
        />
      </FRow>{" "}
      <FRow label={""}>
        <HFDatePicker
          control={control}
          name="arrival_date_to"
          prefix={<CalendarIcon />}
          placeholder={t("placeholder.period_entry")}
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
    </CommonPageFilterComponent>
  );
};
export default FilterForm;
