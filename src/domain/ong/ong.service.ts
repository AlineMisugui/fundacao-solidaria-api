import Ong from "./ong.model";

export interface OngService {
  getOngs(): Promise<Ong[]>;
  getOngById(id: number): Promise<Ong>;
}
