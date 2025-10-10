import { Spin } from "antd";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ArmValues } from "@/shared/types/form.type.ts";
import { CommonPageFilterComponent } from "@/shared/ui/CommonPageFilterComponent.tsx";
import { HFSelect } from "@/shared/ui/form-elements";
import { DebounceSelect } from "@/shared/ui/form-elements/HFDebounceSelect";
import HFInput from "@/shared/ui/form-elements/HFInput";
import FRow from "@/shared/ui/form-elements/HFRow";
import { SelectArrowDownIcon } from "@/shared/ui/icons/others";
import LocationIcon from "@/shared/ui/icons/sufix/LocationIcon.tsx";
import PassportIcon from "@/shared/ui/icons/sufix/PassportIcon.tsx";
import UserIcon from "@/shared/ui/icons/UserIcon.tsx";
import { useCitizenshipSearch } from "@/utils/hooks/filter/useCitizenship.tsx";
import { Statics } from "@/utils/statics";

interface Props {
  control: Control<ArmValues>;
  resetFilters: () => void;
}

const MSearchFilterForm = ({ control, resetFilters }: Props) => {
  const { t } = useTranslation();
  const { genderOptions } = Statics();

  const {
    options: countryOptions,
    isPending: citizenshipPending,
    setSearch: setCitizenshipSearch
  } = useCitizenshipSearch();

  const getStatusOptions = () => {
    return [
      { label: t("statics.active"), value: "active" },
      { label: t("statics.inactive"), value: "inactive" }
    ];
  };

  return (
    <CommonPageFilterComponent
      title={t("statics.search-criteria")}
      className="grid grid-cols-5 gap-4"
      onClear={resetFilters}
    >
      <FRow label={t("table.fio")}>
        <HFInput
          prefix={<UserIcon />}
          control={control}
          name="full_name"
          placeholder={t("placeholder.fio")}
        />
      </FRow>
      <FRow label={t("inputs.series_passport")}>
        <HFInput
          prefix={<PassportIcon />}
          control={control}
          name="passport_number"
          placeholder={t("inputs.series_passport")}
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
      <FRow label={t("inputs.gender")}>
        <DebounceSelect
          control={control}
          name="gender"
          labelInValue
          filterOption={false}
          prefix={<UserIcon />}
          placeholder={t("placeholder.gender")}
          options={genderOptions}
          className="w-full"
        />
      </FRow>
      <FRow label={t("inputs.status")}>
        <HFSelect
          prefix={<UserIcon />}
          name="status"
          control={control}
          labelInValue
          suffixIcon={<SelectArrowDownIcon />}
          placeholder={t("placeholder.status_all")}
          options={getStatusOptions()}
        />
      </FRow>
    </CommonPageFilterComponent>
  );
};

export default MSearchFilterForm;
