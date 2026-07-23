import { z } from "zod";
import { createJobPostingSchema } from "@hiresignal/shared";
import { extractStructured, embedText } from "./index";

async function main() {
  const result = await extractStructured(
    createJobPostingSchema,
    `Extract job details from: "Senior Backend Engineer at Stripe, remote-friendly, 
     San Francisco HQ. Full-time. $180k-$220k. Requires 5+ years Node.js, 
     experience with distributed systems, and strong SQL skills."`,
  );
  console.log("Extracted:", result);

  const vector = await embedText("Senior Backend Engineer at Stripe");
  console.log("Embedding length:", vector.length); // should print 768
}

main().catch(console.error);