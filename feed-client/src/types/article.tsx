export type Article = {
  author: string;
  content?: string;
  description: string;
  publishedAt: string;
  source: string;
  title: string;
  url: string;
  urlToImage?: string;
};

export type StoredArticles = {
  updatedAt: string;
  articles: Article[];
};
