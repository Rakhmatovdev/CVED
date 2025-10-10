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

type CityData = {
  name: string;
  value: number;
};

interface CityChartProps {
  title?: string;
  // subtitle?: string;
  data: CityData[];
  barColor?: string[];
  className?: string;
  wrapperClassName?: string;
  description?: React.ReactNode;
}

const MotionRect = motion.rect;

const RoundedBackground = (props: any) => {
  const { x, y, width, height } = props;
  const radius = 6;
  return (
    <MotionRect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius}
      ry={radius}
      fill="url(#bgPattern)"
      style={{ transition: "all 0.5s ease-in-out" }}
    />
  );
};

const CityChartRecharts: React.FC<CityChartProps> = ({
  title = "",
  data,
  barColor = ["#F5913E", "#FDC775"],
  className = "",
  wrapperClassName = "",
  description
}) => {
  const { isDarkMode } = useDarkMode();
  const maxValue = Math.max(...data.map((d) => d.value));
  const gradientId = `barGradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className={cn("w-full h-full p-4 card_main transition", wrapperClassName)}
    >
      <div className=" space-y-2">
        <h2 className="text-base 2xl:text-2xl transition font-semibold text-grayed dark:text-white">
          {title}
        </h2>
        {description}
      </div>

      <div className={cn("w-full transition-all overflow-y-auto", className)}>
        <ResponsiveContainer width="100%" height={data.length * 40}>
          <BarChart
            data={data}
            layout="vertical"
            barCategoryGap="12px"
            barGap={12}
            height={data.length * 40}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              horizontal={false}
              stroke="#D1D5DB"
              vertical={false}
              style={{ transition: "all 0.4s ease-in-out" }}
            />
            <XAxis
              type="number"
              hide
              domain={[0, maxValue]}
              style={{ transition: "all 0.4s ease-in-out" }}
            />
            <YAxis
              type="category"
              style={{ transition: "all 0.4s ease-in-out" }}
              dataKey="name"
              width={100}
              tick={{
                fontSize: 14,
                textAnchor: "start",
                fill: isDarkMode ? "#fff" : "#232E40",
                fontWeight: 600,
                dy: 0
              }}
              axisLine={false}
              tickLine={false}
              tickMargin={90}
            />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                display: "flex",
                gap: "6px",
                alignItems: "center",
                justifyContent: "center"
              }}
              formatter={(value: number) => [
                new Intl.NumberFormat("ru-RU").format(value)
              ]}
            />

            <defs>
              <pattern
                id="bgPattern"
                patternUnits="userSpaceOnUse"
                width="12"
                height="12"
                patternTransform="rotate(-45)"
              >
                <rect
                  width="12"
                  height="12"
                  fill={isDarkMode ? "#1F2136" : "#F4F6FB"}
                  style={{ transition: "all 0.4s ease-in-out" }}
                />
                <rect
                  width="6"
                  height="12"
                  fill={isDarkMode ? "#181929" : "#ECEFF1"}
                  style={{ transition: "all 0.4s ease-in-out" }}
                />
              </pattern>

              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={barColor[0]} />
                <stop offset="100%" stopColor={barColor[1] || barColor[0]} />
              </linearGradient>
            </defs>

            <Bar
              dataKey="value"
              barSize={28}
              radius={[6, 6, 6, 6]}
              shape={(props) => (
                <rect {...props} rx={6} ry={6} fill={`url(#${gradientId})`} />
              )}
              background={<RoundedBackground />}
              style={{ transition: "all 0.4s ease-in-out" }}
            >
              <LabelList
                dataKey="value"
                position="right"
                formatter={(value: number) =>
                  new Intl.NumberFormat("ru-RU").format(value)
                }
                style={{
                  fontSize: "14px",
                  fill: isDarkMode ? "#fff" : "#232E40",
                  fontWeight: 600,
                  transition: "all 0.5s ease-in-out"
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CityChartRecharts;
