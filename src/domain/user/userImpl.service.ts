import AuthUtils from "../../../src/auth/utils";
import User from "./user.model";
import { UserRequest, UserResponse } from "./user.dto";
import { UserService } from "./user.service";
import { BadRequestException } from "../../../src/exceptions/badRequestException";
import { ConflictException } from "../../../src/exceptions/conflictException";
import UserMapper from "./user.mapper";
import dataSource from "../../../dataSource";

class UserServiceImpl implements UserService {
  async verifyIfUserExists(email: string) {
    const user = await userRepository.findOneBy({ email: email });
    if (user) {
      throw new ConflictException("User already exists");
    }
  }

  async getUserById(id: number): Promise<UserResponse> {
    const user = await userRepository.findOneBy({ id });
    if (user == null) {
      throw new BadRequestException("User not found.");
    }
    const userResponse = UserMapper.toResponse(user);
    return userResponse as UserResponse;
  }

  async createUser(user: UserRequest): Promise<User> {
    const encryptedPassword = AuthUtils.encryptPassword(user.password);
    const isPasswordConfirmationValid = AuthUtils.verifyPassword(
      user.password_confirmation,
      encryptedPassword.salt,
      encryptedPassword.hash
    );
    if (!isPasswordConfirmationValid) {
      throw new BadRequestException(
        "Password and password confirmation doesn't match"
      );
    }
    await this.verifyIfUserExists(user.email);
    const newUser = UserMapper.toEntity(user, encryptedPassword);
    const createdUser = await userRepository.save(newUser);
    if (!createdUser) {
      throw new BadRequestException("User could not be created");
    }
    return createdUser as User;
  }

  async updateUser(id: number, user: UserRequest): Promise<void> {
    const userFind = await this.getUserById(id);

    if (userFind.email !== user.email) {
      await this.verifyIfUserExists(user.email);
    }

    const encryptedPassword = AuthUtils.encryptPassword(user.password);
    const isPasswordConfirmationValid = AuthUtils.verifyPassword(
      user.password_confirmation,
      encryptedPassword.salt,
      encryptedPassword.hash
    );
    if (!isPasswordConfirmationValid) {
      throw new BadRequestException(
        "Password and password confirmation doesn't match"
      );
    }

    const newUser = UserMapper.toEntity(user, encryptedPassword);
    await userRepository.update(id, newUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.getUserById(id);
    await userRepository.delete(id);
  }

  async getUsers(): Promise<UserResponse[]> {
    const users = await userRepository.find();
    const allUsers: UserResponse[] = await Promise.all(
      users.map(async (user) => {
        const userResponse = UserMapper.toResponse(user);
        return userResponse;
      })
    );
    return allUsers as unknown as Promise<UserResponse[]>;
  }
}

const userRepository = dataSource.getRepository(User);
export default new UserServiceImpl();
