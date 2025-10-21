import { z } from "zod";

const createTeacherSchema = z.object({
  title: z.string().nonempty("Title is required"), // Prof., Assoc. Prof., Dr., vb.
  departmentId: z.string().nonempty("Department ID is required"),
  officeNumber: z.string().optional(),
  phone: z.string().optional(),
  userId: z.string().nonempty("User ID is required"),
});

const updateTeacherSchema = z.object({
  title: z.string().optional(),
  departmentId: z.string().optional(),
  officeNumber: z.string().optional(),
  phone: z.string().optional(),
  userId: z.string().optional(),
});

export { createTeacherSchema, updateTeacherSchema }
