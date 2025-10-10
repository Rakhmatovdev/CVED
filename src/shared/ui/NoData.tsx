import { useTranslation } from "react-i18next";
import SearchI from "./icons/search/SearchI";

interface Props {
  title?: string;
  description?: string;
  CTA?: React.ReactNode;
  icon?: React.ReactNode;
}

const NoData = ({ title, description, CTA, icon }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex transition items-center justify-center w-full h-full py-20">
      <div className="flex items-center flex-col justify-center mx-auto ">
        <div className="flex items-center justify-center transition size-16 border bg-white rounded-3xl dark:bg-[#2B3048]">
          {icon || <SearchI size={38} />}
        </div>
        <p className="text-2xl transition mt-1 text-[#232E40] font-semibold dark:text-white">
          {title || t("statics.title")}
        </p>
        <p className="w-80 mt-1 transition text-center text-[#777E90] leading-[22.4px] ">
          {description || t("statics.text")}
        </p>
        {CTA && <div className="py-4">{CTA}</div>}
      </div>
    </div>
  );
};

export default NoData;
