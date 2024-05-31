export interface UserRequest {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export interface Password {
  hash: string;
  salt: string;
}
