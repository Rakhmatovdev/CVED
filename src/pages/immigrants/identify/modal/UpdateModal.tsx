import { useMutation } from "@tanstack/react-query";
import { notification, Spin } from "antd";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ImmigrantService from "@/pages/immigrants/service";
import { UpdateModalProps } from "@/pages/immigrants/type";
import { HFDatePicker } from "@/shared/ui/form-elements";
import { DebounceSelect } from "@/shared/ui/form-elements/HFDebounceSelect";
import HFInput from "@/shared/ui/form-elements/HFInput";
import FRow from "@/shared/ui/form-elements/HFRow";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon.tsx";
import LocationIcon from "@/shared/ui/icons/sufix/LocationIcon.tsx";
import UserIcon from "@/shared/ui/icons/UserIcon.tsx";
import { useCitizenshipSearch } from "@/utils/hooks/filter/useCitizenship.tsx";
import ImmigrantPhotoUpload from "./CUpload";

const UpdateModal: FC<UpdateModalProps> = ({
  setUpdate,
  prevData,
  refetchImmigrant
}) => {
  const { t } = useTranslation();
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      phone_number: prevData?.phone_number || "",
      email: prevData?.email || "",
      first_name: prevData?.first_name_in_passport || "",
      last_name: prevData?.last_name_in_passport || "",
      middle_name: prevData?.middle_name_in_passport || "",
      nationality: prevData?.nationality || "",
      gender: prevData?.gender
        ? {
            label:
              prevData.gender === "male"
                ? t("inputs.male")
                : t("inputs.female"),
            value: prevData.gender
          }
        : "",
      birth_date: prevData?.birth_date,
      fingerprint_token: prevData?.fingerprint_token || "",
      place_of_birth: prevData?.place_of_birth || "",
      passport_number: prevData?.passport_number || "",
      place_of_issue: prevData?.place_of_issue || "",
      date_of_issue: prevData?.date_of_issue || "",
      valid_until: prevData?.valid_until || "",
      arrival_date: prevData?.arrival_date || [],
      citizenship: prevData?.citizenship?.name || "",
      pinfl: prevData?.pinfl || "",
      photo: prevData?.photo || "",
      passport_front_side_photo: null,
      passport_back_side_photo: null
    }
  });

  useEffect(() => {
    if (prevData) {
      reset({
        phone_number: prevData?.phone_number || "",
        email: prevData?.email || "",
        first_name: prevData?.first_name_in_passport || "",
        last_name: prevData?.last_name_in_passport || "",
        middle_name: prevData?.middle_name_in_passport || "",
        nationality: prevData?.nationality || "",
        gender: prevData?.gender
          ? {
              label:
                prevData.gender === "male"
                  ? t("inputs.male")
                  : t("inputs.female"),
              value: prevData.gender
            }
          : "",
        birth_date: prevData?.birth_date,
        fingerprint_token: prevData?.fingerprint_token || "",
        place_of_birth: prevData?.place_of_birth || "",
        passport_number: prevData?.passport_number || "",
        place_of_issue: prevData?.place_of_issue || "",
        date_of_issue: prevData?.date_of_issue || "",
        valid_until: prevData?.valid_until || "",
        arrival_date: prevData?.arrival_date || [],
        citizenship: prevData?.citizenship?.name || "",
        pinfl: prevData?.pinfl || "",
        photo: prevData?.photo || "",
        passport_front_side_photo: null,
        passport_back_side_photo: null
      });
    }
  }, [prevData]);

  const {
    options: countryOptions,
    isPending: countriesPending,
    setSearch: setSearchCountry
  } = useCitizenshipSearch();

  const { mutate: mutateCreate, isPending: isLoadingCreate } = useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: any }) =>
      ImmigrantService.updateImmigrantpas(id, payload),
    onSuccess: () => {
      reset();
      notification.success({ message: t("notification.passport_up") });
      if (refetchImmigrant) {
        refetchImmigrant();
      }
      setUpdate(false);
    }
  });
  console.log("prevData", prevData);

  const onSubmit = (values: any) => {
    console.log("values", values);
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      middle_name: values.middle_name,
      birth_date: values.birth_date,
      citizenship: values.citizenship.key,
      place_of_birth: values.place_of_birth,
      date_of_issue: values.date_of_issue,
      valid_until: values.valid_until,
      place_of_issue: values.place_of_issue,
      passport_front_side_photo: values.passport_front_side_photo,
      passport_back_side_photo: values.passport_back_side_photo,
      passport_number: values.passport_number
    };
    console.log("payload", payload);

    mutateCreate({ id: prevData.id, payload });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Name fields */}
        <div className="flex gap-4">
          <FRow label={t("inputs.name")} required>
            <HFInput
              required
              prefix={<UserIcon />}
              control={control}
              name="first_name"
              placeholder={t("placeholder.name")}
            />
          </FRow>
          <FRow label={t("inputs.surname")} required>
            <HFInput
              required
              prefix={<UserIcon />}
              control={control}
              name="last_name"
              placeholder={t("placeholder.surname")}
            />
          </FRow>
        </div>
        {/* Middle name & Citizenship  */}
        <div className="flex gap-4">
          <FRow label={t("inputs.middle")}>
            <HFInput
              prefix={<UserIcon />}
              control={control}
              name="middle_name"
              placeholder={t("inputs.middle")}
            />
          </FRow>
          <FRow label={t("inputs.citizenship")}>
            <DebounceSelect
              control={control}
              name="citizenship"
              labelInValue
              filterOption={false}
              onSearch={setSearchCountry}
              prefix={<LocationIcon />}
              placeholder={t("placeholder.citizenship")}
              notFoundContent={countriesPending ? <Spin size="small" /> : null}
              options={countryOptions}
              className="w-full"
            />
          </FRow>
        </div>
        {/* Passport */}
        <div className="flex gap-4">
          <FRow label={t("table.passport")} required>
            <HFInput
              required
              control={control}
              name="passport_number"
              placeholder={t("placeholder.passport")}
              prefix={<UserIcon />}
            />
          </FRow>
          <FRow label={t("inputs.birthday")} required>
            <HFDatePicker
              required
              prefix={<CalendarIcon />}
              control={control}
              name="birth_date"
              placeholder={t("placeholder.birthday")}
            />
          </FRow>
        </div>
        {/* Dates */}
        <div className="flex gap-4">
          <FRow label={t("table.date_finish_passport")}>
            <HFDatePicker
              prefix={<CalendarIcon />}
              control={control}
              name="valid_until"
              placeholder={t("placeholder.date_finish_passport")}
            />
          </FRow>

          <FRow label={t("table.date-of-issue")}>
            <HFDatePicker
              prefix={<CalendarIcon />}
              control={control}
              name="date_of_issue"
              placeholder={t("placeholder.date_of_issue")}
            />
          </FRow>
        </div>
        {/* Issue & Birthd Place */}
        <div className="flex gap-4">
          <FRow label={t("table.place_issue")}>
            <HFInput
              control={control}
              name="place_of_issue"
              placeholder={t("placeholder.place_issue")}
              prefix={<UserIcon />}
            />
          </FRow>
          <FRow label={t("table.place_birth")}>
            <HFInput
              control={control}
              name="place_of_birth"
              placeholder={t("placeholder.place_birth")}
              prefix={<UserIcon />}
            />
          </FRow>
        </div>
        {/* Photo Uploads */}
        <div className="flex flex-col gap-4">
          <ImmigrantPhotoUpload
            name="passport_front_side_photo"
            control={control}
            title={t("uploads.passportFront")}
          />
          <ImmigrantPhotoUpload
            name="passport_back_side_photo"
            control={control}
            title={t("uploads.passportBack")}
          />
        </div>
        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            className="py-3 flex-1 border rounded-xl shadow-sm text-gray-600 dark:text-dvalue dark:bg-dbody dark:border-dborder"
            onClick={() => reset()}
          >
            {t("buttons.cancel")}
          </button>
          <button
            type="submit"
            disabled={isLoadingCreate}
            className="py-3 flex-1 bg-blue-600 text-white rounded-xl shadow-sm"
          >
            {isLoadingCreate ? <Spin /> : t("buttons.add")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateModal;
