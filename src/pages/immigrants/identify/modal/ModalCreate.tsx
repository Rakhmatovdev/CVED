import { useMutation } from "@tanstack/react-query";
import { Flex, Modal, notification, Spin } from "antd";
import { useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useCameraStore } from "@/features/camera/model/store.ts";
// import ImmigrantPhotoUpload from "@/pages/immigrants/identify/modal/CUpload.tsx";
// import ImmigrantPhotoUpload from "@/pages/immigrants/identify/modal/CUpload";
import HandUploader from "@/pages/immigrants/identify/modal/handupload";
import ImmigrantService from "@/pages/immigrants/service";
import {
  CreateFormValues,
  CreateImmigrantPayload
} from "@/pages/immigrants/type";
import Button from "@/shared/ui/Button";
import { HFDatePicker } from "@/shared/ui/form-elements/HFDatePicker";
import { DebounceSelect } from "@/shared/ui/form-elements/HFDebounceSelect";
import HFInput from "@/shared/ui/form-elements/HFInput";
import FRow from "@/shared/ui/form-elements/HFRow";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon";
import LocationIcon from "@/shared/ui/icons/sufix/LocationIcon.tsx";
import PassportIcon from "@/shared/ui/icons/sufix/PassportIcon.tsx";
import UserIcon from "@/shared/ui/icons/UserIcon.tsx";
import { useCitizenshipSearch } from "@/utils/hooks/filter/useCitizenship.tsx";
import { useNationalitySearch } from "@/utils/hooks/filter/useNationality.tsx";
// import WebcamWithMask from "./WebCam";
import PassportPhotoValidator from "@/utils/Passport-photo/passport-photo.tsx";
import { Statics } from "@/utils/statics";
import ImmigrantPhotoUpload from "@/pages/immigrants/identify/modal/CUpload.tsx";

const DEFAULT_TIMEOUT = 10000;

const ModalCreate = ({ refetch }: any) => {
  const { t } = useTranslation();
  const [create, setCreate] = useQueryState("create_arrived", {
    defaultValue: "false"
  });

  const { control, reset, getValues } = useForm<CreateFormValues>({
    defaultValues: {
      phone_number: "",
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      nationality: undefined,
      gender: undefined,
      birth_date: "",
      place_of_birth: "",
      passport_number: "",
      first_name_in_passport: "",
      last_name_in_passport: "",
      middle_name_in_passport: "",
      place_of_issue: "",
      date_of_issue: "",
      valid_until: "",
      arrival_date: [],
      fingerprints: {
        right_thumb: undefined,
        right_index: undefined,
        right_middle: undefined,
        right_ring: undefined,
        right_little: undefined,
        left_thumb: undefined,
        left_index: undefined,
        left_middle: undefined,
        left_ring: undefined,
        left_little: undefined
      },
      citizenship: undefined,
      pinfl: "",
      photo: undefined,
      passport_front_side_photo: undefined,
      passport_back_side_photo: undefined
    }
  });

  const { isSuccess: isCameraSuccess, setCameraVisibility } = useCameraStore();

  const {
    options: countryOptions,
    isPending: countriesPending,
    setSearch: setSearchCountry
  } = useCitizenshipSearch();

  const {
    options: nationalityOptions,
    isPending: nationalitiesPending,
    setSearch: setSearchNationality
  } = useNationalitySearch();

  const { genderOptions } = Statics();

  useEffect(() => {
    if (create === "true") {
      setCameraVisibility(true);
    } else {
      setCameraVisibility(false);
    }
  }, [create, setCameraVisibility]);

  const withTimeout = useCallback(
    <T,>(promise: Promise<T>, timeout = DEFAULT_TIMEOUT): Promise<T> => {
      let timeoutId: NodeJS.Timeout;
      const timeoutPromise = new Promise<T>((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new Error(`Operation timed out after ${timeout}ms`)),
          timeout
        );
      });
      return Promise.race([promise, timeoutPromise]).finally(() => {
        clearTimeout(timeoutId);
      });
    },
    []
  );

  const { mutate: mutateCreate, isPending: isLoadingCreate } = useMutation({
    mutationFn: (data: CreateImmigrantPayload) =>
      withTimeout(ImmigrantService.createImmigrant(data)),
    onSuccess: () => {
      refetch();
      reset();
      notification.success({ message: t("notification.arm_success") });
      setCreate("arrived");
    },
    onError: () => {
      // notification.error({
      //   message: t("notification.arm_failed"),
      //   description: error.message
      // });
    }
  });

  const onSubmit = useCallback(() => {
    const values = getValues();
    if (!values.gender?.value) {
      notification.error({ message: t("errors.gender_required") });
      return;
    }
    if (!values.citizenship?.value) {
      notification.error({ message: t("errors.citizenship_required") });
      return;
    }
    if (!values.photo) {
      notification.error({ message: t("errors.photo_required") });
      return;
    }
    if (isCameraSuccess) {
      notification.error({ message: t("errors.face_detection") });
      return;
    }

    const payload: CreateImmigrantPayload = {
      phone_number: values.phone_number,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      middle_name: values.middle_name,
      nationality: values.nationality?.value,
      gender: values.gender?.value,
      birth_date: values.birth_date,
      place_of_birth: values.place_of_birth,
      passport_number: values.passport_number,
      place_of_issue: values.place_of_issue,
      date_of_issue: values.date_of_issue,
      valid_until: values.valid_until,
      citizenship_id: values.citizenship?.value,
      fingerprints: {
        right_thumb: values.right_thumb,
        right_index: values.right_index,
        right_middle: values.right_middle,
        right_ring: values.right_ring,
        right_little: values.right_little,
        left_thumb: values.left_thumb,
        left_index: values.left_index,
        left_middle: values.left_middle,
        left_ring: values.left_ring,
        left_little: values.left_little
      },
      arrival_date: values.arrival_date,
      pinfl: values.pinfl,
      photo: values.photo,
      passport_front_side_photo: values.passport_front_side_photo,
      passport_back_side_photo: values.passport_back_side_photo
    };

    mutateCreate(payload);
  }, [mutateCreate, t]);

  const handleCancel = useCallback(() => {
    setCreate("arrived");
    reset();
  }, [reset, setCreate]);

  return (
    <Modal
      open={create === "true"}
      title={t("statics.create_new")}
      onCancel={() => setCreate("false")}
      footer={null}
      width={756}
      centered
    >
      <div className="space-y-6">
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

          <div className="flex gap-4">
            <FRow label={t("inputs.middle")} required>
              <HFInput
                required
                prefix={<UserIcon />}
                control={control}
                name="middle_name"
                placeholder={t("inputs.middle")}
              />
            </FRow>
            <FRow label={t("table.nationality")}>
              <DebounceSelect
                control={control}
                name="nationality"
                labelInValue
                filterOption={false}
                onSearch={setSearchNationality}
                prefix={<LocationIcon />}
                placeholder={t("placeholder.nationality")}
                notFoundContent={
                  nationalitiesPending ? <Spin size="small" /> : null
                }
                options={nationalityOptions}
                className="w-full"
              />
            </FRow>
          </div>

          {/* Passport & PINFL */}
          <Flex gap={16}>
            <FRow label={t("table.passport")} required>
              <HFInput
                prefix={<PassportIcon />}
                required
                control={control}
                name="passport_number"
                placeholder={t("placeholder.passport")}
              />
            </FRow>
            <FRow label={t("table.pinfl")}>
              <HFInput
                control={control}
                prefix={<PassportIcon />}
                name="pinfl"
                placeholder={t("placeholder.pinfl")}
              />
            </FRow>
          </Flex>

          <Flex gap={16}>
            <FRow label={t("table.date_finish_passport")}>
              <HFDatePicker
                prefix={<CalendarIcon />}
                control={control}
                name="valid_until"
                placeholder={t("placeholder.date_finish_passport")}
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
            <FRow label={t("table.date-of-issue")}>
              <HFDatePicker
                prefix={<CalendarIcon />}
                control={control}
                name="date_of_issue"
                placeholder={t("placeholder.date_of_issue")}
              />
            </FRow>
          </Flex>

          <Flex gap={16}>
            <FRow label={t("inputs.gender")} required>
              <DebounceSelect
                control={control}
                name="gender"
                labelInValue
                filterOption={false}
                placeholder={t("placeholder.gender")}
                options={genderOptions}
                className="w-full "
              />
            </FRow>
            <FRow label={t("inputs.citizenship")} required>
              <DebounceSelect
                control={control}
                name="citizenship"
                labelInValue
                filterOption={false}
                onSearch={setSearchCountry}
                placeholder={t("placeholder.citizenship")}
                notFoundContent={
                  countriesPending ? <Spin size="small" /> : null
                }
                options={countryOptions}
                className="w-full"
              />
            </FRow>
          </Flex>

          {/* Issue & Birth Placed */}
          <Flex gap={16}>
            <FRow label={t("table.place_issue")}>
              <HFInput
                control={control}
                name="place_of_issue"
                placeholder={t("placeholder.place_issue")}
              />
            </FRow>
            <FRow label={t("table.place_birth")}>
              <HFInput
                control={control}
                name="place_of_birth"
                placeholder={t("placeholder.place_birth")}
              />
            </FRow>
          </Flex>

          {/*Photo Uploads */}
          {process.env.NODE_ENV === "production" ? (
            // <WebcamWithMask name="photo" control={control} />
            <PassportPhotoValidator />
          ) : (
            <div className="space-y-4">
              <ImmigrantPhotoUpload
                name="photo"
                control={control}
                title={"Фотография иммигранта"}
                required
              />
              <ImmigrantPhotoUpload
                name="passport_front_side_photo"
                control={control}
                title={"Копия паспорта"}
                required
              />
            </div>
            // <PassportPhotoValidator />
          )}
          <HandUploader control={control} />
        </div>

        <Flex gap={16} className="mt-10">
          <Button
            variant="outline"
            onClick={handleCancel}
            size="lg"
            className="w-[calc(50%-8px)]"
          >
            {t("buttons.cancel")}
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isLoadingCreate}
            size="lg"
            variant="primary"
            className="w-[calc(50%-8px)]"
            loading={isLoadingCreate}
          >
            {t("buttons.add")}
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default ModalCreate;
