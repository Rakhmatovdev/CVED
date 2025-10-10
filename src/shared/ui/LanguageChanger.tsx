import { Dropdown } from "antd";
import { useEffect } from "react";
import { useCurrentLang } from "@/widgets/app-header/model/store";
import queryClient from "../config/query-client";

const languageOptions = [
  { value: "uz", label: "O'zbek" },
  { value: "ru", label: "Русский" }
  // { value: "en", label: "English" },
  // { value: "uz-cyrillic", label: "Ўзбек" }
];

export const LanguageChanger = () => {
  const lang = useCurrentLang((state) => state.lang);
  const setLang = useCurrentLang((state) => state.setLang);

  const items = languageOptions.map((lng) => ({
    key: lng.value,
    label: (
      <button
        onClick={() => {
          setLang(lng.value);
        }}
        className="w-full transition text-left px-3 py-1 hover:bg-gray-100 dark:hover:bg-[#3A405A] dark:text-white text-sm"
      >
        {lng.label}
      </button>
    )
  }));

  useEffect(() => {
    queryClient.invalidateQueries({ refetchType: "active" });
  }, [lang]);

  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
      <button className="size-[39px] transition bg-[#F8FAFC] dark:text-white dark:bg-[#343950] rounded-lg flex items-center justify-center text-[12px] font-semibold uppercase">
        {lang}
      </button>
    </Dropdown>
  );
};
