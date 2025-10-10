export interface ISearchedImmigrantPassport {
  id: number;
  immigrant_id: number;
  passport_front_side_photo: string | null;
  passport_back_side_photo: string | null;
  passport_number: string;
  first_name_in_passport: string;
  last_name_in_passport: string;
  middle_name_in_passport: string;
  birth_date: string;
  // place_of_birth: null;
  citizenship: {
    id: number;
    name: string;
    alpha2_code: string;
  };
  place_of_issue: string | null;
  date_of_issue: string | null;
  valid_until: string | null;
  email: string | null;
  full_name: string;
  photo: string;
  last_entry: string | null;
  visa: {
    number: string;
  };
}
