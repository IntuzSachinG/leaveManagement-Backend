
import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/authValidator";
import { validate } from "../middlewares/validationMiddleware";
import { login, logout, me, register } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/me", authMiddleware, me);
router.post("/logout", authMiddleware, logout);

export default router;
