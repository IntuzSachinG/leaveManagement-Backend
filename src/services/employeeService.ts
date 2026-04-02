import { Employee } from "../models";
import { EmployeeCreationAttributes } from "../interface/employeeInterface";
import { AppError } from "../utils/AppError";
// import { AppError } from "../middlewares/errorMiddleware";

export const createEmployee = async (data: EmployeeCreationAttributes) => {
  const existing = await Employee.findOne({
    where: { email: data.email },
  });

  if (existing) {
    throw new AppError("Email already exists", 400);
  }

  return Employee.create(data);
};

export const getEmployees = async () => {
  return Employee.findAll({
    attributes: { exclude: ["password"] },
  });
};
