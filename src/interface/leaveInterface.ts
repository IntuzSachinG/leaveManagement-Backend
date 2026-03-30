import { Optional } from "sequelize";
export interface LeaveAttributes {
  id: string;
  employeeId: string;
  startDate: Date;
  endDate?: Date | null;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  approvedBy?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}
export interface LeaveCreationAttributes extends Optional<
  LeaveAttributes,
  "id"
> {}
