import asyncHandler from "express-async-handler";
import { Request, NextFunction } from "express";

export const validateBody = (
  validationSchema: any,
  validateOptions = { stripUnknown: true, abortEarly: false }
) =>
  asyncHandler(async (req: Request, _, next: NextFunction) => {
    try {
      await validationSchema.validateAsync(req.body, validateOptions);
      next();
    } catch (err: any) {
      console.log("error on validation",err);

      throw new Error(err.message);
    }
  });
