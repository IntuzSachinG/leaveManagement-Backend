import { Optional } from "sequelize";

export interface EmployeeAttributes {
  id: string;
  name: string;
  email: string;
  departmentId: string;
  mobile?: string;
  password: string;
  gender?: "male" | "female" | "other";
  status?: "active" | "inactive";
  role?: "manager" | "admin" | "employee";
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface EmployeeCreationAttributes extends Optional<
  EmployeeAttributes,
  "id"
> {}
