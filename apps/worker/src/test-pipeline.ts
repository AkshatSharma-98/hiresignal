import "dotenv/config";
import { scrapePageText } from "./scrapers/scrape-page";
import { processScrapedJob } from "./pipeline/process-job";

const TEST_URL = "https://careers.airbnb.com/positions/7995153/";

async function main() {
  const rawText = await scrapePageText(TEST_URL);
  console.log("Scraped text length:", rawText.length);
  console.log("First 300 chars:", rawText.slice(0, 300));

  const job = await processScrapedJob(rawText, TEST_URL, "company_site");
  console.log("Saved job:", job);
}

main().catch(console.error);