import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { methodType } from "../utils/common.dto";

export const validate = (schema: ZodSchema, type: methodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[type]);
    if (!result.success) {
      return res.status(404).json({ message: "Validation Failed", error: result.error });
    }
    next();
  };
};
