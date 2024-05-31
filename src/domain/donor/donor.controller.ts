import { Request, Response } from "express";
import BaseController from "../../senior/BaseController";
import { DonorLogin, DonorRequest } from "./donor.dto";
import donorImplService from "./donorImpl.service";

class DonorController extends BaseController {
  login = this.executeAction(async (req: Request, res: Response) => {
    const token = await DonorService.login(req.body as DonorLogin);
    res.status(200).send({ token: token });
  });

  createDonor = this.executeAction(async (req: Request, res: Response) => {
    await DonorService.createDonor(req.body as DonorRequest);
    res.status(201).send({ message: "Donor created successfully" });
  });

  getDonors = this.executeAction(async (_req: Request, res: Response) => {
    const donors = await DonorService.getDonors();
    res.status(200).send(donors);
  });

  getDonorById = this.executeAction(async (req: Request, res: Response) => {
    const donor = await DonorService.getDonorById(req.user.id);
    res.status(200).send(donor);
  });

  updateDonor = this.executeAction(async (req: Request, res: Response) => {
    await DonorService.updateDonor(req.user.id, req.body as DonorRequest);
    res.status(200).send({ message: "Donor updated successfully" });
  });

  deleteDonor = this.executeAction(async (req: Request, res: Response) => {
    await DonorService.deleteDonor(req.user.id);
    res.status(200).send({ message: "Donor deleted successfully" });
  });
}

const DonorService = donorImplService;
export default new DonorController();
