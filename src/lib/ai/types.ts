import { z } from "zod";

export const LeadAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  temperature: z.enum([
    "COLD",
    "WARM",
    "HOT",
  ]),
  intent: z.string(),
  summary: z.string(),
});

export type LeadAnalysis = z.infer<
  typeof LeadAnalysisSchema
>;
