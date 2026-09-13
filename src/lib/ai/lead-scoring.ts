import { openai } from "./openai";
import {
  LeadAnalysisSchema,
  type LeadAnalysis,
} from "./types";

type LeadInput = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  budget?: string | null;
  status?: string;
};

export async function analyzeLead(
  lead: LeadInput
): Promise<LeadAnalysis> {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content:
          "You are an expert real estate lead qualification AI.",
      },
      {
        role: "user",
        content: `
Analyze this real estate lead.

Lead:
${JSON.stringify(lead, null, 2)}

Return JSON:
{
  "score": number 0-100,
  "temperature": "COLD" | "WARM" | "HOT",
  "intent": string,
  "summary": string
}
`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI returned empty response");
  }

  const parsed = JSON.parse(content);

  return LeadAnalysisSchema.parse(parsed);
}
