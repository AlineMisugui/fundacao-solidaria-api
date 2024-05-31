import { UserResponse } from "../user/user.dto";

export interface DonorRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface DonorResponse {
  user_id: number;
  user: UserResponse;
}

export interface DonorLogin {
  email: string;
  password: string;
}
