import { Router } from "express";
import { authenticate } from "./src/middlewares/authenticationMiddleware";
import donorController from "./src/domain/donor/donor.controller";
import { validateDonorRequest } from "./src/middlewares/donorInputsMiddleware";
import { validateLoginRequest } from "./src/middlewares/loginInputsMiddleware";

const routes = Router();

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

export { routes };
