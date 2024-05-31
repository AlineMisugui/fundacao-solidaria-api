import dataSource from "../../../dataSource";
import { DonorService } from "./donor.service";
import Donor from "./donor.model";
import { DonorLogin, DonorRequest, DonorResponse } from "./donor.dto";
import { BadRequestException } from "../../exceptions/badRequestException";
import User from "../user/user.model";
import DonorMapper from "./donor.mapper";
import userImplService from "../user/userImpl.service";
import AuthUtils from "../../auth/utils";
import Jwt from "../../auth/jwt";

class DonorServiceImpl implements DonorService {
  async login(login: DonorLogin): Promise<string> {
    const user = await userRepository.findOneBy({ email: login.email });
    if (!user) {
      throw new BadRequestException("User not found.");
    }
    const isPasswordValid = AuthUtils.verifyPassword(
      login.password,
      user.password_salt,
      user.password
    );
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid password.");
    }
    const token = Jwt.generateToken({
      email: user.email,
      name: user.name,
      id: user.id,
    });
    return token;
  }

  async getDonorById(id: number): Promise<DonorResponse> {
    const donor = await donorRepository.findOneBy({ id });
    if (donor == null) {
      throw new BadRequestException("Donor not found.");
    }
    const user = await userRepository.findOneBy({ id: donor.user_id });
    if (user == null) {
      throw new BadRequestException("User not found.");
    }
    const donorResponse = DonorMapper.toResponse(donor, user);
    return donorResponse as DonorResponse;
  }

  async createDonor(donor: DonorRequest): Promise<void> {
    const newUser = await userService.createUser(donor);
    const newDonor = new Donor();
    newDonor.user_id = newUser.id;
    await donorRepository.save(newDonor);
  }

  async updateDonor(id: number, donor: DonorRequest): Promise<void> {
    await userService.updateUser(id, donor);
  }

  async deleteDonor(id: number): Promise<void> {
    const donorFind = await this.getDonorById(id);
    await userService.deleteUser(donorFind.user.id);
  }

  async getDonors(): Promise<DonorResponse[]> {
    const donors = await donorRepository.find();
    const donorsResponse: DonorResponse[] = [];
    for (let i = 0; i < donors.length; i++) {
      const user = await userRepository.findOneBy({ id: donors[i].user_id });
      if (user) {
        const donorResponse = DonorMapper.toResponse(donors[i], user);
        donorsResponse.push(donorResponse as DonorResponse);
      }
    }
    return donorsResponse;
  }
}

const donorRepository = dataSource.getRepository(Donor);
const userRepository = dataSource.getRepository(User);
const userService = userImplService;
export default new DonorServiceImpl();
