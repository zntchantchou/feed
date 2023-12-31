import { NewsApiArticle } from "types/article";
import { formatArticle } from "./http.utils";

const { REACT_APP_NEWS_KEY: apiKey, REACT_APP_NEWS_URL: apiUrl } = process.env;

const DEFAULT_COUNTRY = "us";
const HEADLINES_URL = `${apiUrl}/top-headlines?category=general&countries=us&country=${DEFAULT_COUNTRY}&apiKey=${apiKey}`;
// const SEARCH_URL = `${apiUrl}/top-headlines?countries=us&category=general&language=en&apiKey=${apiKey}`;

export const getArticles = async () => {
  let url = HEADLINES_URL;
  console.log("url", url);
  const result = await fetch(url);
  const results: { articles: NewsApiArticle[] } = await result.json();
  return results.articles.map((article: NewsApiArticle) =>
    formatArticle(article)
  );
};
