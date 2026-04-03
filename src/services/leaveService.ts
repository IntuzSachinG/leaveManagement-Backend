import { FindOptions, Op, WhereOptions } from "sequelize";
import { Leave, Employee } from "../models";
import { sequelize } from "../config/database";

import { AuthUser } from "../types/express.types";
import { ApplyLeave } from "../types/leave.types";
import { AppError } from "../utils/AppError";
// import { AppError } from "../middlewares/errorMiddleware";

export const applyLeave = async (data: ApplyLeave & { employeeId: string }) => {
  const t = await sequelize.transaction();

  try {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (start < today) {
      throw new AppError("Cannot apply leave for past dates", 400);
    }

    if (start > end) {
      throw new AppError("startDate must be before endDate", 400);
    }

    const overlapping = await Leave.findOne({
      where: {
        employeeId: data.employeeId,
        status: {
          [Op.notIn]: ["rejected", "cancelled"],
        },
        [Op.or]: [
          {
            startDate: { [Op.between]: [start, end] },
          },
          {
            endDate: { [Op.between]: [start, end] },
          },
          {
            startDate: { [Op.lte]: start },
            endDate: { [Op.gte]: end },
          },
        ],
      },
      transaction: t,
    });

    if (overlapping) {
      throw new AppError("Overlapping leave exists", 400);
    }

    const leave = await Leave.create(
      {
        ...data,
        status: "pending",
      },
      { transaction: t },
    );

    await t.commit();
    return leave;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const approveLeave = async (leaveId: string, approverId: string) => {
  const leave = await Leave.findByPk(leaveId, {
    include: [{ model: Employee, as: "employee" }],
  });

  if (!leave) throw new AppError("Leave not found", 404);

  if (leave.status !== "pending") {
    throw new AppError("Only pending leaves can be approved", 400);
  }

  if (leave.employeeId === approverId) {
    throw new AppError("Cannot approve own leave", 400);
  }

  const approver = await Employee.findByPk(approverId);
  if (!approver) throw new AppError("Approver not found", 404);

  if (
    approver.role === "manager" &&
    leave.employee?.departmentId !== approver.departmentId
  ) {
    throw new AppError("You can only approve leaves of your department", 403);
  }

  await leave.update({
    status: "approved",
    approvedBy: approverId,
  });

  return leave;
};

export const rejectLeave = async (leaveId: string, approverId: string) => {
  const leave = await Leave.findByPk(leaveId, {
    include: [{ model: Employee, as: "employee" }],
  });

  if (!leave) throw new AppError("Leave not found", 404);

  if (leave.status !== "pending") {
    throw new AppError("Only pending leaves can be rejected", 400);
  }

  const approver = await Employee.findByPk(approverId);
  if (!approver) throw new AppError("Approver not found", 404);

  if (
    approver.role === "manager" &&
    leave.employee?.departmentId !== approver.departmentId
  ) {
    throw new AppError("You can only reject leaves of your department", 403);
  }

  await leave.update({
    status: "rejected",
    approvedBy: approverId,
  });

  return leave;
};

export const cancelLeave = async (leaveId: string, userId: string) => {
  const leave = await Leave.findByPk(leaveId);

  if (!leave) throw new AppError("Leave not found", 404);

  if (!["pending", "approved"].includes(leave.status)) {
    throw new AppError("Cannot cancel this leave", 400);
  }

  if (leave.employeeId !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  await leave.update({
    status: "cancelled",
  });

  return leave;
};

interface LeaveQuery {
  page?: string;
  limit?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  employeeId?: string;
}

const ACTIVE_LEAVE_STATUSES = ["pending", "approved"] as const;

function buildLeaveScope(user: AuthUser) {
  const where: WhereOptions = {};

  if (user.role === "employee") {
    where["employeeId"] = user.id;
  }

  if (user.role === "manager") {
    where["$employee.departmentId$"] = user.departmentId;
  }

  return where;
}

function buildHistoryFilters(query: LeaveQuery, user: AuthUser) {
  const where: WhereOptions = {
    ...buildLeaveScope(user),
  };

  if (query.status) {
    where["status"] = query.status;
  }

  if (query.employeeId) {
    where["employeeId"] = query.employeeId;
  }

  if (query.startDate && query.endDate) {
    where["startDate"] = {
      [Op.between]: [new Date(query.startDate), new Date(query.endDate)],
    };
  }

  return where;
}

function buildLeaveInclude(): FindOptions["include"] {
  return [
    {
      model: Employee,
      as: "employee",
      attributes: ["id", "name", "email", "departmentId"],
    },
    {
      model: Employee,
      as: "approver",
      attributes: ["id", "name", "email"],
    },
  ];
}

export const getLeaveHistory = async (query: LeaveQuery, user: AuthUser) => {
  const { page = "1", limit = "10" } = query;

  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.max(Number(limit) || 10, 1);
  const offset = (pageNum - 1) * limitNum;

  const where = buildHistoryFilters(query, user);

  const { rows, count } = await Leave.findAndCountAll({
    where,
    include: buildLeaveInclude(),
    limit: limitNum,
    offset,
    order: [["created_at", "DESC"]],
  });

  return {
    data: rows,
    total: count,
    page: pageNum,
    totalPages: Math.ceil(count / limitNum),
  };
};

export const getLeaveSummary = async (user: AuthUser) => {
  const where = buildLeaveScope(user);
  const include = buildLeaveInclude();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [total, pending, approved, rejected, cancelled, activeToday] =
    await Promise.all([
      Leave.count({ where, include }),
      Leave.count({ where: { ...where, status: "pending" }, include }),
      Leave.count({ where: { ...where, status: "approved" }, include }),
      Leave.count({ where: { ...where, status: "rejected" }, include }),
      Leave.count({ where: { ...where, status: "cancelled" }, include }),
      Leave.count({
        where: {
          ...where,
          status: { [Op.in]: ACTIVE_LEAVE_STATUSES },
          startDate: { [Op.lte]: today },
          endDate: { [Op.gte]: today },
        },
        include,
      }),
    ]);

  return {
    total,
    pending,
    approved,
    rejected,
    cancelled,
    activeToday,
    lastUpdated: new Date().toISOString(),
  };
};
