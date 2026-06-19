export class AppError extends Error {
  constructor(public code: string, public statusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const Errors = {
  NOT_FOUND: (msg = "Resource not found") => new AppError("NOT_FOUND", 404, msg),
  BAD_REQUEST: (msg = "Bad request") => new AppError("BAD_REQUEST", 400, msg),
  INTERNAL_ERROR: (msg = "Internal server error") => new AppError("INTERNAL_ERROR", 500, msg),
};
