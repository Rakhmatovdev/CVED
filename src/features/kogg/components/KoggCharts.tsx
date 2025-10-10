import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PieChart } from "@/features/dashboard-stats";
import CityChartRecharts from "@/features/dashboard-stats/ui/TopCity.tsx";
import PureGuestsChart from "./PureGuestsChart";

function KoggCharts() {
  const { t } = useTranslation();

  const countryData = useMemo(
    () => [
      { name: "Казахстан", value: 12785 },
      { name: "Казахстан", value: 12785 },
      { name: "Казахстан", value: 12785 },
      { name: "Казахстан", value: 12785 },
      { name: "Казахстан", value: 12785 },
      { name: "Казахстан", value: 12785 },
      { name: "Россия", value: 16785 }
    ],
    [{ t }]
  );

  const chartDescription = useMemo(
    () => (
      <div>
        <h3 className="text-[#1F2937] text-sm 2xl:text-base dark:text-white">
          {t("statics.total-number-of-immigrants")}
        </h3>
        <p className="text-[#1F2937] text-base 2xl:text-3xl font-bold dark:text-white">
          16 785
        </p>
      </div>
    ),
    [{ t }]
  );

  const barColors = useMemo(() => ["#F5913E", "#FDC775"], [{ t }]);

  return (
    <div className="flex gap-4  mt-6">
      <CityChartRecharts
        title={t("statics.top-country-from-come")}
        description={chartDescription}
        data={countryData}
        barColor={barColors}
        className=" 3xl:h-[165px] 3xl:mt-4 h-[112px]"
        wrapperClassName="w-[calc(50%-125px)]"
        // className={'h-[calc(40vh-215px)] '}
      />
      <PieChart
        title={t("statics.immigrant-by-gender")}
        wrapperClassName="a3xl:w-[450px] w-[350px] "
        className="h-[120px] 2xl:h-[180px]"
      />
      <PureGuestsChart
        title={t("statics.total-arrived-departed")}
        wrapperClassName="w-[calc(50%-125px)]"
        className="3xl:h-[230px] 2xl:h-[230px] 2xl:mt-6 mt-2 h-[152px] "
      />
    </div>
  );
}
export default memo(KoggCharts);
