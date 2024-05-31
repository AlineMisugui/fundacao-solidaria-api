import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateLoginRequest = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 1 }).withMessage("Password is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
