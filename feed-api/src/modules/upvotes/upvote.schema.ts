import { articleSchema } from '@modules/articles/articles.schema';
import { z } from 'zod';

export const createUpvoteSchema = articleSchema;
export const deleteUpvoteSchema = articleSchema;

export type createUpvoteDto = z.infer<typeof createUpvoteSchema>;
export type deleteUpvoteDto = z.infer<typeof deleteUpvoteSchema>;
