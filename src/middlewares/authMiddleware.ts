import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { AppError } from "./errorMiddleware";
import { AuthRequest, JwtPayload } from "../types/express.types";
import { AppError } from "../utils/AppError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) throw new AppError("Unauthorized: Token missing", 401);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret",
    ) as JwtPayload;

    (req as AuthRequest).user = {
      id: decoded.id,
      role: decoded.role,
      departmentId: decoded.departmentId,
    };

    next();
  } catch (err) {
    next(err);
  }
};
