
import { Request } from "express";

export type Role = "admin" | "manager" | "employee";

export interface AuthUser {
  id: string;
  role: Role;
  departmentId: string;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}

export interface JwtPayload {
  id: string;
  role: Role;
  departmentId: string;
}
