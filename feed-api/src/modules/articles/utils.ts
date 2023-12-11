import Article from 'db/models/Article';
import { createArticleDto } from '@modules/bookmarks/bookmarks.schemas';

export const getUid = (article: createArticleDto | Article) => {
  const date = new Date(article.publishedAt)
    .toISOString()
    .replace(/[^a-zA-Z0-9]/g, '');
  const title = article.title.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '');
  return date + title;
};
