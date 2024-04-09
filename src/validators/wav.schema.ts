import { z } from "zod";

const wavSchema = z.object({
  id: z.number(),
  filePath: z.string(),
});

export type WavFile = z.infer<typeof wavSchema>;
