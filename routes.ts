import { Router, Request, Response } from "express";
import { authenticate } from "./src/middlewares/authenticationMiddleware";
import donorController from "./src/domain/donor/donor.controller";
import { validateDonorRequest } from "./src/middlewares/donorInputsMiddleware";
import { validateLoginRequest } from "./src/middlewares/loginInputsMiddleware";
import ongController from "./src/domain/ong/ong.controller";

const routes = Router();

routes.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

routes.post("/donor/login", validateLoginRequest, donorController.login);
routes.post("/donor", validateDonorRequest, donorController.createDonor);
routes.get("/donor/all", authenticate, donorController.getDonors);
routes.get("/donor", authenticate, donorController.getDonorById);
routes.put(
  "/donor",
  authenticate,
  validateDonorRequest,
  donorController.updateDonor
);
routes.delete("/donor", authenticate, donorController.deleteDonor);

routes.get("/ong/all", authenticate, ongController.getOngs);
routes.get("/ong/:id", authenticate, ongController.getOngById);

export { routes };
