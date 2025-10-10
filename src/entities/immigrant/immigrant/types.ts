export interface IImmigrantCitizenship {
  id: number;
  name: string;
  alpha2_code: string;
}

export interface IImmigrant {
  id: number;
  gender: number;
  nationality: string;
  birth_date: string;
  full_name: string;
  email: string;
  photo: string;
  last_crossing_type: string;
  last_crossing_date: string;
  days: string;
  krat: string;
  phone_number: string;
  citizenship: IImmigrantCitizenship;
  passport_number: string;
  value: string;
}

export interface IFetchedImmigrant {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  gender: number;
  nationality: string | null;
  birth_date: string; // ISO date
  full_name: string;
  phone_number: string | null;
  email: string | null;
  place_of_birth: string | null;
  photo: string;
  passport_data: IPassport[];
  border_records: IBorderRecord[];
}

export interface IPassport {
  id: number;
  immigrant_id: number;
  passport_front_side_photo: string | null;
  passport_back_side_photo: string | null;
  passport_number: string;
  first_name_in_passport: string;
  last_name_in_passport: string;
  middle_name_in_passport: string | null;
  birth_date: string;
  place_of_birth: string | null;
  citizenship: ICitizenship;
  place_of_issue: string | null;
  date_of_issue: string | null;
  valid_until: string | null;
  email: string | null;
  full_name: string;
  photo: string;
}

export interface ICitizenship {
  id: number;
  name: string;
  alpha2_code: string;
}

export interface IBorderRecord {
  id: number;
  direction_country: ICountry;
  date_time: string; // ISO date-time
  crossing_type: string;
  crossing_point: ICrossingPoint;
  transport_type: ITransportType;
  trip_purpose: ITripPurpose;
}

export interface ICountry {
  id: number;
  name: string;
  alpha2_code: string;
}

export interface ICrossingPoint {
  id: number;
  code: string;
  name: string;
}

export interface ITransportType {
  id: number;
  code: string;
  name: string;
}

export interface ITripPurpose {
  id: number;
  sp_id: string;
  name: string;
}
