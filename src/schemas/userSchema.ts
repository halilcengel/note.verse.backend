import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  tcNo: z.string().min(1),
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  tcNo: z.string().min(1).optional(),
});

export { createUserSchema, updateUserSchema };


