import { Flex, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/Button";
import { Flag } from "@/shared/ui/Flag";
import FRow from "@/shared/ui/form-elements/HFRow";
import HFTextarea from "@/shared/ui/form-elements/HFTextarea";
import { showWarningMessage } from "@/utils/showWarningMessage";

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8
};

interface UpdateSModalProps {
  setShowUpdateModal: (value: string) => void;
}

const UpdateSModal: React.FC<UpdateSModalProps> = ({ setShowUpdateModal }) => {
  const [value, setValue] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    showWarningMessage();
  }, []);

  const { control } = useForm({
    defaultValues: {
      full_name: "",
      passport_number: "",
      citizenship: {
        label: "",
        name: "",
        value: null,
        alpha2_code: ""
      },
      birt_date: "",
      comment: ""
    }
  });

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className="space-y-5 mt-4">
      <div className="flex items-center justify-between">
        <p className="text-[#6B7280] font-medium dark:text-dtext">Ф.И.О</p>
        <p className="text-[#1F2937] dark:text-dvalue">
          АЗИМОВА САМИЯ АЛИМЖАНОВНА
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#6B7280] font-medium dark:text-dtext">
          {t("table.nationality")}
        </p>
        <p className="flex items-center">
          <Flag code="ru" size="sm" />
          <span className="ml-2 text-[#1F2937] dark:text-dvalue">
            Российская Федерация
          </span>
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#6B7280] font-medium dark:text-dtext">
          {t("table.birthday")}
        </p>
        <p className="text-[#1F2937] dark:text-dvalue">31.12.1980</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#6B7280] font-medium dark:text-dtext">
          {t("table.passport")}
        </p>
        <p className="text-[#1F2937] dark:text-dvalue">AB1278511</p>
      </div>
      <hr className={"bg-[#CCC] h-[1px] border-none dark:bg-dborder"} />
      <div>
        <p className="text-xl font-semibold dark:text-dvalue ">
          {t("inputs.status")}
        </p>
        <Radio.Group
          style={style}
          onChange={onChange}
          value={value}
          options={[
            {
              value: 1,
              label: <p className={"dark:text-dvalue"}>{t("modal.notfound")}</p>
            },
            {
              value: 2,
              label: <p className={"dark:text-dvalue"}>{t("modal.found")}</p>
            },
            {
              value: 3,
              label: (
                <p className={"dark:text-dvalue"}>{t("statics.departed")}</p>
              )
            }
          ]}
        />
      </div>
      <Flex className="flex flex-col gap-[16px] bg-white dark:bg-dcontent rounded-xl">
        <FRow label={t("inputs.comment")}>
          <HFTextarea
            control={control}
            name="comment"
            placeholder={t("placeholder.comment")}
            rows={6}
            className="w-full dark:bg-dcontent my-border dark:border-dborder placeholder:text-dtext dark:text-dvalue rounded-xl"
          />
        </FRow>
        <Flex gap={12}>
          <Button
            size="lg"
            variant="default"
            onClick={() => setShowUpdateModal("")}
            className="w-[calc(50%-8px)]"
          >
            {t("buttons.canceled")}
          </Button>
          <Button size="lg" variant="primary" className="w-[calc(50%-8px)]">
            {t("buttons.add")}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default UpdateSModal;
