import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import CustomBadge from "@/shared/ui/CustomBadge";
import useDarkMode from "@/utils/hooks/useDarkMode";

const DonutChart: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useDarkMode();

  const data = useMemo(
    () => [
      { name: "CyberShield Systems", value: 142.8, color: "#3B82F6" },
      { name: "Quantum Defense", value: 128.4, color: "#8B5CF6" },
      { name: "Sentinel Networks", value: 114.9, color: "#22C55E" },
      { name: "ZeroTrust Labs", value: 102.7, color: "#F97316" },
      { name: "DarkTrace AI", value: 97.3, color: "#F43F5E" },
      { name: "FortiSecure", value: 89.1, color: "#EAB308" },
      { name: "Palo Armor", value: 75.8, color: "#06B6D4" },
      { name: "Guardian Vault", value: 63.4, color: "#A855F7" },
      { name: "HexaLock", value: 58.9, color: "#84CC16" },
      { name: "NovaCyber", value: 47.2, color: "#EC4899" }
    ],
    []
  );

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0).toFixed(0),
    [data]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full transition h-full p-5 rounded-2xl border dark:border-[#2A2C3C] bg-white dark:bg-[#181B29] shadow-lg hover:shadow-xl duration-300"
    >
      <div className="space-y-2 mb-4">
        <h2 className="text-xl 2xl:text-2xl font-semibold text-[#1E293B] dark:text-white transition">
          {t("statics.top_inactive_10") || "Top 10 Cyber Security Groups"}
        </h2>
        <CustomBadge variant="info">
          {t("statics.donut_30") || "Last 30 Days"}
        </CustomBadge>
      </div>

      <div className="relative w-full h-[260px] 2xl:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <radialGradient id="cyberGradient" cx="50%" cy="50%" r="75%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#9333EA" stopOpacity={0.8} />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer Ring */}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={1.5}
              dataKey="value"
              stroke="none"
              labelLine={false}
              cornerRadius={4}
            >
              {data.map((item, i) => (
                <Cell
                  key={i}
                  fill={item.color}
                  style={{ filter: "url(#glow)", transition: "all 0.3s ease" }}
                />
              ))}
            </Pie>

            {/* Inner Ring */}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="65%"
              paddingAngle={1.5}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((_, i) => (
                <Cell
                  key={`inner-${i}`}
                  fill={isDarkMode ? "#1E2132" : "#E7E7EB"}
                />
              ))}
            </Pie>

            {/* Center Text */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                fill: isDarkMode ? "#F1F5F9" : "#1E293B",
                transition: "all 0.3s ease"
              }}
            >
              {total}
            </text>

            <Tooltip
              contentStyle={{
                background: isDarkMode ? "#1F2335" : "#FFFFFF",
                border: "1px solid rgba(148,163,184,0.2)",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                color: isDarkMode ? "#E2E8F0" : "#0F172A",
                fontSize: "14px"
              }}
              formatter={(value: number) => [
                `${new Intl.NumberFormat("en-US").format(value)}`
              ]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Glow background animation */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(59,130,246,0.08), transparent 70%)"
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-2 font-medium text-sm dark:text-white w-full mt-4">
        {data.map((label, i) => (
          <div
            key={i}
            className="flex justify-between items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#1F2233] p-1.5 rounded-md transition-all"
          >
            <CustomBadge
              indicator
              indicatorColor={label.color}
              variant="transparent"
              className="text-xs truncate"
            >
              {label.name}
            </CustomBadge>
            <span className="text-primary transition font-semibold dark:text-white">
              {label.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DonutChart;
