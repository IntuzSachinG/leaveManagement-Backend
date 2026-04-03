
import { body } from "express-validator";

export const createDepartmentValidator = [
  body("name").isString().withMessage("Department Name Must Be String Only...").notEmpty().withMessage("Department name is required"),
];

export const updateDepartmentValidator = [
  body("name")
    .optional()
    .isString()
    .withMessage("Department Name Must Be String Only...")
    .notEmpty()
    .withMessage("Department name is required"),
];