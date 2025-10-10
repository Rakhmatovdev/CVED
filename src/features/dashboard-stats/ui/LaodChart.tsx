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
import CustomBadge from "@/shared/ui/CustomBadge";
import useDarkMode from "@/utils/hooks/useDarkMode";

const ServerLoadRecharts = () => {
  const { t } = useTranslation();

  const { isDarkMode } = useDarkMode();

  const data = [
    {
      time: "15:20:00",
      value: 50
    },
    {
      time: "15:20:30",
      value: 50
    },
    {
      time: "15:21:30",
      value: 25
    },
    {
      time: "15:22:00",
      value: 50
    },
    {
      time: "15:22:30",
      value: 50
    }
  ];

  return (
    <div className="w-full h-full card_main transition">
      <div className="p-4 space-y-2">
        <h2 className="text-xl transition 2xl:text-2xl font-semibold text-grayed dark:text-white">
          {t("statics.average")}
        </h2>
        <CustomBadge variant="default">{t("statics.realtime")}</CustomBadge>
        <div className="text-4xl transition font-bold text-gray-900 mb-4 dark:text-white">
          {data[3].value}
        </div>
      </div>
      <div className="w-full h-[300px] max-3xl:mt-10">
        <ResponsiveContainer width="100%" height={"100%"}>
          <LineChart
            data={data?.map((item) => ({
              time: item.time,
              value: item.value
            }))}
            margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
          >
            <CartesianGrid
              horizontal={false}
              vertical={true}
              stroke={isDarkMode ? "#3B415B" : "#F3F4F6"}
              style={{ transition: "all 0.4s ease-in-out" }}
            />

            <defs>
              {/* Main line gradient */}
              <linearGradient
                id="dynamicLineGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor={isDarkMode ? "#3B415B" : "#c3c3c3"}
                  stopOpacity="0.3"
                />
                <stop
                  offset="15%"
                  stopColor={isDarkMode ? "#3B415B" : "#c3c3c3"}
                  stopOpacity="0.3"
                />
                <stop offset="30%" stopColor="#CE4134" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#CE4134" stopOpacity="1" />
                <stop offset="70%" stopColor="#CE4134" stopOpacity="0.4" />
                <stop
                  offset="85%"
                  stopColor={isDarkMode ? "#3B415B" : "#c3c3c3"}
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor={isDarkMode ? "#3B415B" : "#c3c3c3"}
                  stopOpacity="0.3"
                />
              </linearGradient>

              {/* Glow effect */}
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="10" result="blur" color="#000" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Blur effect */}
              <filter
                id="lineBlur"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="3"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FEE2E2" stopOpacity={1} />
                <stop offset="100%" stopColor="#FEE2E2" stopOpacity={1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="time"
              axisLine={{ stroke: isDarkMode ? "#3B415B" : "#E0E0E0" }}
              style={{ transition: "all 0.4s ease-in-out" }}
              tickLine={false}
              tick={(props) => (
                <g transform={`translate(${props.x},${props.y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={30}
                    textAnchor="middle"
                    fill="#878787"
                    fontSize={14}
                    fontWeight={600}
                  >
                    {props.payload.value}
                  </text>
                  <line
                    x1={0}
                    y1={-22}
                    x2={0}
                    y2={-8}
                    stroke="#080808"
                    strokeLinecap="round"
                  />
                </g>
              )}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDarkMode ? "#ccc" : "#E0E0E0", fontSize: 14 }}
              width={0}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px"
              }}
              labelStyle={{ color: "#6B7280", fontWeight: 500 }}
              formatter={(value) => [`${value}`, ""]}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#dynamicLineGradient)"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              fill="none"
              dot={(props) => {
                const { cx, cy, index } = props;
                if (index === 2) {
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={12}
                      fill="#fff"
                      stroke="#CE4134"
                      strokeWidth={8}
                    />
                  );
                }
                return null;
              }}
              label={{
                position: "top",
                fill: isDarkMode ? "#fff" : "#6B7280",
                fontSize: 20,
                angle: -90,
                textAnchor: "middle",
                offset: 28,
                dy: -15,
                dx: 5,
                style: {
                  fontWeight: 600,
                  transition: "all 0.3s ease-in-out"
                }
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ServerLoadRecharts;
