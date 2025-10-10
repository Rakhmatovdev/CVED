import type { DatePickerProps } from "antd";
import { theme as antdTheme, ConfigProvider, DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React from "react";
import CalendarIcon from "@/shared/ui/icons/sufix/CalendarIcon.tsx";

const DatePickerType: React.FC = () => {
  const defaultValue = dayjs("2024-04-12", "YYYY-MM-DD");

  const handleChange: DatePickerProps<Dayjs>["onChange"] = (_, dateString) => {
    console.log("Выбранная дата:", dateString);
  };

  const dark = document.body.classList.contains("dark");

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorBgContainer: dark ? "#2B3048" : "#FFFFFF",
          colorBgElevated: dark ? "#1E2035" : "#FAFAFA",
          colorText: dark ? "#B7BFD5" : "#1F2937",
          colorBorder: dark ? "#3A405A" : "#E8E8E8",
          borderRadius: 6,
          controlHeight: 32
        }
      }}
    >
      <div style={{ padding: 20 }}>
        <DatePicker
          picker="date"
          format="D MMM. YYYY"
          defaultValue={defaultValue}
          suffixIcon={null}
          prefix={<CalendarIcon className={"dark:text-white"} />}
          onChange={handleChange}
          // className={
          //   "dark:border-[#3A405A] dark:bg-[#2B3048] dark:text-[#B7BFD5]"
          // }
          className={dark ? "dark-datepicker" : "light-datepicker"}
          style={{ width: 134, fontWeight: 600 }}
        />
      </div>
    </ConfigProvider>
  );
};

export default DatePickerType;
