import { z } from "zod";

export const updateLeadSchema = z.object({
  status: z
    .enum([
      "NEW",
      "CONTACTED",
      "QUALIFIED",
      "MEETING",
      "CONVERTED",
      "LOST",
    ])
    .optional(),

  score: z
    .number()
    .min(0)
    .max(100)
    .optional(),
});

export type UpdateLeadInput = z.infer<
  typeof updateLeadSchema
>;

