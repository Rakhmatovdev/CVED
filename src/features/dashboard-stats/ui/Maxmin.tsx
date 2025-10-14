import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { MaxMinRegionData } from "@/pages/dashboard/type";
import CustomBadge from "@/shared/ui/CustomBadge";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon";

interface Props extends MaxMinRegionData {
  regions: MaxMinRegionData[];
  t: any;
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
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="relative overflow-hidden bg-white dark:bg-darkSlate rounded-2xl
      border border-gray-100 dark:border-dborder p-4 shadow-sm
      transition-all duration-300 group"
  >
    {/* Gradient accent background */}
    <div
      className="absolute top-0 left-0 w-full h-2 rounded-t-2xl transition-all duration-300
      group-hover:h-4"
      style={{
        background: isGrowth
          ? "linear-gradient(to right, #34D399, #10B981)"
          : "linear-gradient(to right, #F87171, #EF4444)"
      }}
    />

    <div className="relative z-10 mt-2">
      <h3 className="text-base font-semibold dark:text-white truncate">
        {name}
      </h3>

      <div className="flex justify-between mt-4 items-center">
        <p
          className={`text-2xl font-bold ${
            isGrowth ? "text-emeraldGreen" : "text-red-500"
          } dark:text-white`}
        >
          {value}
        </p>

        <div className="w-[100px] h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={regions.slice(0, 8).map((item) => ({
                name: item.name,
                value: item.value
              }))}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
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
                    stopColor={isGrowth ? "#10B981" : "#EF4444"}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor={isGrowth ? "#10B981" : "#EF4444"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={isGrowth ? "#10B981" : "#EF4444"}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#chartGradient-${name.replace(/\s+/g, "-")})`}
                isAnimationActive
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Bottom stats */}
    <div className="mt-4 border-t border-gray-100 dark:border-dborder pt-3">
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-300">
        <span>{t("statics.by-number")}</span>
        <span className="font-medium dark:text-white">{byRoom}</span>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-300">
        <span>{t("statics.by-bed")}</span>
        <span className="font-medium dark:text-white">{byBed}</span>
      </div>
    </div>
  </motion.div>
);

export default function Maxmin() {
  const { t } = useTranslation();

  const regions: MaxMinRegionData[] = [
    { name: t("region_uz.AN_full"), value: 16.9, isGrowth: true, byRoom: 12, byBed: 4.9 },
    { name: t("region_uz.BU_full"), value: 20.2, isGrowth: false, byRoom: 10, byBed: 10.2 },
    { name: t("region_uz.JI_full"), value: 9.7, isGrowth: true, byRoom: 3.5, byBed: 6.2 },
    { name: t("region_uz.QA_full"), value: 15.3, isGrowth: false, byRoom: 10, byBed: 5.3 },
    { name: t("region_uz.NW_full"), value: 21.7, isGrowth: false, byRoom: 12.2, byBed: 9.5 },
    { name: t("region_uz.NG_full"), value: 13.9, isGrowth: true, byRoom: 3.9, byBed: 10 },
    { name: t("region_uz.SA_full"), value: 28.7, isGrowth: false, byRoom: 14.2, byBed: 14.5 },
    { name: t("region_uz.SU_full"), value: 31.5, isGrowth: true, byRoom: 31, byBed: 0.5 },
    { name: t("region_uz.SI_full"), value: 33.9, isGrowth: true, byRoom: 20, byBed: 13.9 },
    { name: t("region_uz.TO_full"), value: 20.9, isGrowth: false, byRoom: 9.9, byBed: 11 },
    { name: t("region_uz.FA_full"), value: 25.9, isGrowth: false, byRoom: 15, byBed: 10.9 },
    { name: t("region_uz.XO_full"), value: 11.2, isGrowth: false, byRoom: 1.2, byBed: 10 }
  ];

  return (
    <div className="w-full p-5 rounded-2xl border dark:bg-[#181B29] border-gray-100 dark:border-dborder shadow-sm
      bg-white  transition">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-grayed dark:text-white">
            {t("statics.hotel_occupancy_by_region_title")}
          </h2>

          <DatePicker
            format="DD MMM YYYY"
            value={dayjs("2025-08-16")}
            suffixIcon={false}
            prefix={<CalendarIcon className="text-gray-400" />}
            size="large"
            className="dark:border-dborder dark:bg-dcontent dark:text-dtext"
          />
        </div>
        <CustomBadge>{t("statics.realtime")}</CustomBadge>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
          }
        }}
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 gap-3"
      >
        {regions.map((region, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <RegionCard t={t} {...region} regions={regions} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
