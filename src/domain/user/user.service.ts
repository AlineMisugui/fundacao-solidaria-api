import { UserRequest, UserResponse } from "./user.dto";
import User from "./user.model";

export interface UserService {
  getUserById(id: number): Promise<UserResponse>;

  createUser(user: UserRequest): Promise<User>;

  updateUser(id: number, user: UserRequest): Promise<void>;

  deleteUser(id: number): Promise<void>;

  getUsers(): Promise<UserResponse[]>;
}
