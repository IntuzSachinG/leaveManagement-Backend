import { body } from "express-validator";

export const applyLeaveValidator = [
  body("startDate").isISO8601(),
  body("endDate").isISO8601(),
  body("reason").notEmpty(),
];
