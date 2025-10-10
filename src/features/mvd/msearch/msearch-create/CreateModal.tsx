import { useQuery } from "@tanstack/react-query";
import { Flex, Spin } from "antd";
import useApp from "antd/es/app/useApp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDebounce } from "use-debounce";
import { endpoints } from "@/shared/api/endpoints";
import { useAction } from "@/shared/hooks/use-action";
import HelperService from "@/shared/service/helper.ts";
import Button from "@/shared/ui/Button";
import { HFDatePicker } from "@/shared/ui/form-elements/HFDatePicker";
import { DebounceSelect } from "@/shared/ui/form-elements/HFDebounceSelect";
import HFInput from "@/shared/ui/form-elements/HFInput";
import FRow from "@/shared/ui/form-elements/HFRow";
import HFTextarea from "@/shared/ui/form-elements/HFTextarea";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon.tsx";
import LocationIcon from "@/shared/ui/icons/sufix/LocationIcon.tsx";
import PassportIcon from "@/shared/ui/icons/sufix/PassportIcon.tsx";
import UserIcon from "@/shared/ui/icons/UserIcon.tsx";

const CreateModal = ({ setShowModal }: { setShowModal: any }) => {
  const { t } = useTranslation();
  const { notification } = useApp();

  const { control, getValues } = useForm();

  const [citizenshipSearch, setCitizenshipSearch] = useState("");
  const [debouncedCitizenship] = useDebounce(citizenshipSearch, 900);

  const { data: citizen, isPending: citizenPending } = useQuery({
    queryKey: ["citizenship-search", debouncedCitizenship],
    queryFn: () => HelperService.helperCountry(debouncedCitizenship),
    enabled: !!debouncedCitizenship
  });

  const { data: initialCitizenshipData, isPending } = useQuery({
    queryKey: ["initial-citizenship"],
    queryFn: () => HelperService.helperCountry("")
  });

  const { mutateAsync } = useAction<
    {
      name: string;
      passport_number: string;
      birth_date: string;
      citizenship: string;
      comment: string;
    },
    any
  >({
    url: endpoints.immigrants.add,
    method: "post",
    refetchKeys: [["immigrants"]],
    onSuccess: () => {
      notification.success({ message: "Immigrant qo'shildi" });
    }
  });

  const onSubmit = () => {
    mutateAsync({
      name: getValues("full_name"),
      passport_number: getValues("passport_number"),
      birth_date: getValues("birth_date"),
      citizenship: getValues("citizenship").value,
      comment: getValues("comment")
    });
  };

  return (
    <Flex className="flex flex-col gap-[16px] pt-4 rounded-xl dark:bg-[#2B3048] dark:placeholder:text-dtext">
      <FRow label={t("inputs.citizenship")}>
        <DebounceSelect
          control={control}
          name="citizenship"
          labelInValue
          filterOption={false}
          onSearch={(value: any) => setCitizenshipSearch(value)}
          prefix={<LocationIcon />}
          placeholder={t("placeholder.citizenship")}
          notFoundContent={
            citizenPending || isPending ? <Spin size="small" /> : null
          }
          options={
            citizen?.results?.length
              ? citizen.results.map((item: any) => ({
                  label: item.name,
                  value: item.id
                }))
              : initialCitizenshipData?.results?.map((item: any) => ({
                  label: item.name,
                  value: item.id
                })) || []
          }
          className="w-full"
          defaultValue={citizen?.results[0]?.id}
        />
      </FRow>
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
      <FRow label={t("inputs.birthday")}>
        <HFDatePicker
          prefix={<CalendarIcon />}
          control={control}
          name="birth_date"
          placeholder={t("placeholder.birthday")}
        />
      </FRow>
      <FRow label={t("inputs.comment")}>
        <HFTextarea
          control={control}
          name="comment"
          rows={6}
          placeholder={t("placeholder.comment")}
          className="w-full dark:bg-[#2B3048] dark:border-[#3A405A] dark:placeholder:text-dtext dark:text-dvalue rounded-xl"
        />
      </FRow>

      <Flex align="center" justify="center" gap={12}>
        <Button
          size="lg"
          variant={"outline"}
          onClick={() => setShowModal(false)}
          className="w-[calc(50%-8px)]"
        >
          {t("buttons.canceled")}
        </Button>
        <Button
          size="lg"
          onClick={onSubmit}
          variant={"primary"}
          className="w-[calc(50%-8px)]"
        >
          {t("buttons.add")}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateModal;
