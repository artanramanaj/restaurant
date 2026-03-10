import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/verificationUtils.js";
import { customError } from "./errorHandler.js";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      throw new customError(
        "Not authorized, no token",
        StatusCodes.UNAUTHORIZED,
      );
    }

    const decoded = verifyToken(token) as {
      id: string;
      username: string;
      role: string;
    };
    req.user = decoded;
    next();
  },
);

export const adminOnly = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
      throw new customError(
        "Not authorized, admin only",
        StatusCodes.FORBIDDEN,
      );
    }
    next();
  },
);
