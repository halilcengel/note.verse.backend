import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z
    .string()
    .min(1, "Department name is required")
    .max(100, "Department name must be at most 100 characters")
});

export const updateDepartmentSchema = z.object({
  name: z
    .string()
    .min(1, "Department name cannot be empty")
    .max(100, "Department name must be at most 100 characters")
    .optional()
});
