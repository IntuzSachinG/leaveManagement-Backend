import { Optional } from "sequelize";

export interface DepartmentAttributes {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface DepartmentCreationAttributes extends Optional<
  DepartmentAttributes,
  "id"
> {}
