import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { customError } from "./errorHandler.js";
import { ZodSchema, ZodError } from "zod";

const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new customError(
          result.error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", "),
          StatusCodes.BAD_REQUEST,
        ),
      );
    }

    next();
  };

export default validate;
