export interface SignupForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  middlename: string;
}

export interface IUserResponse {
  token: string;
}
