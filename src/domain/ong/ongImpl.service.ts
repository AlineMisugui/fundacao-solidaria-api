import { BadRequestException } from "../../exceptions/badRequestException";
import dataSource from "../../../dataSource";
import Ong from "./ong.model";
import { OngService } from "./ong.service";

class OngServiceImpl implements OngService {
  async getOngs(): Promise<Ong[]> {
    const ongs = await ongRepository.find();
    return ongs;
  }

  async getOngById(id: number): Promise<Ong> {
    const ong = await ongRepository.findOneBy({ id });
    if (ong == null) {
      throw new BadRequestException("Ong not found.");
    }
    return ong;
  }
}

const ongRepository = dataSource.getRepository(Ong);
export default new OngServiceImpl();
