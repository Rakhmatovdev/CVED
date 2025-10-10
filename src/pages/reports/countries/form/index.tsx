import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useState } from "react";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";
import HelperService from "@/shared/service/helper";
import { ArmValues, CitizenshipData } from "@/shared/types/form.type";
import { HFDatePicker } from "@/shared/ui/form-elements";
import { DebounceSelect } from "@/shared/ui/form-elements/HFDebounceSelect";
import HFInput from "@/shared/ui/form-elements/HFInput";
import FRow from "@/shared/ui/form-elements/HFRow";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon";
import LocationIcon from "@/shared/ui/icons/sufix/LocationIcon";
import UserIcon from "@/shared/ui/icons/UserIcon";

const ArmFilterForm = ({ control }: { control: Control<ArmValues> }) => {
  const { t } = useTranslation();
  const [citizenshipSearch, setCitizenshipSearch] = useState("");
  const [debouncedCitizenship] = useDebounce(citizenshipSearch, 900);

  const { data: citizenshipData, isPending: citizenshipPending } = useQuery({
    queryKey: ["citizenship-data", debouncedCitizenship],
    queryFn: () => HelperService.helperCountry(debouncedCitizenship || "")
  });

  return (
    <div className="grid grid-cols-7 gap-4">
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
      <FRow label={t("inputs.surname")}>
        <HFInput
          control={control}
          name="last_name"
          prefix={<UserIcon />}
          placeholder={t("placeholder.surname")}
        />
      </FRow>
      <FRow label={t("inputs.name")}>
        <HFInput
          control={control}
          name="first_name"
          prefix={<UserIcon />}
          placeholder={t("placeholder.name")}
        />
      </FRow>
      <FRow label={t("inputs.middle_name")}>
        <HFInput
          control={control}
          name="middle_name"
          prefix={<UserIcon />}
          placeholder={t("placeholder.middle_name")}
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
          options={(citizenshipData?.results || []).map(
            (c: CitizenshipData) => ({
              label: c.name,
              value: c.id
            })
          )}
        />
      </FRow>
    </div>
  );
};

export default ArmFilterForm;
