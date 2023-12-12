import { z } from 'zod';
import { articleSchema } from '@modules/articles/articles.schema';

export const createBookmarkSchema = articleSchema;
export const deleteBookmarkSchema = articleSchema;

export type createBookmarkDto = z.infer<typeof createBookmarkSchema>;
export type deleteBookmarkDto = z.infer<typeof deleteBookmarkSchema>;
