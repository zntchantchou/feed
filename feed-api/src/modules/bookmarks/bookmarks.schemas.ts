import { z } from 'zod';

export const createBookmarkSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    urlToImage: z.string(),
    url: z.number(),
    source: z.string(),
    publishedAt: z.string(),
    content: z.string().optional(),
  })
  .required();

export type createArticleDt = z.infer<typeof createBookmarkSchema>;
