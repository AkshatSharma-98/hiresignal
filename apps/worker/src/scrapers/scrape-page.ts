import { chromium } from "playwright";
import * as cheerio from "cheerio";

export async function scrapePageText(url: string): Promise<string> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  const html = await page.content();
  await browser.close();

  const $ = cheerio.load(html);
  $("script, style, nav, footer").remove(); // strip noise before extracting text
  return $("body").text().replace(/\s+/g, " ").trim();
}
