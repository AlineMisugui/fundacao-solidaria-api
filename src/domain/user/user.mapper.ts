import User from "./user.model";
import { Password, UserRequest, UserResponse } from "./user.dto";

export default class UserMapper {
  public static toEntity(
    record: UserRequest,
    encryptedPassword: Password
  ): User {
    const user = new User();
    user.name = record.name;
    user.email = record.email;
    user.password = encryptedPassword.hash;
    user.password_salt = encryptedPassword.salt;
    return user;
  }

  public static toResponse(record: any): UserResponse {
    const userResponse: UserResponse = {
      id: record.id,
      name: record.name,
      email: record.email,
    };
    return userResponse;
  }
}
