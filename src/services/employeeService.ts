import { Op } from "sequelize";
import { Employee } from "../models";
import { EmployeeCreationAttributes } from "../interface/employeeInterface";
import { AppError } from "../utils/AppError";
import { AuthUser } from "../types/express.types";
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

export const getVisibleEmployees = async (user: AuthUser) => {
  if (user.role === "admin") {
    return getEmployees();
  }

  if (user.role === "manager") {
    return Employee.findAll({
      where: {
        departmentId: user.departmentId,
      },
      attributes: { exclude: ["password"] },
    });
  }

  return Employee.findAll({
    where: {
      id: user.id,
    },
    attributes: { exclude: ["password"] },
  });
};

export const updateEmployee = async (
  id: string,
  data: Partial<EmployeeCreationAttributes>,
) => {
  const employee = await Employee.findByPk(id);

  if (!employee) {
    throw new AppError("Employee not found", 404);
  }

  if (data.email) {
    const existing = await Employee.findOne({
      where: {
        email: data.email,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (existing) {
      throw new AppError("Email already exists", 400);
    }
  }

  if (data.mobile) {
    const existingMobile = await Employee.findOne({
      where: {
        mobile: data.mobile,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (existingMobile) {
      throw new AppError("Mobile already exists", 400);
    }
  }

  await employee.update(data);

  return Employee.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};

export const deleteEmployee = async (id: string) => {
  const employee = await Employee.findByPk(id);

  if (!employee) {
    throw new AppError("Employee not found", 404);
  }

  await employee.destroy();
};
