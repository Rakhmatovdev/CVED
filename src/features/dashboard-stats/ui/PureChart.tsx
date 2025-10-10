import { theme as antdTheme, ConfigProvider, Flex, Select } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { cn } from "@/shared/lib/utils";
import CustomBadge from "@/shared/ui/CustomBadge";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon.tsx";
import useDarkMode from "@/utils/hooks/useDarkMode";

const MotionRect = motion.rect;

interface BackgroundProps {
  x: number;
  y: number;
  width: number;
  height: number;
  [key: string]: any;
}

const RoundedBackground = (props: BackgroundProps) => {
  const { isDarkMode } = useDarkMode();
  const { x, y, width, height } = props;
  return (
    <MotionRect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={4}
      ry={4}
      fill={isDarkMode ? "#1F2135" : "#f9f9f9"}
      stroke={isDarkMode ? "#3B415B" : "#D1D5DB"}
      strokeWidth={1}
      strokeDasharray="3 3"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: "all 0.5s ease-in-out" }}
    />
  );
};

const PureGuestsChart = ({
  className,
  data,
  hasIndicator,
  wrapperClassName,
  title
}: {
  className?: string;
  data?: any[];
  hasIndicator?: boolean;
  wrapperClassName?: string;
  title?: string;
}) => {
  const { t } = useTranslation();

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };

  const dark = document.body.classList.contains("dark");

  const [isAnimationActive, setIsAnimationActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationActive(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const AnimatedBar = (props: any) => {
    const { fill, x, y, width, height, index, radius = 3 } = props;
    const [barHeight, setBarHeight] = useState(0);

    useEffect(() => {
      if (isAnimationActive) {
        setBarHeight(height);
      }
    }, [isAnimationActive, height]);

    const barY = y + (height - barHeight);
    const isAtBottom = barY + barHeight >= y + height - radius;

    return (
      <g>
        <rect
          x={x}
          y={barY}
          width={width}
          height={barHeight}
          fill={fill}
          rx={isAtBottom ? radius : 0}
          ry={isAtBottom ? radius : 0}
          style={{
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            transitionProperty: "height, y, rx, ry",
            transitionDelay: `${index * 0.03}s`
          }}
        />
      </g>
    );
  };

  return (
    <div
      className={cn("p-4 transition card_main w-1/2 h-full", wrapperClassName)}
    >
      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <div className="space-y-2">
          <h2 className="text-2xl transition font-semibold text-grayed dark:text-white">
            {title}
          </h2>
          {hasIndicator && (
            <div className="text-grayed  transition dark:text-white flex items-center gap-4">
              <span className="text-xl 2xl:text-3xl font-semibold">12 785</span>
              <CustomBadge
                variant="success"
                className="text-sm transition py-0.5 px-1"
              >
                +15%
              </CustomBadge>
            </div>
          )}
        </div>
        {hasIndicator && (
          <div className="flex transition items-end flex-col-reverse gap-5 my-select text-white">
            <Flex gap={8}>
              <CustomBadge
                indicator={true}
                indicatorColor="linear-gradient(to bottom, #8B54FF 40%, #C2A8FD 100%)"
                variant="transparent"
                className="text-sm text-[#232E40]"
              >
                {t("statics.foreigners")}
              </CustomBadge>

              <CustomBadge
                indicator={true}
                indicatorColor="linear-gradient(to bottom, #06D188 60%,#7ceac2 100%)"
                variant="transparent"
                className="text-sm text-secondary"
              >
                {t("statics.local")}
              </CustomBadge>
            </Flex>

            <ConfigProvider
              theme={{
                algorithm: dark
                  ? antdTheme.darkAlgorithm
                  : antdTheme.defaultAlgorithm,
                components: {
                  Select: {
                    colorBgElevated: dark ? "" : "",
                    colorText: dark ? "" : "",
                    optionSelectedBg: dark ? "" : ""
                  }
                }
              }}
            >
              <Select
                className="bg-transparent my-select border rounded-lg text-white border-snowGray dark:border-dborder "
                labelInValue
                popupClassName={"dark:bg-darker bg-white"}
                defaultValue={{
                  value: "2024",
                  label: 2024 + " " + t("statics.year")
                }}
                suffixIcon={null}
                prefix={
                  <CalendarIcon className={"dark:text-white text-secondary"} />
                }
                onChange={handleChange}
                options={[
                  { value: "2019", label: 2019 + " " + t("statics.year") },
                  { value: "2020", label: 2020 + " " + t("statics.year") },
                  { value: "2021", label: 2021 + " " + t("statics.year") },
                  { value: "2022", label: 2022 + " " + t("statics.year") },
                  { value: "2023", label: 2023 + " " + t("statics.year") },
                  { value: "2024", label: 2024 + " " + t("statics.year") },
                  { value: "2025", label: 2025 + " " + t("statics.year") }
                ]}
              />
            </ConfigProvider>
          </div>
        )}
        {!hasIndicator && (
          <div>
            <Select
              className="bg-transparent my-select border rounded-lg text-white border-snowGray dark:border-dborder "
              labelInValue
              popupClassName={"dark:bg-darker bg-white"}
              defaultValue={{
                value: "weekly",
                label: t("year.weekly")
              }}
              suffixIcon={null}
              prefix={
                <CalendarIcon className={"dark:text-white text-secondary"} />
              }
              onChange={handleChange}
              options={[
                { value: "weekly", label: t("year.weekly") },
                { value: "monthly", label: t("year.monthly") },
                { value: "yearly", label: t("year.yearly") }
              ]}
            />
          </div>
        )}
      </div>
      <div className={cn("w-full h-[203px] 3xl:h-[285px]", className)}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={550}
            height={200}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0
            }}
          >
            <XAxis
              dataKey="name"
              tickMargin={6}
              height={40}
              axisLine={{ stroke: "#E9E9E9" }}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#878787" }}
              style={{ transition: "all 0.3s ease-in-out" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#878787" }}
              width={40}
              axisLine={{ stroke: "#E9E9E9" }}
              tickLine={false}
              tickFormatter={(value) =>
                typeof value === "number"
                  ? value >= 1000
                    ? `${value / 1000}K`
                    : `${value}K`
                  : value
              }
            />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                color: "#878787"
              }}
            />
            <defs>
              <linearGradient
                id="foreignersGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="40%" stopColor="#8B54FF" />
                <stop offset="100%" stopColor="#C2A8FD" />
              </linearGradient>
              <linearGradient id="localsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="60%" stopColor="#06D188" />
                <stop offset="100%" stopColor="#7ceac2" />
              </linearGradient>
            </defs>
            <Bar
              dataKey="locals"
              fill="url(#localsGradient)"
              background={(props: any) => <RoundedBackground {...props} />}
              radius={[0, 0, 0, 0]}
              shape={(props: any) => (
                <AnimatedBar {...props} index={props.index} radius={3.5} />
              )}
              isAnimationActive={false}
            />
            <Bar
              dataKey="foreigners"
              fill="url(#foreignersGradient)"
              background={(props: any) => <RoundedBackground {...props} />}
              radius={[0, 0, 0, 0]}
              shape={(props: any) => (
                <AnimatedBar {...props} index={props.index} radius={3.5} />
              )}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PureGuestsChart;
