import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

export const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
