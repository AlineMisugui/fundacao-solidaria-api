import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateDonorRequest = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("name").isLength({ min: 1 }).withMessage("Name is required"),
  body("password").isLength({ min: 1 }).withMessage("Password is required"),
  body("password_confirmation")
    .isLength({ min: 1 })
    .withMessage("Password confirmation is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
