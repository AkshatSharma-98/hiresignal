import { z } from "zod";

export const jobPostingSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  company: z.string().min(1),
  description: z.string(),
  sourcePlatform: z.enum(["linkedin", "seek", "indeed", "company_site", "other"]),
  sourceUrl: z.string().url(),
  externalId: z.string().nullable(),
  location: z.string().nullable(),
  workArrangement: z.enum(["remote", "hybrid", "onsite"]).nullable(),
  employmentType: z
    .enum(["full_time", "part_time", "contract", "internship", "casual"])
    .nullable(),
  seniorityLevel: z
    .enum(["entry", "associate", "mid_senior", "director", "executive"])
    .nullable(),
  salaryMin: z.number().nullable(),
  salaryMax: z.number().nullable(),
  salaryCurrency: z.string().nullable(),
  salaryPeriod: z.enum(["yearly", "hourly", "monthly"]).nullable(),
  requirements: z.array(z.string()),
  skills: z.array(z.string()),
  benefits: z.array(z.string()),
  applicantCount: z.number().nullable(),
  postedAt: z.iso.date().nullable(),
  createdAt: z.coerce.date(),
});

export type JobPosting = z.infer<typeof jobPostingSchema>;

export const createJobPostingSchema = jobPostingSchema.omit({
  id: true,
  createdAt: true,
});

export type CreateJobPostingInput = z.infer<typeof createJobPostingSchema>;