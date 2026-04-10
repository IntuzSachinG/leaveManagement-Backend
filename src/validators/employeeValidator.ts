import { body } from "express-validator";

export const createEmployeeValidator = [
  body("name").isString().withMessage("Name Bust Be String Only...").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
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

export const updateEmployeeValidator = [
  body("name").optional().isString().withMessage("Name Bust Be String Only...").notEmpty(),
  body("email").optional().isEmail(),
  body("password").optional().isLength({ min: 6 }),
  body("role").optional().isIn(["admin", "manager", "employee"]),
  body("departmentId").optional().notEmpty(),
  body("mobile")
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^\+?[1-9]\d{9,14}$/)
    .withMessage("Invalid mobile number format"),
  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Enter Valid Gender"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Enter Valid Status"),
];
