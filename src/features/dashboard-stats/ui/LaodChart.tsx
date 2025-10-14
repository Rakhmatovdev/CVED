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
import CustomBadge from "@/shared/ui/CustomBadge";
import useDarkMode from "@/utils/hooks/useDarkMode";

const ServerAttackChart = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();

  const data = [
    { time: "00:00", attacks: 12 },
    { time: "03:00", attacks: 24 },
    { time: "06:00", attacks: 8 },
    { time: "09:00", attacks: 40 },
    { time: "12:00", attacks: 62 },
    { time: "15:00", attacks: 37 },
    { time: "18:00", attacks: 55 },
    { time: "21:00", attacks: 91 },
    { time: "23:59", attacks: 77 },
  ];

  const latest = data[data.length - 1];

  return (
    <div className="w-full h-full card_main transition dark:bg-[#181B29]">
      <div className="p-4 space-y-2">
        <h2 className="text-xl 2xl:text-2xl font-semibold  text-grayed dark:text-white transition">
          {t("Kunlik xujumlar")}
        </h2>
        <CustomBadge variant="default">{t("statics.realtime")}</CustomBadge>

        <div className="text-5xl font-bold mt-3 text-primary dark:text-white transition">
          {latest.attacks}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            {t("Soat ichida")}
          </span>
        </div>
      </div>

      <div className="w-full h-[320px] 3xl:h-[380px] px-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 40, right: 20, left: 0, bottom: 10 }}
          >
            <defs>
              {/* Gradient line color */}
              <linearGradient id="attackGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#EF4444"
                  stopOpacity={isDarkMode ? 0.8 : 0.7}
                />
                <stop
                  offset="100%"
                  stopColor="#FCA5A5"
                  stopOpacity={isDarkMode ? 0.1 : 0.05}
                />
              </linearGradient>

              {/* Glow around the line */}
              <filter id="glowAttack" width="150%" height="150%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke={isDarkMode ? "#3B415B" : "#F3F4F6"}
              strokeDasharray="3 3"
              style={{ transition: "all 0.3s ease" }}
            />

            <XAxis
              dataKey="time"
              tick={{ fill: isDarkMode ? "#B0B0B0" : "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: isDarkMode ? "#B0B0B0" : "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />

            <Tooltip
              contentStyle={{
                background: isDarkMode ? "#1F2937" : "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.15), inset 0 0 8px rgba(255,0,0,0.05)",
              }}
              labelStyle={{ color: "#9CA3AF", fontWeight: 500 }}
              formatter={(value) => [`${value} ${t("statics.attacks")}`, ""]}
            />

            <Area
              type="monotone"
              dataKey="attacks"
              stroke="#EF4444"
              strokeWidth={4}
              fill="url(#attackGradient)"
              filter="url(#glowAttack)"
              activeDot={{
                r: 10,
                stroke: "#fff",
                strokeWidth: 4,
                fill: "#EF4444",
                className: "animate-pulse",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ServerAttackChart;
