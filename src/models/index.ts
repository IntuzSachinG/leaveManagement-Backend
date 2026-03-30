import { sequelize } from "../config/database";
import { Department } from "./department";
import { Employee } from "./employee";
import { Leave } from "./leave";

Department.hasMany(Employee, {
  foreignKey: "departmentId",
  as: "employees",
});

Employee.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});

Employee.hasMany(Leave, {
  foreignKey: "employeeId",
  as: "leaves",
});

Leave.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

export { Department, Employee, Leave, sequelize };
