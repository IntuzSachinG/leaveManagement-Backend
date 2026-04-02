
import { Router } from "express";
import * as controller from "../controllers/employeeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { allowRoles } from "../middlewares/roleMiddleware";
import { createEmployeeValidator } from "../validators/employeeValidator";
import { validate } from "../middlewares/validationMiddleware";


const router = Router();

router.post(
  "/admin-create-employees",
  authMiddleware,
  allowRoles("admin"),
  createEmployeeValidator,
  validate,
  controller.createEmployee
);

router.get("/admin-get-employees", authMiddleware, allowRoles("admin"), controller.getEmployees);

export default router;