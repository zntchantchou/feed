import { useQuery } from "@tanstack/react-query";
import { getArticles } from "queries/articles";
import { FeedArticle, NewsApiArticle, StoredArticles } from "types/article";
import {
  getStoredArticles,
  getUid,
  saveArticlesToLocalStorage,
} from "utils/articles";
import FeedLayout from "components/layouts/feedLayout/feedLayout";
import { getBookmarks } from "queries/bookmarks";
import { useEffect, useState } from "react";

export default function Feed(): JSX.Element | null {
  // get stored article, if none query Api for new ones
  const getNewsArticles = async () => getArticles();
  const [feedArticles, setFeedArticles] = useState<FeedArticle[] | null>();
  useState<StoredArticles | null>();
  const {
    isLoading,
    isError: hasNewsArticlesError,
    data: newsApiArticles,
    error,
  } = useQuery({
    queryKey: ["default"],
    queryFn: () => getNewsArticles(),
    retry: false,
    refetchInterval: undefined,
  });

  const {
    isPending: isBookmarksPending,
    isError: hasGetBookmarksError,
    data: bookmarks,
    error: getBookmarksError,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(),
  });

  const getUpdatedFeedArticles = (
    articles: FeedArticle[]
  ): FeedArticle[] | null => {
    const articleIds: string[] = bookmarks.map(getUid);
    const updatedArticles = newsApiArticles?.map(
      (article: FeedArticle): FeedArticle => ({
        ...article,
        isBookmarked: articleIds.includes(getUid(article)),
      })
    );
    return updatedArticles || null;
  };

  useEffect(() => {
    if (newsApiArticles && bookmarks) {
      const updateNewsArticles = getUpdatedFeedArticles(newsApiArticles);
      setFeedArticles(updateNewsArticles);
    }
  }, [bookmarks, newsApiArticles]);

  if (error) {
    console.log("error", error);
    return <div> Error ....</div>;
  }

  if (!feedArticles) {
    return <FeedLayout isLoading={true} />;
  }

  saveArticlesToLocalStorage(feedArticles);
  return (
    <FeedLayout
      articles={feedArticles}
      isLoading={isLoading || isBookmarksPending}
    />
  );
}
