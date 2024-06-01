import BaseController from "../../../src/senior/BaseController";
import ongImplService from "./ongImpl.service";

class OngController extends BaseController {
  getOngs = this.executeAction(async (req, res) => {
    const ongs = await OngService.getOngs();
    res.status(200).send(ongs);
  });

  getOngById = this.executeAction(async (req, res) => {
    const ong = await OngService.getOngById(Number(req.params.id));
    res.status(200).send(ong);
  });
}

const OngService = ongImplService;
export default new OngController();
