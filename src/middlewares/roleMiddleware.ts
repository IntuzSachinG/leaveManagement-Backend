import { Request, Response, NextFunction } from "express";
import { AuthRequest, Role } from "../types/express.types";
import { AppError } from "../utils/AppError";
// import { AppError } from "./errorMiddleware";


export const allowRoles = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;

    if (!authReq.user) return next(new AppError("Unauthorized", 401));
    if (!roles.includes(authReq.user.role)) {
      // return next(new AppError("Forbidden: Insufficient role", 403));
       return next(new AppError( "Sorry! You Cannot Permit To Do This Kind Of Practice You Have Don't Access Contact Admin Panel", 403));
    }

    next();
  };
};
