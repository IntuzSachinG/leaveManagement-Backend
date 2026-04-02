import { body } from "express-validator";

export const loginValidator = [
  body("email").isEmail().notEmpty().withMessage("E-mail Is Compulsory"),
  body("password").isLength({ min: 6 }).notEmpty().withMessage("Password Is Compulsory"),
];
