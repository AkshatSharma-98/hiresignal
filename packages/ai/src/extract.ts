import { z } from "zod";
import { genai } from "./client";

export async function extractStructured<T extends z.ZodTypeAny>(
  schema: T,
  prompt: string,
): Promise<z.infer<T>> {
  const response = await genai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(schema),
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  const parsed = JSON.parse(text);
  return schema.parse(parsed);
}