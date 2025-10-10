import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomBadge from "@/shared/ui/CustomBadge";
import useDarkMode from "@/utils/hooks/useDarkMode";

const DonutChart: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();

  const data = useMemo(
    () => [
      { name: "DILAFRUZ", value: 127.39, color: "#3B82F6" },
      { name: "ABDURASHID", value: 127.39, color: "#FBBF24" },
      { name: "OTABEK GUEST HOUSE", value: 127.39, color: "#F97316" },
      { name: "ANGREN CAMPING SERVICE", value: 127.39, color: "#EF4444" },
      { name: "MANZILA", value: 127.39, color: "#FCA5A5" },
      { name: "KATTASOY", value: 127.39, color: "#C084FC" },
      { name: "NAYZU TOSHKENT", value: 127.39, color: "#22C55E" },
      { name: "XORAZM KO'HI NUR", value: 127.39, color: "#4ADE80" },
      { name: "BULOQ", value: 127.39, color: "#A7F3D0" },
      { name: "REAL HOTEL", value: 127.39, color: "#93C5FD" }
    ],
    []
  );

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0).toFixed(0),
    [data]
  );

  return (
    <div className="w-full transition h-full p-4 card_main">
      <div className="3xl:mb-4 space-y-2">
        <h2 className="text-xl transition 2xl:text-2xl font-semibold text-grayed dark:text-white">
          {t("statics.top_inactive_10")}
        </h2>
        <CustomBadge>{t("statics.donut_30")}</CustomBadge>
      </div>

      <div className="w-full h-[250px] 3xl:h-[350px]">
        <ResponsiveContainer width="100%" height={"100%"}>
          <PieChart>
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
              cornerRadius={3}
            >
              {data.map((item, index) => (
                <Cell key={`cell-${index}`} fill={item.color} />
              ))}
            </Pie>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="52%"
              outerRadius="65%"
              paddingAngle={1.5}
              dataKey="value"
              stroke="none"
              labelLine={false}
              cornerRadius={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={`inner-cell-${index}`}
                  fill={isDarkMode ? "#40455A" : "#E7E7EB"}
                />
              ))}
            </Pie>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "36px",
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
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-x-2 font-medium text-sm dark:text-white w-full">
        {data.map((label, i) => (
          <div key={i} className="flex justify-between gap-2">
            <div className="line-clamp-2 text-wrap">
              <CustomBadge
                indicator={true}
                indicatorColor={label?.color || "#ccc"}
                variant="transparent"
                className="text-xs text-secondary text-wrap"
              >
                {label.name}
              </CustomBadge>
            </div>
            <span className="text-primary transition font-medium dark:text-white cursor-pointer">
              {label.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
