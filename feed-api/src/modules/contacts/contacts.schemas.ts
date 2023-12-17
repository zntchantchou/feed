import { z } from 'zod';

export const contactSearchSchema = z
  .object({
    input: z.string(),
  })
  .required();

export type contactSearchDto = z.infer<typeof contactSearchSchema>;

export const createContactRequestSchema = z
  .object({
    email: z.string().email(),
  })
  .required();

export type createContactRequestDto = z.infer<
  typeof createContactRequestSchema
>;
