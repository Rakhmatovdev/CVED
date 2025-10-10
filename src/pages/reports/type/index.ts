import React from "react";

export interface GenderDataType {
  id: number;
  key: React.Key;
  male: string;
  female: string;
  country_code: string;
  country_name: string;
  age_0_15: string;
  age_16_30: string;
  age_31_50: string;
  age_51_plus: string;
  total: number;
}
export interface CountryDataType {
  id: number;
  key: React.Key;
  citizenship: string;
  country_name: string;
  months: [];
}

export type MonthlyRecord = {
  id: number;
  citizenship: string;
  country_name: string;
  months: {
    month: string;
    entry: number;
    exit: number;
  }[];
};
export type MonthlyFilterForm = {
  start_date: string;
  end_date: string;
};
