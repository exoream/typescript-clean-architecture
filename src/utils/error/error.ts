import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../helper/response-error";

export const errorValidation = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.errors });
  } else if (error instanceof ResponseError) {
    return res.status(error.status).json({ error: error.message });
  } else {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
