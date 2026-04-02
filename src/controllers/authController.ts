import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { Employee } from "../models";

// import { AppError } from "../middlewares/errorMiddleware";
import { generateToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await Employee.findOne({ where: { email } });

    if (!user) return next(new AppError("Invalid credentials", 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new AppError("Invalid credentials", 400));

    const token = generateToken({
      id: user.id,
      role: user.role,
      departmentId: user.departmentId,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        departmentId: user.departmentId,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
