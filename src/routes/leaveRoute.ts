import { Router } from "express";
import * as controller from "../controllers/leaveController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { allowRoles } from "../middlewares/roleMiddleware";
import { applyLeaveValidator } from "../validators/leaveValidator";
import { validate } from "../middlewares/validationMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  applyLeaveValidator,
  validate,
  controller.applyLeave,
);

router.get("/summary", authMiddleware, controller.getLeaveSummary);

router.get("/", authMiddleware, controller.getLeaveHistory);

router.patch(
  "/:id/approve",
  authMiddleware,
  allowRoles("admin", "manager"),
  controller.approveLeave,
);

router.patch(
  "/:id/reject",
  authMiddleware,
  allowRoles("admin", "manager"),
  controller.rejectLeave,
);

router.patch("/:id/cancel", authMiddleware, controller.cancelLeave);

export default router;