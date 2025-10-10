export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface LoginErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface LoginInputs {
  username: string;
  password: string;
}

export interface InputReset {
  password: string;
  cpassword: string;
}
