export type Article = {
  author: string;
  content?: string;
  description: string;
  publishedAt: string;
  source?: { name?: string; id?: string };
  title: string;
  url: string;
  urlToImage?: string;
};

export type StoredArticles = {
  updatedAt: string;
  articles: Article[];
};
