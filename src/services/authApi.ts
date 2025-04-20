import apiClient from "./apiClient";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, UserInfo } from "../types/auth";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>("/auth/register", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};

export const getCurrentUser = async (): Promise<UserInfo> => {
  const response = await apiClient.get<UserInfo>("/auth/me");
  return response.data;
};
