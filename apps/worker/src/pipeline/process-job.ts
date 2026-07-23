import { randomUUID } from "crypto";
import { prisma } from "@hiresignal/database";
import { extractStructured, embedText } from "@hiresignal/ai";
import { createJobPostingSchema } from "@hiresignal/shared";

// what Gemini actually extracts from text — source info is known, not extracted
const extractionSchema = createJobPostingSchema.omit({
  sourcePlatform: true,
  sourceUrl: true,
});

export async function processScrapedJob(
  rawText: string,
  sourceUrl: string,
  sourcePlatform: "linkedin" | "seek" | "indeed" | "company_site" | "other"
) {
  const extracted = await extractStructured(
    extractionSchema,
    `Extract structured job posting details from the following page text:\n\n${rawText}`
  );

  const job = await prisma.jobPosting.create({
    data: {
      ...extracted,
      sourcePlatform,
      sourceUrl,
      postedAt: extracted.postedAt ? new Date(extracted.postedAt) : null,
    },
  });

  const vector = await embedText(
    `${job.title} at ${job.company}. ${job.description}`
  );

  await prisma.$executeRaw`
    INSERT INTO "JobEmbedding" (id, "jobId", vector)
    VALUES (${randomUUID()}, ${job.id}, ${`[${vector.join(",")}]`}::vector)
  `;

  return job;
}
