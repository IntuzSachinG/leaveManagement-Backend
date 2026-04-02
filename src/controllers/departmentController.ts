import { Request, Response, NextFunction } from "express";
import * as departmentService from "../services/departmentService";

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const department = await departmentService.createDepartment(req.body);
    // res.status(201).json(department);
    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (err) {
    next(err);
  }
};

export const getDepartments = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const departments = await departmentService.getDepartments();
    // res.json(departments);
    res.status(200).json({
      success: true,
      message: "Department fetched successfully",
      data: departments,
    });
  } catch (err) {
    next(err);
  }
};
