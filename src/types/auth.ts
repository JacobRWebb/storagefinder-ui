// Auth types for requests and responses

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

export interface RegisterResponse {
  token: string;
  user: UserInfo;
}

export interface UserInfo {
  id: string;
  email: string;
  displayName: string;
  roles?: string[];
}
