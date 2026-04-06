import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import * as service from "../services/employeeService";
import { EmployeeCreationAttributes } from "../interface/employeeInterface";
import { AuthRequest } from "../types/express.types";
import { Employee } from "../models";
import { AppError } from "../utils/AppError";

async function createEmployeeFromRequest(
  req: Request,
  res: Response,
  next: NextFunction,
  mode: "admin" | "manager",
) {
  try {
    const authReq = req as AuthRequest;
    const { name, email, password, role, gender, mobile, departmentId } =
      req.body;

    const existing = await Employee.findOne({
      where: { email },
    });

    if (existing) {
      throw new AppError("Email already exists.Please sign in instead", 400);
    }

    const hashed = await bcrypt.hash(password, 10);
    const nextRole = mode === "manager" ? "employee" : role;
    const nextDepartmentId =
      mode === "manager" ? authReq.user.departmentId : departmentId;

    if (mode === "manager" && role !== "employee") {
      throw new AppError("Managers can only create employees", 403);
    }

    if (
      mode === "manager" &&
      departmentId &&
      departmentId !== authReq.user.departmentId
    ) {
      throw new AppError(
        "Managers can only create employees in their own department",
        403,
      );
    }

    const employee = await Employee.create({
      name,
      email,
      password: hashed,
      role: nextRole,
      gender,
      mobile,
      departmentId: nextDepartmentId,
    });

    res.status(201).json({
      success: true,
      message: "Employee registered successfully",
      data: [
        {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          role: employee.role,
          gender: employee.gender,
          mobile: employee.mobile,
          departmentId: employee.departmentId,
        },
      ],
    });
  } catch (err) {
    next(err);
  }
}

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return createEmployeeFromRequest(req, res, next, "admin");
};

export const createEmployeeForManager = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return createEmployeeFromRequest(req, res, next, "manager");
};

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthRequest;
  try {
    const employees = await service.getEmployees();
    return res.status(200).json({
      success: true,
      message: "Employees fetched Successfully",
      data: employees,
    });
  } catch (err) {
    next(err);
  }
};

export const getVisibleEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthRequest;

  try {
    const employees = await service.getVisibleEmployees(authReq.user);

    return res.status(200).json({
      success: true,
      message: "Visible employees fetched successfully",
      data: employees,
    });
  } catch (err) {
    next(err);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const payload = { ...req.body } as Partial<EmployeeCreationAttributes>;

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    } else {
      delete payload.password;
    }

    const employee = await service.updateEmployee(id, payload);

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    await service.deleteEmployee(id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
