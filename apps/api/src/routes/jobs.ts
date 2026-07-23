import { Router } from "express";
import { prisma } from "@hiresignal/database";
import { createJobPostingSchema } from "@hiresignal/shared";

export const jobsRouter = Router();

jobsRouter.get("/", async (req, res) => {
  const jobs = await prisma.jobPosting.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  res.json({ success: true, data: jobs });
});

jobsRouter.post("/", async (req, res) => {
  const parseResult = createJobPostingSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ success: false, error: parseResult.error.message });
    return;
  }

  const job = await prisma.jobPosting.create({ data: parseResult.data });
  res.status(201).json({ success: true, data: job });
});