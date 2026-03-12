import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

// custom error
export class customError extends Error {
  statusCode: number;
  code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof customError) {
    res.status(err.statusCode).json({ message: err.message, code: err.code });
    return;
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    return;
  }

  // fallback errors
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong!" });
};

export default errorHandler;
