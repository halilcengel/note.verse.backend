import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message is required"),
  thread_id: z.string().min(1, "Thread ID is required"),
  url: z.string().url("Valid URL is required"),
  school: z.string().min(1, "School name is required"),
  department: z.string().min(1, "Department name is required")
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
