import { Router } from "express";
import * as controller from "../controllers/departmentController";

import { allowRoles } from "../middlewares/roleMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createDepartmentValidator } from "../validators/departmentValidator";
import { validate } from "../middlewares/validationMiddleware";

const router = Router();

router.post(
  "/admin-create-departments",
  authMiddleware,
  allowRoles("admin"),
  createDepartmentValidator,
  validate,
  controller.createDepartment,
);

router.get("/get-departments", authMiddleware, controller.getDepartments);

export default router;
