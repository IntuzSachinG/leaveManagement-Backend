import { Department } from "../models";
import { DepartmentCreationAttributes } from "../interface/departmentInterface";
import { AppError } from "../utils/AppError";
// import { AppError } from "../middlewares/errorMiddleware";

export const createDepartment = async (data: DepartmentCreationAttributes) => {
  const existing = await Department.findOne({
    where: { name: data.name },
  });

  if (existing) {
    throw new AppError("Department already exists", 400);
  }

  return Department.create(data);
};

export const getDepartments = async () => {
  return Department.findAll();

};
