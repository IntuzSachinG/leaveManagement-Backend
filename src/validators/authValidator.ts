import { body } from "express-validator";

export const registerValidator = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("departmentId").notEmpty().withMessage("Department is required"),
  body("mobile")
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^\+?[1-9]\d{9,14}$/)
    .withMessage("Invalid mobile number format"),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Enter valid gender"),
];

export const loginValidator = [
  body("email").isEmail().notEmpty().withMessage("E-mail Is Compulsory"),
  body("password")
    .isLength({ min: 6 })
    .notEmpty()
      .withMessage("Password must be at least 6 characters")
    .withMessage("Password Is Compulsory"),
];
