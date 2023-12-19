import { FeedArticle, NewsApiArticle, StoredArticles } from "types/article";

export function saveArticlesToLocalStorage(articles: FeedArticle[]): void {
  const updatedArticles = {
    updatedAt: new Date().toISOString(),
    articles,
  };
  localStorage.setItem("data", JSON.stringify(updatedArticles));
}

export async function getStoredArticles(): Promise<NewsApiArticle[] | null> {
  const articles = localStorage.getItem("data");
  if (articles) {
    const json = JSON.parse(articles) as StoredArticles;
    const diffInMinutes =
      ((Date.now() - Date.parse(json.updatedAt)) * 0.001) / 60;
    // Only refresh articles every three hours
    if (diffInMinutes > 180) {
      return null;
    }
  }
  return articles ? JSON.parse(articles)?.articles : null;
}

export const getUid = (article: FeedArticle) => {
  const date = new Date(article.publishedAt)
    .toISOString()
    .replace(/[^a-zA-Z0-9]/g, "");
  const title = article.title.slice(0, 20).replace(/[^a-zA-Z0-9]/g, "");
  return date + title;
};
