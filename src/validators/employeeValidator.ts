import { body } from "express-validator";

export const createEmployeeValidator = [
  body("name").isString().withMessage("Name Bust Be String Only...").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("role").isIn(["admin", "manager", "employee"]),
  body("departmentId").notEmpty(),
  body("mobile")
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage("Invalid mobile number format"),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Enter Valid Gender"),
];
