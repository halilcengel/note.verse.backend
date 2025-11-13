import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1),
  role: z.enum(['admin', 'teacher', 'student']),
  password: z.string().min(1),
  email: z.string().email(),
  tcNo: z.string().min(1),
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  tcNo: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
});

export { createUserSchema, updateUserSchema };


