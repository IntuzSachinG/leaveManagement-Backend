import { Router } from "express";
import * as controller from "../controllers/departmentController";

import { allowRoles } from "../middlewares/roleMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createDepartmentValidator,
  updateDepartmentValidator,
} from "../validators/departmentValidator";
import { validate } from "../middlewares/validationMiddleware";

const router = Router();

router.get("/public-departments", controller.getDepartments);

router.post(
  "/admin-create-departments",
  authMiddleware,
  allowRoles("admin"),
  createDepartmentValidator,
  validate,
  controller.createDepartment,
);

router.get("/get-departments", authMiddleware, controller.getDepartments);
router.put(
  "/:id/admin-update-department",
  authMiddleware,
  allowRoles("admin"),
  updateDepartmentValidator,
  validate,
  controller.updateDepartment,
);
router.delete(
  "/:id/admin-delete-department",
  authMiddleware,
  allowRoles("admin"),
  controller.deleteDepartment,
);

export default router;
