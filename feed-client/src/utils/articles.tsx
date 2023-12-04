import { Article, StoredArticles } from "types/article";

export function saveArticlesToLocalStorage(articles: Article[]): void {
  const updatedArticles = {
    updatedAt: new Date().toISOString(),
    articles,
  };
  console.log("SAVING ITEMS");
  localStorage.setItem("data", JSON.stringify(updatedArticles));
}

export async function getStoredArticles(): Promise<StoredArticles | null> {
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
  return articles ? JSON.parse(articles) : null;
}
