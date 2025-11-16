import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  tcNo: z.string().length(11, "TC No must be 11 characters"),
  role: z.enum(["admin", "teacher", "student"], {
    message: "Role must be admin, teacher, or student"
  }),
  studentNumber: z.string().optional(),
  enrollmentYear: z.string().optional()
});
