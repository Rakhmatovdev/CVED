export interface CountryChartProps {
  title?: string;
  subtitle?: string;
  labels: string[];
  values: number[];
  barColors?: string[];
  maxBarColor?: string;
}
export interface MaxMinRegionData {
  name: string;
  value: number;
  isGrowth: boolean;
  byRoom: number;
  byBed: number;
  t?: (key: string) => string;
}

export interface MapOneProps {
  activeRegion: string;
}

export interface GuestDataItem {
  name: string;
  year2024: number;
  year2025: number;
}

export interface PureDataItem {
  name: string;
  foreigners: number;
  locals: number;
}
export interface LineProps {
  data2024: number[];
  data2025: number[];
  labels: string[];
}
export interface LoadProps {
  timestamps?: string[];
  values?: number[];
}

export interface SendDataItem {
  name: string;
  year2024: number;
  year2025: number;
}
