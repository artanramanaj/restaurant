import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

// custom error
export class customError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
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
    res.status(err.statusCode).json({ message: err.message });
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
