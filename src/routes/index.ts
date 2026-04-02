import { Router } from "express";
import authRoutes from "./authRoute";
import employeeRoutes from "./employee";
import departmentRoutes from "./departmentRoute";
import leaveRoutes from "./leaveRoute";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);
router.use("/departments", departmentRoutes);
router.use("/leaves", leaveRoutes);

export default router;
