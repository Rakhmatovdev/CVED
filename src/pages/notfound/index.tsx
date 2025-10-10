import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import SearchI from "@/shared/ui/icons/search/SearchI.tsx";

const PageNotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      className="h-screen w-full bg-[#F8FAFC] dark:bg-[#1E2035] p-8"
    >
      <div className="text-center">
        <h1 className="text-[72px] font-bold text-[#374151] dark:text-[#E5E7EB]">
          404
        </h1>
        <p className="text-[24px] font-semibold text-[#4B5563] dark:text-[#9CA3AF] mt-2">
          {t("errors.page_not_found", "Страница не найдена")}
        </p>
        <p className="text-[16px] text-[#6B7280] dark:text-[#D1D5DB] mt-4">
          {t("errors.try_search", "Страница не найдена или была перемещена.")}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-600"
        >
          <SearchI />
          <span>{t("buttons.go_home", "На главную")}</span>
        </button>
      </div>
    </Flex>
  );
};

export default PageNotFound;
