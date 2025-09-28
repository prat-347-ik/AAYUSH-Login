export interface User {
  id: string;
  email: string;
  role: "Admin" | "Doctor" | "Nurse";
  name?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  role: "Admin" | "Doctor" | "Nurse";
  rememberMe: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}
