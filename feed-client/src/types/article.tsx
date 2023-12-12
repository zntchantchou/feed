export interface Article {
  author: string;
  content?: string;
  description: string;
  publishedAt: string;
  source?: { name?: string; id?: string };
  title: string;
  url: string;
  urlToImage?: string;
  isBookmarked?: boolean;
  upvotes?: string;
}

export type StoredArticles = {
  updatedAt: string;
  articles: Article[];
};
