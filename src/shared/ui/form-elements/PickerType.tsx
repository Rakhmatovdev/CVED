import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React from "react";
import CalendarIcon from "../icons/sufix/CalendarIcon";

type PickerType = "date" | "week" | "month" | "quarter" | "year";

interface PickerWithTypeProps {
  type: PickerType;

  onChange?: (date: Dayjs | null, dateString: string) => void;
}

const PickerWithType: React.FC<PickerWithTypeProps> = ({ type, onChange }) => {
  const defaultValue = dayjs("2024", "YYYY");

  const handleChange: DatePickerProps<Dayjs>["onChange"] = (
    date,
    dateString
  ) => {
    const ds: string = Array.isArray(dateString) ? dateString[0] : dateString;
    console.log("tanlandi:", ds);
    onChange?.(date, ds);
  };

  return (
    <DatePicker
      picker={type}
      suffixIcon={null}
      prefix={<CalendarIcon />}
      defaultValue={defaultValue}
      onChange={handleChange}
      style={{ width: 79 }}
    />
  );
};

export default PickerWithType;
