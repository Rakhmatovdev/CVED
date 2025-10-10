interface ICurrentUserGroups {
  id: number;
  name: string;
}

interface ICurrentUserDistrict {
  id: number;
  name: string;
  region: {
    id: number;
    name: string;
  };
}

export interface ICurrentUser {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  username: string;
  is_active: boolean;
  groups: ICurrentUserGroups[];
  date_joined: string; // ISO date string
  photo: string;
  phone: string;
  email: string;
  district: ICurrentUserDistrict | null;
  region: string | null;
  role: string | null;
  permissions: string[];
}
