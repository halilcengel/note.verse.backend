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

export const getStudentCourseBySemesterSchema = z.object({
  semester: z
    .enum(["Fall", "Spring", "Summer"])
    .refine((val) => ["Fall", "Spring", "Summer"].includes(val), {
      message: "Semester must be one of: Fall, Spring, Summer",
    }),
  academicYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/, "Academic year must be in the format YYYY-YYYY")
    .min(9, "Academic year seems invalid"),
});

