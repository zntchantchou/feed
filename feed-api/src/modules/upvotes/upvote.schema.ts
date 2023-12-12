import { z } from 'zod';

export const createUpvoteSchema = z
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
