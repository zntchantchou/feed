import styles from "./feed.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticles } from "queries/articles";
import { Article as ArticleType } from "types/article";
import Article from "components/article/article";
import { getStoredArticles, saveArticlesToLocalStorage } from "utils/articles";
import FeedLayout from "components/feedLayout/feedLayout";

export default function Feed(): JSX.Element | null {
  useQueryClient();
  // get stored article, if none query Api for new ones
  const getFeedData = async () => (await getStoredArticles()) || getArticles();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["default"],
    queryFn: () => getFeedData(),
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
  }

  if (!data.articles) return null;

  return <FeedLayout articles={data.articles} />;
}
