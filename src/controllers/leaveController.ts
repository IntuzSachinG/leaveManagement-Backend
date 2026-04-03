import { Request, Response, NextFunction } from "express";
import * as leaveService from "../services/leaveService";
// import { AppError } from "../middlewares/errorMiddleware";
import { AuthRequest } from "../types/express.types";
import { AppError } from "../utils/AppError";

export const applyLeave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthRequest;
  try {
    const leave = await leaveService.applyLeave({
      ...authReq.body,
      employeeId: authReq.user.id,
    });

    // res.status(201).json(leave);
    res.status(201).json({
      success: true,
      message: "Leave request created successfully",
      data: [leave],
    });
  } catch (err) {
    next(err);
  }
};

export const getLeaveHistory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthRequest;
  try {
    const data = await leaveService.getLeaveHistory(req.query, authReq.user);
    // res.json(data);
    res.status(200).json({
      success: true,
      message: "Leave History fetch successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const approveLeave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthRequest;
  try {
    const leaveId = req.params.id as string;
    if (!leaveId) throw new AppError("Leave ID is required", 400);

    const leave = await leaveService.approveLeave(leaveId, authReq.user.id);
    // res.json(leave);
    res.status(200).json({
      success: true,
      message: "Leave Approved Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getLeaveSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthRequest;

  try {
    const data = await leaveService.getLeaveSummary(authReq.user);

    res.status(200).json({
      success: true,
      message: "Leave summary fetched successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const rejectLeave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthRequest;
  try {
    const leaveId = req.params.id as string;
    if (!leaveId) throw new AppError("Leave ID is required", 400);

    const leave = await leaveService.rejectLeave(leaveId, authReq.user.id);
    // res.json(leave);
    res.status(200).json({
      success: true,
      message: "Leave Rejected Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const cancelLeave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authReq = req as AuthRequest;
  try {
    const leaveId = req.params.id as string;
    if (!leaveId) throw new AppError("Leave ID is required", 400);

    const leave = await leaveService.cancelLeave(leaveId, authReq.user.id);
    // res.json(leave);
    res.status(200).json({
      success: true,
      message: "Request Cancel Successfully",
      // data:[leave]
    });
  } catch (err) {
    next(err);
  }
};
