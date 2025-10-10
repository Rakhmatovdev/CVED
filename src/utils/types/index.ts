import React from "react";

export interface ChildrenProps {
  children: React.ReactNode;
}

interface Pdata {
  id: number;
  birth_date: string;
  citizenship?: citizenData;
  date_of_issue: string;
  first_name_in_passport: string;
  immigrant_id: string;
  last_name_in_passport: string;
  middle_name_in_passport: string;
  passport_back_side_photo: string;
  passport_front_side_photo: string;
  passport_number: string;
  place_of_birth: string;
  place_of_issue: string;
  valid_until: string | Date;
}
interface citizenData {
  label: string;
  name: string;
  value: string;
  alpha2_code: string;
}

export interface DataType {
  id: number;
  key: React.Key;
  birth_date: string;
  passport: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: string;
  middle_name: string;
  nationality: string;
  phone_number: string;
  photo: string;
  passport_data: Pdata[];
  date_time: string;
  direction: string;
  purpose_placeholder: string;
  bordering_point: string;
  citizenship?: citizenData;
  birth_date_from?: string;
  duration_trip_placeholder: number | string;
  description?: string;
  last_crossing_type?: string;
  kogg?: string;
}
