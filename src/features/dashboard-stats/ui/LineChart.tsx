import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useDarkMode from "@/utils/hooks/useDarkMode";

const DaysLivedApexChart = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();

  const data = [
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
    { name: t("month.december"), year2024: 165000, year2025: 125000 },
  ];

  const last2024 = data[data.length - 1].year2024;
  const last2025 = data[data.length - 1].year2025;
  const growthRate = (((last2025 - last2024) / last2024) * 100).toFixed(1);

  return (
    <div className="card_main p-4 w-full transition dark:bg-[#181B29]">
      <Flex justify="space-between" align="end" className="mb-6">
        <div>
          <h2 className="text-xl 2xl:text-2xl transition text-[#343539] dark:text-white font-semibold mb-1">
            {t("Oyma oy xujum vaqtlari")}
          </h2>
          <p className="text-[#717386] text-sm px-2 py-[2px] transition bg-[#F2F4F7] dark:bg-[#40455A] dark:text-[#fff] rounded-md inline font-medium">
            {t("statics.period")}
          </p>
          <p className="text-xs mt-1 font-semibold text-green-500 dark:text-green-400">
            +{growthRate}% {t("statics.growth_2025")}
          </p>
        </div>
        <Flex gap={16}>
          <Flex gap={8} align="center">
            <span className="w-4 h-4 rounded bg-[#4A7CF1]" />
            <span className="text-sm 2xl:text-sm text-secondary dark:text-white font-medium">
              2024 {t("statics.year")}
            </span>
          </Flex>
          <Flex gap={8} align="center">
            <span className="w-4 h-4 rounded bg-[#06D188]" />
            <span className="text-sm 2xl:text-sm text-secondary dark:text-white font-medium">
              2025 {t("statics.year")}
            </span>
          </Flex>
        </Flex>
      </Flex>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Blue gradient for 2024 */}
            <linearGradient id="grad2024" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A7CF1" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#4A7CF1" stopOpacity={0.05} />
            </linearGradient>

            {/* Green gradient for 2025 */}
            <linearGradient id="grad2025" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06D188" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#06D188" stopOpacity={0.05} />
            </linearGradient>

            {/* Glow filter */}
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid
            stroke={isDarkMode ? "#3B415B" : "#E5E7EB"}
            vertical={true}
            horizontal={false}
            strokeWidth={1}
            style={{ transition: "all 0.4s ease-in-out" }}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: isDarkMode ? "#B0B0B0" : "#6B7280", fontSize: 13 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{ fill: isDarkMode ? "#B0B0B0" : "#6B7280", fontSize: 13 }}
            tickFormatter={(value) => `${value / 1000}K`}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: isDarkMode ? "#1F2937" : "#FFFFFF",
              border: `1px solid ${isDarkMode ? "#374151" : "#E5E7EB"}`,
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
            labelStyle={{ color: "#9CA3AF", fontWeight: 500 }}
            formatter={(value, name) => [
              `${value.toLocaleString()}`,
              name === "year2024" ? "2024" : "2025",
            ]}
          />

          {/* Year 2024 */}
          <Area
            type="monotone"
            dataKey="year2024"
            stroke="#4A7CF1"
            strokeWidth={3}
            strokeLinecap="round"
            fillOpacity={1}
            fill="url(#grad2024)"
            filter="url(#softGlow)"
            activeDot={{
              r: 10,
              stroke: "#fff",
              strokeWidth: 3,
              fill: "#4A7CF1",
              className: "animate-pulse",
            }}
          />

          {/* Year 2025 */}
          <Area
            type="monotone"
            dataKey="year2025"
            stroke="#06D188"
            strokeWidth={3}
            strokeLinecap="round"
            fillOpacity={1}
            fill="url(#grad2025)"
            filter="url(#softGlow)"
            activeDot={{
              r: 10,
              stroke: "#fff",
              strokeWidth: 3,
              fill: "#06D188",
              className: "animate-pulse",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DaysLivedApexChart;
