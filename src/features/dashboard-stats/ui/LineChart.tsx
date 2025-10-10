import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
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
    { name: t("month.december"), year2024: 165000, year2025: 125000 }
  ];

  return (
    <div className="card_main p-4 w-full transition">
      <Flex justify="space-between" align="end" className="mb-6">
        <div>
          <h2 className="text-xl 2xl:text-2xl transition text-[#343539] dark:text-white font-semibold mb-2">
            {t("statics.lived")}
          </h2>
          <p className="text-[#717386] text-sm px-2 py-[2px] transition bg-[#F2F4F7] dark:bg-[#40455A] dark:text-[#fff] rounded-md inline font-medium">
            {t("statics.period")}
          </p>
        </div>
        <Flex gap={16}>
          <Flex gap={8} align="center">
            <span className="w-4 transition h-4 rounded bg-[#4A7CF1]" />
            <span className="text-sm transition whitespace-nowrap 2xl:text-sm text-secondary dark:text-white font-medium">
              2024 {t("statics.year")}
            </span>
          </Flex>
          <Flex gap={8} align="center">
            <span className="w-4 transition h-4 rounded bg-[#06D188]" />
            <span className="text-sm transition whitespace-nowrap 2xl:text-sm text-secondary dark:text-white font-medium">
              2025 {t("statics.year")}
            </span>
          </Flex>
        </Flex>
      </Flex>
      <ResponsiveContainer width="100%" height={380}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A7CF1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4A7CF1" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="color2025" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06D188" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#06D188" stopOpacity={0.1} />
            </linearGradient>
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
            axisLine={{ stroke: isDarkMode ? "#3B415B" : "#E9E9E9" }}
            tickLine={false}
            tick={{ fill: isDarkMode ? "#878787" : "#9CA3AF", fontSize: 14 }}
            tickMargin={5}
            style={{ transition: "stroke 0.4s ease-in-out" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDarkMode ? "#878787" : "#9CA3AF", fontSize: 14 }}
            tickFormatter={(value) => `${value / 1000}K`}
            tickMargin={5}
          />
          <Tooltip
            wrapperStyle={{
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
            }}
            contentStyle={{
              background: "transparent",
              border: "none",
              fontWeight: 500
            }}
            formatter={(value, name) => [
              value,
              name === "year2024" ? "2024" : "2025"
            ]}
            labelFormatter={(label) => label}
          />
          <Line
            type="linear"
            dataKey="year2024"
            stroke="#4A7CF1"
            strokeWidth={4}
            strokeLinecap="round"
            dot={{
              fill: "#4A7CF1",
              stroke: "#FFFFFF",
              strokeWidth: 2,
              r: 4
            }}
            activeDot={{
              fill: "#FFFFFF",
              stroke: "#4A7CF1",
              strokeWidth: 2,
              r: 6
            }}
          />
          <Line
            type="linear"
            dataKey="year2025"
            stroke="#06D188"
            strokeWidth={4}
            strokeLinecap="round"
            dot={{
              fill: "#06D188",
              stroke: "#FFFFFF",
              strokeWidth: 2,
              r: 4
            }}
            activeDot={{
              fill: "#FFFFFF",
              stroke: "#06D188",
              strokeWidth: 2,
              r: 6
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DaysLivedApexChart;
