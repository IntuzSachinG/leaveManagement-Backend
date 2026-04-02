export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface ApplyLeave {
  startDate: Date;
  endDate: Date;
  reason: string;
}
