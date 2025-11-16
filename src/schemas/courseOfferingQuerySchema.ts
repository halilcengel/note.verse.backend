import { z } from "zod";
import { paginationSchema } from "./paginationSchema";

export const courseOfferingQuerySchema = paginationSchema.extend({
  semester: z.enum(["Fall", "Spring", "Summer"]).optional(),
  academicYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/, "Academic year must be in the format YYYY-YYYY")
    .optional()
});
