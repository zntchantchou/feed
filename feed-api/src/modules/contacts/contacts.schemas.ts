import { z } from 'zod';

export const contactSearchSchema = z
  .object({
    input: z.string(),
  })
  .required();

export type contactSearchDto = z.infer<typeof contactSearchSchema>;
