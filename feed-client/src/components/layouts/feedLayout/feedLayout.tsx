import styles from "./feedLayout.module.css";
import Article from "components/article/article";
import { Article as ArticleType } from "types/article";
import { useQuery } from "@tanstack/react-query";
import { getUpvotes } from "queries/upvotes";
import { useState, useEffect } from "react";
import { getUid } from "utils/articles";
import { UpvoteCount, UserUpvote, Upvotes } from "types/upvotes";

interface FeedProps {
  articles?: ArticleType[];
  isLoading: boolean;
}

export default function FeedLayout({
  articles,
  isLoading,
}: FeedProps): JSX.Element | null {
  const {
    isPending: isUpvotesPending,
    isError: hasUpvotesError,
    data: upvotes,
    error: getUpvotesError,
  } = useQuery({
    queryKey: ["upvotes"],
    queryFn: () => {
      console.log("queryFn SETTING READY TO FALSE");
      setAreUpvotesReady(false);
      return getUpvotes();
    },
  });

  const [feedArticles, setFeedArticles] = useState(articles);
  const [areUpvotesReady, setAreUpvotesReady] = useState(false);

  useEffect(() => {
    if (!feedArticles) setFeedArticles(articles);
  }, [articles]);

  useEffect(() => {
    if (
      !areUpvotesReady &&
      feedArticles &&
      upvotes &&
      Array.isArray(upvotes?.all)
    ) {
      console.log("Upvotes + feedArticles USEFFECT ", upvotes);
      setFeedArticles(addUpvotesToArticles(feedArticles, upvotes));
      setAreUpvotesReady(true);
    }
  }, [upvotes, feedArticles]);

  useEffect(() => {
    console.log("Upvotes USEFFECT ", upvotes);
  }, [upvotes]);
  /**
   * Adds properties 'upvotes' and 'upvotedByUser' to each article
   */
  const addUpvotesToArticles = (
    articles: ArticleType[],
    upvotes: Upvotes
  ): ArticleType[] => {
    return articles.map((article: ArticleType) => {
      const articleUid = getUid(article);
      const upvoteCount = upvotes?.all.find(
        (upvote: UpvoteCount) => upvote.articleId === articleUid
      );
      const userUpvote = upvotes.userUpvotes.find(
        (upvote: UserUpvote) => upvote.articleId === articleUid
      );
      return {
        ...article,
        upvotes: upvoteCount?.upvotes,
        upvotedByUser: !!userUpvote,
      };
    });
  };

  if (isLoading || !feedArticles) return <div className={styles.main}></div>;
  const content = feedArticles
    .filter((article: ArticleType) => !!article.urlToImage)
    .map((article: ArticleType) => (
      <Article article={article} key={article.title} />
    ));

  return <div className={styles.main}>{content}</div>;
}
