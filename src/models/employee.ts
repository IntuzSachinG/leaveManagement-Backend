import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import {
  EmployeeAttributes,
  EmployeeCreationAttributes,
} from "../interface/employeeInterface";
import { Role } from "../types/express.types";

export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  departmentId!: string;
  public mobile?: string;
  public password!: string;
  public gender?: "male" | "female" | "other";
  public status?: "active" | "inactive";
  // public role?: "manager" | "admin" | "employee";
    public role!: Role;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date | null;
}

Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
     departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "departments", key: "id" },
    },
   
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isValidMobile(value: string | null) {
          if (!value) return;

          const match = /^\+?[1-9]\d{9,14}$/;
          if (!match.test(value)) {
            throw new Error("Invalid mobile number format");
          }
        },
      },
    },
 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
   
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
   
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    role: {
      type: DataTypes.ENUM("manager", "admin","employee"),
      allowNull: false,
      defaultValue: "employee",
    },
  },
  {
    sequelize,
    tableName: "employees",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
);
