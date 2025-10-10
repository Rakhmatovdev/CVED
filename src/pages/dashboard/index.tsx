import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import {
  CountryChartRecharts,
  DaysLivedApexChart,
  DonutChart,
  GuestChart,
  Maxmin,
  PureGuestsChart,
  SendService,
  ServerLoadApexChart,
  UzCountry
} from "@/features/dashboard-stats";
import { cn } from "@/shared/lib/utils.ts";
import CustomBadge from "@/shared/ui/CustomBadge";
import RoundEffectIcon from "@/shared/ui/icons/dashboard/RoundEffect.tsx";
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

  const pureData = [
    { name: t("month.january"), foreigners: 200000, locals: 30000 },
    { name: t("month.february"), foreigners: 80000, locals: 120000 },
    { name: t("month.march"), foreigners: 30000, locals: 130000 },
    { name: t("month.april"), foreigners: 90000, locals: 250000 },
    { name: t("month.may"), foreigners: 110000, locals: 80000 },
    { name: t("month.june"), foreigners: 180000, locals: 200000 },
    { name: t("month.july"), foreigners: 50000, locals: 50000 },
    { name: t("month.august"), foreigners: 200000, locals: 50000 },
    { name: t("month.september"), foreigners: 100000, locals: 30000 },
    { name: t("month.october"), foreigners: 190000, locals: 50000 },
    { name: t("month.november"), foreigners: 90000, locals: 40000 },
    { name: t("month.december"), foreigners: 21000, locals: 1000 }
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

  const cls = (item: { key: string }) => {
    return cn(
      "flex transition items-center rounded-md gap-2 py-0.5 px-2",
      "dark:bg-opacity-10",
      item.key === "users" &&
        "bg-[#2CBE881A] text-emeraldGreen dark:bg-[#2CBE881A] dark:text-emeraldGreen",
      item.key === "write" &&
        "bg-[#FFFBEB] text-mistyGray dark:bg-mistyGray dark:text-offWhite",
      item.key === "guest" &&
        "bg-[#FFFBEB] text-mistyGray dark:bg-mistyGray dark:text-offWhite"
    );
  };

  return (
    <div className="p-6 space-y-4 w-full bg-white dark:bg-darkBlue transition-colors duration-500">
      <Flex gap={16}>
        {team.map((item) => (
          <div
            className="border transition w-full relative overflow-hidden px-4 py-4 rounded-2xl dark:border-dborder flex justify-between  dark:bg-slateBlue shadow-card bg-white"
            key={item.id}
          >
            <div className="absolute transition left-0 top-0 w-44 h-44">
              <RoundEffectIcon fillColor={item.team_color} />
            </div>
            <div>
              <div className="p-3 transition border dark:border-dborder bg-white dark:bg-darkBlue z-10 rounded-xl w-12 h-12 flex items-center justify-center border-snowGray shadow-card">
                <TeamIcon strokeColor={item.team_color} height={16} />
              </div>
              <div className="mt-6">
                <p className="text-lighter transition text-sm font-medium dark:text-dtext">
                  {item.name}
                </p>
                <p className="mt-1 transition text-grayed font-semibold text-2xl 3xl:text-3xl dark:text-white">
                  {formatNumber(item.value)}
                </p>
              </div>
            </div>
            <div className="flex items-end justify-end z-10">
              <div className={cls(item)}>
                {item.team_color == "#3276FF" && (
                  <div className="rounded-full w-2 h-2 bg-emeraldGreen" />
                )}
                <p className={`text-sm font-medium line-clamp-1`}>
                  {item.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Flex>

      <Flex gap={16}>
        <PureGuestsChart
          title={t("statics.total_guest")}
          data={pureData}
          hasIndicator
        />
        <GuestChart />
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
