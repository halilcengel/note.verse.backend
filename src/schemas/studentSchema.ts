import { z } from "zod";

export const createStudentSchema = z.object({
  studentNumber: z.string().min(1, "Student number is required"),
  gpa: z.number().min(0).max(4).optional(),
  enrollmentYear: z.number().int().min(1900, "Enrollment year seems invalid"),
  userId: z.string().min(1, "User ID is required"),
});

export const updateStudentSchema = z.object({
  studentNumber: z.string().min(1).optional(),
  gpa: z.number().min(0).max(4).optional(),
  enrollmentYear: z.number().int().min(1900).optional(),
  userId: z.string().optional(),
});
