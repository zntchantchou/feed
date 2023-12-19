export interface Article {
  author: string;
  content?: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage?: string;
  isBookmarked?: boolean;
  upvotes?: string;
  upvotedByUser?: boolean;
  source?: any;
}

export interface NewsApiArticle extends Article {
  source?: { name?: string; id?: string };
}

export interface FeedArticle extends Article {
  source: string | null;
}

export type StoredArticles = {
  updatedAt: string;
  articles: NewsApiArticle[];
};
