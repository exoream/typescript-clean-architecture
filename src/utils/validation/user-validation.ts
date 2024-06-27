import { z, ZodError } from "zod";

export class UserValidation {
  static readonly REGISTER = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
  });

  static readonly LOGIN = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
  });

  static readonly UPDATE = z.object({
    name: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(255).optional(),
  });
}
