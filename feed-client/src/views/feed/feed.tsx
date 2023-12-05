import styles from "./feed.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticles } from "queries/articles";
import { Article as ArticleType } from "types/article";
import Article from "components/article/article";
import { getStoredArticles, saveArticlesToLocalStorage } from "utils/articles";

export default function Feed(): JSX.Element | null {
  useQueryClient();
  let finalData;
  // get stored article, if none query Api for new ones
  const queryFn = async () => (await getStoredArticles()) || getArticles();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["default"],
    queryFn: () => queryFn(),
    retry: false,
    refetchInterval: undefined,
  });

  if (isLoading) {
    console.log("isLoading", isLoading);
    return <div> Loading ....</div>;
  }

  if (error) {
    console.log("error", error);
    return <div> Error ....</div>;
  }

  if (data) {
    saveArticlesToLocalStorage(data.articles);
    finalData = data;
  }

  if (!finalData.articles) return null;

  const articles = finalData.articles
    .filter((article: ArticleType) => !!article.urlToImage)
    .map((article: ArticleType) => (
      <Article article={article} key={article.title} />
    ));

  return <div className={styles.main}> {articles} </div>;
}
