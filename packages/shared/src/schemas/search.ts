import { z } from "zod";

export const jobSearchQuerySchema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  cursor: z.string().optional(),
});

export type JobSearchQuery = z.infer<typeof jobSearchQuerySchema>;