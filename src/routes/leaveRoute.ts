import { Router } from "express";
import * as controller from "../controllers/leaveController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { allowRoles } from "../middlewares/roleMiddleware";
import { applyLeaveValidator } from "../validators/leaveValidator";
import { validate } from "../middlewares/validationMiddleware";

const router = Router();

router.post(
  "/apply-leaves",
  authMiddleware,
  applyLeaveValidator,
  validate,
  controller.applyLeave,
);

router.get("/summary", authMiddleware, controller.getLeaveSummary);

router.get("/get-leaves", authMiddleware, controller.getLeaveHistory);

router.patch(
  "/:id/approve-leaves",
  authMiddleware,
  allowRoles("admin", "manager"),
  controller.approveLeave,
);

router.patch(
  "/:id/reject-leaves",
  authMiddleware,
  allowRoles("admin", "manager"),
  controller.rejectLeave,
);

router.patch("/:id/cancel-leaves", authMiddleware, controller.cancelLeave);

export default router;
