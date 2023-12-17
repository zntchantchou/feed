import Article from 'db/models/Article';
import { articleDto } from '@modules/articles/articles.schema';
import { createUpvoteDto } from '@modules/upvotes/upvote.schema';

export const getUid = (article: articleDto | Article) => {
  const date = new Date(article.publishedAt)
    .toISOString()
    .replace(/[^a-zA-Z0-9]/g, '');
  const title = article.title.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '');
  return date + title;
};

export const formatArticle = (article: createUpvoteDto) => {
  return {
    ...article,
    description: shortenString(article?.description, 255),
    content: shortenString(article?.content, 255),
  };
};

const shortenString = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length);
  }
  return text;
};
