import { z } from "zod";
import logger from "../logger.js";
import { Request, Response, NextFunction } from "express";

export const playerSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
  jerseyNumber: z.coerce.number().int().min(1).max(99),
  age: z.coerce.number().int().min(15).max(50),
  avatarUrl: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .pipe(z.url("Invalid URL format").optional()),
  nationality: z.string().optional().or(z.literal("")),
});

export const updatePlayerSchema = playerSchema.partial();

// Middleware
export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      logger.error({
        message: "request body should be valid",
      });
      const formatted = result.error.format();

      return res.status(400).json({
        message: "Validation has failed",
        errors: formatted,
      });
    }

    req.body = result.data;
    next();
  };
