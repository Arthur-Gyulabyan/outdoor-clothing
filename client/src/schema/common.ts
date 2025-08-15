import { z } from "zod";

export const errorSchema = z.object({
  message: z.string(),
});

export type Error = z.infer<typeof errorSchema>;