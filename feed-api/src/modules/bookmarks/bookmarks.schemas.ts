import { z } from 'zod';

export const createBookmarkSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    urlToImage: z.string().url(),
    source: z.string(),
    publishedAt: z.string(),
    content: z.string().optional(),
  })
  .required();

export const deleteBookmarkSchema = createBookmarkSchema;

export type createArticleDto = z.infer<typeof createBookmarkSchema>;
export type deleteBookmarkDto = z.infer<typeof deleteBookmarkSchema>;
