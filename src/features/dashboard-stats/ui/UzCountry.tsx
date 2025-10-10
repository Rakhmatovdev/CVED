import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomBadge from "@/shared/ui/CustomBadge";
import MapOne from "./MapOne";
import MapUzbekistan from "./MapUzbekistan";

const regions = [
  {
    label: "region_uz.TO",
    value: "1 287",
    byBed: "127",
    byRoom: "911"
  },
  {
    label: "region_uz.FA",
    value: "1 312",
    byBed: "31",
    byRoom: "12"
  },
  {
    label: "region_uz.QR",
    value: "1 312412",
    byBed: "31",
    byRoom: "12"
  },
  {
    label: "region_uz.NW",
    value: "1 123",
    byBed: "31",
    byRoom: "12"
  },
  {
    label: "region_uz.SA",
    value: "1 43",
    byBed: "31",
    byRoom: "12"
  },

  {
    label: "region_uz.QA",
    value: "1 123",
    byBed: "31",
    byRoom: "12"
  },
  {
    label: "region_uz.BU",
    value: "1 6456",
    byBed: "31",
    byRoom: "12"
  },
  {
    label: "region_uz.XO",
    value: "1 4564",
    byBed: "31",
    byRoom: "12"
  },
  {
    label: "region_uz.JI",
    value: "1 3",
    byBed: "31",
    byRoom: "12"
  },

  {
    label: "region_uz.SI",
    value: "1 121",
    byBed: "31",
    byRoom: "12"
  },
  {
    label: "region_uz.AN",
    value: "1 432",
    byBed: "31",
    byRoom: "12"
  },
  {
    label: "region_uz.NG",
    value: "1 312",
    byBed: "31",
    byRoom: "12"
  },
  {
    label: "region_uz.TK",
    value: "1 099",
    byBed: "31",
    byRoom: "12"
  }
];

const UzCountry = () => {
  const { t } = useTranslation();
  const [activeRegion, setActiveRegion] = useState("region_uz.TO");

  const [activeRegionData, setActiveRegionData] = useState({
    name: t("region_uz.TO"),
    value: "1 287",
    byBed: "127",
    byRoom: "911"
  });

  const handleActiveRegionData = (regionName: string) => {
    setActiveRegion(regionName);
    const regionData = regions.find((region) => region.label === regionName);
    setActiveRegionData({
      name: t(regionName),
      value: regionData?.value,
      byBed: regionData?.byBed,
      byRoom: regionData?.byRoom
    });
  };

  const thisYear = new Date().toISOString().split("T")[0];

  return (
    <div className="card_main p-4 w-1/2 transition">
      <div className="space-y-2 mb-4">
        <h2 className="text-xl transition 2xl:text-2xl font-semibold text-grayed dark:text-white">
          {t("statics.uz_for")} {dayjs(thisYear).format("MM.dd.yyy")}{" "}
          {t("statics.uz_by")}
        </h2>
        <CustomBadge>{t("statics.realtime")}</CustomBadge>
      </div>

      <div className="grid grid-cols-3 gap-2 relative mt-6">
        <div className="col-span-2">
          <MapUzbekistan
            setActiveRegion={handleActiveRegionData}
            activeRegion={activeRegion}
          />
        </div>
        {activeRegion.length > 1 && (
          <div className="transition-all duration-500 absolute -top-8 right-0 bg-pureWhite rounded-xl shadow-sm text-secondary  flex flex-col  border w-[180px] h-fit 3xl:w-[240px] border-ghostWhite dark:bg-darkSlate dark:border-dborder">
            <div className="rounded-xl bg-white transition p-4 border-b dark:border-b-dborder  dark:bg-dbody">
              <h3 className="text-sm font-medium  transition line-clamp-1 dark:text-white">
                {activeRegionData.name}
              </h3>
              <div className="flex justify-between mt-[6px] items-center">
                <p className="text-xl font-semibold transition dark:text-white">
                  {activeRegionData.value}
                </p>
                <div className="w-10 h-10">
                  <MapOne activeRegion={activeRegion} />
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs transition text-mediumGray dark:text-dtext">
                  {t("statics.foreigners")}
                </h3>
                <p className="text-xs transition font-medium dark:text-white">
                  {activeRegionData.byRoom}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <h3 className="text-xs transition text-mediumGray dark:text-dtext">
                  {t("statics.local")}
                </h3>
                <p className="text-xs transition font-medium dark:text-white">
                  {activeRegionData.byBed}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UzCountry;
