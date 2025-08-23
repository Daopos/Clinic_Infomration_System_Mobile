import AxiosClient from "@/axio-client/axios-client";
import { IUserResponse, LoginForm, SignupForm } from "./../types/IAuth";

import { AxiosError } from "axios";

export const signup = async (data: SignupForm): Promise<IUserResponse> => {
  try {
    const response = await AxiosClient.post("/signup", data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Sign up failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};

export const loginService = async (data: LoginForm): Promise<IUserResponse> => {
  try {
    const response = await AxiosClient.post("/login", data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Sign up failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};
