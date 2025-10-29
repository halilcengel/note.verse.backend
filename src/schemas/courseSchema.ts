import { z } from "zod";

export const createCourseSchema = z.object({
  code: z.string().min(1, "Course code is required"),
  name: z.string().min(1, "Course name is required"),
  credits: z.number().int().min(1, "Course credits must be at least 1"),
  departmentId: z.string().min(1, "Department ID is required")
});

export const updateCourseSchema = z.object({
  code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  credits: z.number().int().min(1).optional(),
  departmentId: z.string().optional()
});
