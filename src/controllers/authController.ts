import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { Employee } from "../models";
import { AuthRequest } from "../types/express.types";
import { generateToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, gender, mobile, departmentId } = req.body;

    const existing = await Employee.findOne({ where: { email } });

    if (existing) return next(new AppError("Email already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Employee.create({
      name,
      email,
      password: hashedPassword,
      gender,
      mobile,
      departmentId,
      role: "employee",
      status: "active",
    });

    res.status(201).json({
      success: true,
      message: "Signup successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        departmentId: user.departmentId,
      },
    });
  } catch (err) {
    next(err);
  }
};

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
      secure: false,
      sameSite: "lax",
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

export const logout = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authReq = req as AuthRequest;

    const user = await Employee.findByPk(authReq.user.id, {
      attributes: ["id", "name", "email", "role", "departmentId"],
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        departmentId: user.departmentId,
      },
    });
  } catch (err) {
    next(err);
  }
};
