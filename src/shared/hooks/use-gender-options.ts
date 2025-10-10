import { useTranslation } from "react-i18next";

export const useGenderOptions = () => {
  const { t } = useTranslation();
  return {
    genderOptions: [
      { label: t("inputs.male"), value: "0" },
      { label: t("inputs.female"), value: "1" }
    ]
  };
};
