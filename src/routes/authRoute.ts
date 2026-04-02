import { Router } from "express";
import { loginValidator } from "../validators/authValidator";
import { validate } from "../middlewares/validationMiddleware";
import { login } from "../controllers/authController";

const router = Router();

router.post("/login", loginValidator, validate, login);

export default router;
