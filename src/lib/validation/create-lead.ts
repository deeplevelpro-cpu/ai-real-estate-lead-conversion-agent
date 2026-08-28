import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2).optional(),

  email: z.string().email().optional(),

  phone: z.string().min(5).optional(),

  budget: z.string().optional(),

  location: z.string().optional(),
});

export type CreateLeadInput = z.infer<
  typeof createLeadSchema
>;
