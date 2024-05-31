import User from "../user/user.model";
import { DonorResponse } from "./donor.dto";
import Donor from "./donor.model";

export default class DonorMapper {
  public static toResponse(record: Donor, user: User): DonorResponse | null {
    if (!record) {
      return null;
    }

    const donorResponse: DonorResponse = {
      user_id: record.id,
      user: {
        id: record.id,
        name: user.name,
        email: user.email,
      },
    };
    return donorResponse;
  }
}
