import { Router } from "express";
import * as controller from "../controllers/employeeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { allowRoles } from "../middlewares/roleMiddleware";
import {
  createEmployeeValidator,
  updateEmployeeValidator,
} from "../validators/employeeValidator";
import { validate } from "../middlewares/validationMiddleware";

const router = Router();

router.post(
  "/admin-create-employees",
  authMiddleware,
  allowRoles("admin"),
  createEmployeeValidator,
  validate,
  controller.createEmployee,
);

router.post(
  "/manager-create-employees",
  authMiddleware,
  allowRoles("manager"),
  createEmployeeValidator,
  validate,
  controller.createEmployeeForManager,
);

router.get(
  "/admin-get-employees",
  authMiddleware,
  allowRoles("admin"),
  controller.getEmployees,
);
router.get(
  "/visible-employees",
  authMiddleware,
  allowRoles("admin", "manager", "employee"),
  controller.getVisibleEmployees,
);
router.put(
  "/:id/admin-update-employee",
  authMiddleware,
  allowRoles("admin"),
  updateEmployeeValidator,
  validate,
  controller.updateEmployee,
);
router.delete(
  "/:id/admin-delete-employee",
  authMiddleware,
  allowRoles("admin"),
  controller.deleteEmployee,
);

export default router;
