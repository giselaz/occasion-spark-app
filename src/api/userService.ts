import { AuthResponse, LoginRequest, User } from "@/types/event";
import { axiosInstance } from "../lib/utils";
import axios, { AxiosResponse } from "axios";
export const signUpApi = async (data: Partial<User>) => {
  try {
    const response: AxiosResponse<string> = await axiosInstance.post( 
      "/users/signup",
      data
    );
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Something went wrong");
    }
    throw new Error("Unexpected Error");
  }
};

export const login = async (data: LoginRequest) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post(
      "/auth/login",
      data,
      { withCredentials: true } 
    );
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Something went wrong");
    }
    throw new Error("Unexpected Error");
  }
};

export const generateAccess = async () => {
  try {
    const response: AxiosResponse<{access_token:string}> = await axiosInstance.post(
      "auth/refresh-token",
       {},
      { withCredentials: true } 
    );
    return response.data;
  } catch (err) {}
};
