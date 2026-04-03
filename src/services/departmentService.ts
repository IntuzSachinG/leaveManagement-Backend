import { Department } from "../models";
import { DepartmentCreationAttributes } from "../interface/departmentInterface";
import { AppError } from "../utils/AppError";
import { Op } from "sequelize";
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

export const updateDepartment = async (
  id: string,
  data: Partial<DepartmentCreationAttributes>,
) => {
  const department = await Department.findByPk(id);

  if (!department) {
    throw new AppError("Department not found", 404);
  }

  if (data.name) {
    const existing = await Department.findOne({
      where: {
        name: data.name,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (existing) {
      throw new AppError("Department already exists", 400);
    }
  }

  await department.update(data);
  return department;
};

export const deleteDepartment = async (id: string) => {
  const department = await Department.findByPk(id);

  if (!department) {
    throw new AppError("Department not found", 404);
  }

  await department.destroy();
};
