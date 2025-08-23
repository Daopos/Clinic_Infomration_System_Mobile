export interface SignupForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  middlename: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface IUserResponse {
  token: string;
}
