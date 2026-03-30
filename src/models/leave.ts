import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import {
  LeaveAttributes,
  LeaveCreationAttributes,
} from "../interface/leaveInterface";

export class Leave
  extends Model<LeaveAttributes, LeaveCreationAttributes>
  implements LeaveAttributes
{
  public id!: string;

  public employeeId!: string;

  public startDate!: Date;
  public endDate?: Date | null;
  public reason!: string;
  public status!: "pending" | "approved" | "rejected" | "cancelled";
  public approvedBy!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date | null;
}

Leave.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "employees", key: "id" },
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    approvedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "leaves",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
);
