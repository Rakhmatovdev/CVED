import { motion } from "framer-motion";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { cn } from "@/shared/lib/utils";
import useDarkMode from "@/utils/hooks/useDarkMode";

type CountryData = {
  name: string;
  value: number;
};

interface CountryChartProps {
  title?: string;
  data: CountryData[];
  barColor?: string[];
  className?: string;
  wrapperClassName?: string;
  description?: React.ReactNode;
}

const MotionRect = motion.rect;

const CountryChartRecharts: React.FC<CountryChartProps> = ({
                                                             title = "",
                                                             data,
                                                             barColor = ["#6366F1", "#8B5CF6"],
                                                             className = "",
                                                             wrapperClassName = "",
                                                             description
                                                           }) => {
  const { isDarkMode } = useDarkMode();
  const maxValue = Math.max(...data.map((d) => d.value));
  const gradientId = `barGradient-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full h-full p-5 rounded-2xl border dark:border-dborder bg-white dark:bg-[#1C1E2E] shadow-lg hover:shadow-xl transition-all duration-300",
        wrapperClassName
      )}
    >
      <div className="space-y-2 mb-4">
        <h2 className="text-lg 2xl:text-2xl font-semibold text-[#1E293B] dark:text-white transition-all">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      <div
        className={cn(
          "w-full h-[357px] 2xl:h-[480px] overflow-y-auto transition-all",
          className
        )}
      >
        <ResponsiveContainer width="100%" height={data.length * 44}>
          <BarChart
            data={data}
            layout="vertical"
            barCategoryGap="16px"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke={isDarkMode ? "#2A2C3D" : "#E2E8F0"}
            />

            <XAxis type="number" hide domain={[0, maxValue]} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{
                textAnchor: "start",
                fontWeight: 0,
                fontSize:0,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: isDarkMode ? "#1E2233" : "#F8FAFC", radius: 6 }}
              contentStyle={{
                background: isDarkMode ? "#1E2233" : "#FFFFFF",
                border: "1px solid rgba(148,163,184,0.2)",
                borderRadius: "8px",
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.08), inset 0 -1px 0 rgba(255,255,255,0.05)",
                color: isDarkMode ? "#E5E7EB" : "#0F172A",
                fontSize: "14px",
                padding: "8px 12px"
              }}
              formatter={(value: number) => [
                new Intl.NumberFormat("ru-RU").format(value)
              ]}
            />

            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={barColor[0]} />
                <stop offset="100%" stopColor={barColor[1]} />
              </linearGradient>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <Bar
              dataKey="value"
              barSize={28}
              radius={[8, 8, 8, 8]}
              style={{ filter: "url(#glow)" }}
              shape={(props) => (
                <MotionRect
                  {...props}
                  rx={8}
                  ry={8}
                  fill={`url(#${gradientId})`}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                />
              )}
            >
              <LabelList
                dataKey="value"
                position="right"
                formatter={(value: number) =>
                  new Intl.NumberFormat("ru-RU").format(value)
                }
                style={{
                  fontSize: "14px",
                  fill: isDarkMode ? "#E5E7EB" : "#0F172A",
                  fontWeight: 600
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CountryChartRecharts;
