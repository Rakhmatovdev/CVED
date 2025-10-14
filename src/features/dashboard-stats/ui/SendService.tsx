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
import { SendDataItem } from "@/pages/dashboard/type";
import CustomBadge from "@/shared/ui/CustomBadge";
import useDarkMode from "@/utils/hooks/useDarkMode";

const data: SendDataItem[] = [
  { name: "15:20:30", year2024: 15000, year2025: 20000 },
  { name: "15:21:30", year2024: 45000, year2025: 35000 },
  { name: "15:22:30", year2024: 40000, year2025: 34000 },
  { name: "15:23:30", year2024: 70000, year2025: 80000 },
  { name: "15:24:30", year2024: 45000, year2025: 50000 },
  { name: "15:25:30", year2024: 50000, year2025: 60000 },
  { name: "15:26:30", year2024: 20000, year2025: 87000 }
];

const SendService: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();
  return (
    <div className="card_main p-4 transition w-1/2 dark:bg-[#181B29]">
      <div className="space-y-2 mb-4">
        <h2 className="text-xl 2xl:text-2xl transition font-semibold mb-2 text-grayed dark:text-white ">
          {t("statics.send_veb")}
        </h2>
        <div className="flex justify-between">
          <CustomBadge>{t("statics.in_real")}</CustomBadge>

          <Flex gap={8}>
            <CustomBadge
              indicator={true}
              indicatorColor="#FCA860"
              variant="transparent"
              className="text-sm text-secondary transition"
            >
              2024 {t("statics.year")}
            </CustomBadge>

            <CustomBadge
              indicator={true}
              indicatorColor="#8B54FF"
              variant="transparent"
              className="text-sm text-secondary transition"
            >
              2025 {t("statics.year")}
            </CustomBadge>
          </Flex>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
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
            stroke={isDarkMode ? "#3B415B" : "#E9E9E9"}
            style={{ transition: "stroke 0.4s ease-in-out" }}
          />
          <XAxis
            dataKey="name"
            className="mt-10"
            axisLine={{ stroke: isDarkMode ? "#3B415B" : "#E9E9E9" }}
            tickLine={false}
            tick={{ fill: isDarkMode ? "#878787" : "#878787", fontSize: 12 }}
            style={{ transition: "all 0.4s ease-in-out" }}
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
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out"
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
  );
};

export default SendService;
