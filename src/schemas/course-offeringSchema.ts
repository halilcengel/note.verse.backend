import { z } from "zod";

export const createCourseOfferingSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  teacherId: z.string().min(1, "Teacher ID is required"),
  semester: z.enum(["Fall", "Spring", "Summer"]).refine(
    (val) => ["Fall", "Spring", "Summer"].includes(val),
    { message: "Semester must be one of: Fall, Spring, Summer" }
  ),
  academicYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/, "Academic year must be in the format YYYY-YYYY")
    .min(9, "Academic year seems invalid"),
  quota: z.number().int().min(0, "Quota cannot be negative").optional()
});

export const updateCourseOfferingSchema = z.object({
  courseId: z.string().min(1).optional(),
  teacherId: z.string().min(1).optional(),
  semester: z.enum(["Fall", "Spring", "Summer"]).optional(),
  academicYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/)
    .optional(),
  quota: z.number().int().min(0).optional()
});
