import { z } from 'zod';

/**
 *  Articles are saved only once, then data is attached to them
 *  Articles do not have their own controller: we are only interested in data that belongs to the user
 *  Article schema is used to validate requests to CREATE or UPDATE other tables like upvotes and bookmarks
 *  When article related data is created, the controller method will look for the article and CREATE IT IF IT DOES NOT EXIST
 */

export const articleSchema = z
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

export type articleDto = z.infer<typeof articleSchema>;
