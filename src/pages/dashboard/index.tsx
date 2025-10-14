import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import {
  CountryChartRecharts,
  DaysLivedApexChart,
  DonutChart,
  Maxmin,
  SendService,
  ServerLoadApexChart,
  UzCountry
} from "@/features/dashboard-stats";
import CustomBadge from "@/shared/ui/CustomBadge";
import TeamIcon from "@/shared/ui/icons/dashboard/TeamIcon.tsx";

const Dashboard = () => {
  const { t } = useTranslation();

  const countryData = [
    { name: "Афганистан", value: 213 },
    { name: "Аргентина", value: 456 },
    { name: "Франция", value: 567 },
    { name: "Швеция", value: 678 },
    { name: "Канада", value: 789 },
    { name: "Хорватия", value: 890 },
    { name: "Китай", value: 122 },
    { name: "Афганистан", value: 213 },
    { name: "Аргентина", value: 456 },
    { name: "Франция", value: 567 },
    { name: "Швеция", value: 678 },
    { name: "Канада", value: 789 },
    { name: "Хорватия", value: 890 },
    { name: "Китай", value: 123 },
    { name: "Афганистан", value: 213 },
    { name: "Аргентина", value: 456 },
    { name: "Франция", value: 567 },
    { name: "Швеция", value: 678 },
    { name: "Канада", value: 789 },
    { name: "Хорватия", value: 890 }
  ];
  const countryData2 = [
    { name: "Афганистан", value: 213123 },
    { name: "Аргентина", value: 456123 },
    { name: "Франция", value: 567123 },
    { name: "Швеция", value: 678123 },
    { name: "Канада", value: 789123 },
    { name: "Хорватия", value: 890123 },
    { name: "Китай", value: 122123 },
    { name: "Канада", value: 789123 },
    { name: "Хорватия", value: 890123 }
  ];


  const team = [
    {
      id: 1,
      name: t("statics.users"),
      key: "users",
      team_color: "#3276FF",
      team_background: "rgba(50, 118, 255, 0.30)",
      value: 14459,
      status: t("statics.only_now"),
      status_color: "#2CBE88",
      status_colord: "#2CBE88",
      status_background: "#2CBE881A",
      status_backgroundd: "#2CBE881A"
    },
    {
      id: 2,
      name: t("statics.write"), //"Записей"
      key: "write",
      team_color: "#2CBE88",
      team_background: "rgba(44, 190, 136, 0.30)",
      value: 14459,
      status: t("statics.total") //"Всего за текущий месяц"
    },
    {
      id: 3,
      name: t("statics.guest"), //"Гостей"
      key: "users",
      team_color: "#8B54FF",
      team_background: "rgba(143, 143, 255, 0.30)",
      value: 14459,
      status: t("statics.arrived")
    },
    {
      id: 4,
      name: t("statics.guest"), //"Гостей"
      key: "guest",
      team_color: "#FF4B55",
      team_background: "rgba(255, 75, 85, 0.30)",
      value: 12457,
      status: t("statics.departed") //"Убыло сегодня"
    }
  ];

  const formatNumber = (num: number): string => {
    return num.toLocaleString("ru-RU");
  };


  return (
    <div className="p-6 space-y-4 w-full bg-white dark:bg-darkBlue transition-colors duration-500">
      <Flex gap={20}  className={' '}>
        {team.map((item) => (
          <div
            key={item.id}
            className={`
        group relative overflow-hidden w-full md:w-[48%] lg:w-[32%]
        p-5 rounded-2xl border transition-all duration-300 
        dark:border-dborder border-gray-200
        bg-gradient-to-br from-white via-white to-gray-50
        dark:from-slateBlue dark:via-slateBlue dark:to-darkBlue
        shadow-md hover:shadow-lg hover:-translate-y-1
        flex justify-between items-start
      `}
          >
            {/* background decorative blur */}
            <div
              className="absolute left-0 top-0 w-44 h-44 opacity-50 blur-2xl transition-all duration-500 group-hover:opacity-70"
              style={{ backgroundColor: item.team_color }}
            />

            {/* Left side */}
            <div className="relative z-10">
              <div
                className="p-3 rounded-xl border border-gray-100 dark:border-dborder
          bg-white/60 dark:bg-darkBlue/60 shadow-inner backdrop-blur-sm
          flex items-center justify-center w-12 h-12 transition-all duration-300
          group-hover:scale-105"
              >
                <TeamIcon strokeColor={item.team_color} height={18} />
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-lighter dark:text-dtext transition-all duration-200">
                  {item.name}
                </p>
                <p className="mt-1 text-3xl font-semibold text-grayed dark:text-white">
                  {formatNumber(item.value)}
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="relative z-10 flex items-end justify-end">
              <div
                className={`
            px-3 py-1 rounded-full flex items-center gap-2
            text-sm font-medium transition-all duration-200
            ${
                  item.team_color === "#3276FF"
                    ? "bg-emeraldGreen/10 text-emeraldGreen"
                    : "bg-gray-100 dark:bg-darkBlue text-gray-600 dark:text-white"
                }
          `}
              >
                {item.team_color === "#3276FF" && (
                  <span className="w-2 h-2 rounded-full bg-emeraldGreen animate-pulse" />
                )}
                <p className="line-clamp-1">{item.status}</p>
              </div>
            </div>
          </div>
        ))}
      </Flex>



      <div className="flex transition flex-col 3xl:flex-col-reverse">
        <Maxmin />
        <Flex gap={16}>
          <div className="w-1/2 3xl:w-1/3">
            <CountryChartRecharts
              title={t("statics.top_active_10")}
              description={
                <CustomBadge variant="default">
                  {t("statics.hotel_mvd")}
                </CustomBadge>
              }
              data={countryData}
              barColor={["#F5913E", "#FDC775"]}
            />
          </div>
          <div className="w-1/3 hidden 3xl:block">
            <DonutChart />
          </div>
          <div className="w-1/2 3xl:w-1/3">
            <CountryChartRecharts
              description={
                <CustomBadge variant="default">
                  {t("statics.hotel_mvd")}
                </CustomBadge>
              }
              title={t("statics.state10")}
              data={countryData2}
              barColor={["#497BF1", "#82A7F9"]}
            />
          </div>
        </Flex>
      </div>
      <Flex gap={16} className="3xl:hidden transition">
        <div className="w-[55%] 3xl:w-1/2">
          <ServerLoadApexChart />
        </div>
        <div className="w-[45%] 3xl:w-1/2">
          <DonutChart />
        </div>
      </Flex>
      <Flex gap={16} className="max-3xl:hidden transition">
        <div className="w-1/3">
          <ServerLoadApexChart />
        </div>
        <div className="w-2/3">
          <DaysLivedApexChart />
        </div>
      </Flex>
      <div className="3xl:hidden w-full">
        <DaysLivedApexChart />
      </div>
      <Flex gap={16}>
        <UzCountry />
        <SendService />
      </Flex>
    </div>
  );
};

export default Dashboard;
