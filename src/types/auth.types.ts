
import { Role } from "./express.types";

export interface JwtPayload {
  id: string;
  role: Role;
  departmentId: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
