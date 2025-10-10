import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { MaxMinRegionData } from "@/pages/dashboard/type";
import CustomBadge from "@/shared/ui/CustomBadge";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon";

interface Props extends MaxMinRegionData {
  regions: MaxMinRegionData[];
}

const RegionCard = ({
  name,
  regions,
  value,
  isGrowth,
  byRoom,
  byBed,
  t
}: Props) => (
  <div className="bg-pureWhite transition rounded-xl shadow-sm  text-secondary dark:text-whiten      flex flex-col gap-2 border  border-ghostWhite  dark:bg-darkSlate dark:border-dborder">
    <div className="rounded-xl transition shadow-sm bg-white p-4 border-b dark:border-b-dborder  dark:bg-dbody">
      <h3 className="text-base font-semibold line-clamp-1 transition  dark:text-white">
        {name}
      </h3>
      <div className="flex justify-between mt-4 items-center">
        <p className="text-2xl font-semibold transition dark:text-white">
          {value}
        </p>
        <div className="w-[104px] h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={(() => {
                const currentIndex =
                  regions?.findIndex((item) => item.name === name) || 0;
                const totalPoints = 12;
                const halfPoints = Math.floor(totalPoints / 2);

                let start = Math.max(0, currentIndex - halfPoints);
                let end = Math.min(
                  regions?.length || 0,
                  currentIndex + halfPoints + 1
                );

                const pointsBefore = currentIndex - start;
                const pointsAfter = end - currentIndex - 1;

                if (pointsBefore < halfPoints) {
                  end = Math.min(
                    regions?.length || 0,
                    end + (halfPoints - pointsBefore)
                  );
                }
                if (pointsAfter < halfPoints) {
                  start = Math.max(0, start - (halfPoints - pointsAfter));
                }

                return regions?.slice(start, end).map((item, index) => ({
                  name: item.name,
                  value: item.value,
                  showDot: item.name === name,
                  timeLabel:
                    start + index === 0
                      ? "Birinchi oy"
                      : start + index === (regions?.length || 0) - 1
                        ? "Oxirgi oy"
                        : `${start + index + 1}-oy`
                }));
              })()}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              className="[&_.recharts-cartesian-axis]:hidden"
            >
              <defs>
                <linearGradient
                  id={`chartGradient-${name.replace(/\s+/g, "-")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={isGrowth ? "#10B981" : "#D92D20"}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="50%"
                    stopColor={isGrowth ? "#10B981" : "#D92D20"}
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="100%"
                    stopColor={isGrowth ? "#10B981" : "#D92D20"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={isGrowth ? "#10B981" : "#D92D20"}
                strokeWidth={1.5}
                fillOpacity={1}
                fill={`url(#chartGradient-${name.replace(/\s+/g, "-")})`}
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-out"
                connectNulls={true}
                dot={(props) => {
                  const { showDot } = props.payload;
                  if (!showDot) return null;

                  return (
                    <>
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={7}
                        fill="#FFFFFF"
                        stroke={isGrowth ? "#10B981" : "#EF4444"}
                        strokeWidth={1.5}
                        opacity={0.2}
                      />
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={4}
                        fill="#FFFFFF"
                        stroke={isGrowth ? "#10B981" : "#EF4444"}
                        strokeWidth={2}
                      />
                    </>
                  );
                }}
                activeDot={{
                  r: 4,
                  stroke: isGrowth ? "#10B981" : "#EF4444",
                  strokeWidth: 2,
                  fill: "#FFFFFF"
                }}
                style={{
                  transition: "all 0.5s ease-out"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    <div className="p-3">
      <div className="flex justify-between items-center">
        <div className="text-xs transition text-mediumGray dark:text-dtext">
          {t("statics.by-number")}
        </div>
        <div className="text-xs transition font-medium dark:text-dvalue">
          {byRoom}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-xs transition text-mediumGray dark:text-dtext">
          {t("statics.by-bed")}
        </div>
        <div className="text-xs transition font-medium dark:text-dvalue">
          {byBed}
        </div>
      </div>
    </div>
  </div>
);

export default function Maxmin() {
  const { t } = useTranslation();
  const regions: MaxMinRegionData[] = [
    {
      name: t("region_uz.AN_full"), // Андижанская область
      value: 16.9,
      isGrowth: true,
      byRoom: 12,
      byBed: 4.9
    },
    {
      name: t("region_uz.BU_full"), // Бухарская область
      value: 20.2,
      isGrowth: false,
      byRoom: 10,
      byBed: 10.2
    },
    {
      name: t("region_uz.JI_full"), // Джизакская область
      value: 9.7,
      isGrowth: true,
      byRoom: 3.5,
      byBed: 6.2
    },
    {
      name: t("region_uz.QA_full"), // Кашкадарьинская область
      value: 15.3,
      isGrowth: false,
      byRoom: 10,
      byBed: 5.3
    },
    {
      name: t("region_uz.NW_full"), // Навоийская область
      value: 21.7,
      isGrowth: false,
      byRoom: 12.2,
      byBed: 9.5
    },
    {
      name: t("region_uz.NG_full"), // Наманганская область
      value: 13.9,
      isGrowth: true,
      byRoom: 3.9,
      byBed: 10
    },
    {
      name: t("region_uz.SA_full"), // Самаркандская область
      value: 28.7,
      isGrowth: false,
      byRoom: 14.2,
      byBed: 14.5
    },
    {
      name: t("region_uz.SU_full"), // Сурхандарьинская область
      value: 31.5,
      isGrowth: true,
      byRoom: 31,
      byBed: 0.5
    },
    {
      name: t("region_uz.SI_full"), // Сырдарьинская область
      value: 33.9,
      isGrowth: true,
      byRoom: 20,
      byBed: 13.9
    },
    {
      name: t("region_uz.TO_full"), // Ташкентская область
      value: 20.9,
      isGrowth: false,
      byRoom: 9.9,
      byBed: 11
    },
    {
      name: t("region_uz.FA_full"), // Ферганская область
      value: 25.9,
      isGrowth: false,
      byRoom: 15,
      byBed: 10.9
    },

    {
      name: t("region_uz.XO_full"), // Хорезмская область
      value: 11.2,
      isGrowth: false,
      byRoom: 1.2,
      byBed: 10
    }
  ];

  return (
    <div className="w-full transition p-4 max-3xl:mb-4 3xl:mt-4 rounded-2xl border border-ghostWhite shadow-sm bg-white dark:bg-dcontent dark:border-dborder ">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className=" text-xl transition 2xl:text-2xl text-grayed font-semibold dark:text-white ">
            {t("statics.hotel_occupancy_by_region_title")}
          </h2>
          <DatePicker
            format="DD MMM YYYY"
            value={dayjs("2025-08-16")}
            placeholder="Sana"
            suffixIcon={false}
            onChange={(e) => console.log(e)}
            prefix={<CalendarIcon className="text-mistyGray" />}
            size="large"
            className=" dark:border-dborder dark:bg-dcontent dark:text-dtext"
          />
        </div>

        <CustomBadge>{t("statics.realtime")}</CustomBadge>
      </div>

      <div className="grid grid-cols-4 3xl:grid-cols-6 gap-2 3xl:gap-3 justify-between">
        {regions.map((region, idx) => (
          <RegionCard t={t} key={idx} {...region} regions={regions} />
        ))}
      </div>
    </div>
  );
}
