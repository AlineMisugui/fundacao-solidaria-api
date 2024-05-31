import { DonorLogin, DonorRequest, DonorResponse } from "./donor.dto";

export interface DonorService {
  login(login: DonorLogin): Promise<string>;

  getDonorById(id: number): Promise<DonorResponse>;

  createDonor(donor: DonorRequest): Promise<void>;

  updateDonor(id: number, donor: DonorRequest): Promise<void>;

  deleteDonor(id: number): Promise<void>;

  getDonors(): Promise<DonorResponse[]>;
}
