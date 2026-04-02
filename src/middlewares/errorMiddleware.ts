// Way-1

// import { Request, Response, NextFunction } from "express";

// export class AppError extends Error {
//   statusCode: number;

//   constructor(message: string, statusCode = 500) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }

// export const errorMiddleware = (
//   err: AppError,
//   _req: Request,
//   res: Response,
//   _next: NextFunction,
// ) => {
//   console.error(err);

//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// };

// Way-2

import { Request, Response, NextFunction } from "express";
import {
  ValidationError,
  DatabaseError,
  UniqueConstraintError,
} from "sequelize";
import { AppError } from "../utils/AppError";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  if (err instanceof ValidationError) {
    const message = err.errors.map((e) => e.message).join(", ");
    error = new AppError(message, 400);
  }
  if (err instanceof UniqueConstraintError) {
    // error = new AppError("Field already exists", 409);
      const message = err.errors.map((e) => e.message).join(", ");
    error = new AppError(message, 409);
  }
  // if (err instanceof DatabaseError) {
  //   // error = new AppError("Database error occurred", 500);
  //   // const message = err.errors.map((e) => e.message).join(", ");
  //   // error = new AppError(message, 500);
  // }

   if (err instanceof DatabaseError) {
    return res.status(500).json({
      success: 'false',
      // message: 'Database connection failed or database does not exist.',
      message: err.message,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
    });
  }

  console.error("ERROR ", err);
  return res.status(500).json({
    success: "false",
    message: "An unexpected error occurred on our end. Please try again later",
  });
};
