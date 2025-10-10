import React from "react";
import { Control } from "react-hook-form";

export interface DataType {
  key: React.Key;
  first_name_in_passport: string;
  last_name_in_passport: string;
  middle_name_in_passport: string;
  passport_number: string;
  birt_date: string;
  immigrant_id: string;
  passport_back_side_photo: string | null;
  passport_front_side_photo: null | string;
  citizenship: {
    id: number;
    label: string;
    name: string;
    alpha2_code: string;
  };
  place_of_birth: string;
  place_of_issue: string;
  valid_until: string;
  id: number;
  photo: string;
}
interface SelectOption {
  value: string;
  label: string;
}
export interface triple {
  id: number;
  name: string;
  code: string;
}

export interface country {
  id: number;
  name: string;
  alpha2_code: string;
}

export interface DataType2 {
  key: React.Key;
  id: number;
  direction_country: country;
  crossing_type: "entry" | "exit";
  date_time: string;
  crossing_point: triple;
  transport_type: triple;
  trip_purpose: triple;
  stay_country: triple;
}

export interface HandUploadProps {
  control: Control<any>;
}

export interface HandPhotoUploadProps {
  control: any;
  required?: boolean;
  name: string;
  className?: string;
}

export interface WebCamProps {
  name: string;
  control: Control<any>;
}

export interface PhotoUploadProps {
  control: any;
  required?: boolean;
  name: string;
  title: string;
}

export interface TableParams {
  pagination: {
    current: number;
    pageSize: number;
  };
  filters?: Record<string, any>;
  sortOrder?: "ascend" | "descend";
  sortField?: string;
}

export interface UpdateModalProps {
  setUpdate: (value: boolean) => void;
  prevData?: any;
  refetchImmigrant?: () => void;
}
export interface CreateComponentProps {
  create: boolean;
  setCreate: (value: boolean) => void;
  refetch: () => void;
}

interface Fingerprints {
  right_thumb?: File | undefined;
  right_index?: File | undefined;
  right_middle?: File | undefined;
  right_ring?: File | undefined;
  right_little?: File | undefined;
  left_thumb?: File | undefined;
  left_index?: File | undefined;
  left_middle?: File | undefined;
  left_ring?: File | undefined;
  left_little?: File | undefined;
}

export interface CreateFormValues {
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  nationality: SelectOption;
  gender?: SelectOption;
  birth_date: string;
  fingerprint_token: {
    right_thumb?: undefined;
    right_index?: undefined;
    right_middle?: undefined;
    right_ring?: undefined;
    right_little?: undefined;
    left_thumb?: undefined;
    left_index?: undefined;
    left_middle?: undefined;
    left_ring?: undefined;
    left_little?: undefined;
  };
  right_thumb?: undefined;
  right_index?: undefined;
  right_middle?: undefined;
  right_ring?: undefined;
  right_little?: undefined;
  left_thumb?: undefined;
  left_index?: undefined;
  left_middle?: undefined;
  left_ring?: undefined;
  left_little?: undefined;
  place_of_birth: string;
  passport_number: string;
  first_name_in_passport: string;
  last_name_in_passport: string;
  middle_name_in_passport: string;
  place_of_issue: string;
  date_of_issue: string;
  valid_until: string;
  arrival_date: string[];
  fingerprints: Fingerprints;
  citizenship?: SelectOption;
  pinfl: string;
  photo?: File | null;
  passport_front_side_photo?: File | null;
  passport_back_side_photo?: File | null;
}
interface PassportData {
  passport_number: string;
  first_name_in_passport: string;
  last_name_in_passport: string;
  middle_name_in_passport: string;
  birth_date: string;
  place_of_birth: string;
  place_of_issue: string;
  date_of_issue: string;
  valid_until: string;
  citizenship_id?: string;
}

export interface CreateImmigrantPayload {
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  nationality?: string;
  gender?: string;
  birth_date: string;
  place_of_birth: string;
  passport_data?: PassportData;
  passport_number?: string;
  place_of_issue?: string;
  date_of_issue?: string;
  valid_until: string;
  citizenship_id?: string;
  fingerprints: Fingerprints;
  arrival_date: string[];
  pinfl: string;
  photo?: File;
  passport_front_side_photo?: File | null;
  passport_back_side_photo?: File | null;
}
export interface WebcamWithMaskHandle {
  stopCamera: () => void;
}
