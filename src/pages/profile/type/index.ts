export interface ProfileValues {
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  username: string;
  region: { label: string; value: number } | null;
  district: { label: string; value: number } | null;
  role?: string;
  password?: string;
  password2?: string;
}

export interface ChangePasswordProps {
  setShowAdd: (value: boolean) => void;
}

export interface ChangeFormValues {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}
