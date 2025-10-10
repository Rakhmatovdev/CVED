import { Flex } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { GuestDataItem } from "@/pages/dashboard/type";
import CustomBadge from "@/shared/ui/CustomBadge";

const GuestsChart: React.FC = () => {
  const { t } = useTranslation();
  const data: GuestDataItem[] = [
    { name: t("month.january"), year2024: 10000, year2025: 20000 },
    { name: t("month.february"), year2024: 25000, year2025: 35000 },
    { name: t("month.march"), year2024: 20000, year2025: 34000 },
    { name: t("month.april"), year2024: 30000, year2025: 35000 },
    { name: t("month.may"), year2024: 45000, year2025: 50000 },
    { name: t("month.june"), year2024: 50000, year2025: 60000 },
    { name: t("month.july"), year2024: 60000, year2025: 70000 },
    { name: t("month.august"), year2024: 75000, year2025: 80000 },
    { name: t("month.september"), year2024: 100000, year2025: 110000 },
    { name: t("month.october"), year2024: 110000, year2025: 120000 },
    { name: t("month.november"), year2024: 115000, year2025: 125000 },
    { name: t("month.december"), year2024: 22000, year2025: 24000 }
  ];

  const total2025 = data.reduce((sum, d) => sum + d.year2025, 0);
  const total2024 = data.reduce((sum, d) => sum + d.year2024, 0);
  const diffPercent = (((total2025 - total2024) / total2024) * 100).toFixed(0);

  return (
    <div className="w-1/2 p-4 transition card_main h-full">
      <div className="mb-6 space-y-1.5 3xl:space-y-4">
        <h2 className="text-xl transition 2xl:text-2xl font-semibold text-grayed dark:text-white">
          {t("statics.foreigner")} 2024-2025
        </h2>
        <Flex gap={8} justify="space-between" align="end">
          <div className="flex gap-2">
            <div className="dark:text-white transition text-grayed flex items-end">
              <span className="transition !text-2xl 2xl:text-3xl font-semibold">
                {total2025.toLocaleString("ru-RU")}
              </span>
              <span className="text-[#777E90] !text-xs 2xl:text-sm font-medium flex items-center px-2 pb-1 rounded-md whitespace-nowrap">
                2024 {t("statics.year_full")}
              </span>
            </div>
            <div className="dark:text-white text-grayed flex transition items-end">
              <span className="!text-2xl 2xl:text-3xl transition font-semibold">
                {total2024.toLocaleString("ru-RU")}
              </span>
              <span className="text-[#777E90] !text-xs 2xl:text-sm font-medium flex items-center px-2 pb-1 rounded-md whitespace-nowrap">
                2025 {t("statics.year_full")}
              </span>
              <span className={"flex items-end justify-center"}>
                <CustomBadge
                  variant={+diffPercent >= 0 ? "success" : "destructive"}
                  className="text-sm"
                >
                  {diffPercent}%
                </CustomBadge>
              </span>
            </div>
          </div>

          <div className="flex flex-col 3xl:gap-2 3xl:flex-row">
            <CustomBadge
              indicator={true}
              indicatorColor="#FCA860"
              variant="transparent"
              className="text-sm text-[#232E40] p-0"
            >
              2024 {t("statics.year")}
            </CustomBadge>
            <CustomBadge
              indicator={true}
              indicatorColor="#8B54FF"
              variant="transparent"
              className="text-sm text-[#232E40] p-0"
            >
              2025 {t("statics.year")}
            </CustomBadge>
          </div>
        </Flex>
      </div>
      <div className="w-full h-[200px] 3xl:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="grad2024" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B54FF" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#8B54FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad2025" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              vertical={true}
              stroke="#E9E9E9"
              style={{ transition: "stroke 0.4s ease-in-out" }}
            />
            <XAxis
              dataKey="name"
              className="mt-10"
              axisLine={{ stroke: "#E9E9E9" }}
              tickLine={false}
              style={{ transition: "stroke 0.4s ease-in-out" }}
              tick={{ fill: "#878787", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12, textAnchor: "start" }}
              tickFormatter={(value) =>
                typeof value === "number"
                  ? value >= 1000
                    ? `${value / 1000}K`
                    : `${value}K`
                  : value
              }
              style={{ transform: "translateX(-32px)" }}
            />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            />
            <Area
              type="monotone"
              dataKey="year2024"
              stroke="#8B54FF"
              fill="url(#grad2024)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="year2025"
              stroke="#F59E0B"
              fill="url(#grad2025)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GuestsChart;
