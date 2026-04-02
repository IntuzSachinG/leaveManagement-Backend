export class AppError extends Error {
  public statusCode: number;
  public success: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.success = `${statusCode}`.startsWith("4") ? "false" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
