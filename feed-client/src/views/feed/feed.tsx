import styles from "./feed.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticles } from "queries/articles";
import { Article as ArticleType, StoredArticles } from "types/article";
import Article from "components/article/article";
import {
  getStoredArticles,
  getUid,
  saveArticlesToLocalStorage,
} from "utils/articles";
import FeedLayout from "components/feedLayout/feedLayout";
import { getBookmarks } from "queries/bookmarks";
import { useEffect, useState } from "react";

export default function Feed(): JSX.Element | null {
  // useQueryClient();
  // get stored article, if none query Api for new ones
  const getFeedData = async () => (await getStoredArticles()) || getArticles();
  const [updatedFeedData, setUpdatedFeedData] =
    useState<StoredArticles | null>();

  const {
    isLoading,
    isError,
    data: feedData,
    error,
  } = useQuery({
    queryKey: ["default"],
    queryFn: () => getFeedData(),
    retry: false,
    refetchInterval: undefined,
  });

  const {
    isPending: isBookmarksPending,
    isError: isGetBookmarksError,
    data: bookmarks,
    error: getBookmarksError,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(),
  });

  useEffect(() => {
    console.log("feed + book");
    if (feedData && bookmarks) {
      const articleIds: string[] = bookmarks.map(getUid);
      if (articleIds.length > 0) {
        const updatedData = {
          ...feedData,
          articles: feedData.articles.map(
            (article: ArticleType): ArticleType => {
              return {
                ...article,
                isBookmarked: articleIds.includes(getUid(article)),
              };
            }
          ),
        };
        setUpdatedFeedData(updatedData);
      } else {
        setUpdatedFeedData(feedData);
      }
    }
  }, [bookmarks, feedData]);

  useEffect(() => {
    console.log("UPDATED FEED DATA ", updatedFeedData);
  }, [updatedFeedData]);

  if (isLoading || isBookmarksPending) {
    console.log("isLoading", isLoading);
    return <div> Loading ....</div>;
  }

  if (error) {
    console.log("error", error);
    return <div> Error ....</div>;
  }

  if (!updatedFeedData?.articles) return null;

  if (updatedFeedData) {
    saveArticlesToLocalStorage(updatedFeedData.articles);
  }

  return <FeedLayout articles={updatedFeedData.articles} />;
}
