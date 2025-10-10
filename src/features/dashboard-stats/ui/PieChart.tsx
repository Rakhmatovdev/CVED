import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { cn } from "@/shared/lib/utils";
import CustomBadge from "@/shared/ui/CustomBadge";
import useDarkMode from "@/utils/hooks/useDarkMode";

const PieChart: React.FC<{
  title: string;
  className?: string;
  wrapperClassName?: string;
}> = ({ title, className, wrapperClassName }) => {
  const { isDarkMode } = useDarkMode();
  const { t } = useTranslation();
  const data = useMemo(
    () => [
      { name: t("inputs.male"), value: 489253, color: "#3B82F6" },
      { name: t("inputs.female"), value: 127349, color: "#FBBF24" }
    ],
    [{ t }]
  );

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0).toFixed(0),
    [data]
  );

  return (
    <div
      className={cn(
        "w-full transition h-fulla p-4 card_main",
        wrapperClassName
      )}
    >
      <h2 className="text-base transition 2xl:text-xl font-semibold text-grayed dark:text-white">
        {title}
      </h2>

      <div className={cn("w-full   ", className)}>
        <ResponsiveContainer width="100%" height={"100%"}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={1.5}
              dataKey="value"
              labelLine={false}
              stroke="none"
              cornerRadius={20}
            >
              {data.map((item, index) => (
                <Cell key={`cell-${index}`} fill={item.color} />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              className={"text-sm"}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "20px",
                transition: "all 0.3s ease",
                fontWeight: "bold",
                fill: isDarkMode ? "#fff" : "#343539"
              }}
            >
              {total}
            </text>
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-1  font-medium text-sm dark:text-white w-full">
        {data.map((label, i) => (
          <div key={i} className="flex justify-between items-center ">
            <div className="line-clamp-2 text-wrap">
              <CustomBadge
                indicator={true}
                indicatorColor={label?.color || "#ccc"}
                indicatorColorClass="rounded-full  w-2 h-2 2xl:w-3 2xl:h-3"
                variant="transparent"
                className="text-base font-normal text-secondary text-wrap"
              >
                {label.name}
              </CustomBadge>
            </div>
            <span className="text-primary transition  font-bold dark:text-white cursor-pointer text-base">
              {label.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
